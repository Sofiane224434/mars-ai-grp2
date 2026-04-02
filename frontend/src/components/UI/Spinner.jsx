import React from 'react';

// 🚀 NOUVEAU : On ajoute des 'props' pour le rendre dynamique !
const Spinner = ({ 
  text = "Chargement...", // Texte par défaut
  fullScreen = false      // Option pour qu'il prenne tout l'écran
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'min-h-screen' : 'py-10'}`}>
      <svg 
        // 🚀 On remplace le jaune par ton 'bleu-ciel' !
        className="animate-spin h-12 w-12 text-jaune-souffre" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {/* Le texte dynamique avec la typo de ton app */}
      <span className="text-bleu-ciel font-title tracking-wider uppercase text-sm font-medium animate-pulse">
        {text}
      </span>
    </div>
  );
};

export default Spinner;