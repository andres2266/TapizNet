
import { Link, useNavigate } from 'react-router-dom';
import { useEmpleadoForm } from '../../hooks/empleados/useEmpleadoForm';
import EmpleadoForm from '../../components/admin/EmpleadoForm';



export default function EmpleadoFormPage() {
const navigate = useNavigate();

    const {register,handleSubmit,errors,isSubmitting,crearTrabajador,successMessage,generalError} = useEmpleadoForm();

    const onSubmit = async (data) => {
        await crearTrabajador(data);
    };

    return (
        <section className="page">
            <div className="page-header">
                <h1>Crear trabajador</h1>
                <p>Registra un nuevo empleado para el taller.</p>
            </div>

            <EmpleadoForm
                mode="create"
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
                successMessage={successMessage}
                generalError={generalError}
                onCancel={() => navigate("/homeAdmin")}
            />
        </section>
  )
}

