import React from 'react';

const EmailTemplateModal = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-reglisse border border-bleu-ciel/30 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in-up">
        
        <h3 className="text-2xl font-title text-white mb-4">
          Envoyer une notification
        </h3>
        
        <p className="text-gris-magneti mb-6">
          Destinataire : <span className="text-bleu-ciel">{movie.directorFirstName} {movie.directorLastName}</span><br/>
          Film : <span className="text-white font-medium">{movie.title}</span>
        </p>
        
        <div className="p-4 bg-black/30 border border-gris-magneti/20 rounded-xl mb-6 text-sm text-gris-magneti italic text-center">
          L'éditeur de templates sera intégré ici prochainement.
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gris-magneti text-gris-magneti hover:bg-gris-magneti/10 transition-colors font-medium"
          >
            Annuler
          </button>
          <button 
            disabled
            className="px-6 py-2 rounded-full bg-gris-magneti/30 text-gris-magneti cursor-not-allowed font-medium"
          >
            Envoyer l'email
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailTemplateModal;