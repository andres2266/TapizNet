import { usePuestoTrabajoForm } from "../../../hooks/puestoTrabajo/usePuestoTrabajoForm.js";
import PuestoTrabajoForm from "../../../components/puestosDeTrabajo/PuestoDeTrabajoForm.jsx";

export default function PuestosTrabajoFormPage() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
        successMessage,
        crearPuestoTrabajo,
    } = usePuestoTrabajoForm();

    const onSubmit = async (data) => {
        await crearPuestoTrabajo(data);
    };

    return (
        <section className="page">
            <div className="page-header">
                <h1>Crear puesto de trabajo</h1>
                <p>Registra un puesto operativo del taller.</p>
            </div>

            <PuestoTrabajoForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                generalError={generalError}
                successMessage={successMessage}
                mode="create"
                backPath="/PuestosTrabajoHome"
            />
        </section>
    );
}