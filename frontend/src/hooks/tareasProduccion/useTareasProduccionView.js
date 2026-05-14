import { useEffect, useReducer } from "react";
import { TareasProduccion } from "../../api/TareasProduccion";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

const initialState = {
    tareas: [],
    puestosTrabajo: [],
    loading: true,
    loadingPuestos: true,
    error: null,
    search: "",
    estado: "",
    puestoTrabajoId: "",
    empleadoId: "",
    ordenProduccionId: "",
    prioridad: "",
    soloSinAsignar: "",
    page: 1,
    lastPage: 1,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_FILTER":
            return {
                ...state,
                [action.field]: action.value,
                page: 1,
            };

        case "SET_PAGE":
            return {
                ...state,
                page: action.page,
            };

        case "FETCH_START":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                tareas: action.payload.data,
                lastPage: action.payload.last_page,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "FETCH_PUESTOS_START":
            return {
                ...state,
                loadingPuestos: true,
            };

        case "FETCH_PUESTOS_SUCCESS":
            return {
                ...state,
                loadingPuestos: false,
                puestosTrabajo: action.payload.data,
            };

        case "FETCH_PUESTOS_ERROR":
            return {
                ...state,
                loadingPuestos: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export function useTareasProduccionView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchTareas = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const data = await TareasProduccion.get({
                search: state.search,
                estado_diferente: "completada",
                puesto_trabajo_id: state.puestoTrabajoId,
                empleado_id: state.empleadoId,
                orden_produccion_id: state.ordenProduccionId,
                prioridad: state.prioridad,
                solo_sin_asignar: state.soloSinAsignar,
                page: state.page,
            });

            dispatch({
                type: "FETCH_SUCCESS",
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar las tareas de producción.",
            });
        }
    };

    const fetchPuestosTrabajo = async () => {
        try {
            dispatch({ type: "FETCH_PUESTOS_START" });

            const data = await PuestosTrabajo.view();

            dispatch({
                type: "FETCH_PUESTOS_SUCCESS",
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_PUESTOS_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar los puestos de trabajo.",
            });
        }
    };

    useEffect(() => {
        fetchPuestosTrabajo();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchTareas();
        }, 400);

        return () => clearTimeout(timeout);
    }, [
        state.search,
        state.estado,
        state.puestoTrabajoId,
        state.empleadoId,
        state.ordenProduccionId,
        state.prioridad,
        state.soloSinAsignar,
        state.page,
    ]);

    return {
        ...state,
        dispatch,
    };
}