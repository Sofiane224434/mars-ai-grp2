import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../ui/Button.jsx';
import { EMAIL_TEMPLATES, getDefaultTemplateId } from '../../../utils/emailTemplates.js'; 

const EmailTemplateModal = ({ onClose, movie }) => {
  const sendTimeoutRef = useRef(null);
  const movieTitle = movie?.title || movie?.title_original || 'Film sans titre';
  
  const initialTemplateId = movie ? getDefaultTemplateId(movie.statusId) : 'custom';
  const initialTemplate = EMAIL_TEMPLATES[initialTemplateId];

  // États du formulaire
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [subject, setSubject] = useState(movie ? initialTemplate.getSubject(movieTitle) : '');
  const [body, setBody] = useState(movie ? initialTemplate.getBody(movie.directorFirstName, movieTitle) : '');
  const [isSending, setIsSending] = useState(false);
  
  // État de l'alerte informative
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current) {
        clearTimeout(sendTimeoutRef.current);
      }
    };
  }, []);

  if (!movie) return null;

  const handleTemplateChange = (e) => {
    const newTemplateId = e.target.value;
    setSelectedTemplateId(newTemplateId);
    
    const template = EMAIL_TEMPLATES[newTemplateId];
    if (template) {
      setSubject(template.getSubject(movieTitle));
      setBody(template.getBody(movie.directorFirstName, movieTitle));
    }
  };

 const handleSendEmail = async () => {
    // 1. On lance le spinner
    setIsSending(true);

    try {
      const token = localStorage.getItem('token');

      // 2. Appel natif (fetch) vers ton routeur backend
      const response = await fetch(`/api/admin/movies/${movie.id}/email`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // On envoie le texte brut tel qu'il a été validé ou modifié par l'admin
        body: JSON.stringify({
          subject: subject,
          body: body 
        })
      });

      // 3. Gestion des erreurs HTTP (ex: 400 si l'email a déjà été envoyé, 502 si Brevo plante)
      if (!response.ok) {
        const raw = await response.text();
        let errorMessage = "Erreur lors de la communication avec le serveur.";

        if (raw) {
          try {
            const errorData = JSON.parse(raw);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch {
            errorMessage = raw;
          }
        }

        throw new Error(errorMessage);
      }

      // 4. Succès de l'opération
      toast.success(`L'email a bien été envoyé à ${movie.directorFirstName}.`, {
        id: 'email-send-success',
        duration: 4000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });
      
      onClose(); // On ferme la modale

      // 💡 Astuce : tu pourrais déclencher ici une fonction passée en prop (ex: onEmailSent) 
      // pour rafraîchir la liste des films et faire disparaître ce film de la liste.

    } catch (error) {
      console.error("Échec de l'envoi :", error);
      toast.error(error.message, {
        duration: 5000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#ff4b4b', border: '1px solid #ff4b4b' },
      });
    } finally {
      // 5. On arrête le spinner quoi qu'il arrive
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-reglisse border-2 border-turquoise-vif/80 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* HEADER avec l'email formaté */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-title text-white mb-1">
              Modifier & envoyer l'email 
            </h3>
            <p className="text-gris-magneti text-sm flex items-center flex-wrap gap-1">
              Destinataire : 
              <span className="text-bleu-ciel font-medium">
                {movie.directorFirstName} {movie.directorLastName}
              </span>
              {movie.email && (
                <span className="text-white/90 text-xs font-mono bg-black/30 px-2 py-0.5 rounded-md ml-1 border border-gris-magneti/10">
                  {movie.email}
                </span>
              )}
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Fermer la modale"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brulure-despespoir/70 bg-transparent text-brulure-despespoir transition-colors hover:border-brulure-despespoir hover:text-brulure-despespoir/80 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CORPS DE LA MODALE */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-5">
          
          {/* NOTE INFORMATIVE FERMABLE */}
          {showInfo && (
            <div className="bg-bleu-canard/10 border border-bleu-canard/30 rounded-xl p-4 mb-2 flex items-start gap-3 relative pr-10 animate-fade-in">
              <svg className="w-5 h-5 text-bleu-ciel shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-bleu-ciel/90 leading-relaxed">
                <strong className="text-bleu-ciel">Note administrative :</strong> Cet email officialise la décision du jury. Le modèle par défaut est basé sur le statut actuel du film, mais vous pouvez le modifier librement avant l'envoi.
              </p>
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-3 right-3 text-bleu-ciel/50 hover:text-bleu-ciel transition-colors p-1 rounded-full hover:bg-bleu-canard/20"
                title="Fermer ce message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {/* SÉLECTEUR DE TEMPLATE */}
          <div className="bg-black/30 p-4 rounded-xl border border-gris-magneti/20 mt-2">
            <label className="block text-sm font-medium text-bleu-ciel mb-2">Modèle d'email (Template)</label>
            <div className="relative">
              <select 
                value={selectedTemplateId}
                onChange={handleTemplateChange}
                className="w-full bg-reglisse border border-gris-magneti/50 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-lg p-2.5 pr-10 outline-none transition-all cursor-pointer appearance-none"
              >
                {Object.values(EMAIL_TEMPLATES).map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-bleu-ciel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gris-magneti mt-2">
              Changer de modèle écrasera le texte actuel ci-dessous.
            </p>
          </div>

          {/* CHAMP OBJET */}
          <div>
            <label className="block text-sm font-semibold p-2 text-white mb-1">Objet : </label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-black/50 border border-gris-magneti/30 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-xl p-3 outline-none transition-all"
            />
          </div>

          {/* CHAMP MESSAGE */}
          <div>
            <label className="block text-sm font-semibold p-2 text-white mb-1">Message (Modifiable)</label>
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="w-full bg-black/50 border border-gris-magneti/30 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-xl p-3 outline-none transition-all resize-none font-sans"
            />
          </div>

        </div>

        {/* FOOTER - BOUTONS */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gris-magneti/20">
          <Button 
            variant="email-cancel"
            onClick={onClose}
            disabled={isSending}
            interactive
            type="button"
          >
            Annuler
          </Button>
          <Button 
            variant="email-send"
            onClick={handleSendEmail}
            disabled={isSending || !subject || !body}
            interactive
            type="button"
          >
            {isSending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Envoi en cours...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Envoyer l'email
              </>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default EmailTemplateModal;