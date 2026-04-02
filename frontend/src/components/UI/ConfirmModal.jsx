import Button from "./Button";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  confirmText = "Confirmer", 
  cancelText = "Annuler" 
}) => {
  // Si la modale n'est pas ouverte, on ne rend rien (null) dans le DOM
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-reglisse border border-bleu-ciel/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up">
        
        {/* Titre dynamique */}
        {title && (
          <h3 className="text-2xl font-title text-white mb-4 text-center">
            {title}
          </h3>
        )}
        
        {/* Contenu dynamique (texte simple ou balises HTML grâce à "children") */}
        <div className="text-gris-magneti text-center mb-8">
          {children}
        </div>

        {/* Boutons d'action dynamiques */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gris-magneti text-gris-magneti hover:bg-gris-magneti/10 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <Button
            interactive
            variant="gradient-blue"
            onClick={onConfirm}
            className="min-w-35"
          >
            {confirmText}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;