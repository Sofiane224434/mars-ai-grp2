import React from 'react';

const InfoPanel = ({ title, children }) => {
  return (
    // w-full et overflow-hidden garantissent que RIEN ne sortira jamais du cadre
    <div className="w-full bg-reglisse border border-gris-magneti/30 rounded-xl p-4 sm:p-6 mb-8 overflow-hidden">
      
      {/* Titre responsive : texte un peu plus petit sur mobile et break-words pour éviter le débordement */}
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold font-title text-white mb-4 sm:mb-6 border-b border-gris-magneti/30 pb-2 break-words">
          {title}
        </h2>
      )}
      
     
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-1 sm:gap-y-4 gap-x-4 text-sm sm:text-base break-words text-white">
        {children}
      </div>
      
    </div>
  );
};

export default InfoPanel;