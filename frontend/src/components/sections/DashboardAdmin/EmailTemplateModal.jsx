import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../ui/Button.jsx';
import { getDefaultTemplateId, getTemplatesByScope, EMAIL_TEMPLATES } from '../../../utils/emailTemplates.js';

const EmailTemplateModal = ({ onClose, movie, variant = 'movie' }) => {
  const sendTimeoutRef = useRef(null);
  const isJuryVariant = variant === 'jury';
  const movieTitle = movie?.title || movie?.title_original || 'Film sans titre';
  const templates = isJuryVariant
    ? [EMAIL_TEMPLATES.jury_invitation]
    : getTemplatesByScope('movie');

  const initialTemplateId = isJuryVariant
    ? 'jury_invitation'
    : movie
      ? getDefaultTemplateId(movie.statusId)
      : 'custom';
  const initialTemplate = EMAIL_TEMPLATES[initialTemplateId];

  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [subject, setSubject] = useState(
    isJuryVariant ? initialTemplate.getSubject() : movie ? initialTemplate.getSubject(movieTitle) : '',
  );
  const [body, setBody] = useState(
    isJuryVariant ? initialTemplate.getBody() : movie ? initialTemplate.getBody(movie.directorFirstName, movieTitle) : '',
  );
  const [isSending, setIsSending] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [juryError, setJuryError] = useState('');
  const [juryResult, setJuryResult] = useState(null);

  useEffect(() => {
    const timeoutId = sendTimeoutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const nextTemplate = EMAIL_TEMPLATES[initialTemplateId];
    setSelectedTemplateId(initialTemplateId);
    setSubject(
      isJuryVariant ? nextTemplate.getSubject() : movie ? nextTemplate.getSubject(movieTitle) : '',
    );
    setBody(
      isJuryVariant ? nextTemplate.getBody() : movie ? nextTemplate.getBody(movie.directorFirstName, movieTitle) : '',
    );
    setEmails([]);
    setEmailInput('');
    setJuryError('');
    setJuryResult(null);
  }, [initialTemplateId, isJuryVariant, movie, movieTitle]);

  if (!isJuryVariant && !movie) return null;

  const handleTemplateChange = (e) => {
    const newTemplateId = e.target.value;
    setSelectedTemplateId(newTemplateId);

    const template = EMAIL_TEMPLATES[newTemplateId];
    if (template) {
      setSubject(isJuryVariant ? template.getSubject() : template.getSubject(movieTitle));
      setBody(
        isJuryVariant ? template.getBody() : template.getBody(movie.directorFirstName, movieTitle),
      );
    }
  };

  const resetJuryForm = () => {
    const template = EMAIL_TEMPLATES.jury_invitation;
    setEmails([]);
    setEmailInput('');
    setJuryError('');
    setJuryResult(null);
    setSelectedTemplateId(template.id);
    setSubject(template.getSubject());
    setBody(template.getBody());
  };

  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (!trimmed) return;
    if (emails.includes(trimmed)) {
      setJuryError('Cet email est déjà dans la liste.');
      return;
    }

    setEmails((prev) => [...prev, trimmed]);
    setEmailInput('');
    setJuryError('');
  };

  const removeEmail = (index) => {
    setEmails((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  const handleSendMovieEmail = async () => {
    setIsSending(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/movies/${movie.id}/email`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          subject: subject,
          body: body
        })
      });

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

      toast.success(`L'email a bien été envoyé à ${movie.directorFirstName}.`, {
        id: 'email-send-success',
        duration: 4000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });

      onClose?.();
    } catch (error) {
      console.error("Échec de l'envoi :", error);
      toast.error(error.message, {
        duration: 5000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#ff4b4b', border: '1px solid #ff4b4b' },
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendJuryInvitation = async () => {
    if (emails.length === 0) {
      setJuryError('Ajoute au moins un email.');
      setJuryResult(null);
      return;
    }

    setIsSending(true);
    setJuryError('');
    setJuryResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/jury/invite', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ emails, subject, body }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Impossible d\'envoyer les invitations.');
      }

      setJuryResult({ sent: data?.sent ?? 0, failed: data?.failed ?? 0 });
      setEmails([]);
      setEmailInput('');
      toast.success('Les invitations jury ont bien été envoyées.', {
        id: 'jury-invite-success',
        duration: 4000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#fff', border: '1px solid #4DB8B9' },
      });
    } catch (error) {
      console.error("Échec de l'envoi des invitations :", error);
      setJuryError(error.message);
      toast.error(error.message, {
        duration: 5000,
        position: 'bottom-center',
        style: { background: '#1A232C', color: '#ff4b4b', border: '1px solid #ff4b4b' },
      });
    } finally {
      setIsSending(false);
    }
  };

  const content = (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`${isJuryVariant ? 'text-xl md:text-2xl' : 'text-2xl'} font-title text-white mb-1`}>
            {isJuryVariant ? 'Inviter des membres du jury' : 'Modifier & envoyer l\'email'}
          </h3>
          {isJuryVariant ? (
            <p className="text-gris-magneti text-xs md:text-sm leading-relaxed max-w-2xl">
              Utilise le template d&apos;invitation partagé, ajoute un ou plusieurs jurés avec le bouton +,
              puis adapte l&apos;objet ou le message si nécessaire.
            </p>
          ) : (
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
          )}
        </div>
        {!isJuryVariant && (
          <button
            onClick={onClose}
            aria-label="Fermer la modale"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brulure-despespoir/70 bg-transparent text-brulure-despespoir transition-colors hover:border-brulure-despespoir hover:text-brulure-despespoir/80 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className={`flex-1 ${isJuryVariant ? 'space-y-4' : 'overflow-y-auto pr-2 custom-scrollbar space-y-5'}`}>
        {showInfo && !isJuryVariant && (
          <div className="bg-bleu-canard/10 border border-bleu-canard/30 rounded-xl p-4 mb-2 flex items-start gap-3 relative pr-10 animate-fade-in">
            <svg className="w-5 h-5 text-bleu-ciel shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-bleu-ciel/90 leading-relaxed">
              <strong className="text-bleu-ciel">Note administrative :</strong>{' '}
              {'Cet email officialise la décision du jury. Le modèle par défaut est basé sur le statut actuel du film, mais vous pouvez le modifier librement avant l\'envoi.'}
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

        {isJuryVariant && (
          <div className="rounded-xl border border-gris-magneti/20 bg-black/30 p-4">
            <label className="mb-2 block text-sm font-medium text-bleu-ciel">Adresses email</label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                placeholder="jury@mail.com"
                className="w-full rounded-xl border border-gris-magneti/30 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel"
              />
              <button
                type="button"
                onClick={addEmail}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-bleu-canard to-bleu-ciel text-xl font-bold text-white shadow-md transition-opacity hover:opacity-90"
                aria-label="Ajouter un email à la liste"
              >
                +
              </button>
            </div>
            {emails.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <li key={`${email}-${index}`} className="flex items-center gap-2 rounded-full border border-bleu-canard/30 bg-bleu-canard/10 px-3 py-1.5 text-sm text-white">
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="text-bleu-ciel/60 transition-colors hover:text-brulure-despespoir"
                      aria-label={`Retirer ${email}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!isJuryVariant && templates.length > 1 && (
          <div className="bg-black/30 p-4 rounded-xl border border-gris-magneti/20 mt-2">
            <label className="block text-sm font-medium text-bleu-ciel mb-2">Modèle d'email (Template)</label>
            <div className="relative">
              <select
                value={selectedTemplateId}
                onChange={handleTemplateChange}
                className="w-full bg-reglisse border border-gris-magneti/50 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-lg p-2.5 pr-10 outline-none transition-all cursor-pointer appearance-none"
              >
                {templates.map((tpl) => (
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
        )}

        {isJuryVariant && (
          <div className="rounded-xl border border-bleu-canard/30 bg-bleu-canard/10 px-3 py-2 text-xs text-bleu-ciel md:text-sm">
            Le nom du juré, le lien de connexion sécurisé, le token d&apos;accès personnel et sa date d&apos;expiration sont générés et ajoutés automatiquement avant l&apos;envoi. Inutile de les inclure dans le message.
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold p-2 text-white mb-1">Objet</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black/50 border border-gris-magneti/30 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-xl p-3 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold p-2 text-white mb-1">
            {isJuryVariant ? 'Message' : 'Message (Modifiable)'}
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={isJuryVariant ? 10 : 8}
            className="w-full bg-black/50 border border-gris-magneti/30 text-white focus:border-bleu-ciel focus:ring-1 focus:ring-bleu-ciel rounded-xl p-3 outline-none transition-all resize-none font-sans"
          />
        </div>

        {isJuryVariant && juryError && <p className="text-sm text-brulure-despespoir">{juryError}</p>}

        {isJuryVariant && juryResult && (
          <p className="text-sm text-gris-magneti">
            Invitations envoyées : <strong className="text-white">{juryResult.sent}</strong> | Échecs : <strong className="text-white">{juryResult.failed}</strong>
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gris-magneti/20">
        <Button
          variant="email-cancel"
          onClick={isJuryVariant ? resetJuryForm : onClose}
          disabled={isSending}
          interactive
          type="button"
          className="h-11"
        >
          {isJuryVariant ? 'Réinitialiser' : 'Annuler'}
        </Button>
        <Button
          variant="email-send"
          onClick={isJuryVariant ? handleSendJuryInvitation : handleSendMovieEmail}
          disabled={isSending || !subject.trim() || !body.trim() || (isJuryVariant && emails.length === 0)}
          interactive
          type="button"
          className="h-11"
        >
          {isSending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {isJuryVariant ? 'Envoi en cours...' : 'Envoi en cours...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              {isJuryVariant ? 'Envoyer les invitations' : "Envoyer l'email"}
            </>
          )}
        </Button>
      </div>
    </>
  );

  if (isJuryVariant) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-6">
        <div className="bg-reglisse border-2 border-turquoise-vif/80 rounded-2xl p-5 md:p-6 w-full shadow-2xl flex flex-col">
          {content}
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-reglisse border-2 border-turquoise-vif/80 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
        {content}
      </div>
    </div>
  );
};

export default EmailTemplateModal;