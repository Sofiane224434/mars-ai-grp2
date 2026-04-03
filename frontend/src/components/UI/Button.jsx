import jury_valid from "../../assets/icons/jury_valid.svg";
import jury_refuse from "../../assets/icons/jury_refuse.svg";
import jury_review from "../../assets/icons/jury_review.svg";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";

const Button = ({
  variant = "neon-yellow",
  children = "Button",
  iconImg = "",
  iconClassName = "",
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
  const panelIconWithOffsetClass = `${panelIconClass} ${iconClassName}`.trim();
  const homePanelIconClass = iconOnly
    ? "absolute left-1/2 top-1/2 h-7 w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
    : "status-base-icon-jury-accueil";

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
    // Variante 2 bis : Style bouton email admin (gradient + coins arrondis)
    "email-admin": {
      container:
        "rounded-xl px-4 py-2 text-sm font-bold text-white shadow-md hover:opacity-90 transition-opacity",
      bg: (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-bleu-canard to-bleu-ciel rounded-xl" />
      ),
    },
    // Variante 3 : Gradient rouge ocre vers rouge vif - Bouton actif
    "filled-yellow": {
      container: "filled-yellow",
      bg: (
        <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre bg-jaune-souffre" />
      ),
    },

    // Variante 4 : Gradiant rouge ocre vers rouge vif rectangulaire - Bouton actif
    "square-yellow": {
      container: "square-yellow",
      bg: (
        <div className="btn-bg-base border-[5px] border-solid border-jaune-souffre bg-jaune-souffre rounded-none" />
      ),
    },

    //---------------------------------------------------------------------------------------------------------
    // Boutons de status Jury
    //---------------------------------------------------------------------------------------------------------

    // Variante 1 : Approuvé
    "approved-jury": {
      container: "jury-action",
      shadowClass:
        "shadow-[0_7px_0_rgb(10_110_58_/_0.95)] active:shadow-[0_2px_0_rgb(10_110_58_/_0.95)]",
      bg: (
        <div>
          <div className="jury-action-bg bg-vert-picollo shadow-none" />
          <img
            className="pointer-events-none absolute left-4 top-[52%] h-6 w-6 -translate-y-1/2 object-contain"
            style={{ filter: "drop-shadow(0 3px 4px rgb(0 0 0 / 0.2))" }}
            alt="Icon"
            src={jury_valid}
          />
        </div>
      ),
    },

    // Variante 2 : Rejeté
    "rejected-jury": {
      container: "jury-action",
      shadowClass:
        "shadow-[0_7px_0_rgb(140_35_35_/_0.95)] active:shadow-[0_2px_0_rgb(140_35_35_/_0.95)]",
      bg: (
        <div>
          <div className="jury-action-bg bg-red-500 shadow-none" />
          <img
            className="pointer-events-none absolute left-4 top-[52%] h-6 w-6 -translate-y-1/2 object-contain"
            style={{ filter: "drop-shadow(0 3px 4px rgb(0 0 0 / 0.2))" }}
            alt="Icon"
            src={jury_refuse}
          />
        </div>
      ),
    },

    // Variante 3 : En attente
    "pending-jury": {
      container: "jury-action",
      shadowClass:
        "shadow-[0_7px_0_rgb(168_130_0_/_0.95)] active:shadow-[0_2px_0_rgb(168_130_0_/_0.95)]",
      bg: (
        <div>
          <div className="jury-action-bg bg-jaune-simpson shadow-none" />
          <img
            className="pointer-events-none absolute left-4 top-[52%] h-6 w-6 -translate-y-1/2 object-contain"
            style={{ filter: "drop-shadow(0 3px 4px rgb(0 0 0 / 0.2))" }}
            alt="Icon"
            src={jury_review}
          />
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
          <img
            className={panelIconWithOffsetClass}
            alt="Icon"
            src={iconToDisplay}
          />
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

    //---------------------------------------------------------------------------------------------------------
    // Boutons Modal Email
    //---------------------------------------------------------------------------------------------------------

    // Variante 1 : Bouton Annuler - Bordure turquoise
    "email-cancel": {
      container: "px-5 py-2 rounded-xl border-2 border-turquoise-vif text-white hover:bg-gris-magneti/10 transition-colors font-medium disabled:opacity-50 cursor-pointer",
    },

    // Variante 2 : Bouton Envoyer - Gradient bleu
    "email-send": {
      container: "px-5 py-2 rounded-xl bg-linear-to-r from-bleu-canard to-bleu-ciel text-white font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
    },
  };

  const currentVariant = variants[variant] || variants["neon-yellow"];
  const isJuryActionVariant = [
    "approved-jury",
    "rejected-jury",
    "pending-jury",
  ].includes(variant);
  const textOffsetClass =
    variant === "btn-panel-home" && !iconOnly
      ? "pl-3"
      : isJuryActionVariant
        ? "pl-6 translate-y-px"
        : ["email-cancel", "email-send"].includes(variant)
        ? "flex items-center gap-2"
        : "";
  const iconOnlyClass =
    iconOnly && (variant === "btn-panel" || variant === "btn-panel-home")
      ? "!w-14 !h-14 !p-0 !pl-0 justify-center"
      : "";
  const classes = `btn-base ${currentVariant.container} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${iconOnlyClass} ${className}`;

  const pressWrapperClass = [
    "relative",
    className.includes("w-full") ? "block w-full" : "inline-block",
    !disabled &&
      isJuryActionVariant &&
      `${currentVariant.shadowClass} transition-shadow duration-75`,
    (isJuryActionVariant || iconOnly) && "rounded-full",
  ]
    .filter(Boolean)
    .join(" ");

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
            className={`relative z-10 pointer-events-none ${textOffsetClass}`}
          >
            {children}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={pressWrapperClass}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${classes} ${!disabled && isJuryActionVariant ? "active:translate-y-1.25 transition-transform duration-75" : ""}`}
      >
        {/* Couche de fond (Background/Borders) */}
        {currentVariant.bg}

        {/* Contenu du texte */}
        {!iconOnly && (
          <span
            className={`relative z-10 pointer-events-none ${textOffsetClass}`}
          >
            {children}
          </span>
        )}
      </button>
    </div>
  );
};

export { Button };
export default Button;
