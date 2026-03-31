import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod'; // Import de Zod

// Imports de tes composants
import VideoWrapper from '../../../components/sections/DashboardJury/VideoWrapper.jsx';
import InfoPanel from '../../../components/sections/DashboardJury/InfoPanel.jsx';
import NotesSection from '../../../components/sections/DashboardJury/NotesSection.jsx';
import Button from '../../../components/ui/Button.jsx';
import { Status } from '../../../components/ui/StatusBadge.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 1. Schéma Zod pour sécuriser la validation du statut (Vote)
const voteSchema = z.object({
  statusId: z.number().int().positive("L'ID du statut est invalide.")
});

function MovieDetail() {
  const { movieId } = useParams();

  // États globaux
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVoting, setIsVoting] = useState(false); // Pour éviter le spam-clic
  
  // États de l'iframe vidéo
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Exemple de fausses notes (sera remplacé par un GET /comments plus tard)
  const fakeNotes = [{ content: "Ceci est une excellente réalisation, les plans sont très propres." }];

  // 2. Appel API Réel : Récupération du film
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/jury/movies/${movieId}`, {
          withCredentials: true
        });
        setMovie(response.data);
      } catch (err) {
        console.error("Erreur de récupération :", err);
        setError("Impossible de charger l'œuvre. Veuillez vérifier votre connexion.");
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  // 3. Logique de Vote sécurisée par Zod
  const handleVote = async (newStatusId) => {
    try {
      setIsVoting(true);

      // Validation stricte du payload avec Zod avant l'envoi réseau
      const validPayload = voteSchema.parse({ statusId: newStatusId });

      const token = localStorage.getItem('token') || 'token_temporaire_123';
     
      await axios.put(`${API_BASE_URL}/jury/movies/${movieId}/status`, validPayload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        withCredentials: true
      });

      // Mise à jour de l'UI
      setMovie((prev) => ({ ...prev, statusId: newStatusId }));
      alert("Votre évaluation a été enregistrée avec succès.");

    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("Erreur Zod :", err.errors);
      } else {
        console.error("Erreur API lors du vote :", err);
        // Si c'est toujours une 401 malgré le token, c'est que le token a expiré
        if (err.response?.status === 401) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
        } else {
          alert("Une erreur est survenue lors de l'enregistrement de votre vote.");
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

  // Sécurités de rendu
  if (isLoading) return <div className="min-h-screen background-gradient-black text-bleu-ciel flex items-center justify-center font-title text-2xl">Chargement...</div>;
  if (error || !movie) return <div className="min-h-screen background-gradient-black text-brulure-despespoir flex items-center justify-center text-2xl">{error}</div>;

  const currentStatus = getStatusBadgeFromDb(movie.statusId, movie.status);

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* En-tête */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold font-title">{movie.title}</h1>
          <p className="text-gris-magneti text-sm mt-1">Par : {movie.directorName}</p>
        </div>

        {/* Le lecteur vidéo */}
        <VideoWrapper 
          embedUrl={getYouTubeEmbedUrl(movie.videoUrl)}
          isLoaded={isVideoLoaded}
          hasError={videoError}
          onLoad={() => setIsVideoLoaded(true)}
          onError={() => setVideoError(true)}
          onPrev={() => console.log("Film précédent")}
          onNext={() => console.log("Film suivant")}
        />
        
        {/* Status JURY et Boutons de Vote */}
        <div className="text-white my-8 text-center border-b border-gris-magneti/30 pb-8 w-full">
           <div className="mb-4 flex items-center justify-center gap-2">
             <span className="text-gris-magneti">Statut de la vidéo :</span>
             <Status variant={currentStatus.variant}>{currentStatus.label}</Status>
           </div>
           
           <div className="flex gap-4 justify-center">
             {/* Note : On passe les IDs correspondants à getStatusBadgeFromDb (4 = Validé, 3 = À revoir, 2 = Refusé) */}
             <Button interactive variant="approved-jury" onClick={() => handleVote(4)} disabled={isVoting}>
               Valider
             </Button>
             <Button interactive variant="pending-jury" onClick={() => handleVote(3)} disabled={isVoting}>
               A revoir
             </Button>
             <Button interactive variant="rejected-jury" onClick={() => handleVote(2)} disabled={isVoting}>
               Refuser
             </Button>
           </div>
        </div>

        {/* Les encadrés d'informations */}
        <InfoPanel title="Informations sur la vidéo">
          <div className="text-gris-magneti font-medium">Synopsis :</div>
          <div>{movie.synopsis || "Non renseigné."}</div>
          <div className="text-gris-magneti font-medium">Envoyé le :</div>
          <div>{movie.createdAt || "01/01/2026"}</div>
          <div className="text-gris-magneti font-medium">Langue :</div>
          <div>{movie.language || "Français"}</div>
        </InfoPanel>

        <InfoPanel title="Informations sur le réalisateur">
          <div className="text-gris-magneti font-medium">Nom :</div>
          <div>{movie.directorLastName}</div>
          <div className="text-gris-magneti font-medium">Prénom :</div>
          <div>{movie.directorFirstName}</div>
          <div className="text-gris-magneti font-medium">Email :</div>
          <div>{movie.directorEmail}</div>
        </InfoPanel>

        {/* La zone des notes */}
        <NotesSection 
          notes={fakeNotes} 
          onAddNote={() => console.log("Ajout d'une note en cours...")} 
        />

      </div>
    </div>
  );
}

export default MovieDetail;