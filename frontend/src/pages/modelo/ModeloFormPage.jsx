import { useNavigate } from "react-router-dom";
import { useModeloForm } from "../../hooks/modelos/useModelosForm";
import ModeloForm from "../../components/modelos/ModeloForm";


/**
 * Description placeholder
 *
 * @export
 * @returns {*} 
 */
export default function ModelosFormPage() {
    const navigate = useNavigate();

    const {register,handleSubmit,errors,isSubmitting,crearModelo,successMessage,generalError,} = useModeloForm();

    const onSubmit = async (data) => {
        await crearModelo(data);
    };

    const onCancel = () => {
        navigate("/homeAdmin");
    };

    return (
        <section className="page">
            <div className="page-header">
                <h1>Crear modelo</h1>
                <p>
                    Registra los modelos de productos que fabrica el taller,
                    como sofás, sillas, cabeceros o muebles tapizados.
                </p>
            </div>

            <ModeloForm
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
    );
}