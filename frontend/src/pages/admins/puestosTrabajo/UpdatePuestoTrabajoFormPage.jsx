import { useParams } from "react-router-dom";
import PuestoTrabajoForm from "../../../components/puestosDeTrabajo/PuestoDeTrabajoForm";
import { usePuestoTrabajoUpdateForm } from "../../../hooks/puestoTrabajo/usePuestoTrabajoUpdateForm";

export default function UpdatePuestoTrabajoFormPage() {
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
        successMessage,
        actualizarPuestoTrabajo,
    } = usePuestoTrabajoUpdateForm();

    const onSubmit = async (data) => {
        await actualizarPuestoTrabajo(id, data);
    };

    return (
        <section className="page">
            <div className="page-header">
                <h1>Modificar puesto de trabajo</h1>
                <p>Actualiza solo los campos que quieras cambiar.</p>
            </div>

            <PuestoTrabajoForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                generalError={generalError}
                successMessage={successMessage}
                mode="edit"
                backPath="/PuestosTrabajoHome"
            />
        </section>
    );
}