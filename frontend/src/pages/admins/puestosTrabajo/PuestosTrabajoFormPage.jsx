
import { usePuestoTrabajoForm } from '../../../hooks/puestoTrabajo/usePuestoTrabajoForm';

import PuestoTrabajoForm from '../../../components/puestosDeTrabajo/PuestoDeTrabajoForm';
import { useNavigate } from 'react-router-dom';

export default function PuestosTrabajoFormPage() {
  const navigate = useNavigate();

    const {register,handleSubmit,errors,isSubmitting,generalError,successMessage,crearPuestoTrabajo,} = usePuestoTrabajoForm();

    const onSubmit = async (data) => {
        await crearPuestoTrabajo(data);
    };

    const onCancel = () => {
        navigate("/homeAdmin");
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
                onCancel={onCancel}
                errors={errors}
                isSubmitting={isSubmitting}
                generalError={generalError}
                successMessage={successMessage}
                isEdit={false}
            />
        </section>
  )
}
