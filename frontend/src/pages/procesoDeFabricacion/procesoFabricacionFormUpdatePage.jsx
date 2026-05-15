import { useNavigate, useParams } from "react-router-dom";
import { useEditarProcesoFabricacionForm } from "../../hooks/procesosFabricacion/useProcesoFabricacionUpdateForm";
import ProcesoFabricacionForm from "../../components/ProcesosFabricacion/ProcesoFabricacionForm";

export default function procesoFabricacionFormUpdatePage() {
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
        actualizarProcesoFabricacion,
        puestosTrabajo,
        loading,
        successMessage,
        generalError,
    } = useEditarProcesoFabricacionForm(modeloId);

    const onSubmit = async (data) => {
        await actualizarProcesoFabricacion(data);
    };

    const onCancel = () => {
        navigate("/modelos/view");
    };

    if (loading) {
        return (
            <section className="page">
                <div className="page-header">
                    <h1>Editar proceso de fabricación</h1>
                    <p>Cargando configuración del proceso...</p>
                </div>

                <div className="form-alert">
                    Cargando proceso de fabricación...
                </div>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <h1>Editar proceso de fabricación</h1>
                <p>
                    Modifica las fases, tiempos, precios y parámetros del
                    proceso asociado a este modelo.
                </p>
            </div>

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
                    mode="edit"
                />
            </div>
        </section>
    );
}