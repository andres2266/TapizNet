import { useJornadaLaboral } from "../../hooks/JornadasLaborales/useJornadaLaboral";


export function JornadaLaboralButton() {
    const {
        jornadaActual,
        loading,
        actionLoading,
        error,
        successMessage,
        iniciarJornada,
        finalizarJornada,
    } = useJornadaLaboral();

    if (loading) {
        return <p>Cargando jornada...</p>;
    }

    return (
        <div>
            {error && (
                <p className="form-alert form-alert-error">
                    {error}
                </p>
            )}

            {successMessage && (
                <p className="form-alert form-alert-success">
                    {successMessage}
                </p>
            )}

            {jornadaActual ? (
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={finalizarJornada}
                    disabled={actionLoading}
                >
                    {actionLoading ? "Finalizando..." : "Finalizar jornada"}
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={iniciarJornada}
                    disabled={actionLoading}
                >
                    {actionLoading ? "Iniciando..." : "Iniciar jornada"}
                </button>
            )}
        </div>
    );
}