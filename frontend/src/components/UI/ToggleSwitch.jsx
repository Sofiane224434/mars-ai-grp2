import React from 'react';

const ToggleSwitch = ({ isListMode, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      // Le conteneur principal (le fond de l'interrupteur)
      className="relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-xl border-2 border-white/10 bg-gris-steelix transition-colors duration-200 focus:outline-none hover:bg-gris-magneti/50"
    >
      <span className="sr-only">Changer le mode d'affichage</span>

      {/* Icône Grille (décorative, en fond) */}
      <span className="absolute left-2 flex h-full items-center justify-center text-white/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
      </span>

      {/* Icône Liste (décorative, en fond) */}
      <span className="absolute right-2 flex h-full items-center justify-center text-white/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </span>

      {/* La pastille qui glisse (le bouton rouge de ton image) */}
      <span
        className={`
          pointer-events-none relative inline-flex h-8 w-10 transform items-center justify-center rounded-lg bg-bleu-ciel shadow-lg transition duration-300 ease-in-out
          ${isListMode ? 'translate-x-[2.3rem]' : 'translate-x-1'}
        `}
      >
        {/* On affiche l'icône active directement SUR la pastille pour un effet très pro */}
        {isListMode ? (
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        ) : (
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        )}
      </span>
    </button>
  );
};

export default ToggleSwitch;