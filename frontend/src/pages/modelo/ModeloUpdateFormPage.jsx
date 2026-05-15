import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ModeloForm from "../../components/modelos/ModeloForm";
import { useModeloUpdateForm } from "../../hooks/modelos/useModeloUpdate";



export default function ModeloUpdatePage() {
    const { modeloId } = useParams();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        modelo,
        loading,
        generalError,
        successMessage,
        onSubmit,
    } = useModeloUpdateForm(modeloId);

    if (loading) {
        return (
            <section className="page">
                <p>Cargando modelo...</p>
            </section>
        );
    }

    if (!modelo) {
        return (
            <section className="page">
                <p>No se encontró el modelo.</p>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <h1>Modificar modelo</h1>

                <p>
                    Actualiza la información del modelo de fabricación.
                </p>
            </div>

            <div className="card">
                <ModeloForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                    generalError={generalError}
                    successMessage={successMessage}
                    mode="edit"
                    onCancel={() => navigate("/modelos")}
                />
            </div>
        </section>
    );
}