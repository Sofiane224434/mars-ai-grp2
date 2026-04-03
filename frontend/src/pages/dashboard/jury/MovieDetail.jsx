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

// 🚀 NOUVEL IMPORT : Ton Custom Hook
import useApi from '../../../hooks/useApi.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const voteSchema = z.object({
  statusId: z.number().int().positive("L'ID du statut est invalide.")
});

function MovieDetail() {
  const { movieId } = useParams();
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

  const statusLabels = { 2: "Refuser", 3: "À revoir", 4: "Valider" };

  // 🚀 2. LE USEEFFECT NETTOYÉ : Il ne contient plus que la logique d'appel, zéro gestion d'état !
  useEffect(() => {
    setIsVideoLoaded(false);
    setVideoError(false);

    if (movieId) {
      const token = localStorage.getItem('token');
      // On passe la fonction réseau à notre hook, il s'occupe du reste (try/catch, loading, etc.)
      fetchMovie(() =>
        axios.get(`${API_BASE_URL}/jury/movies/${movieId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        })
      );
    }
  }, [movieId, fetchMovie]);


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
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
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
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const getStatusBadgeFromDb = (statusId, statusLabel) => {
    const statusIdMap = {
      1: { variant: 'pending', label: 'En attente' },
      2: { variant: 'rejected', label: 'Refuse' },
      3: { variant: 'review', label: 'A revoir' },
      4: { variant: 'approved', label: 'Valide' },
    };

    if (statusIdMap[statusId]) return statusIdMap[statusId];

    const normalized = String(statusLabel || '').toLowerCase().trim();
    if (['pending', 'wait', 'en attente', 'attente'].includes(normalized)) return { variant: 'pending', label: 'En attente' };
    if (['rejected', 'refuse', 'refusé'].includes(normalized)) return { variant: 'rejected', label: 'Refuse' };
    if (['review', 'a revoir', 'à revoir'].includes(normalized)) return { variant: 'review', label: 'A revoir' };
    if (['approved', 'valid', 'valide', 'approuve', 'approuvé'].includes(normalized)) return { variant: 'approved', label: 'Valide' };

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
  const isVoteLocked = movie.statusId !== 1;

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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
            <Button interactive variant="approved-jury" onClick={() => initiateVote(4)} disabled={isVoting || isVoteLocked}>
              Valider
            </Button>
            <Button interactive variant="pending-jury" onClick={() => initiateVote(3)} disabled={isVoting || isVoteLocked}>
              A revoir
            </Button>
            <Button interactive variant="rejected-jury" onClick={() => initiateVote(2)} disabled={isVoting || isVoteLocked}>
              Refuser
            </Button>
          </div>

          {isVoteLocked && (
            <p className="text-gris-magneti text-xs mt-4 italic">
              Vous avez déjà statué sur ce film. Le vote est verrouillé.
            </p>
          )}
        </div>

        <InfoPanel title="Informations sur la vidéo">
          <div className="text-gris-magneti font-medium">Synopsis :</div>
          <div>{movie.synopsis || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Envoyé le :</div>
          <div>{movie.createdAt || "01/01/2026"}</div>
          <div className="text-gris-magneti font-medium">Langue :</div>
          <div>{movie.language || "Français"}</div>
          <div className="text-gris-magneti font-medium">Fichier vidéo (S3) :</div>
          <div>{movie.videofile || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Sous-titres :</div>
          <div>{movie.subtitles || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Screenshot :</div>
          <div>{movie.screenshotLink || movie.thumbnail || "Non renseigné."}</div>
        </InfoPanel>

        <InfoPanel title="Informations sur le réalisateur">
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