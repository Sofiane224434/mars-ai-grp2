import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { useJuryMovieNavigation } from '../../../hooks/useJuryMovieNavigation.js';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../components/ui/ConfirmModal.jsx';

import VideoWrapper from '../../../components/sections/DashboardJury/VideoWrapper.jsx';
import InfoPanel from '../../../components/sections/DashboardJury/InfoPanel.jsx';
import NotesSection from '../../../components/sections/DashboardJury/NotesSection.jsx';
import Button from '../../../components/ui/Button.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import { Status } from '../../../components/ui/StatusBadge.jsx';
import { resolveMediaUrl } from '../../../utils/media.js';

// 🚀 NOUVEL IMPORT : Ton Custom Hook
import useApi from '../../../hooks/useApi.js';
import useFestivalPhase from '../../../hooks/useFestivalPhase.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const voteSchema = z.object({
  statusId: z.number().int().positive("L'ID du statut est invalide.")
});

function MovieDetail() {
  const { movieId } = useParams();
  const { currentPhase } = useFestivalPhase();
  const isJudgmentPhase = currentPhase === 1;
  const isTop5Phase = currentPhase === 2;
  const { canPrev, canNext, goPrev, goNext } = useJuryMovieNavigation(movieId);

  // 🚀 1. INJECTION DU HOOK : Remplace 3 useState d'un seul coup !
  // On renomme astucieusement data en 'movie', et setData en 'setMovie' pour ne rien casser ailleurs.
  const {
    data: movie,
    isLoading,
    error,
    execute: fetchMovie,
    setData: setMovie
  } = useApi();

  // États locaux (On les garde car ils sont spécifiques à cette page, pas à l'API GET)
  const [isVoting, setIsVoting] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, statusId: null });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showMoreDirectorInfo, setShowMoreDirectorInfo] = useState(false);

  const statusLabels = { 2: "Refuser", 3: "À revoir", 4: "Valider", 5: "Top 50", 6: "Top 5" };

  const handleTop5Rank = async (rank) => {
    if ((movie?.top5Rank ?? null) === rank) {
      return;
    }

    try {
      setIsVoting(true);
      const token = localStorage.getItem('token');

      await axios.put(`${API_BASE_URL}/jury/movies/${movieId}/top5-rank`, { rank }, {
        headers: token ? {
          Authorization: `Bearer ${token}`,
          'x-festival-phase-index': String(currentPhase),
        } : undefined,
        withCredentials: true
      });

      setMovie((prev) => ({ ...prev, top5Rank: rank }));
      toast.success(rank ? `Position podium ${rank} enregistrée.` : 'Position podium retirée.', {
        duration: 3000,
        position: 'bottom-right',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });
    } catch (err) {
      console.error('Erreur API lors du classement Top 5 :', err);
      toast.error(err.response?.data?.message || 'Impossible de mettre à jour la position podium.', {
        duration: 4000,
        position: 'bottom-right'
      });
    } finally {
      setIsVoting(false);
    }
  };

  // 🚀 2. LE USEEFFECT NETTOYÉ : Il ne contient plus que la logique d'appel, zéro gestion d'état !
  useEffect(() => {
    queueMicrotask(() => {
      setIsVideoLoaded(false);
      setVideoError(false);
    });

    if (movieId) {
      const token = localStorage.getItem('token');
      // On passe la fonction réseau à notre hook, il s'occupe du reste (try/catch, loading, etc.)
      fetchMovie(() =>
        axios.get(`${API_BASE_URL}/jury/movies/${movieId}`, {
          headers: token ? {
            Authorization: `Bearer ${token}`,
            'x-festival-phase-index': String(currentPhase),
          } : undefined,
          withCredentials: true
        })
      );
    }
  }, [movieId, fetchMovie, currentPhase]);


  const initiateVote = (newStatusId) => {
    setConfirmDialog({ isOpen: true, statusId: newStatusId });
  };

  const confirmVote = async () => {
    const newStatusId = confirmDialog.statusId;
    setConfirmDialog({ isOpen: false, statusId: null });

    try {
      setIsVoting(true);
      const validPayload = voteSchema.parse({ statusId: newStatusId });
      const token = localStorage.getItem('token');

      await axios.put(`${API_BASE_URL}/jury/movies/${movieId}/status`, validPayload, {
        headers: token ? {
          Authorization: `Bearer ${token}`,
          'x-festival-phase-index': String(currentPhase),
        } : undefined,
        withCredentials: true
      });

      // 🚀 Grâce à l'export de setData depuis useApi, cette UI optimiste continue de fonctionner parfaitement !
      setMovie((prev) => ({ ...prev, statusId: newStatusId }));

      toast.success("Le statut du film a été modifié avec succès !", {
        duration: 3000,
        position: 'bottom-right',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("Erreur Zod :", err.errors);
      } else {
        console.error("Erreur API lors du vote :", err);
        if (err.response?.status === 401) {
          toast.error("Votre session a expiré. Veuillez vous reconnecter.", { duration: 4000, position: 'bottom-right' });
        } else if (err.response?.status === 409) {
          toast.error(err.response?.data?.message || "Limite atteinte.", { duration: 4000, position: 'bottom-right' });
        } else {
          toast.error("Une erreur est survenue lors de l'enregistrement.", { duration: 4000, position: 'bottom-right' });
        }
      }
    } finally {
      setIsVoting(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube-nocookie.com/embed/${match[2]}` : null;
  };

  const getStatusBadgeFromDb = (statusId, statusLabel) => {
    const statusIdMap = {
      1: { variant: 'pending', label: 'En attente' },
      2: { variant: 'rejected', label: 'Refuse' },
      3: { variant: 'review', label: 'A revoir' },
      4: { variant: 'approved', label: 'Valide' },
      5: { variant: 'top50', label: 'Top 50' },
      6: { variant: 'top5', label: 'Top 5' },
    };

    if (isJudgmentPhase && statusId === 4) {
      return { variant: 'pending', label: 'En attente' };
    }

    if (isTop5Phase && statusId === 5) {
      return { variant: 'pending', label: 'En attente' };
    }

    if (statusIdMap[statusId]) return statusIdMap[statusId];

    const normalized = String(statusLabel || '').toLowerCase().trim();
    if (['pending', 'wait', 'en attente', 'attente'].includes(normalized)) return { variant: 'pending', label: 'En attente' };
    if (['rejected', 'refuse', 'refusé'].includes(normalized)) return { variant: 'rejected', label: 'Refuse' };
    if (['review', 'a revoir', 'à revoir'].includes(normalized)) return { variant: 'review', label: 'A revoir' };
    if (['approved', 'valid', 'valide', 'approuve', 'approuvé'].includes(normalized)) {
      return isJudgmentPhase
        ? { variant: 'pending', label: 'En attente' }
        : { variant: 'approved', label: 'Valide' };
    }
    if (['top50', 'top 50'].includes(normalized)) return { variant: 'top50', label: 'Top 50' };

    return { variant: 'pending', label: statusLabel || 'En attente' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen background-gradient-black flex items-center justify-center">
        <Spinner text="Chargement de l'œuvre..." fullScreen={true} />
      </div>
    );
  }

  // 🚀 Affichage élégant de l'erreur gérée par useApi
  if (error || !movie) {
    return (
      <div className="min-h-screen background-gradient-black flex items-center justify-center p-4">
        <div className="text-brulure-despespoir font-title text-xl text-center bg-reglisse p-6 rounded-xl border border-brulure-despespoir/30">
          {error || "Ce film est introuvable."}
        </div>
      </div>
    );
  }

  const currentStatus = getStatusBadgeFromDb(movie.statusId, movie.status);
  const isVoteLocked = isTop5Phase
    ? ![5, 6].includes(movie.statusId)
    : isJudgmentPhase
      ? ![4, 5].includes(movie.statusId)
      : movie.statusId !== 1;
  const canPromoteTop50 = isJudgmentPhase ? movie.statusId === 4 : movie.statusId === 4;
  const canRemoveTop50 = isJudgmentPhase && movie.statusId === 5;
  const canPromoteTop5 = isTop5Phase && movie.statusId === 5;
  const canRemoveTop5 = isTop5Phase && movie.statusId === 6;
  const usedAis = movie.usedAis || [];
  const screenshotCandidates = [movie.thumbnail].concat(movie.screenshotLink);
  const screenshotUrls = [...new Set(screenshotCandidates.map((value) => resolveMediaUrl(value)))];

  const getAiCategoryStyle = (category) => {
    const normalizedCategory = String(category || '').toLowerCase().trim();

    if (['hybride', 'hybrid'].includes(normalizedCategory)) {
      return { label: 'Hybride', classes: 'bg-amber-900/40 text-amber-300 border-amber-500/50' };
    }

    if (['100% ia', '100%ia', '100 % ia', '100% d\'ia', '100% d ia'].includes(normalizedCategory)) {
      return { label: '100% IA', classes: 'bg-cyan-900/40 text-cyan-300 border-cyan-500/50' };
    }

    switch (category) {
      default:
        return { label: category || 'IA', classes: 'bg-gray-800 text-gray-300 border-gray-600' };
    }
  };

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">

      <Toaster />

      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold font-title">{movie.title}</h1>
          <p className="text-gris-magneti text-sm mt-1">Par : {movie.directorName}</p>
        </div>

        <VideoWrapper
          embedUrl={getYouTubeEmbedUrl(movie.videoUrl)}
          isLoaded={isVideoLoaded}
          hasError={videoError}
          onLoad={() => setIsVideoLoaded(true)}
          onError={() => setVideoError(true)}
          canPrev={canPrev}
          canNext={canNext}
          onPrev={goPrev}
          onNext={goNext}
        />

        <div className="text-white my-8 text-center border-b border-gris-magneti/30 pb-8 w-full">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-gris-magneti">Statut de la vidéo :</span>
            <Status variant={currentStatus.variant}>{currentStatus.label}</Status>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
            {!isJudgmentPhase && !isTop5Phase && (
              <>
                <Button interactive variant="approved-jury" onClick={() => initiateVote(4)} disabled={isVoting || isVoteLocked}>
                  Valider
                </Button>
                <Button interactive variant="pending-jury" onClick={() => initiateVote(3)} disabled={isVoting || isVoteLocked}>
                  A revoir
                </Button>
              </>
            )}
            {!isJudgmentPhase && !isTop5Phase && (
              <Button interactive variant="rejected-jury" onClick={() => initiateVote(2)} disabled={isVoting || isVoteLocked}>
                Refuser
              </Button>
            )}
            {isJudgmentPhase ? (
              <Button
                interactive
                variant={canRemoveTop50 ? 'rejected-jury' : 'approved-jury'}
                onClick={() => initiateVote(canRemoveTop50 ? 4 : 5)}
                disabled={isVoting || (!canPromoteTop50 && !canRemoveTop50)}
              >
                {canRemoveTop50 ? 'Retirer Top 50' : 'Top 50'}
              </Button>
            ) : null}
            {isTop5Phase ? (
              <Button
                interactive
                variant={canRemoveTop5 ? 'rejected-jury' : 'approved-jury'}
                onClick={() => initiateVote(canRemoveTop5 ? 5 : 6)}
                disabled={isVoting || (!canPromoteTop5 && !canRemoveTop5)}
              >
                {canRemoveTop5 ? 'Retirer Top 5' : 'Top 5'}
              </Button>
            ) : null}
          </div>

          {!isJudgmentPhase && !isTop5Phase && isVoteLocked && (
            <p className="text-gris-magneti text-xs mt-4 italic">
              Vous avez déjà statué sur ce film. Le vote est verrouillé.
            </p>
          )}

          {isJudgmentPhase && (
            <p className="text-gris-magneti text-xs mt-4 italic">
              Phase de jugement : utilisez le bouton Top 50 pour ajouter ou retirer un film du Top 50. Le statut "Validé" est affiché comme "En attente".
            </p>
          )}

          {isTop5Phase && (
            <p className="text-gris-magneti text-xs mt-4 italic">
              Phase Top 5 : utilisez le bouton Top 5 pour ajouter ou retirer un film du Top 5 (max 5 films). Le statut "Top 50" est affiché comme "En attente".
            </p>
          )}

          {isTop5Phase && movie.statusId === 6 && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-sm text-gris-magneti">Classement podium (Top 3)</p>
              <div className="w-full max-w-xs">
                <label htmlFor="top5-rank-select" className="mb-2 block text-xs text-gris-magneti">
                  Choisir le rang
                </label>
                <select
                  id="top5-rank-select"
                  className="w-full rounded-xl border border-white/20 bg-[#1e2124] px-4 py-3 text-white outline-none transition-all focus:border-jaune-souffre"
                  value={movie.top5Rank ?? ''}
                  disabled={isVoting}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const nextRank = selectedValue === '' ? null : Number(selectedValue);
                    handleTop5Rank(nextRank);
                  }}
                >
                  <option value="">Aucune position</option>
                  <option value="1">1er</option>
                  <option value="2">2e</option>
                  <option value="3">3e</option>
                </select>
              </div>
              <p className="text-xs text-gris-magneti italic">
                Position actuelle : {movie.top5Rank ? `${movie.top5Rank}${movie.top5Rank === 1 ? 'er' : 'e'}` : 'aucune'}.
              </p>
            </div>
          )}
        </div>

        <InfoPanel title="Informations sur la vidéo">
          <div className="text-gris-magneti font-medium">Synopsis :</div>
          <div>{movie.synopsis || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Synopsis anglais :</div>
          <div>{movie.synopsis_english || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Description :</div>
          <div className="whitespace-pre-wrap">{movie.description || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Prompt principal :</div>
          <div className="whitespace-pre-wrap wrap-break-word">{movie.prompt || "Non renseigné."}</div>

          {showMoreInfo && (
            <>
              <div className="text-gris-magneti font-medium">Titre anglais :</div>
              <div>{movie.title_english || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Classification :</div>
              <div>{movie.classification || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Langue :</div>
              <div>{movie.language || "Français"}</div>
              <div className="text-gris-magneti font-medium">Fichier vidéo (S3) :</div>
              <div>{movie.videofile || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Sous-titres :</div>
              <div>{movie.subtitles || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Screenshots :</div>
              {screenshotUrls.length > 0 ? (
                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {screenshotUrls.map((url, index) => (
                    <a
                      key={`${url}-${index}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-lg border border-gris-magneti/30 bg-noir-bleute"
                    >
                      <img
                        src={url}
                        alt={`Screenshot ${index + 1} de ${movie.title || 'la vidéo'}`}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div>Non renseigné.</div>
              )}
            </>
          )}

          <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-jaune-souffre text-ocre-rouge font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowMoreInfo((prev) => !prev)}
            >
              <span>{showMoreInfo ? 'Masquer les infos' : 'Plus d\'informations'}</span>
              {showMoreInfo ? (
                <svg className="h-3.5 w-3.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </InfoPanel>

        <InfoPanel title="Outils IA Utilisés">
          <div className="text-gris-magneti font-medium">Outils IA :</div>
          {usedAis.length > 0 ? (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {usedAis.map((ai, index) => {
                const style = getAiCategoryStyle(ai.category);
                return (
                  <div
                    key={index}
                    className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-md border ${style.classes}`}
                  >
                    <span className="font-bold text-sm wrap-break-word">{ai.ai_name || 'Outil IA'}</span>
                    <span className="text-xs opacity-75 border-l border-current pl-2 ml-1 shrink-0">
                      {style.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gris-magneti italic">Aucun outil IA renseigné pour ce film.</div>
          )}
        </InfoPanel>

        <InfoPanel title="Informations sur le réalisateur">
          <div className="text-gris-magneti font-medium">Civilité :</div>
          <div>{movie.gender || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Nom :</div>
          <div>{movie.directorLastName}</div>
          <div className="text-gris-magneti font-medium">Prénom :</div>
          <div>{movie.directorFirstName}</div>
          <div className="text-gris-magneti font-medium">Email :</div>
          <div>{movie.directorEmail || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Date de naissance :</div>
          <div>{movie.date_of_birth || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Adresse :</div>
          <div>{movie.address || "Non renseigné."}</div>

          {showMoreDirectorInfo && (
            <>
              <div className="text-gris-magneti font-medium">Adresse 2 :</div>
              <div>{movie.address2 || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Code postal :</div>
              <div>{movie.postal_code || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Ville :</div>
              <div>{movie.city || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Pays :</div>
              <div>{movie.country || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Langue parlée :</div>
              <div>{movie.director_language || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Téléphone fixe :</div>
              <div>{movie.fix_phone || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Téléphone mobile :</div>
              <div>{movie.mobile_phone || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Ecole fréquentée :</div>
              <div>{movie.school || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Métier actuel :</div>
              <div>{movie.current_job || "Non renseigné."}</div>
            </>
          )}

          <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-jaune-souffre text-ocre-rouge font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowMoreDirectorInfo((prev) => !prev)}
            >
              <span>{showMoreDirectorInfo ? 'Masquer les infos' : 'Plus d\'informations'}</span>
              {showMoreDirectorInfo ? (
                <svg className="h-3.5 w-3.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5 sm:h-3 sm:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </InfoPanel>

        <NotesSection movieId={movie.id} />

      </div>

      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, statusId: null })}
        onConfirm={confirmVote}
        title="Confirmer le vote"
        confirmText="Oui, je confirme"
        cancelText="Annuler"
      >
        Êtes-vous sûr de vouloir <span className="text-bleu-ciel font-bold text-lg uppercase tracking-wider">{statusLabels[confirmDialog.statusId]}</span> ce film ?<br />
        <span className="text-sm mt-2 block opacity-80">Cette action bloquera les votes suivants pour ce film.</span>
      </ConfirmModal>
    </div>
  );
}

export default MovieDetail;