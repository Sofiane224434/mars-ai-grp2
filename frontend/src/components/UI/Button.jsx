import jury_valid from "../../assets/icons/jury_valid.svg";
import jury_refuse from "../../assets/icons/jury_refuse.svg";
import jury_review from "../../assets/icons/jury_review.svg";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";

const Button = ({
  variant = "neon-yellow",
  children = "Button",
  iconImg = "",
  filterTone = "pending",
  checked = true,
  iconOnly = false,
  className = "",
  interactive = false,
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  const iconToDisplay = iconImg || panel_icon_home;
  const panelBgClass = iconOnly
    ? "pointer-events-none absolute inset-0 rounded-full bg-bleu-ocean"
    : "btn-bg-admin-base bg-bleu-ocean rounded-none";
  const panelIconClass = iconOnly
    ? "absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
    : "status-base-icon-jury";
  const homePanelIconClass = iconOnly
    ? "absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
    : "status-base-icon-jury-accueil";
  const filterToneClasses = {
    approved: {
      bg: "bg-vert-insecateur",
      text: "text-green-800",
    },
    review: {
      bg: "bg-jaune-simpson",
      text: "text-ocre-rouge",
    },
    rejected: {
      bg: "bg-red-500",
      text: "text-brulure-despespoir",
    },
    pending: {
      bg: "bg-gris-magneti",
      text: "text-gris-anthracite",
    },
  };
  const currentFilterTone =
    filterToneClasses[filterTone] || filterToneClasses.pending;

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
        <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre bg-jaune-souffre" />
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
    // Status Jury
    //---------------------------------------------------------------------------------------------------------

    // Variante 1 : Approuvé
    "approved-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-vert-picollo" />
          <img
            className="status-base-icon-jury translate-x-5"
            alt="Icon"
            src={jury_valid}
          />
        </div>
      ),
    },

    // Variante 2 : Rejeté
    "rejected-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-red-500" />
          <img
            className="status-base-icon-jury translate-x-5 -translate-y-2.5"
            alt="Icon"
            src={jury_refuse}
          />
        </div>
      ),
    },

    // Variante 3 : En attente
    "pending-jury": {
      container: "filled-jury",
      bg: (
        <div>
          <div className="btn-bg-base border-2 border-solid bg-jaune-simpson" />
          <img
            className="status-base-icon-jury translate-x-5"
            alt="Icon"
            src={jury_review}
          />
        </div>
      ),
    },

    // Variante : Filtre statuts dashboard jury
    "status-filter": {
      container: "status-filter",
      bg: (
        <div className={`btn-bg-filter ${currentFilterTone.bg}`}>
          <span
            className={`filter-checkbox ${checked ? "filter-checkbox-checked" : "filter-checkbox-unchecked"}`}
          >
            <span className={`filter-checkmark ${checked ? "opacity-100" : "opacity-0"}`}>
              ✓
            </span>
          </span>
        </div>
      ),
    },

    //---------------------------------------------------------------------------------------------------------
    // Bouton Admin
    //---------------------------------------------------------------------------------------------------------

    // Variante 1 : Bouton Panel Admin - Assigner des Vidéos
    "btn-panel": {
      container: "square-admin",
      bg: (
        <div>
          <div className={panelBgClass} />
          <img className={panelIconClass} alt="Icon" src={iconToDisplay} />
        </div>
      ),
    },

    // Variante 2 : Acceuil
    "btn-panel-home": {
      container: "home-admin",
      bg: (
        <div>
          <div className="btn-bg-admin-base rounded-none" />
          <img className={homePanelIconClass} src={iconToDisplay} alt="Icon" />
        </div>
      ),
    },
  };

  const currentVariant = variants[variant] || variants["neon-yellow"];
  const textOffsetClass =
    variant === "btn-panel-home" && !iconOnly
      ? "pl-3"
      : variant === "status-filter"
        ? "pl-6 pr-2 text-base"
      : ["approved-jury", "rejected-jury", "pending-jury"].includes(variant)
        ? "pl-5"
        : "";
  const textColorClass =
    variant === "status-filter"
      ? checked
        ? currentFilterTone.text
        : "text-black/45"
      : "";
  const filterStateClass =
    variant === "status-filter"
      ? checked
        ? "status-filter-checked"
        : "status-filter-unchecked"
      : "";
  const iconOnlyClass =
    iconOnly && (variant === "btn-panel" || variant === "btn-panel-home")
      ? "!w-14 !h-14 !p-0 !pl-0 justify-center"
      : "";
  const classes = `btn-base ${currentVariant.container} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${iconOnlyClass} ${filterStateClass} ${className}`;

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
        {!iconOnly && (
          <span
            className={`relative z-10 pointer-events-none ${textOffsetClass} ${textColorClass}`}
          >
            {children}
          </span>
        )}
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
      {!iconOnly && (
        <span
          className={`relative z-10 pointer-events-none ${textOffsetClass} ${textColorClass}`}
        >
          {children}
        </span>
      )}
    </button>
  );
};

export { Button };
export default Button;
