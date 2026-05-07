import { useNavigate, useParams } from "react-router-dom";
import { useOrdenesProduccionForm } from "../../../hooks/ordenesProduccion/useOrdenesProduccionForm";
import { OrdenProduccionForm } from "../../../components/ordenesProduccion/OrdenProduccionForm";

export function CrearOrdenProduccionPage() {
    const { modeloId } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        successMessage,
        generalError,
        ordenCreada,
        crearOrdenProduccion,
    } = useOrdenesProduccionForm(modeloId);

    const volver = () => {
        navigate("/produccion/generar-ordenes");
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Crear orden de producción</h1>
                    <p>
                        Define la cantidad, prioridad y fecha estimada para
                        generar automáticamente las unidades y tareas.
                    </p>
                </div>
            </div>

            <div className="card">
                <OrdenProduccionForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    onSubmit={crearOrdenProduccion}
                    onCancel={volver}
                    successMessage={successMessage}
                    generalError={generalError}
                    ordenCreada={ordenCreada}
                />
            </div>
        </div>
    );
}