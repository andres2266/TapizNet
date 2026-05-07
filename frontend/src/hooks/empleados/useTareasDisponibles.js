import { useEffect, useReducer } from "react";
import { TareasProduccion } from "../../api/TareasProduccion";


const initialState = {
    tareas: [],
    loading: true,
    assigning: false,
    error: null,
    successMessage: null,

    filters: {
        search: "",
        prioridad: "",
        ordenProduccionId: "",
        page: 1,
    },

    pagination: {
        currentPage: 1,
        lastPage: 1,
        total: 0,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                tareas: action.payload.data || [],
                pagination: {
                    currentPage: action.payload.current_page || 1,
                    lastPage: action.payload.last_page || 1,
                    total: action.payload.total || 0,
                },
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                tareas: [],
                error: action.payload,
            };

        case "SET_FILTER":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value,
                    page: 1,
                },
            };

        case "SET_PAGE":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    page: action.payload,
                },
            };

        case "ASSIGN_START":
            return {
                ...state,
                assigning: true,
                error: null,
                successMessage: null,
            };

        case "ASSIGN_SUCCESS":
            return {
                ...state,
                assigning: false,
                successMessage: action.payload,
            };

        case "ASSIGN_ERROR":
            return {
                ...state,
                assigning: false,
                error: action.payload,
            };

        case "CLEAR_MESSAGES":
            return {
                ...state,
                error: null,
                successMessage: null,
            };

        default:
            return state;
    }
}

export function useTareasDisponibles() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const cargarTareas = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const response = await TareasProduccion.disponibles({
                search: state.filters.search || undefined,
                prioridad: state.filters.prioridad || undefined,
                orden_produccion_id: state.filters.ordenProduccionId || undefined,
                page: state.filters.page,
            });

            dispatch({
                type: "FETCH_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar las tareas disponibles.",
            });
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        dispatch({
            type: "SET_FILTER",
            payload: {
                name,
                value,
            },
        });
    };

    const changePage = (page) => {
        dispatch({
            type: "SET_PAGE",
            payload: page,
        });
    };

    const autoAsignarTarea = async (tareaId) => {
        try {
            dispatch({ type: "ASSIGN_START" });

            const response = await TareasProduccion.autoAsignar(tareaId);

            dispatch({
                type: "ASSIGN_SUCCESS",
                payload: response.message || "Tarea asignada correctamente.",
            });

            await cargarTareas();
        } catch (error) {
            console.log(error)
            dispatch({
                type: "ASSIGN_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudo asignar la tarea.",
            });
        }
    };

    const clearMessages = () => {
        dispatch({ type: "CLEAR_MESSAGES" });
    };

    useEffect(() => {
        cargarTareas();
    }, [
        state.filters.search,
        state.filters.prioridad,
        state.filters.ordenProduccionId,
        state.filters.page,
    ]);

    return {
        tareas: state.tareas,
        loading: state.loading,
        assigning: state.assigning,
        error: state.error,
        successMessage: state.successMessage,
        filters: state.filters,
        pagination: state.pagination,

        cargarTareas,
        handleFilterChange,
        changePage,
        autoAsignarTarea,
        clearMessages,
    };
}