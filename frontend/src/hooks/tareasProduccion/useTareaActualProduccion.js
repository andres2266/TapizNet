import { useEffect, useReducer } from "react";
import { TareasProduccion } from "../../api/TareasProduccion";

const initialState = {
    tarea: null,
    loading: true,
    error: null,
    successMessage: null,
    finishing: false,
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
                tarea: action.payload,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "FINISH_START":
            return {
                ...state,
                finishing: true,
                error: null,
                successMessage: null,
            };

        case "FINISH_SUCCESS":
            return {
                ...state,
                finishing: false,
                tarea: null,
                successMessage: action.payload,
            };

        case "FINISH_ERROR":
            return {
                ...state,
                finishing: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export function useTareaActualProduccion() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchTareaActual = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const response = await TareasProduccion.obtenerTareaActual();

            dispatch({
                type: "FETCH_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudo cargar la tarea actual.",
            });
        }
    };

    const terminarTarea = async () => {
        if (!state.tarea?.id) return;

        try {
            dispatch({ type: "FINISH_START" });

            const response = await TareasProduccion.terminar(
                state.tarea.id
            );

            dispatch({
                type: "FINISH_SUCCESS",
                payload:
                    response.message ||
                    "Tarea finalizada correctamente.",
            });
        } catch (error) {

            console.log(error);
            dispatch({
                type: "FINISH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudo finalizar la tarea.",
            });
        }
    };

    useEffect(() => {
        fetchTareaActual();
    }, []);

    return {
        ...state,
        dispatch,
        fetchTareaActual,
        terminarTarea,
    };
}