import { useState, useEffect } from 'react';
import { Estadisticas } from '../../api/Estadisticas';

export const usePuestosTrabajoEstadisticas = () => {
    const [totalPuestos, setTotalPuestos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPuestosStats = async () => {
            try {
                setLoading(true);
                const response = await Estadisticas.getPuestosStats();
                
                setTotalPuestos(response.data.total_puestos);
                setMessage(response.message);
                setError(null);
            } catch (err) {
                console.error('Error fetching puestos stats:', err);
                
                if (err.response?.status === 403) {
                    setError('No tienes permisos para ver estas estadísticas.');
                } else if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Error al cargar estadísticas de puestos.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPuestosStats();
    }, []);

    return { totalPuestos, loading, error, message };
};