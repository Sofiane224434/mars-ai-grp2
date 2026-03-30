import { useState } from "react";
import { Button } from "../ui/Button";
import panel_icon_assign1 from "../../assets/icons/panel_icon_assign1.png";
import panel_icon_film from "../../assets/icons/panel_icon_film.png";
import panel_icon_mail from "../../assets/icons/panel_icon_mail.png";
import panel_icon_setting from "../../assets/icons/panel_icon_setting.png";
import panel_icon_50 from "../../assets/icons/panel_icon_50.png";
import panel_icon_add from "../../assets/icons/panel_icon_add.png";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";
import panel_icon_not_watched from "../../assets/icons/panel_icon_not_watched.png";

const Sidebar = ({ variant = "admin", className = "" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const variants = {
    admin: {
      container: "mt-6 relative h-[1024px] transition-all duration-200",
      bg: <div className="absolute inset-0 bg-noir-bleute" />,
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-200",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },

    jury: {
      container: "mt-6 relative h-[1024px] transition-all duration-200",
      bg: <div className="absolute inset-0 bg-noir-bleute" />,
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-200",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },
  };

  const currentVariant = variants[variant] || variants.admin;
  const isJuryPanel = variant === "jury";
  const containerClass = `${currentVariant.container} ${
    collapsed ? "w-[92px]" : "w-[245px]"
  } ${className}`.trim();
  const contentClass = `${currentVariant.content} ${
    collapsed ? "px-3 items-center gap-3" : "px-6 items-start"
  }`.trim();

  return (
    <div className="min-h-screen bg-noir-bleute">
      <div className={containerClass}>
        {currentVariant.bg}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Ouvrir le menu" : "Fermer le menu"}
          aria-expanded={!collapsed}
          className="absolute -right-[25px] top-8 z-20 h-[50px] w-[25px] rounded-r-full bg-[#42cbe6] flex items-center justify-center pr-1.5"
        >
          {!collapsed ? (
            <span className="relative block h-4 w-4">
              <span className="absolute left-0 top-1/2 h-1 w-4 -translate-y-1/2 rotate-45 bg-bleu-canard" />
              <span className="absolute left-0 top-1/2 h-1 w-4 -translate-y-1/2 -rotate-45 bg-bleu-canard" />
            </span>
          ) : (
            <span className="ml-1 block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-bleu-canard" />
          )}
        </button>

        <div className={contentClass}>
          <Button
            variant="btn-panel-home"
            iconImg={panel_icon_home}
            iconOnly={collapsed}
          >
            ACCUEIL
          </Button>
          {!isJuryPanel && (
            <Button
              variant="btn-panel"
              iconImg={panel_icon_assign1}
              iconOnly={collapsed}
            >
              ASSIGNER VIDEOS
            </Button>
            
          )}

          {!isJuryPanel && (
          <Button
            variant="btn-panel"
            iconImg={panel_icon_mail}
            iconOnly={collapsed}
          >
            CONFIRMATION EMAIL
          </Button>
           )}

          <Button
            variant="btn-panel"
            iconImg={panel_icon_film}
            iconOnly={collapsed}
          >
            VOIR FILMS
          </Button>
         
          <Button
            variant="btn-panel"
            iconImg={panel_icon_50}
            iconOnly={collapsed}
          >
            TOP 50
          </Button>
          {isJuryPanel && (
            <Button
              variant="btn-panel"
              iconImg={panel_icon_not_watched}
              iconOnly={collapsed}
            >
              VOIR VIDÉOS NON JUGÉES
            </Button>
          )}
          {!isJuryPanel && (
            <Button
              variant="btn-panel"
              iconImg={panel_icon_add}
              iconOnly={collapsed}
            >
              AJOUTER JURY
            </Button>
          )}
          {!isJuryPanel && (
            <Button
              variant="btn-panel"
              iconImg={panel_icon_setting}
              iconOnly={collapsed}
            >
              MODIFIER LE SITE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
