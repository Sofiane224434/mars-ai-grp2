import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../../ui/StatusBadge.jsx';
import Button from '../../ui/Button.jsx';

const DEFAULT_THUMBNAIL = "/assets/img/vignette-test.svg";

const FALLBACK_SVG = (
  <svg className="aspect-video w-full object-cover" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="400" height="225" fill="#2a2a3a" />
    <rect x="1" y="1" width="398" height="223" fill="none" stroke="#444" strokeWidth="2" />
    <circle cx="200" cy="112.5" r="40" fill="#555" opacity="0.5" />
    <path d="M170 100 L170 125 L230 112.5 Z" fill="#666" opacity="0.7" />
  </svg>
);

const MovieAdminCard = ({ movie, onOpenEmailModal, layout = 'grid' }) => {
  const [imageError, setImageError] = useState(false);

  const movieTitle = movie?.title || movie?.title_original || 'Film sans titre';
  const movieId = movie?.movieID || movie?.id;
  const detailPath = `/dashboard/admin/movies/${movieId}`;

  const getCardStyle = (statusId) => {
    switch (statusId) {
      case 2: return 'bg-brulure-despespoir/10 border border-red-500/50 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]';
      case 3: return 'bg-[#fdff6b]/10 border border-[#fdff6b]/50 hover:border-[#fdff6b] hover:shadow-[0_0_15px_rgba(253,255,107,0.2)]';
      case 4: return 'bg-bleu-canard/10 border border-vert-insecateur/50 hover:border-vert-picollo hover:shadow-[0_0_15px_rgba(0,128,128,0.4)]';
      case 5: return 'bg-bleu-ocean/10 border border-bleu-ocean/50 hover:border-bleu-ocean hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]';
      case 6: return 'bg-bleu-ocean/10 border border-bleu-ocean/50 hover:border-bleu-ocean hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]';
      default: return 'bg-reglisse border border-gris-magneti/30 hover:border-bleu-ciel/50';
    }
  };

  const getStatusLabel = (statusId) => {
    switch (statusId) {
      case 2: return { variant: 'rejected', label: 'REFUSÉ' };
      case 3: return { variant: 'review', label: 'À REVOIR' };
      case 4: return { variant: 'approved', label: 'VALIDÉ' };
      case 5: return { variant: 'top50', label: 'TOP 50' };
      case 6: return { variant: 'top5', label: 'TOP 5' };
      default: return { variant: 'pending', label: 'EN ATTENTE' };
    }
  };

  // On affine un peu la bordure selon le mode pour que la liste ne soit pas trop "lourde"
  const cardStyle = layout === 'grid'
    ? getCardStyle(movie.statusId).replace(/border /g, 'border-4 ')
    : getCardStyle(movie.statusId);

  const statusInfo = getStatusLabel(movie.statusId);

  return (
    <div className={`flex backdrop-blur-sm transition-all duration-300 ${cardStyle} ${layout === 'list'
        ? 'flex-col md:flex-row items-start md:items-center p-3 gap-4 md:gap-6 rounded-xl w-full overflow-hidden'
        : 'flex-col rounded-2xl overflow-hidden'
      }`}>

      {/* 1. LA MINIATURE : Pleine largeur en mode Grille, très petite en mode Liste */}
      <Link
        to={detailPath}
        className={`relative shrink-0 group overflow-hidden ${layout === 'list'
            ? 'w-full md:w-40 aspect-video rounded-lg'
            : 'w-full aspect-video'
          }`}
      >
        {imageError ? FALLBACK_SVG : (
          <img
            src={movie.thumbnail || movie.screenshotLink || DEFAULT_THUMBNAIL}
            alt={`Vignette de ${movieTitle}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        )}
      </Link>

      {/* 2. LE CONTENU PRINCIPAL */}
      <div className={`flex grow ${layout === 'list'
          ? 'flex-col md:flex-row md:items-center justify-between gap-4 w-full min-w-0'
          : 'flex-col p-5'
        }`}>

        {/* Textes (Titre + Réalisateur) */}
        <div className={`flex flex-col ${layout === 'list' ? 'flex-1 min-w-0' : ''}`}>
          {layout === 'grid' && (
            <div className="mb-3">
              <Status variant={statusInfo.variant}>
                <span className="font-bold tracking-wider text-xs">{statusInfo.label}</span>
              </Status>
            </div>
          )}

          <h2 className={`font-bold text-white font-title ${layout === 'list' ? 'text-lg leading-tight whitespace-normal wrap-break-word' : 'text-xl mb-1 line-clamp-1'
            }`} title={movieTitle}>
            {movieTitle}
          </h2>

          <p className={`text-sm text-gris-magneti ${layout === 'list' ? 'whitespace-normal wrap-break-word' : 'mb-6'}`}>
            Par <span className="text-bleu-ciel font-medium">{movie.directorFirstName} {movie.directorLastName}</span>
          </p>

          {/* Sur mobile en mode liste, on met le statut sous le titre */}
          {layout === 'list' && (
            <div className="mt-2 sm:hidden">
              <Status variant={statusInfo.variant}>
                <span className="font-bold tracking-wider text-xs">{statusInfo.label}</span>
              </Status>
            </div>
          )}
        </div>

        {/* 3. LE STATUT (Visible en ligne sur Desktop en mode Liste) */}
        {layout === 'list' && (
          <div className="hidden md:flex shrink-0 w-32 justify-center">
            <Status variant={statusInfo.variant}>
              <span className="font-bold tracking-wider text-xs">{statusInfo.label}</span>
            </Status>
          </div>
        )}

        {/* 4. LES BOUTONS : Repoussés à droite en mode Liste */}
        <div className={`flex gap-3 shrink-0 ${layout === 'list'
            ? 'flex-col md:flex-row items-stretch md:items-center md:ml-auto w-full md:w-auto min-w-0'
            : 'mt-auto flex-col sm:flex-row sm:items-stretch'
          }`}>
          <Link to={detailPath} className={layout === 'grid' ? 'flex-1' : 'w-full md:w-auto'}>
            <button className={`w-full h-full rounded-xl border-2 border-turquoise-vif/50 text-white text-sm font-medium hover:bg-gris-magneti/20 transition-colors flex items-center justify-center whitespace-nowrap ${layout === 'list' ? 'px-4 py-2 min-h-9' : 'px-4 py-2 min-h-10'
              }`}>
              Détails
            </button>
          </Link>

          <div className={layout === 'grid' ? 'flex-1' : 'w-full md:w-auto'}>
            <Button
              interactive
              variant="email-admin"
              onClick={() => onOpenEmailModal(movie)}
              className={`w-full h-full ${layout === 'list' ? 'min-h-9 px-4' : 'min-h-10 px-4'}`}
            >
              <span className="flex items-center justify-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {layout === 'list' ? 'Email' : 'Email'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdminCard;