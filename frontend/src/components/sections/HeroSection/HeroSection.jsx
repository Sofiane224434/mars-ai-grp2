import React, { useState, useRef, useEffect } from 'react';
import Button from '../../ui/Button';
import { useTranslation } from 'react-i18next';

// import CountdownTimer from './CountdownTimer';

const HeroSection = ({ videoSrc = '/assets/videos/background.mp4' }) => {
  const { t } = useTranslation();
  // 1. État pour gérer la visibilité du titre (commence visible)
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  // 2. Référence pour accéder à l'élément vidéo HTML
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const HIDE_TIME = 0;
    const SHOW_END_BEFORE = 2;

    const handleTimeUpdate = () => {
      if (isNaN(video.duration)) return;

      // 1. On détermine si on est dans la zone de début
      const isStartPhase = video.currentTime < HIDE_TIME;

      // 2. On détermine si on est dans la zone de fin
      const isEndPhase = video.currentTime >= (video.duration - SHOW_END_BEFORE);

      // 3. Le titre DOIT être visible si on est soit au début, soit à la fin
      const shouldBeVisible = isStartPhase || isEndPhase;

      // 4. On met à jour l'état. React bloquera l'opération si la valeur est déjà la bonne.
      setIsTitleVisible(shouldBeVisible);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []); // Le tableau vide est maintenant correct car on ne lit plus 'isTitleVisible' dans la fonction !

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">

      {/* Arrière-plan Vidéo */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef} // <-- Liaison de la Ref ici
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenu de la bannière */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl mt-10">

        {/* LE TITRE ANIMÉ */}
        {/* On utilise l'opacité et les transitions pour un effet fluide */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 drop-shadow-xl 
          transition-all duration-1000 ease-in-out
          ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
        >
          {t('home.HeroSection')}
        </h1>



      </div>
    </section>
  );
};

export default HeroSection;