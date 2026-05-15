import { useNavigate, useParams } from "react-router-dom";

import { useProcesoFabricacionForm } from "../../hooks/procesosFabricacion/useProcesoFabricacionForm";
import ProcesoFabricacionForm from "../../components/ProcesosFabricacion/ProcesoFabricacionForm";

export default function CrearProcesoFabricacionPage() {
    const { modeloId } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        errors,
        isSubmitting,
        fases,
        agregarFase,
        eliminarFase,
        crearProcesoFabricacion,
        puestosTrabajo,
        loadingPuestos,
        successMessage,
        generalError,
    } = useProcesoFabricacionForm(modeloId);

    const onSubmit = async (data) => {
        await crearProcesoFabricacion(data);
    };

    const onCancel = () => {
        navigate("/modelos/view");
    };

    return (
        <section className="page">
            <div className="page-header">
                <h1>Crear proceso de fabricación</h1>
                <p>Define las fases necesarias para fabricar este modelo.</p>
            </div>

            {loadingPuestos ? (
                <div className="form-alert">
                    Cargando puestos de trabajo...
                </div>
            ) : (
                <div className="card">
                    <ProcesoFabricacionForm
                        register={register}
                        handleSubmit={handleSubmit}
                        control={control}
                        errors={errors}
                        isSubmitting={isSubmitting}
                        fases={fases}
                        agregarFase={agregarFase}
                        eliminarFase={eliminarFase}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        puestosTrabajo={puestosTrabajo}
                        successMessage={successMessage}
                        generalError={generalError}
                        mode="create"
                    />
                </div>
            )}
        </section>
    );
}