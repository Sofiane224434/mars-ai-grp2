import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Hooks
import { useAdminMovieNavigation } from '../../../hooks/useAdminMovieNavigation.js';
import useApi from '../../../hooks/useApi.js';

// Composants UI
import VideoWrapper from '../../../components/sections/DashboardJury/VideoWrapper.jsx';
import InfoPanel from '../../../components/sections/DashboardJury/InfoPanel.jsx';
import Button from '../../../components/ui/Button.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import { Status } from '../../../components/ui/StatusBadge.jsx';
import EmailTemplateModal from '../../../components/sections/DashboardAdmin/EmailTemplateModal.jsx';
import AdminMovieDetailActions from '../../../components/sections/DashboardAdmin/AdminMovieDetailActions.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AdminMovieDetails() {
  const { movieId } = useParams();
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

  useEffect(() => {
    const resetState = () => {
      setIsVideoLoaded(false);
      setVideoError(false);
    };

    queueMicrotask(resetState);

    if (movieId) {
      const token = localStorage.getItem('token');
      // On appelle la route admin pour récupérer les détails du film
      fetchMovie(() =>
        axios.get(`${API_BASE_URL}/admin/movies/${movieId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        })
      );
    }
  }, [movieId, fetchMovie]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const getStatusBadgeFromDb = (statusId, statusLabel) => {
    const statusIdMap = {
      1: { variant: 'pending', label: 'En attente' },
      2: { variant: 'rejected', label: 'Refusé' },
      3: { variant: 'review', label: 'À revoir' },
      4: { variant: 'approved', label: 'Validé' },
    };

    if (statusIdMap[statusId]) return statusIdMap[statusId];
    return { variant: 'pending', label: statusLabel || 'En attente' };
  };

  // Styles pour les badges IA
  const getAiCategoryStyle = (category) => {
    switch (category) {
      case 'script':
        return { label: 'Scénario', classes: 'bg-purple-900/40 text-purple-300 border-purple-500/50' };
      case 'movie':
        return { label: 'Génération', classes: 'bg-blue-900/40 text-blue-300 border-blue-500/50' };
      case 'postprod':
        return { label: 'Post-Prod', classes: 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50' };
      default:
        return { label: category, classes: 'bg-gray-800 text-gray-300 border-gray-600' };
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

  const currentStatus = getStatusBadgeFromDb(movie.statusId, movie.status);

  // Assignations et IA
  const assignedJuries = movie.assignedJuries || [];
  const usedAis = movie.usedAis || [];

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">
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

          {/* Ligne 2 : Assignation Jury OU Bouton d'assignation */}
          {assignedJuries.length > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-white font-medium">Vidéo assignée à :</span>
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
            <div className="flex flex-col items-center gap-3 mt-2">
              <span className="text-gris-magneti text-sm italic">Cette vidéo n'est pas encore assignée.</span>
              <Button interactive variant="email-send" onClick={() => console.log("Ouvrir modale assignation")}>
                Assigner cette vidéo à un jury
              </Button>
            </div>
          )}

          {/* Ligne 3 : Bouton Envoyer un email (Ton code) */}
          <div className="mt-4 pt-2 w-full max-w-sm flex flex-col items-center">
            <Button
              interactive
              variant="email-admin"
              className="h-12 min-h-12"
              onClick={() => setEmailModalOpen(true)}
            >
              Envoyer un email
            </Button>
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
              <div>{movie.screenshotLink || "Non renseigné."}</div>
              <div className="text-gris-magneti font-medium">Envoyé le :</div>
              <div>{movie.createdAt || "01/01/2026"}</div>
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

      </div>

      {/* Ton code exact pour la modale */}
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