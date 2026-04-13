import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useApi from '../../../hooks/useApi';
import StatCard from './StatCard';
import Spinner from '../../../components/ui/Spinner';
import Button from '../../../components/ui/Button';
import panel_icon_assign1 from '../../../assets/icons/panel_icon_assign1.png';
import panel_icon_mail from '../../../assets/icons/panel_icon_mail.png';
import panel_icon_add from '../../../assets/icons/panel_icon_add.png';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading, error, execute } = useApi();
  const statsData = stats?.data ?? {};
  const lastUpdatedAt = statsData.updatedAt || null;
  const totalMovies = statsData.totalMovies || 0;
  const totalAssigned = statsData.juryProgress?.totalAssigned || 0;
  const totalEvaluated = statsData.juryProgress?.totalEvaluated || 0;
  const totalUnassigned = Math.max(totalMovies - totalAssigned, 0);
  const assignmentRate = totalMovies > 0
    ? Math.round((totalAssigned / totalMovies) * 100)
    : 0;
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
          <Spinner text="Chargement des données en cours... ⏳" />
        ) : error ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-brulure-despespoir/60 bg-brulure-despespoir/10 p-6 text-center">
            <p className="text-sm text-white/90">Impossible de charger les statistiques.</p>
            <p className="mt-2 text-xs text-gris-magneti">{error}</p>
            <div className="mt-4 flex justify-center">
              <Button
                interactive
                variant="email-admin"
                type="button"
                onClick={fetchStats}
              >
                Réessayer
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total films" value={totalMovies} color="border-bleu-ciel" to="/dashboard/admin/movies" variant="pro" updatedAt={lastUpdatedAt} animate />
              <StatCard title="Non assignés" value={totalUnassigned} color="border-fauve" to="/dashboard/admin/movies?assignation=unassigned" variant="pro" updatedAt={lastUpdatedAt} animate />
              <StatCard title="Email en attente" value={statsData.emailsPending} color="border-brulure-despespoir" to="/dashboard/admin/email-confirmation" variant="pro" updatedAt={lastUpdatedAt} animate />
              <StatCard title="Taux d'assignation" value={assignmentRate} suffix="%" progress={assignmentRate} color="border-jaune-souffre" to="/dashboard/admin/movies?assignation=assigned" variant="pro" updatedAt={lastUpdatedAt} animate />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Statuts des films</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Validés" value={statsData.moviesByStatus?.approved || 0} color="border-vert-picollo" to="/dashboard/admin/movies?status=approved" />
                <StatCard title="À revoir" value={statsData.moviesByStatus?.review || 0} color="border-orange-genial" to="/dashboard/admin/movies?status=review" />
                <StatCard title="Refusés" value={statsData.moviesByStatus?.rejected || 0} color="border-brulure-despespoir" to="/dashboard/admin/movies?status=rejected" />
                <StatCard title="En attente" value={statsData.moviesByStatus?.pending || 0} color="border-bleu-ciel" to="/dashboard/admin/movies?status=pending" variant="pro" updatedAt={lastUpdatedAt} animate centerNumber />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Assignation jury</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Assignés" value={totalAssigned} color="border-bleu-ciel" to="/dashboard/admin/movies?assignation=assigned" centerNumber />
                <StatCard title="Non assignés" value={totalUnassigned} color="border-fauve" to="/dashboard/admin/movies?assignation=unassigned" centerNumber />
                <StatCard title="Films évalués" value={totalEvaluated} color="border-bleu-canard" centerNumber />
                <StatCard title="Taux d'évaluation" value={juryProgressRate} suffix="%" progress={juryProgressRate} color="border-vert-insecateur" variant="pro" updatedAt={lastUpdatedAt} animate />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-6">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/dashboard/admin/movies" className="flex justify-center">
                  <Button
                    variant="btn-panel"
                    iconImg={panel_icon_assign1}
                    className="w-full max-w-55"
                  >
                    Assignation
                  </Button>
                </Link>

                <Link to="/dashboard/admin/email-confirmation" className="flex justify-center">
                  <Button
                    variant="btn-panel"
                    iconImg={panel_icon_mail}
                    className="w-full max-w-55"
                  >
                    Confirmation des emails ({statsData.emailsPending || 0})
                  </Button>
                </Link>

                <Link to="/dashboard/admin/invite-jury" className="flex justify-center">
                  <Button
                    variant="btn-panel"
                    iconImg={panel_icon_add}
                    className="w-full max-w-55"
                  >
                    Inviter un jury
                  </Button>
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