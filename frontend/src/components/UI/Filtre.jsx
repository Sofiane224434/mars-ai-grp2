export const Filtre = ({
  variant = "filtre",
  children = "filtre",
  className = "",

}) => {
// Styles de base communs à tous les boutons
const baseStyles =
  "flex items-center gap-1 px-3.5 py-1 rounded-full border border-solid w-fit h-fit transition-all";

// Variant 1 : Filtre - Barre Horizontal
const variants = {
  filtre_horizontal: {
    container: "bg-red-500 border-brulure-despespoir text-brulure-despespoir",
    bg: (
      <div>
        <div className="status-base" />
        
      </div>
    ),
  },

  // Variant 2 : Filtre - Menu Vertical

  filtre_vertical: {
    container: "bg-vert-insecateur border-green-800 text-green-800",
    bg: (
      <div>
        <div className="status-base" />
        
      </div>
    ),
  },
};

const currentVariant = variants[variant] || variants.wait;
return (
    <div className={`${baseStyles} ${currentVariant.container} ${className}`}>
      {/* Couche de fond (Background/Borders) */}
      {currentVariant.bg}

      {/* Contenu du texte */}
      <span className="relative z-10">{children}</span>
    </div>
  );
};