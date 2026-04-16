import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import Button from '../../ui/Button.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 1. Schéma de validation Zod
const noteSchema = z.object({
  content: z.string()
    .min(2, "La note doit contenir au moins 2 caractères.")
    .max(2000, "La note est trop longue (maximum 2000 caractères).")
});

const NotesSection = ({ movieId }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState('private');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  // 2. Initialisation de React Hook Form
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { content: '' }
  });

  // Pour désactiver le bouton si le champ est vide (comme tu le faisais avec noteInput)
  const contentValue = watch("content");

  // 3. Récupération des notes au chargement
  useEffect(() => {
    const fetchNotes = async () => {
      if (!movieId) return;

      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        // Appel GET avec le movieId en paramètre
        const response = await axios.get(`${API_BASE_URL}/jury/comments?movieId=${movieId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        });

        setNotes(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des notes :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [movieId]);

  const resetFormState = () => {
    setEditingNoteId(null);
    setVisibility('private');
    setSubmitError('');
    reset({ content: '' });
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setVisibility(note.isPrivate ? 'private' : 'public');
    setSubmitError('');
    reset({ content: note.content || '' });
  };

  const handleDelete = async (noteId) => {
    const shouldDelete = window.confirm('Supprimer cette note ?');
    if (!shouldDelete) return;

    try {
      setDeletingNoteId(noteId);
      setSubmitError('');
      const token = localStorage.getItem('token');

      await axios.delete(`${API_BASE_URL}/jury/comments/${noteId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        withCredentials: true
      });

      setNotes((prev) => prev.filter((note) => note.id !== noteId));

      if (editingNoteId === noteId) {
        resetFormState();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la note :', error);
      setSubmitError('Impossible de supprimer la note.');
    } finally {
      setDeletingNoteId(null);
    }
  };

  // 4. Soumission d'une note (création ou modification)
  const onSubmit = async (data) => {
    try {
      setSubmitError('');
      const token = localStorage.getItem('token');
      const normalizedContent = data.content.trim();
      const payload = {
        content: normalizedContent,
        isPrivate: visibility === 'private' ? 1 : 0,
      };

      if (editingNoteId) {
        const response = await axios.put(`${API_BASE_URL}/jury/comments/${editingNoteId}`, payload, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        });

        setNotes((prev) => prev.map((note) => (
          note.id === editingNoteId ? response.data : note
        )));
      } else {
        const response = await axios.post(`${API_BASE_URL}/jury/comments`, {
          movieId: parseInt(movieId, 10),
          ...payload,
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true
        });

        setNotes((prev) => [...prev, response.data]);
      }

      resetFormState();

    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
      const message = error?.response?.data?.message || "Impossible d'enregistrer la note.";
      setSubmitError(message);
    }
  };

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col items-center">
        <div className={`w-full mb-4 rounded-2xl border p-4 ${errors.content ? 'border-brulure-despespoir/70' : 'border-bleu-ciel/20'} bg-reglisse/90 shadow-[0_12px_30px_rgba(0,0,0,0.18)]`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-white mb-1 font-title">
                {editingNoteId ? 'Modifier la note' : 'Ajouter une note'}
              </div>
              <div className="text-xs text-gris-magneti flex items-center gap-1.5 italic">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Choisissez si elle reste privée ou visible par l&apos;admin.
              </div>
            </div>

            <div className="flex rounded-full border border-bleu-ciel/20 bg-noir-bleute/40 p-1">
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${visibility === 'private' ? 'bg-bleu-canard text-white shadow-md' : 'text-gris-magneti hover:text-white'}`}
              >
                Privée
              </button>
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${visibility === 'public' ? 'bg-vert-picollo text-noir-bleute shadow-md' : 'text-gris-magneti hover:text-white'}`}
              >
                Publique
              </button>
            </div>
          </div>

          <textarea
            {...register("content")}
            disabled={isSubmitting}
            className="mt-4 w-full min-h-24 resize-none rounded-xl border border-white/8 bg-noir-bleute/40 p-3 text-white outline-none placeholder-gris-magneti disabled:opacity-50"
            placeholder="Saisissez votre note ici..."
          />
        </div>

        {errors.content && (
          <p className="text-brulure-despespoir text-xs w-full text-left mb-2 px-2">
            {errors.content.message}
          </p>
        )}

        {submitError && (
          <p className="text-brulure-despespoir text-xs w-full text-left mb-2 px-2">
            {submitError}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Button
            interactive
            variant="gradient-blue"
            type="submit"
            disabled={!contentValue?.trim() || isSubmitting}
          >
            {isSubmitting
              ? (editingNoteId ? 'Mise à jour...' : 'Envoi...')
              : (editingNoteId ? 'Mettre à jour la note' : 'Ajouter une note')}
          </Button>

          {editingNoteId && (
            <button
              type="button"
              className="px-5 py-2 rounded-xl border border-gris-magneti/60 text-gris-magneti hover:text-white hover:border-white/50 transition-colors"
              onClick={resetFormState}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="text-white mb-3 text-lg font-title w-full text-left">Vos notes :</div>
      <div className="flex flex-col gap-3 w-full">
        {isLoading ? (
          <div className="text-bleu-ciel text-sm animate-pulse">Chargement de vos notes...</div>
        ) : notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={note.id || index} className="rounded-2xl border border-bleu-ciel/12 bg-linear-to-br from-bleu-canard/25 via-reglisse to-noir-bleute p-4 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${note.isPrivate ? 'bg-white/5 text-bleu-ciel border border-white/10' : 'bg-vert-picollo/15 text-vert-picollo border border-vert-picollo/20'}`}>
                    {note.isPrivate ? 'Privée' : 'Publique'}
                  </span>
                  <span className="text-[11px] text-gris-magneti/90">
                    {note.isPrivate ? 'Visible uniquement par vous' : 'Visible par l’admin'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startEditing(note)}
                    className="rounded-md border border-bleu-ciel/35 px-2.5 py-1 text-[11px] font-medium text-bleu-ciel hover:bg-bleu-ciel/10 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(note.id)}
                    disabled={deletingNoteId === note.id}
                    className="rounded-md border border-brulure-despespoir/45 px-2.5 py-1 text-[11px] font-medium text-brulure-despespoir hover:bg-brulure-despespoir/10 transition-colors disabled:opacity-60"
                  >
                    {deletingNoteId === note.id ? 'Suppression...' : 'Supprimer'}
                  </button>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap leading-6">{note.content}</p>
            </div>
          ))
        ) : (
          <div className="text-gris-magneti italic text-sm">Aucune note pour ce film.</div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;