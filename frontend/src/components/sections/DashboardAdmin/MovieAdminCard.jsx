import React from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../ui/StatusBadge.jsx';
import Button from '../../ui/Button.jsx';

const MovieAdminCard = ({ movie, onOpenEmailModal }) => {
  const movieTitle = movie?.title || movie?.title_original || 'Film sans titre';
  
  const getCardStyle = (statusId) => {
    switch(statusId) {
      case 2: // Refusé (Rouge)
        return 'bg-brulure-despespoir/10 border-4 border-red-500/50 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]';
      case 3: // À revoir (Ton jaune )
        return 'bg-[#fdff6b]/10 border-4 border-[#fdff6b]/50 hover:border-[#fdff6b] hover:shadow-[0_0_15px_rgba(253,255,107,0.2)]';
      case 4: // Validé (Bleu Canard)
        return 'bg-bleu-canard/10 border-4 border-vert-insecateur/50 hover:border-vert-picollo hover:shadow-[0_0_15px_rgba(0,128,128,0.4)]';
      default: // En attente
        return 'bg-reglisse border-4 border-gris-magneti/30 hover:border-bleu-ciel/50';
    }
  };

  const getStatusLabel = (statusId) => {
    switch(statusId) {
      case 2: return { variant: 'rejected', label: 'REFUSÉ' };
      case 3: return { variant: 'review', label: 'À REVOIR' };
      case 4: return { variant: 'approved', label: 'VALIDÉ' };
      default: return { variant: 'pending', label: 'EN ATTENTE' };
    }
  };

  const cardStyle = getCardStyle(movie.statusId);
  const statusInfo = getStatusLabel(movie.statusId);

  return (
    <div className={`flex flex-col rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${cardStyle}`}>
      
      {/* Haut : Vignette (Sans le badge par-dessus) */}
      <Link to={`/dashboard/admin/movies/${movie.id}`} className="relative aspect-video overflow-hidden group">
        {movie.thumbnail || movie.screenshotLink ? (
          <img 
            src={movie.thumbnail || movie.screenshotLink} 
            alt={`Vignette de ${movieTitle}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-black/50 flex items-center justify-center text-gris-magneti italic">
            Aucune image
          </div>
        )}
      </Link>

      {/* Bas : Infos & Boutons */}
      <div className="p-5 flex flex-col grow">
        
        {/* 🚀 2. LE BADGE EST ICI : Toujours lisible, juste au-dessus du titre */}
        <div className="mb-3">
          <Status variant={statusInfo.variant}>
            <span className="font-bold tracking-wider text-xs">{statusInfo.label}</span>
          </Status>
        </div>

        <h2 className="text-xl font-bold text-white font-title mb-1 line-clamp-1" title={movieTitle}>
          {movieTitle}
        </h2>
        <p className="text-sm text-gris-magneti mb-6">
          Par <span className="text-bleu-ciel font-medium">{movie.directorFirstName} {movie.directorLastName}</span>
        </p>

        {/* Boutons d'action */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-stretch gap-3">
          <Link to={`/dashboard/admin/movies/${movie.id}`} className="flex-1">
            <button className="w-full h-full min-h-10 px-4 py-2 rounded-xl border-2 border-turquoise-vif/50 text-white text-sm font-medium hover:bg-gris-magneti/20 transition-colors flex items-center justify-center">
              Voir Détails
            </button>
          </Link>
          
          <div className="flex-1">
            <Button
              interactive
              variant="email-admin"
              onClick={() => onOpenEmailModal(movie)}
              className="w-full h-full min-h-10"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdminCard;