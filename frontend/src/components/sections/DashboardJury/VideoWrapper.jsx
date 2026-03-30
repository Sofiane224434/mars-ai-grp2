import React from 'react';
import Spinner from '../../ui/Spinner.jsx';

// Composant d'affichage du lecteur video avec navigation precedente/suivante.
// Le parent controle l'etat via isLoaded/hasError et les callbacks onLoad/onError.
const VideoWrapper = ({ embedUrl, isLoaded, hasError, onLoad, onError, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-center w-full gap-4 my-6">
      
      {/* Flèche Précédent */}
      <button onClick={onPrev} className="hidden md:flex text-bleu-ciel hover:text-white transition-colors hover:scale-110 cursor-pointer">
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M15 6L7 12L15 18V6Z" />
        </svg>
      </button>

      {/* Le Lecteur 16:9 */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        
        {/* Overlay de chargement affiche tant que l'iframe n'a pas fini de charger. */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-noir-bleute z-10">
            <Spinner />
          </div>
        )}

        {/* Message d'erreur */}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-reglisse text-brulure-despespoir z-20">
            La vidéo est indisponible.
          </div>
        ) : (
          <iframe
            // Transition douce: l'iframe reste transparente jusqu'a onLoad.
            className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>

      {/* Flèche Suivant */}
      <button onClick={onNext} className="hidden md:flex text-bleu-ciel hover:text-white transition-colors hover:scale-110 cursor-pointer">
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M9 6V18L17 12L9 6Z" />
        </svg>
      </button>
      
    </div>
  );
};

export default VideoWrapper;