// src/hooks/puestoTrabajo/usePuestosTrabajoView.js

import { useEffect, useReducer, useState } from "react";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

const initialState = {
    puestosTrabajo: [],
    loading: true,
    error: null,
    search: "",
    estado: "",
    page: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
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

        case "SET_PER_PAGE":
            return {
                ...state,
                perPage: action.perPage,
                page: 1,
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
                puestosTrabajo: action.payload.data,
                lastPage: action.payload.last_page || 1,
                total: action.payload.total || 0,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_PUESTO_ESTADO":
            return {
                ...state,
                puestosTrabajo: state.puestosTrabajo.map((puesto) =>
                    puesto.id === action.id
                        ? { ...puesto, activo: action.activo }
                        : puesto
                ),
            };

        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

export function usePuestosTrabajoView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [isUpdatingEstado, setIsUpdatingEstado] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchPuestosTrabajo = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const params = {
                search: state.search,
                estado: state.estado,
                page: state.page,
                per_page: state.perPage,
            };

            const response = await PuestosTrabajo.view(params);

            dispatch({
                type: "FETCH_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar los puestos de trabajo.",
            });
        }
    };

    const actualizarEstadoPuesto = async (id, activo) => {
        try {
            setIsUpdatingEstado(true);
            setGeneralError(null);
            setSuccessMessage(null);

            const response = await PuestosTrabajo.cambiarEstado(id, activo);

            dispatch({
                type: "UPDATE_PUESTO_ESTADO",
                id,
                activo,
            });

            setSuccessMessage(
                response.data?.message ||
                    "Estado del puesto actualizado correctamente."
            );
        } catch (error) {
            setGeneralError(
                error.response?.data?.message ||
                    "No se pudo actualizar el estado del puesto de trabajo."
            );
        } finally {
            setIsUpdatingEstado(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchPuestosTrabajo();
        }, 400);

        return () => clearTimeout(timeout);
    }, [state.search, state.estado, state.page, state.perPage]);

    return {
        ...state,
        dispatch,
        refetch: fetchPuestosTrabajo,

        actualizarEstadoPuesto,
        isUpdatingEstado,
        generalError,
        successMessage,
    };
}