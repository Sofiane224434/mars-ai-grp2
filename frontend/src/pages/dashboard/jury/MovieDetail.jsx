import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Imports de tes nouveaux composants stylisés
import VideoWrapper from '../../../components/sections/DashboardJury/VideoWrapper.jsx';
import InfoPanel from '../../../components/sections/DashboardJury/InfoPanel.jsx';
import NotesSection from '../../../components/sections/DashboardJury/NotesSection.jsx';
import Button from '../../../components/ui/Button.jsx';
import { Status } from '../../../components/ui/StatusBadge.jsx';
// Note : Tu intégreras ton composant VoteBar/CustomButton personnalisé ici

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);
  
  // États de l'iframe vidéo
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Exemple de fausses notes pour la maquette (à remplacer par l'API)
  const fakeNotes = [{ content: "Ceci est une excellente réalisation, les plans sont très propres." }];

  useEffect(() => {
    // ... Ta logique de fetch (GET /api/jury/movies/:movieId)
    // Remplacée par un mock rapide pour tester l'UI
    setTimeout(() => {
      setMovie({
        title: "Titre de la vidéo",
        directorName: "Jean Dupont",
        directorLastName: "Dupont",
        directorFirstName: "Jean",
        directorEmail: "jean@dupont.fr",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        synopsis: "Un super synopsis long texte...",
        status: "En attente"
      });
      setIsLoading(false);
    }, 1000);
  }, [movieId]);

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

    if (statusIdMap[statusId]) {
      return statusIdMap[statusId];
    }

    const normalized = String(statusLabel || '').toLowerCase().trim();

    if (['pending', 'wait', 'en attente', 'attente'].includes(normalized)) {
      return { variant: 'pending', label: 'En attente' };
    }

    if (['rejected', 'refuse', 'refusé'].includes(normalized)) {
      return { variant: 'rejected', label: 'Refuse' };
    }

    if (['review', 'a revoir', 'à revoir'].includes(normalized)) {
      return { variant: 'review', label: 'A revoir' };
    }

    if (['approved', 'valid', 'valide', 'approuve', 'approuvé'].includes(normalized)) {
      return { variant: 'approved', label: 'Valide' };
    }

    return { variant: 'pending', label: statusLabel || 'En attente' };
  };

  const currentStatus = getStatusBadgeFromDb(movie?.statusId, movie?.status);

  if (isLoading) return <div className="min-h-screen background-gradient-black text-bleu-ciel flex items-center justify-center font-title text-2xl">Chargement...</div>;
  if (error || !movie) return <div className="min-h-screen background-gradient-black text-brulure-despespoir flex items-center justify-center text-2xl">{error}</div>;

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
        
   {/*Status JURY */}
        <div className="text-white my-8 text-center border-b border-gris-magneti/30 pb-8 w-full">
           <div className="mb-4 flex items-center justify-center gap-2">
             <span className="text-gris-magneti">Statut de la vidéo :</span>
             <Status variant={currentStatus.variant}>{currentStatus.label}</Status>
           </div>
           <div className="flex gap-4 justify-center">
             <Button interactive variant="approved-jury" onClick={() => console.log('Valider')}>
               Valider
             </Button>
             <Button interactive variant="pending-jury" onClick={() => console.log('A revoir')}>
               A revoir
             </Button>
             <Button interactive variant="rejected-jury" onClick={() => console.log('Refuser')}>
               Refuser
             </Button>
           </div>
        </div>

        {/* Les encadrés d'informations */}
        <InfoPanel title="Informations sur la vidéo">
          <div className="text-gris-magneti font-medium">Synopsis :</div>
          <div>{movie.synopsis}</div>
          <div className="text-gris-magneti font-medium">Envoyé le :</div>
          <div>01/01/2026</div>
          <div className="text-gris-magneti font-medium">Langue :</div>
          <div>Français</div>
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