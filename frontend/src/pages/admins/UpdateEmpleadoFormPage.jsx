import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEmpleadoUpdateForm } from '../../hooks/empleados/useEmpleadosUpdateForm';
import EmpleadoForm from '../../components/admin/EmpleadoForm';

export default function UpdateEmpleadoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
     const {register,handleSubmit,errors,isSubmitting,actualizarEmpleado,successMessage,generalError,} = useEmpleadoUpdateForm();

    const onSubmit = async (data) => {
        await actualizarEmpleado(id, data);
        navigate("/homeAdmin");
    };
    return (
        <section className="page">
            <div className="page-header">
                <h1>Editar empleado</h1>
                <p>Rellena solo los campos que quieras cambiar.</p>
            </div>

            <EmpleadoForm
                mode="edit"
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
    );
}
