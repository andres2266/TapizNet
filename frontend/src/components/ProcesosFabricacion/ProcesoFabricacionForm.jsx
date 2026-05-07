
import FaseProcesoForm from "./FaseProcesoForm";


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
}) {
  
    return (
        <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
                <p className="form-alert form-alert-error">
                    {generalError}
                </p>
            )}

            {successMessage && (
                <p className="form-alert form-alert-success">
                    {successMessage}
                </p>
            )}

            {fases.map((fase, index) => (
                <FaseProcesoForm
                    key={fase.id}
                    fase={fase}
                    faseIndex={index}
                    register={register}
                    control={control}
                    errors={errors}
                    puestosTrabajo={puestosTrabajo}
                    onRemoveFase={eliminarFase}
                />
            ))}

            <div className="page-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={agregarFase}
                >
                    + Agregar fase
                </button>
            </div>

            <div className="page-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Generando..." : "Generar proceso del modelo"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}