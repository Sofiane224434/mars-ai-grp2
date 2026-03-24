import jury_valid from "../../assets/icons/jury_valid.svg"
import jury_refuse from "../../assets/icons/jury_refuse.svg"
import jury_review from "../../assets/icons/jury_review.svg"



const Button = ({
  variant = "neon-yellow",
  children = "Button",
  className = "",
  interactive = false,
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  //---------------------------------------------------------------------------------------------------------
  // Bouton Public
  //---------------------------------------------------------------------------------------------------------

  // Configuration des variantes
  const variants = {
    // Variante 1 : Bordure jaune souffre (Border) - Bouton inactif
    "neon-yellow": {
      container: "neon-yellow",
      bg: (
        <>
          <div className="btn-bg-base blur-[3.9px] border-[5px] border-solid border-jaune-souffre" />
          <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre" />
        </>
      ),
    },
    // Variante 2 : Gradient turquoise vif vers bleu canard - Bouton submit
    "gradient-blue": {
      container: "gradient-blue",
      bg: (
        <div className="btn-bg-base bg-linear-to-r from-turquoise-vif to-bleu-canard" />
      ),
    },
    // Variante 3 : Gradient rouge ocre vers rouge vif - Bouton actif
    "filled-yellow": {
      container: "filled-yellow",
      bg: (
        <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre bg-jaune-souffre"  />
      ),
    },

    // Variente 4 : Gradiant rouge ocre vers rouge vif rectangulaire - Bouton actif
    "square-yellow": {
      container: "square-yellow",
      bg: (
        <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre bg-jaune-souffre rounded-none" />
      ),
    },

    //---------------------------------------------------------------------------------------------------------
    // Bouton Jury
    //---------------------------------------------------------------------------------------------------------

    // Variante 1 : Validé
    "valid-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-vert-picollo" />
          <img className="status-base-icon-jury" alt="Icon" src={jury_valid} />
        </div>
      ),
    },

    // Variante 2 : Refusé
    "refuse-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-red-500" />
          <img className="status-base-icon-jury" alt="Icon" src={jury_refuse} />
        </div>
      ),
    },

    // Variante 3 : À Revoir
    "review-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-jaune-simpson" />
          <img className="status-base-icon-jury" alt="Icon" src={jury_review} />
        </div>
      ),
    },
  };

  const currentVariant = variants[variant] || variants["neon-yellow"];
  const classes = `btn-base ${currentVariant.container} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`;

  if (!interactive) {
    return (
      <span
        aria-label={ariaLabel}
        aria-disabled={disabled ? "true" : undefined}
        className={classes}
      >
        {/* Couche de fond (Background/Borders) */}
        {currentVariant.bg}

        {/* Contenu du texte */}
        <span className="relative z-10 pointer-events-none">{children}</span>
      </span>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {/* Couche de fond (Background/Borders) */}
      {currentVariant.bg}

      {/* Contenu du texte */}
      <span className="relative z-10 pointer-events-none">{children}</span>
    </button>
  );
};

export default Button;
