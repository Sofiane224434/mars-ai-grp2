import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Hooks
import { useAdminMovieNavigation } from '../../../hooks/useAdminMovieNavigation.js';
import useApi from '../../../hooks/useApi.js';
import useFestivalPhase from '../../../hooks/useFestivalPhase.js';

// Composants UI
import VideoWrapper from '../../../components/sections/DashboardJury/VideoWrapper.jsx';
import InfoPanel from '../../../components/sections/DashboardJury/InfoPanel.jsx';
import Button from '../../../components/ui/Button.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import { Status } from '../../../components/ui/StatusBadge.jsx';
import ConfirmModal from '../../../components/ui/ConfirmModal.jsx';
import EmailTemplateModal from '../../../components/sections/DashboardAdmin/EmailTemplateModal.jsx';
import JuryAssignmentModal from '../../../components/sections/DashboardAdmin/JuryAssignmentModal.jsx';
import { resolveMediaUrl } from '../../../utils/media.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AdminMovieDetails() {
  const { movieId } = useParams();
  const { currentPhase } = useFestivalPhase();
  const { canPrev, canNext, goPrev, goNext } = useAdminMovieNavigation(movieId);

  const {
    data: movie,
    isLoading,
    error,
    execute: fetchMovie,
  } = useApi();

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showMoreDirectorInfo, setShowMoreDirectorInfo] = useState(false);
  const [seenCommentsByMovie, setSeenCommentsByMovie] = useState({});
  const [juryOptions, setJuryOptions] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedJuryId, setSelectedJuryId] = useState('');
  const [assignError, setAssignError] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [statusActionError, setStatusActionError] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, statusId: null, actionLabel: '' });
  const commentsSectionRef = useRef(null);

  const getAuthConfig = useCallback(() => {
    const token = localStorage.getItem('token');
    return {
      headers: token
        ? {
          Authorization: `Bearer ${token}`,
          'x-festival-phase-index': String(currentPhase),
        }
        : {
          'x-festival-phase-index': String(currentPhase),
        },
      withCredentials: true,
    };
  }, [currentPhase]);

  const loadMovieDetail = useCallback(async () => {
    if (!movieId) return;

    await fetchMovie(() =>
      axios.get(`${API_BASE_URL}/admin/movies/${movieId}`, getAuthConfig()),
    );
  }, [fetchMovie, getAuthConfig, movieId]);

  const loadJuryOptions = useCallback(async () => {
    const response = await axios.get(`${API_BASE_URL}/movies/juries`, getAuthConfig());
    const juries = response?.data?.data || [];
    setJuryOptions(Array.isArray(juries) ? juries : []);
  }, [getAuthConfig]);

  useEffect(() => {
    const resetState = () => {
      setIsVideoLoaded(false);
      setVideoError(false);
    };

    queueMicrotask(resetState);

    if (!movieId) return;

    const loadPageData = async () => {
      try {
        await Promise.all([loadMovieDetail(), loadJuryOptions()]);
      } catch (loadError) {
        console.error('Erreur de chargement du detail film:', loadError);
      }
    };

    loadPageData();
  }, [loadJuryOptions, loadMovieDetail, movieId]);

  const openAssignModal = () => {
    if (!movie) return;

    const currentJuryId = Array.isArray(movie.assignedJuries) && movie.assignedJuries.length > 0
      ? String(movie.assignedJuries[0]?.id || '')
      : '';

    setSelectedJuryId(currentJuryId);
    setAssignError('');
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedJuryId('');
    setAssignError('');
  };

  const handleAssignMovie = async () => {
    if (!movie?.id) {
      setAssignError('Film invalide.');
      return;
    }

    if (!selectedJuryId) {
      setAssignError('Sélectionne un jury.');
      return;
    }

    setIsAssigning(true);
    setAssignError('');

    try {
      await axios.post(
        `${API_BASE_URL}/movies/assign`,
        {
          movieId: Number(movie.id),
          juryId: Number(selectedJuryId),
        },
        getAuthConfig(),
      );

      await Promise.all([loadMovieDetail(), loadJuryOptions()]);
      closeAssignModal();
    } catch (requestError) {
      const zodFirstIssue = requestError?.response?.data?.erreurs?.[0]?.message;
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        zodFirstIssue ||
        'Erreur lors de l\'assignation du jury.';
      setAssignError(message);
    } finally {
      setIsAssigning(false);
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
      2: { variant: 'rejected', label: 'Refusé' },
      3: { variant: 'review', label: 'À revoir' },
      4: { variant: 'approved', label: 'Validé' },
      5: { variant: 'top50', label: 'Top 50' },
      6: { variant: 'top5', label: 'Top 5' },
    };

    if (statusIdMap[statusId]) return statusIdMap[statusId];
    return { variant: 'pending', label: statusLabel || 'En attente' };
  };

  // Styles pour les badges IA
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
        return { label: category, classes: 'bg-gray-800 text-gray-300 border-gray-600' };
    }
  };

  const handleStatusUpdate = async (nextStatusId) => {
    if (!movie?.id) return;

    setIsVoting(true);
    setStatusActionError('');

    try {
      await axios.put(
        `${API_BASE_URL}/admin/movies/${movie.id}/status`,
        { statusId: Number(nextStatusId) },
        getAuthConfig(),
      );

      await loadMovieDetail();

      const statusLabelMap = {
        1: 'En attente',
        2: 'Refusé',
        3: 'À revoir',
        4: 'Validé',
        5: 'Top 50',
        6: 'Top 5',
      };

      toast.success(`Statut mis à jour: ${statusLabelMap[Number(nextStatusId)] || 'modifié'}.`, {
        duration: 3000,
        position: 'bottom-right',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });
    } catch (requestError) {
      const zodFirstIssue = requestError?.response?.data?.erreurs?.[0]?.message;
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        zodFirstIssue ||
        'Erreur lors de la mise à jour du statut.';
      setStatusActionError(message);
      toast.error(message, {
        duration: 4000,
        position: 'bottom-right'
      });
    } finally {
      setIsVoting(false);
    }
  };

  const openStatusConfirmation = (statusId, actionLabel) => {
    setConfirmDialog({ isOpen: true, statusId, actionLabel });
  };

  const confirmStatusUpdate = async () => {
    const nextStatusId = confirmDialog.statusId;
    setConfirmDialog({ isOpen: false, statusId: null, actionLabel: '' });

    if (nextStatusId === null) return;
    await handleStatusUpdate(nextStatusId);
  };

  const handleBaseStatusToggle = (targetStatusId) => {
    const currentStatusId = Number(movie?.statusId);
    const nextStatusId = currentStatusId === Number(targetStatusId) ? 1 : Number(targetStatusId);
    const actionLabelMap = {
      1: 'remettre en attente',
      2: 'refuser',
      3: 'mettre à revoir',
      4: 'valider',
      5: 'mettre dans le Top 50',
      6: 'mettre dans le Top 5',
    };

    openStatusConfirmation(nextStatusId, actionLabelMap[nextStatusId] || 'modifier le statut de');
  };

  const goToComments = () => {
    const totalComments = Array.isArray(movie?.publicComments) ? movie.publicComments.length : 0;
    const key = movieId ? String(movieId) : null;

    if (key) {
      localStorage.setItem(`admin_seen_comments_${key}`, String(totalComments));
      setSeenCommentsByMovie((prev) => ({
        ...prev,
        [key]: totalComments,
      }));
    }

    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen background-gradient-black flex items-center justify-center">
        <Spinner text="Chargement de l'œuvre..." fullScreen={true} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen background-gradient-black flex items-center justify-center p-4">
        <div className="text-brulure-despespoir font-title text-xl text-center bg-reglisse p-6 rounded-xl border border-brulure-despespoir/30">
          {error || "Ce film est introuvable."}
        </div>
      </div>
    );
  }

  // Assignations et IA
  const assignedJuries = movie.assignedJuries || [];
  const isJudgmentPhase = currentPhase === 1;
  const isTop5Phase = currentPhase === 2;
  const currentStatus = (currentPhase === 1 && assignedJuries.length === 0)
    ? { variant: 'pending', label: 'En attente' }
    : getStatusBadgeFromDb(movie.statusId, movie.status);
  const canPromoteTop50 = (isJudgmentPhase || isTop5Phase) && movie.statusId !== 5;
  const canRemoveTop50 = (isJudgmentPhase || isTop5Phase) && movie.statusId === 5;
  const canPromoteTop5 = isTop5Phase && movie.statusId !== 6;
  const canRemoveTop5 = isTop5Phase && movie.statusId === 6;
  const showAssignmentControls = currentPhase === 0;
  const showAssignedJuriesInJudgmentPhase = currentPhase === 1 && assignedJuries.length > 0 && movie.statusId !== 5;
  const juryDecisionLabel = (() => {
    if (currentPhase !== 1) {
      return 'Vidéo assignée à :';
    }

    switch (movie.statusId) {
      case 4:
        return 'Vidéo validée par :';
      case 2:
        return 'Vidéo refusée par :';
      case 3:
        return 'Vidéo mise en revue par :';
      default:
        return 'Vidéo non jugée par :';
    }
  })();
  const usedAis = movie.usedAis || [];
  const screenshotCandidates = [movie.thumbnail].concat(movie.screenshotLink);
  const screenshotUrls = [...new Set(screenshotCandidates.map((value) => resolveMediaUrl(value)).filter(Boolean))];
  const totalComments = Array.isArray(movie.publicComments) ? movie.publicComments.length : 0;
  const movieKey = movieId ? String(movieId) : null;
  const storageKey = movieKey ? `admin_seen_comments_${movieKey}` : null;
  const rawSeenFromStorage = storageKey ? localStorage.getItem(storageKey) : null;
  const parsedSeenFromStorage = Number.parseInt(rawSeenFromStorage ?? '', 10);
  const seenFromStorage = Number.isNaN(parsedSeenFromStorage)
    ? 0
    : Math.max(parsedSeenFromStorage, 0);
  const seenCommentsCount = movieKey && Object.prototype.hasOwnProperty.call(seenCommentsByMovie, movieKey)
    ? seenCommentsByMovie[movieKey]
    : seenFromStorage;
  const newCommentsCount = Math.max(0, totalComments - seenCommentsCount);

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* HEADER */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold font-title">{movie.title}</h1>
          <p className="text-gris-magneti text-sm mt-1">Par : {movie.directorName || `${movie.directorFirstName} ${movie.directorLastName}`}</p>
        </div>

        {/* LECTEUR VIDÉO */}
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

        {/* SECTION STATUT & ASSIGNATION */}
        <div className="text-white my-8 text-center border-b border-gris-magneti/30 pb-8 w-full flex flex-col items-center gap-4">

          {/* Ligne 1 : Statut de la vidéo */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-medium">Statut de la vidéo :</span>
            <Status variant={currentStatus.variant}>{currentStatus.label}</Status>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
            <Button
              interactive
              variant="approved-jury"
              onClick={() => handleBaseStatusToggle(4)}
              disabled={isVoting}
            >
              Valider
            </Button>
            <Button
              interactive
              variant="pending-jury"
              onClick={() => handleBaseStatusToggle(3)}
              disabled={isVoting}
            >
              A revoir
            </Button>
            <Button
              interactive
              variant="rejected-jury"
              onClick={() => handleBaseStatusToggle(2)}
              disabled={isVoting}
            >
              Refuser
            </Button>

            {(isJudgmentPhase || isTop5Phase) ? (
              <Button
                interactive
                variant={canRemoveTop50 ? 'rejected-jury' : 'approved-jury'}
                onClick={() => openStatusConfirmation(
                  canRemoveTop50 ? 4 : 5,
                  canRemoveTop50 ? 'retirer du Top 50' : 'mettre dans le Top 50'
                )}
                disabled={isVoting || (!canPromoteTop50 && !canRemoveTop50)}
              >
                {canRemoveTop50 ? 'Retirer Top 50' : 'Top 50'}
              </Button>
            ) : null}

            {isTop5Phase ? (
              <Button
                interactive
                variant={canRemoveTop5 ? 'rejected-jury' : 'approved-jury'}
                onClick={() => openStatusConfirmation(
                  canRemoveTop5 ? 5 : 6,
                  canRemoveTop5 ? 'retirer du Top 5' : 'mettre dans le Top 5'
                )}
                disabled={isVoting || (!canPromoteTop5 && !canRemoveTop5)}
              >
                {canRemoveTop5 ? 'Retirer Top 5' : 'Top 5'}
              </Button>
            ) : null}
          </div>

          {statusActionError && (
            <p className="text-brulure-despespoir text-xs mt-2 italic">{statusActionError}</p>
          )}

          {isJudgmentPhase && (
            <p className="text-gris-magneti text-xs mt-1 italic">
              L'admin peut activer Top 50 uniquement en phase 2.
            </p>
          )}

          {isTop5Phase && (
            <p className="text-gris-magneti text-xs mt-1 italic">
              En phase 3, l'admin peut gérer Top 50 et Top 5.
            </p>
          )}

          {/* Ligne 2 : Assignation Jury OU Bouton d'assignation (phase 1 uniquement) */}
          {(showAssignmentControls || showAssignedJuriesInJudgmentPhase) && (
            assignedJuries.length > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-medium">{juryDecisionLabel}</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {assignedJuries.map((jury, index) => (
                    <div key={index} className="bg-bleu-ciel text-black px-3 py-1 rounded-sm font-bold text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                      {jury.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              showAssignmentControls && (
                <div className="flex flex-col items-center gap-3 mt-2">
                  <span className="text-gris-magneti text-sm italic">Cette vidéo n'est pas encore assignée.</span>
                  <Button interactive variant="email-send" onClick={openAssignModal}>
                    Assigner cette vidéo à un jury
                  </Button>
                </div>
              )
            )
          )}

          {/* Ligne 3 : Bouton Envoyer un email (Ton code) */}
          <div className="mt-4 pt-2 w-full max-w-sm flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Button
                interactive
                variant="email-admin"
                className="h-12 min-h-12"
                onClick={() => setEmailModalOpen(true)}
              >
                Envoyer un email
              </Button>
              <button
                type="button"
                onClick={goToComments}
                className="relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-bleu-ciel/40 bg-bleu-canard/10 text-bleu-ciel transition-colors hover:bg-bleu-ciel/15"
                title="Aller aux commentaires"
                aria-label={newCommentsCount > 0 ? `Aller aux commentaires (${newCommentsCount} nouveaux)` : 'Aller aux commentaires'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m5 8-4-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                </svg>
                {newCommentsCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brulure-despespoir px-1 text-[10px] font-bold leading-none text-white shadow-md">
                    {newCommentsCount > 99 ? '99+' : newCommentsCount}
                  </span>
                )}
              </button>
            </div>
            <p className="text-xs text-gris-magneti mt-2 italic">
              Contacter le réalisateur ({movie.directorEmail || movie.email || "Non renseigné"})
            </p>
          </div>
        </div>

        {/* PANNEAU : INTELLIGENCE ARTIFICIELLE */}
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

          <div className="text-gris-magneti font-medium">Prompt principal :</div>
          <div className="whitespace-pre-wrap wrap-break-word">{movie.prompt || "Non renseigné."}</div>
        </InfoPanel>

        {/* PANNEAUX D'INFORMATIONS */}
        <InfoPanel title="Informations sur la vidéo">
          <div className="text-gris-magneti font-medium">Titre :</div>
          <div className="whitespace-pre-wrap">{movie.title || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Titre anglais :</div>
          <div className="whitespace-pre-wrap">{movie.title_english || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Synopsis :</div>
          <div className="whitespace-pre-wrap">{movie.synopsis || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Synopsis anglais :</div>
          <div className="whitespace-pre-wrap">{movie.synopsis_english || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Description :</div>
          <div className="whitespace-pre-wrap">{movie.description || "Non renseigné."}</div>

          {showMoreInfo && (
            <>
              <div className="text-gris-magneti font-medium">Classification :</div>
              <div className="whitespace-pre-wrap">{movie.classification || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Langue du film :</div>
              <div>{movie.language || "Français"}</div>
              <div className="text-gris-magneti font-medium">Sous-titres :</div>
              <div>{movie.subtitles || "lien_vers_fichier_sous_titres"}</div>
              <div className="text-gris-magneti font-medium">Screenshots :</div>
              {screenshotUrls.length > 0 ? (
                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {screenshotUrls.map((url, index) => (
                    <a
                      key={`${url}-${index}`
                      }
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
              <span>{showMoreInfo ? 'Masquer les infos' : 'Plus d\'infos'}</span>
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

        <InfoPanel title="Informations sur le réalisateur">
          <div className="text-gris-magneti font-medium">Civilité :</div>
          <div>{movie.gender || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Nom :</div>
          <div>{movie.directorLastName}</div>
          <div className="text-gris-magneti font-medium">Prénom :</div>
          <div>{movie.directorFirstName}</div>
          <div className="text-gris-magneti font-medium">Email :</div>
          <div>{movie.directorEmail || movie.email || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Né le :</div>
          <div>{movie.date_of_birth ? new Date(movie.date_of_birth).toLocaleDateString('fr-FR') : "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Adresse :</div>
          <div>{movie.address || "Non renseigné."}</div>

          {showMoreDirectorInfo && (
            <>
              <div className="text-gris-magneti font-medium">Adresse 2 :</div>
              <div>{movie.address2 || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Code postal:</div>
              <div>{movie.postal_code || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Ville :</div>
              <div>{movie.city || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Pays :</div>
              <div>{movie.country || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Langue :</div>
              <div>{movie.director_language || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Téléphone fixe :</div>
              <div>{movie.fix_phone || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Téléphone mobile :</div>
              <div>{movie.mobile_phone || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Ecole fréquenté :</div>
              <div>{movie.school || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Métier actuel:</div>
              <div>{movie.current_job || "Non renseigné."}</div>
            </>
          )}

          <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-jaune-souffre text-ocre-rouge font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowMoreDirectorInfo((prev) => !prev)}
            >
              <span>{showMoreDirectorInfo ? 'Masquer les infos' : 'Plus d\'infos'}</span>
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

        <InfoPanel title="Commentaires">
          <div ref={commentsSectionRef} className="sm:col-span-2 h-0" aria-hidden="true" />
          {movie.publicComments?.length > 0 ? (
            movie.publicComments.map((comment) => (
              <article key={comment.id} className="sm:col-span-2 rounded-2xl border border-bleu-ciel/12 bg-linear-to-br from-bleu-canard/20 via-reglisse to-noir-bleute p-4 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-gris-magneti/90">{comment.authorEmail || 'Auteur inconnu'}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white/95">
                  {comment.content}
                </p>
              </article>
            ))
          ) : (
            <div className="sm:col-span-2 rounded-2xl border border-dashed border-gris-magneti/30 bg-white/5 px-4 py-5 text-sm text-gris-magneti">
              Aucun commentaire pour ce film.
            </div>
          )}
        </InfoPanel>

      </div>

      {/* Ton code exact pour la modale */}
      <JuryAssignmentModal
        isOpen={isAssignModalOpen}
        selectedMovie={movie}
        juryOptions={juryOptions}
        selectedJuryId={selectedJuryId}
        onSelectJury={setSelectedJuryId}
        assignError={assignError}
        isAssigning={isAssigning}
        onClose={closeAssignModal}
        onConfirm={handleAssignMovie}
      />

      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, statusId: null, actionLabel: '' })}
        onConfirm={confirmStatusUpdate}
        title="Confirmer la modification"
        confirmText="Oui, confirmer"
        cancelText="Annuler"
      >
        Êtes-vous sûr de vouloir <span className="text-bleu-ciel font-bold">{confirmDialog.actionLabel}</span> ce film ?
      </ConfirmModal>

      {emailModalOpen && (
        <EmailTemplateModal
          movie={movie}
          onClose={() => setEmailModalOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminMovieDetails;