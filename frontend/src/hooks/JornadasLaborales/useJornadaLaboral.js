import { useEffect, useReducer } from "react";
import { JornadasLaborales } from "../../api/JornadasLaborales";

const initialState = {
    jornadaActual: null,
    loading: true,
    actionLoading: false,
    error: null,
    successMessage: null,
};

function reducer(state, action) {
    switch (action.type) {
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
                jornadaActual: action.payload,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "ACTION_START":
            return {
                ...state,
                actionLoading: true,
                error: null,
                successMessage: null,
            };

        case "INICIAR_SUCCESS":
            return {
                ...state,
                actionLoading: false,
                jornadaActual: action.payload.data,
                successMessage: action.payload.message,
            };

        case "FINALIZAR_SUCCESS":
            return {
                ...state,
                actionLoading: false,
                jornadaActual: null,
                successMessage: action.payload.message,
            };

        case "ACTION_ERROR":
            return {
                ...state,
                actionLoading: false,
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

export function useJornadaLaboral() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchJornadaActual = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const response = await JornadasLaborales.actual();

            dispatch({
                type: "FETCH_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.message?.data ||
                    "No se pudo consultar la jornada actual.",
            });
        }
    };

    const iniciarJornada = async () => {
        try {
            dispatch({ type: "ACTION_START" });

            const response = await JornadasLaborales.iniciar();

            dispatch({
                type: "INICIAR_SUCCESS",
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: "ACTION_ERROR",
                payload:
                    error.response?.message?.data ||
                    "No se pudo iniciar la jornada.",
            });
        }
    };

    const finalizarJornada = async () => {
        try {
            dispatch({ type: "ACTION_START" });

            const response = await JornadasLaborales.finalizar();

            dispatch({
                type: "FINALIZAR_SUCCESS",
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: "ACTION_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudo finalizar la jornada.",
            });
        }
    };

    useEffect(() => {
        fetchJornadaActual();
    }, []);

    return {
        ...state,
        dispatch,
        iniciarJornada,
        finalizarJornada,
        recargarJornada: fetchJornadaActual,
    };
}