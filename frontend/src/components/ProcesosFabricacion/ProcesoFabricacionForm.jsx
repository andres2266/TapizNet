// src/components/procesos/ProcesoFabricacionForm.jsx
import Icons from "../../utils/icons.jsx";
import FaseProcesoForm from './FaseProcesoForm.jsx';

export default function ProcesoFabricacionForm({
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    fases,
    agregarFase,
    eliminarFase,
    onSubmit,
    onCancel,
    puestosTrabajo,
    successMessage,
    generalError,
    mode = "create",
}) {
    const isEdit = mode === "edit";

    return (
        <form className="proceso-form" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>{generalError}</span>
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    <Icons.Check size={18} />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="fases-container">
                {fases.map((fase, index) => (
                    <FaseProcesoForm
                        key={fase.fieldId || fase.id}
                        fase={fase}
                        faseIndex={index}
                        register={register}
                        control={control}
                        errors={errors}
                        puestosTrabajo={puestosTrabajo}
                        onRemoveFase={eliminarFase}
                        mode={mode}
                    />
                ))}
            </div>

            {fases.length === 0 && (
                <div className="empty-fases">
                    <Icons.Info size={48} />
                    <h3>No hay fases agregadas</h3>
                    <p>Comienza agregando la primera fase del proceso de fabricación</p>
                </div>
            )}

            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary-large"
                    onClick={agregarFase}
                >
                    <Icons.Plus size={16} />
                    Agregar fase
                </button>
            </div>

            <div className="form-submit-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    <Icons.Close size={14} />
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Icons.Refresh size={14} />
                            {isEdit ? "Guardando..." : "Generando..."}
                        </>
                    ) : (
                        <>
                            <Icons.Save size={14} />
                            {isEdit ? "Guardar cambios" : "Generar proceso del modelo"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}