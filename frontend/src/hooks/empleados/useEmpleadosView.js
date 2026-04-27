
import { useEffect, useReducer  } from "react";
import { Empleados } from '../../api/Empleados';


const initialState = {
    empleados: [],
    loading: true,
    error: null,
    search: "",
    rol: "",
    estado: "",
    page: 1,
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
                empleados: action.payload,
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

   export function useEmpleadosView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchEmpleados = async () => {
        try {
            dispatch({ type: "FETCH_START" });

            const data = await Empleados.view({
                search: state.search,
                rol: state.rol,
                activo: state.estado,
                page: state.page,
            });
             
            dispatch({type: "FETCH_SUCCESS",payload: data.data,});

        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload: error,
            });
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchEmpleados();
        }, 400); 

        return () => clearTimeout(timeout);
    }, [state.search, state.rol, state.estado, state.page]);

    return {
        ...state,
        dispatch,
    };

   }
