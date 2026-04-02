import React from 'react';

const VideoWrapper = ({
  embedUrl,
  isLoaded,
  hasError,
  onLoad,
  onError,
  canPrev,
  canNext,
  onPrev,
  onNext
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      
      {/* --- BLOC PRINCIPAL (Vidéo + Flèches latérales PC) --- */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">

        {/* Flèche Gauche (PC) */}
        <button
          onClick={onPrev}
          disabled={!canPrev}
          // 🚀 Ajout de "group" ici pour gérer le survol
          className={`hidden sm:flex group items-center justify-center p-3 rounded-full transition-all duration-300 ${
            canPrev 
              ? 'bg-reglisse hover:bg-bleu-canard cursor-pointer shadow-lg hover:scale-110' 
              : 'bg-transparent text-gris-magneti/30 cursor-not-allowed'
          }`}
        >
           <svg 
             // 🚀 Application de text-bleu-ciel, et repasse en blanc au survol
             className={`w-8 h-8 transition-colors ${canPrev ? 'text-bleu-ciel group-hover:text-white' : 'currentColor'}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
           </svg>
        </button>

        {/* Conteneur Iframe Vidéo */}
        <div className="relative w-full max-w-3xl aspect-video bg-reglisse rounded-xl overflow-hidden shadow-2xl border border-gris-magneti/20">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center text-bleu-ciel animate-pulse font-title">
              Chargement de la vidéo...
            </div>
          )}
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center text-brulure-despespoir font-title">
              Erreur de chargement.
            </div>
          ) : embedUrl ? (
            <iframe
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={onLoad}
              onError={onError}
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gris-magneti italic">
              Aucun lien vidéo disponible.
            </div>
          )}
        </div>

        {/* Flèche Droite (PC) */}
        <button
          onClick={onNext}
          disabled={!canNext}
          // 🚀 Ajout de "group"
          className={`hidden sm:flex group items-center justify-center p-3 rounded-full transition-all duration-300 ${
            canNext 
              ? 'bg-reglisse hover:bg-bleu-canard cursor-pointer shadow-lg hover:scale-110' 
              : 'bg-transparent text-gris-magneti/30 cursor-not-allowed'
          }`}
        >
           <svg 
             // 🚀 Application du bleu
             className={`w-8 h-8 transition-colors ${canNext ? 'text-bleu-ciel group-hover:text-white' : 'currentColor'}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
        </button>
      </div>

      {/* --- BARRE DE NAVIGATION MOBILE --- */}
      <div className="flex sm:hidden w-full justify-between px-2 mt-2 gap-4">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          // 🚀 Ajout de "group"
          className={`flex-1 flex group items-center justify-center py-3 rounded-xl transition-all ${
            canPrev 
              ? 'bg-reglisse hover:bg-bleu-canard text-white shadow-md active:scale-95' 
              : 'bg-reglisse/30 text-gris-magneti/30 cursor-not-allowed'
          }`}
        >
           <svg 
             // 🚀 Flèche mobile en bleu
             className={`w-5 h-5 mr-2 transition-colors ${canPrev ? 'text-bleu-ciel group-hover:text-white' : 'currentColor'}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
           </svg>
           <span className="text-sm font-medium font-title tracking-wide uppercase">Précédent</span>
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          // 🚀 Ajout de "group"
          className={`flex-1 flex group items-center justify-center py-3 rounded-xl transition-all ${
            canNext 
              ? 'bg-reglisse hover:bg-bleu-canard text-white shadow-md active:scale-95' 
              : 'bg-reglisse/30 text-gris-magneti/30 cursor-not-allowed'
          }`}
        >
           <span className="text-sm font-medium font-title tracking-wide uppercase">Suivant</span>
           <svg 
             // 🚀 Flèche mobile en bleu
             className={`w-5 h-5 ml-2 transition-colors ${canNext ? 'text-bleu-ciel group-hover:text-white' : 'currentColor'}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
        </button>
      </div>

    </div>
  );
};

export default VideoWrapper;