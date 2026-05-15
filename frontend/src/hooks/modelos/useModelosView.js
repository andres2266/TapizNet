// src/hooks/modelos/useModelosView.js

import { useEffect, useReducer } from "react";
import { Modelos } from "../../api/Modelos";

const initialState = {
    modelos: [],
    loading: true,
    error: null,
    search: "",
    estadoProceso: "",
    activo: "",
    page: 1,
    lastPage: 1,
    isUpdatingEstado: false,
    successMessage: null,
    generalError: null,
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
                modelos: action.payload.data,
                lastPage: action.payload.last_page,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_ESTADO_START":
            return {
                ...state,
                isUpdatingEstado: true,
                generalError: null,
                successMessage: null,
            };

        case "UPDATE_ESTADO_SUCCESS":
            return {
                ...state,
                isUpdatingEstado: false,
                successMessage: action.payload.message,
                modelos: state.modelos.map((modelo) =>
                    modelo.id === action.payload.modelo.id
                        ? {
                            ...modelo,
                            activo: action.payload.modelo.activo,
                        }
                        : modelo
                ),
            };

        case "UPDATE_ESTADO_ERROR":
            return {
                ...state,
                isUpdatingEstado: false,
                generalError: action.payload,
            };

        case "CLEAR_MESSAGES":
            return {
                ...state,
                successMessage: null,
                generalError: null,
            };

        default:
            return state;
    }
}

export function useModelosView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchModelos = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const params = {
                search: state.search,
                estado_proceso: state.estadoProceso,
                page: state.page,
            };

            if (state.activo !== "") {
                params.activo = state.activo;
            }

            const data = await Modelos.view(params);

            dispatch({
                type: "FETCH_SUCCESS",
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar los modelos.",
            });
        }
    };

    const cambiarEstadoModelo = async (modelo) => {
        try {
            dispatch({ type: "UPDATE_ESTADO_START" });

            const data = await Modelos.updateEstado(modelo.id, {
                activo: !modelo.activo,
            });

            dispatch({
                type: "UPDATE_ESTADO_SUCCESS",
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: "UPDATE_ESTADO_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudo cambiar el estado del modelo.",
            });
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchModelos();
        }, 400);

        return () => clearTimeout(timeout);
    }, [state.search, state.estadoProceso, state.activo, state.page]);

    return {
        ...state,
        dispatch,
        fetchModelos,
        cambiarEstadoModelo,
    };
}