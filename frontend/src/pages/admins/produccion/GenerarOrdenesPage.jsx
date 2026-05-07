import { useNavigate } from "react-router-dom";
import { useModelosConProceso } from "../../../hooks/modelos/useModelosConProceso";
import { ModelosConProcesoTable } from "../../../components/modelos/ModelosConProcesoTable";

export function GenerarOrdenesPage() {
    const navigate = useNavigate();

    const {
        modelos,
        loading,
        error,
    } = useModelosConProceso();

    const handleGenerarOrden = (modelo) => {
        navigate(`/produccion/modelos/${modelo.id}/generar-orden`);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Generar órdenes de producción</h1>
                    <p>
                        Selecciona un modelo con proceso de fabricación para
                        crear una orden y generar sus tareas automáticamente.
                    </p>
                </div>
            </div>

            {loading && (
                <div className="card">
                    <p>Cargando modelos con proceso de fabricación...</p>
                </div>
            )}

            {error && (
                <div className="form-alert form-alert-error">
                    {error}
                </div>
            )}

            {!loading && !error && modelos.length === 0 && (
                <div className="card">
                    <p>No hay modelos con proceso de fabricación configurado.</p>
                </div>
            )}

            {!loading && !error && modelos.length > 0 && (
                <ModelosConProcesoTable
                    modelos={modelos}
                    onGenerarOrden={handleGenerarOrden}
                />
            )}
        </div>
    );
}