import icon_valid from "../../assets/icons/icon_valid.png";
import icon_refuse from "../../assets/icons/icon_refuse.png";
import icon_review from "../../assets/icons/icon_review.png";
import icon_wait from "../../assets/icons/icon_wait.png";

export const Status = ({
  variant = "pending",
  children = "Status",
  className = "",
}) => {
  // Styles de base communs à tous les boutons
  const baseStyles =
    "flex items-center gap-1 px-3.5 py-1 rounded-full border border-solid w-fit h-fit transition-all";

  // Variant 1 : refusé (Rouge)
  const variants = {
    rejected: {
      container: "bg-red-500 border-brulure-despespoir text-brulure-despespoir",
      bg: (
        <div>
          <div className="status-base" />
          <img className="status-base-icon" alt="Icon" src={icon_refuse} />
        </div>
      ),
    },

    // Variant 2 : validé

    approved: {
      container: "bg-vert-insecateur border-green-800 text-green-800",
      bg: (
        <div>
          <div className="status-base" />
          <img className="status-base-icon" alt="Icon" src={icon_valid} />
        </div>
      ),
    },

    // Variant 3 : A revoir
    review: {
      container: "bg-jaune-simpson border-orange-genial text-yellow-800",
      icon: "",
      bg: (
        <div>
          <div className="status-base" />
          <img className="status-base-icon" alt="Icon" src={icon_review} />
        </div>
      ),
    },

    // Variant 4 : En attente
    pending: {
      container: "bg-gris-magneti border-gray-800 text-gray-800",
      icon: "",
      bg: (
        <div>
          <div className="status-base" />
          <img className="status-base-icon" alt="Icon" src={icon_wait} />
        </div>
      ),
    },
  };

  const currentVariant = variants[variant] || variants.pending;

  return (
    <div className={`${baseStyles} ${currentVariant.container} ${className}`}>
      {/* Couche de fond (Background/Borders) */}
      {currentVariant.bg}

      {/* Contenu du texte */}
      <span className="relative z-10">{children}</span>
    </div>
  );
};
