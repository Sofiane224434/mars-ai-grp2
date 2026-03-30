import React, { useState, useEffect } from 'react';
import Button from '../../../ui/Button';

const CountdownTimer = ({ targetDate }) => {
  // 1. Initialisation pure : On démarre à zéro pour garantir un premier rendu stable
  const [timeLeft, setTimeLeft] = useState({ jours: 0, heures: 0, minutes: 0, secondes: 0 });

  // 2. Toute la logique "impure" (liée au temps) est isolée dans le useEffect
  useEffect(() => {
    // On verrouille la date cible une fois le composant monté
    const endTime = targetDate 
      ? new Date(targetDate).getTime() 
      : Date.now() + (12 * 86400000) + (8 * 3600000) + (45 * 60000);

    // Fonction de mise à jour locale au useEffect
    const updateTimer = () => {
      const difference = endTime - Date.now();

      if (difference > 0) {
        setTimeLeft({
          jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
          heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          secondes: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Optionnel : arrêter le compteur à zéro s'il est terminé
        setTimeLeft({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
      }
    };

    // On exécute la fonction tout de suite pour éviter de voir les zéros du rendu initial
    updateTimer();

    // On lance l'intervalle qui tourne chaque seconde
    const timer = setInterval(updateTimer, 1000);

    // Nettoyage parfait au démontage
    return () => clearInterval(timer);
  }, [targetDate]);

  // Fonction utilitaire pour toujours afficher 2 chiffres
  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="bg-gris-anthracite flex flex-col items-center w-full">
      <h2 className='text-white m-10 text-4xl '>PROCHAINE SELECTION</h2>
      
      {/* BOÎTE DU COMPTE À REBOURS */}
      <div className="bg-[#1e2124]/80 backdrop-blur-md border border-white/5 rounded-xl px-8 py-6 flex gap-6 md:gap-10 shadow-2xl">
        
        {/* Bloc Jours */}
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.jours)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            Jours
          </span>
        </div>

        {/* Bloc Heures */}
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.heures)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            Heures
          </span>
        </div>

        {/* Bloc Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            Minutes
          </span>
        </div>

        {/* Bloc Secondes */}
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.secondes)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            Secondes
          </span>
        </div>

      </div>

      {/* TITRE TOP 50 avec dégradé de texte */}
      <h3 className="mt-8 text-5xl md:text-6xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-green-400 to-cyan-400 drop-shadow-sm">
        Top 50
      </h3>
      
      <Button variant='gradient-blue' className='px-60 py-15 text-3xl m-4'>PARTICIPER</Button>
    </div>
  );
};

export default CountdownTimer;