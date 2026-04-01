import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import Button from '../../ui/Button.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEV_TEMP_TOKEN = 'token_temporaire_123';

// 1. Schéma de validation Zod
const noteSchema = z.object({
  content: z.string()
    .min(2, "La note doit contenir au moins 2 caractères.")
    .max(2000, "La note est trop longue (maximum 2000 caractères).")
});

const NotesSection = ({ movieId }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const token = localStorage.getItem('token') || DEV_TEMP_TOKEN;
        
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

  // 4. Soumission d'une nouvelle note
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token') || DEV_TEMP_TOKEN;
      const payload = { movieId: parseInt(movieId, 10), content: data.content.trim() };

      const response = await axios.post(`${API_BASE_URL}/jury/comments`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        withCredentials: true
      });

      // Ajout de la nouvelle note à l'écran sans recharger la page
      setNotes((prev) => [...prev, response.data]);
      reset(); // Vide le textarea
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
      alert("Impossible d'ajouter la note.");
    }
  };

  return (
    <div className="w-full mt-4">
      {/* Zone de formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col items-center">
        <div className={`w-full mb-4 border rounded-lg p-1 ${errors.content ? 'border-brulure-despespoir' : 'border-bleu-ciel'}`}>
          <div className="text-white mb-2 px-2 pt-2 font-title">Ajouter une note personnelle :</div>
          <textarea 
            {...register("content")}
            disabled={isSubmitting}
            className="w-full bg-reglisse text-white p-3 rounded-md border-none outline-none resize-none h-24 placeholder-gris-magneti disabled:opacity-50"
            placeholder="Saisissez votre note ici..."
          />
        </div>
        
        {/* Affichage de l'erreur Zod */}
        {errors.content && (
          <p className="text-brulure-despespoir text-xs w-full text-left mb-2 px-2">
            {errors.content.message}
          </p>
        )}

        <Button
          interactive
          variant="gradient-blue"
          type="submit"
          disabled={!contentValue?.trim() || isSubmitting}
        >
          {isSubmitting ? "Envoi..." : "Ajouter une note"}
        </Button>
      </form>

      {/* Liste des anciennes notes */}
      <div className="text-white mb-3 text-lg font-title w-full text-left">Vos notes personnelles :</div>
      <div className="flex flex-col gap-3 w-full">
        {isLoading ? (
          <div className="text-bleu-ciel text-sm animate-pulse">Chargement de vos notes...</div>
        ) : notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={note.id || index} className="bg-bleu-canard text-white p-4 rounded-xl shadow-md">
              <p className="text-sm whitespace-pre-wrap">{note.content}</p>
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