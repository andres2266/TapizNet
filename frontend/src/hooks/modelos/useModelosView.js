// src/hooks/modelos/useModelosView.js

import { useEffect, useReducer } from "react";
import { Modelos } from "../../api/Modelos";


const initialState = {modelos: [],loading: true,error: null,search: "",estadoProceso: "",page: 1,lastPage: 1,};

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

        default:
            return state;
    }
}

export function useModelosView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchModelos = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const data = await Modelos.view({
                search: state.search,
                estado_proceso: state.estadoProceso,
                page: state.page,
            });

            dispatch({
                type: "FETCH_SUCCESS",
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload: error,
            });
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchModelos();
        }, 400);

        return () => clearTimeout(timeout);
    }, [state.search, state.estadoProceso, state.page]);

    return {
        ...state,
        dispatch,
    };
}