import React from 'react';


/***
 * 
 * Le panneau d'information bg-gris-anthracite, bg-bleu-ciel pour l'en-tête, et ta classe .font-title
 * @param title
 * @param children
 */
const InfoPanel = ({ title, children }) => {
  return (
    <div className="w-full bg-gris-anthracite rounded-xl p-6 mb-6 text-white shadow-lg border border-gris-magneti/30">
    
      <div className="bg-bleu-ciel text-noir-bleute text-center font-bold py-2 px-4 rounded mb-6 text-lg font-title">
        {title}
      </div>
      
      <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-x-4 gap-y-3 text-sm">
        {children}
      </div>
    </div>
  );
};

export default InfoPanel;