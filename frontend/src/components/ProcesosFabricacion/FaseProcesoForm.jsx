// src/components/procesos/FaseProcesoForm.jsx
import { useFieldArray } from "react-hook-form";
import Icons from "../../utils/icons";

export default function FaseProcesoForm({
    fase,
    faseIndex,
    register,
    control,
    errors,
    puestosTrabajo,
    onRemoveFase,
    mode = "create",
}) {
    const isEdit = mode === "edit";

    const {
        fields: parametros,
        append: appendParametro,
        remove: removeParametro,
    } = useFieldArray({
        control,
        name: `fases.${faseIndex}.parametros`,
        keyName: "fieldId",
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
        <div className="fase-card">
            <input
                type="hidden"
                {...register(`fases.${faseIndex}.id`)}
            />

            <div className="fase-header">
                <div className="fase-title">
                    <Icons.Progress size={20} />
                    <h3>Fase {faseIndex + 1}</h3>
                </div>

                {!isEdit && (
                    <button
                        type="button"
                        className="btn-icon btn-danger"
                        onClick={() => onRemoveFase(faseIndex)}
                        title="Eliminar fase"
                    >
                        <Icons.Delete size={16} />
                        Eliminar
                    </button>
                )}
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>
                        <Icons.Role size={14} />
                        Puesto de trabajo
                    </label>
                    <select
                        className={
                            faseErrors?.puesto_trabajo_id ? "input-error" : ""
                        }
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

                    {faseErrors?.puesto_trabajo_id && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.puesto_trabajo_id?.message}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <Icons.Clock size={14} />
                        Orden
                    </label>
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

                    {faseErrors?.orden && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.orden?.message}
                        </p>
                    )}
                </div>

                <div className="form-group form-full">
                    <label>
                        <Icons.Info size={14} />
                        Nombre de la tarea
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Cortar tela"
                        className={
                            faseErrors?.nombre_tarea ? "input-error" : ""
                        }
                        {...register(`fases.${faseIndex}.nombre_tarea`, {
                            required: "El nombre de la tarea es obligatorio.",
                            minLength: {
                                value: 3,
                                message:
                                    "La tarea debe tener al menos 3 caracteres.",
                            },
                            maxLength: {
                                value: 120,
                                message:
                                    "La tarea no puede superar los 120 caracteres.",
                            },
                        })}
                    />

                    {faseErrors?.nombre_tarea && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.nombre_tarea?.message}
                        </p>
                    )}
                </div>

                <div className="form-group form-full">
                    <label>
                        <Icons.Info size={14} />
                        Descripción
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Ej: Cortar la tela principal del asiento respetando medidas."
                        className={
                            faseErrors?.descripcion ? "input-error" : ""
                        }
                        {...register(`fases.${faseIndex}.descripcion`, {
                            maxLength: {
                                value: 1000,
                                message:
                                    "La descripción no puede superar los 1000 caracteres.",
                            },
                        })}
                    />

                    {faseErrors?.descripcion && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.descripcion?.message}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <Icons.Clock size={14} />
                        Tiempo estimado (minutos)
                    </label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Ej: 30"
                        className={
                            faseErrors?.tiempo_estimado_minutos
                                ? "input-error"
                                : ""
                        }
                        {...register(
                            `fases.${faseIndex}.tiempo_estimado_minutos`,
                            {
                                required: "El tiempo estimado es obligatorio.",
                                min: {
                                    value: 1,
                                    message: "El tiempo debe ser mayor a 0.",
                                },
                            }
                        )}
                    />

                    {faseErrors?.tiempo_estimado_minutos && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.tiempo_estimado_minutos?.message}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <Icons.Money size={14} />
                        Precio destajo
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Ej: 5.00"
                        className={
                            faseErrors?.precio_destajo ? "input-error" : ""
                        }
                        {...register(`fases.${faseIndex}.precio_destajo`, {
                            required: "El precio por destajo es obligatorio.",
                            min: {
                                value: 0,
                                message: "El precio no puede ser negativo.",
                            },
                        })}
                    />

                    {faseErrors?.precio_destajo && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {faseErrors?.precio_destajo?.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="parametros-section">
                <div className="parametros-header">
                    <div className="parametros-title">
                        <Icons.Box size={18} />
                        <h4>Especificaciones / Dimenciones</h4>
                    </div>

                    <button
                        type="button"
                        className="btn-secondary-small"
                        onClick={agregarParametro}
                    >
                        <Icons.Plus size={14} />
                        Agregar parámetro
                    </button>
                </div>

                {parametros.length === 0 && (
                    <div className="empty-parametros">
                        <Icons.Info size={20} />
                        <p>No hay parámetros agregados</p>
                        <span>Haz clic en "Agregar parámetro" para añadir instrucciones específicas</span>
                    </div>
                )}

                {parametros.map((parametro, parametroIndex) => {
                    const parametroErrors =
                        faseErrors?.parametros?.[parametroIndex];

                    return (
                        <div className="parametro-card" key={parametro.fieldId}>
                            <input
                                type="hidden"
                                {...register(
                                    `fases.${faseIndex}.parametros.${parametroIndex}.id`
                                )}
                            />

                            <div className="parametro-grid">
                                <div className="form-group">
                                    <label>
                                        <Icons.Info size={12} />
                                        Nombre de la Especificacion
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Tela, Hilo, Medidas"
                                        className={
                                            parametroErrors?.nombre
                                                ? "input-error"
                                                : ""
                                        }
                                        {...register(
                                            `fases.${faseIndex}.parametros.${parametroIndex}.nombre`,
                                            {
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Debe tener al menos 2 caracteres.",
                                                },
                                                maxLength: {
                                                    value: 120,
                                                    message:
                                                        "No puede superar los 120 caracteres.",
                                                },
                                            }
                                        )}
                                    />

                                    {parametroErrors?.nombre && (
                                        <p className="form-error">
                                            <Icons.Alert size={10} />
                                            {parametroErrors?.nombre?.message}
                                        </p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>
                                        <Icons.Check size={12} />
                                       Valor de la dimecion
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Antimanchas gris, 0.5mm"
                                        className={
                                            parametroErrors?.valor
                                                ? "input-error"
                                                : ""
                                        }
                                        {...register(
                                            `fases.${faseIndex}.parametros.${parametroIndex}.valor`,
                                            {
                                                maxLength: {
                                                    value: 500,
                                                    message:
                                                        "No puede superar los 500 caracteres.",
                                                },
                                            }
                                        )}
                                    />

                                    {parametroErrors?.valor && (
                                        <p className="form-error">
                                            <Icons.Alert size={10} />
                                            {parametroErrors?.valor?.message}
                                        </p>
                                    )}
                                </div>

                                {!isEdit && (
                                    <div className="parametro-actions">
                                        <button
                                            type="button"
                                            className="btn-icon-small btn-danger"
                                            onClick={() =>
                                                eliminarParametro(parametroIndex)
                                            }
                                            title="Eliminar parámetro"
                                        >
                                            <Icons.Delete size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}