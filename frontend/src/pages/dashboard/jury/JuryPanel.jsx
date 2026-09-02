import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useApi from '../../../hooks/useApi';
import StatCard from '../admin/StatCard';
import Button from '../../../components/UI/Button.jsx';
import panel_icon_not_watched from '../../../assets/icons/panel_icon_not_watched.png';

const JuryPanel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movies, isLoading, execute } = useApi();
    const [user, setUser] = useState(null);
    const stats = useMemo(() => {
        const list = Array.isArray(movies) ? movies : movies?.data || [];
        const total = list.length;
        const pending = list.filter((movie) => {
            if (Number(movie?.statusId) === 1) return true;

            const rawStatus = String(movie?.status || movie?.statusLabel || '').toLowerCase().trim();
            return ['pending', 'en attente', 'wait', 'attente'].includes(rawStatus);
        }).length;

        const completed = list.filter((movie) => {
            if ([2, 3, 4].includes(Number(movie?.statusId))) return true;

            const rawStatus = String(movie?.status || movie?.statusLabel || '').toLowerCase().trim();
            return ['approved', 'review', 'rejected', 'valide', 'a revoir', 'à revoir', 'refuse', 'refusé'].includes(rawStatus);
        }).length;

        return { total, pending, completed };
    }, [movies]);

    const lastUpdatedAt = useMemo(
        () => (movies ? new Date().toISOString() : null),
        [movies]
    );

    const completionRate = stats.total > 0
        ? Math.round((stats.completed / stats.total) * 100)
        : 0;

    const displayName = useMemo(() => {
        const email = user?.email || '';
        const namePart = email.split('@')[0] || '';

        if (!namePart) return 'Cher membre du jury';

        return namePart
            .replace(/[._\-+]+/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
            .trim();
    }, [user?.email]);

    useEffect(() => {
        const fetchJuryData = async () => {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/auth'); return; }

            try {
                const userRes = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Vérification du rôle 🛡️
                if (userRes.data.user?.status !== 'jury') {
                    toast.error("Accès refusé");
                    navigate('/auth');
                    return;
                }
                setUser(userRes.data.user);

                await execute(() => 
                    axios.get('/api/jury/movies', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );
            } catch {
                toast.error("Erreur de session");
            }
        };
        fetchJuryData();
    }, [execute, navigate]);

    return (
        <div className="min-h-screen background-gradient-black p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">
                        Bienvenue, {displayName} ! 👋
                    </h1>
                    <p className="text-gris-magneti">Visualisez votre progression avant de commencer.</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-10 animate-pulse">Chargement...</div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Films assignés"
                                value={stats.total}
                                color="border-bleu-ciel"
                                variant="pro"
                                updatedAt={lastUpdatedAt}
                                animate
                            />
                            <StatCard
                                title="Restants"
                                value={stats.pending}
                                color="border-orange-genial"
                                variant="pro"
                                updatedAt={lastUpdatedAt}
                                animate
                            />
                            <StatCard
                                title="Évalués"
                                value={completionRate}
                                suffix="%"
                                color="border-vert-insecateur"
                                variant="pro"
                                updatedAt={lastUpdatedAt}
                                progress={completionRate}
                                progressLabel={`${stats.completed}/${stats.total}`}
                            />
                        </div>

                        <div className="flex justify-center">
                            <Link to={`/dashboard/jury/${id}/movies`} className="flex justify-center w-full">
                                <Button
                                    variant="btn-panel"
                                    iconImg={panel_icon_not_watched}
                                    className="w-full max-w-55"
                                >
                                    Commencer mes évaluations
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JuryPanel;