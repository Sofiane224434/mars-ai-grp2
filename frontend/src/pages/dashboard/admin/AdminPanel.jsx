import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useApi from '../../../hooks/useApi';
import StatCard from './StatCard';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading, error, execute } = useApi();
  const statsData = stats?.data ?? {};
  const totalMovies = statsData.totalMovies || 0;
  const totalAssigned = statsData.juryProgress?.totalAssigned || 0;
  const totalEvaluated = statsData.juryProgress?.totalEvaluated || 0;
  const totalUnassigned = Math.max(totalMovies - totalAssigned, 0);
  const juryProgressRate = totalAssigned > 0
    ? Math.round((totalEvaluated / totalAssigned) * 100)
    : 0;

  const fetchStats = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      await execute(() =>
        axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
    } catch {
      toast.error("Erreur lors du chargement des statistiques");
    }
  }, [execute, navigate]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="min-h-screen background-gradient-black pt-12 lg:pt-8 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold font-title text-white mb-2">
            Tableau de bord administrateur
          </h1>
          <p className="text-gris-magneti">
            Pilotage administratif : chiffres clés et aperçu global des opérations.
          </p>
        </div>

        {isLoading ? (
          <div className="text-white animate-pulse text-center p-10">
            Chargement des données en cours... ⏳
          </div>
        ) : error ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-brulure-despespoir/60 bg-brulure-despespoir/10 p-6 text-center">
            <p className="text-sm text-white/90">Impossible de charger les statistiques.</p>
            <p className="mt-2 text-xs text-gris-magneti">{error}</p>
            <button
              type="button"
              onClick={fetchStats}
              className="mt-4 rounded-lg bg-bleu-canard px-4 py-2 text-sm font-semibold text-white transition hover:bg-bleu-ciel"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Films" value={totalMovies} color="border-blue-500" to="/dashboard/admin/movies" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Statuts des films</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Validés" value={statsData.moviesByStatus?.approved || 0} color="border-green-500" to="/dashboard/admin/movies?status=approved" />
                <StatCard title="À revoir" value={statsData.moviesByStatus?.review || 0} color="border-yellow-500" to="/dashboard/admin/movies?status=review" />
                <StatCard title="Refusés" value={statsData.moviesByStatus?.rejected || 0} color="border-red-500" to="/dashboard/admin/movies?status=rejected" />
                <StatCard title="En attente" value={statsData.moviesByStatus?.pending || 0} color="border-gray-500" to="/dashboard/admin/movies?status=pending" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Assignation jury</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Assignés" value={totalAssigned} color="border-cyan-500" to="/dashboard/admin/movies?assignation=assigned" />
                <StatCard title="Non assignés" value={totalUnassigned} color="border-amber-500" to="/dashboard/admin/movies?assignation=unassigned" />
                <StatCard title="Films évalués" value={totalEvaluated} color="border-cyan-500" />
                <StatCard title="Taux d'évaluation" value={`${juryProgressRate}%`} color="border-emerald-500" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/dashboard/admin/movies" className="bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition font-medium">
                  Assignation 🎬
                </Link>

                <Link to="/dashboard/admin/email-confirmation" className="bg-white text-indigo-600 border border-indigo-200 p-4 rounded-lg text-center hover:bg-indigo-50 transition font-medium flex items-center justify-center gap-2">
                  Confirmation email 📩
                  {statsData.emailsPending > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {statsData.emailsPending}
                    </span>
                  )}
                </Link>

                <Link to="/dashboard/admin/invite-jury" className="bg-white text-gray-700 border border-gray-200 p-4 rounded-lg text-center hover:bg-gray-50 transition font-medium">
                  Inviter un jury 👤
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;