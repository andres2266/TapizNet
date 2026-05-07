import { useFieldArray } from "react-hook-form";

export default function FaseProcesoForm({
    fase,
    faseIndex,
    register,
    control,
    errors,
    puestosTrabajo,
    onRemoveFase,
}) {
    const {
        fields: parametros,
        append: appendParametro,
        remove: removeParametro,
    } = useFieldArray({
        control,
        name: `fases.${faseIndex}.parametros`,
    });

    const agregarParametro = () => {
        appendParametro({
            nombre: "",
            valor: "",
        });
    };

    const eliminarParametro = (index) => {
        removeParametro(index);
    };

    const faseErrors = errors.fases?.[faseIndex];

    return (
        <div className="card">
            <div className="page-header">
                <h2>Fase {faseIndex + 1}</h2>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onRemoveFase(faseIndex)}
                >
                    Eliminar fase
                </button>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Puesto de trabajo</label>
                    <select
                        className={faseErrors?.puesto_trabajo_id ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.puesto_trabajo_id`, {
                            required: "El puesto de trabajo es obligatorio.",
                        })}
                    >
                        <option value="">Selecciona un puesto</option>

                        {puestosTrabajo.map((puesto) => (
                            <option key={puesto.id} value={puesto.id}>
                                {puesto.nombre}
                            </option>
                        ))}
                    </select>

                    <p className="form-error">
                        {faseErrors?.puesto_trabajo_id?.message}
                    </p>
                </div>

                <div className="form-group">
                    <label>Orden</label>
                    <input
                        type="number"
                        min="1"
                        className={faseErrors?.orden ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.orden`, {
                            required: "El orden es obligatorio.",
                            min: {
                                value: 1,
                                message: "El orden debe ser mayor o igual a 1.",
                            },
                        })}
                    />

                    <p className="form-error">{faseErrors?.orden?.message}</p>
                </div>

                <div className="form-group form-full">
                    <label>Nombre de la tarea</label>
                    <input
                        type="text"
                        placeholder="Ej: Cortar tela"
                        className={faseErrors?.nombre_tarea ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.nombre_tarea`, {
                            required: "El nombre de la tarea es obligatorio.",
                            minLength: {
                                value: 3,
                                message: "La tarea debe tener al menos 3 caracteres.",
                            },
                            maxLength: {
                                value: 120,
                                message: "La tarea no puede superar los 120 caracteres.",
                            },
                        })}
                    />

                    <p className="form-error">
                        {faseErrors?.nombre_tarea?.message}
                    </p>
                </div>

                <div className="form-group form-full">
                    <label>Descripción</label>
                    <textarea
                        placeholder="Ej: Cortar la tela principal del asiento respetando medidas."
                        className={faseErrors?.descripcion ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.descripcion`, {
                            maxLength: {
                                value: 1000,
                                message: "La descripción no puede superar los 1000 caracteres.",
                            },
                        })}
                    />

                    <p className="form-error">
                        {faseErrors?.descripcion?.message}
                    </p>
                </div>

                <div className="form-group">
                    <label>Tiempo estimado en minutos</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Ej: 30"
                        className={faseErrors?.tiempo_estimado_minutos ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.tiempo_estimado_minutos`, {
                            required: "El tiempo estimado es obligatorio.",
                            min: {
                                value: 1,
                                message: "El tiempo debe ser mayor a 0.",
                            },
                        })}
                    />

                    <p className="form-error">
                        {faseErrors?.tiempo_estimado_minutos?.message}
                    </p>
                </div>

                <div className="form-group">
                    <label>Precio destajo</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Ej: 5"
                        className={faseErrors?.precio_destajo ? "input-error" : ""}
                        {...register(`fases.${faseIndex}.precio_destajo`, {
                            required: "El precio por destajo es obligatorio.",
                            min: {
                                value: 0,
                                message: "El precio no puede ser negativo.",
                            },
                        })}
                    />

                    <p className="form-error">
                        {faseErrors?.precio_destajo?.message}
                    </p>
                </div>
            </div>

            <hr />

            <div className="page-header">
                <h3>Parámetros / instrucciones</h3>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={agregarParametro}
                >
                    + Agregar parámetro
                </button>
            </div>

            {parametros.map((parametro, parametroIndex) => {
                const parametroErrors = faseErrors?.parametros?.[parametroIndex];

                return (
                    <div className="form-grid" key={parametro.id}>
                        <div className="form-group">
                            <label>Nombre del parámetro</label>
                            <input
                                type="text"
                                placeholder="Ej: Tela"
                                className={parametroErrors?.nombre ? "input-error" : ""}
                                {...register(
                                    `fases.${faseIndex}.parametros.${parametroIndex}.nombre`,
                                    {
                                        minLength: {
                                            value: 2,
                                            message: "Debe tener al menos 2 caracteres.",
                                        },
                                        maxLength: {
                                            value: 120,
                                            message: "No puede superar los 120 caracteres.",
                                        },
                                    }
                                )}
                            />

                            <p className="form-error">
                                {parametroErrors?.nombre?.message}
                            </p>
                        </div>

                        <div className="form-group">
                            <label>Valor</label>
                            <input
                                type="text"
                                placeholder="Ej: Antimanchas gris"
                                className={parametroErrors?.valor ? "input-error" : ""}
                                {...register(
                                    `fases.${faseIndex}.parametros.${parametroIndex}.valor`,
                                    {
                                        maxLength: {
                                            value: 500,
                                            message: "No puede superar los 500 caracteres.",
                                        },
                                    }
                                )}
                            />

                            <p className="form-error">
                                {parametroErrors?.valor?.message}
                            </p>
                        </div>

                        <div className="form-group">
                            <label>&nbsp;</label>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => eliminarParametro(parametroIndex)}
                            >
                                Eliminar parámetro
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}