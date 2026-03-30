import React from 'react';
import Button from '../../ui/Button.jsx';

const NotesSection = ({ notes, onAddNote }) => {
  return (
    <div className="w-full mt-4">
      {/* Zone d'ajout */}
      <div className="mb-6 border border-bleu-ciel rounded-lg p-1">
        <div className="text-white mb-2 px-2 pt-2 font-title">Ajouter une note personnelle :</div>
        <textarea 
          className="w-full bg-reglisse text-white p-3 rounded-md border-none outline-none resize-none h-24 placeholder-gris-magneti"
          placeholder="Saisissez votre note ici..."
        />
      </div>

      <Button
        interactive
        variant="gradient-blue"
        onClick={onAddNote}
        className="mb-6 text-noir-bleute font-bold text-xs uppercase"
      >
        Ajouter une note
      </Button>

      {/* Liste des anciennes notes */}
      <div className="text-white mb-3 text-lg font-title">Vos notes personnelles :</div>
      <div className="flex flex-col gap-3">
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="bg-bleu-canard text-white p-4 rounded-xl shadow-md">
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