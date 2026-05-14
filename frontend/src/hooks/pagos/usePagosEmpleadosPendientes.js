import { useEffect, useReducer } from "react";
import { PagosEmpleados } from "../../api/PagosEmpleados";

const initialState = {
    empleados: [],
    loading: true,
    error: null,
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
                empleados: action.payload,
            };

        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "REMOVE_EMPLEADO":
            return {
                ...state,
                empleados: state.empleados.filter(
                    (empleado) => empleado.id !== action.payload
                ),
            };

        default:
            return state;
    }
}

export function usePagosEmpleadosPendientes() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchEmpleadosPendientes = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const response = await PagosEmpleados.pendientes();

            dispatch({
                type: "FETCH_SUCCESS",
                payload: response.data || [],
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:
                    error.response?.data?.message ||
                    "No se pudieron cargar los empleados con saldo pendiente.",
            });
        }
    };

    useEffect(() => {
        fetchEmpleadosPendientes();
    }, []);

    return {
        ...state,
        dispatch,
        recargarEmpleadosPendientes: fetchEmpleadosPendientes,
    };
}