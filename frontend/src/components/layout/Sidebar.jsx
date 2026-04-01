import { useState } from "react";
import { Button } from "../ui/Button";

import { Link } from "react-router-dom";
import panel_icon_assign1 from "../../assets/icons/panel_icon_assign1.png";
import panel_icon_mail from "../../assets/icons/panel_icon_mail.png";
import panel_icon_setting from "../../assets/icons/panel_icon_setting.png";
import panel_icon_50 from "../../assets/icons/panel_icon_50.png";
import panel_icon_5 from "../../assets/icons/panel_icon_5.png";
import panel_icon_add from "../../assets/icons/panel_icon_add.png";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";
import panel_icon_not_watched from "../../assets/icons/panel_icon_not_watched.png";

const Sidebar = ({ variant = "admin", className = "" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const variants = {
    admin: {
      container: "mt-6 relative max-h-screen transition-all duration-200",
      bg: (
        <div className="absolute -top-1 -bottom-5 left-0 right-0 bg-noir-bleute" />
      ),
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-200",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },

    jury: {
      container: "mt-6 relative max-h-screen transition-all duration-200",
      bg: (
        <div className="absolute -top-1 -bottom-5 left-0 right-0 bg-noir-bleute" />
      ),
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-200",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },
  };

  const currentVariant = variants[variant] || variants.admin;
  const isJuryPanel = variant === "jury";
  const containerClass =
    `mt-1 relative min-h-screen transition-all duration-200 ${
      collapsed ? "w-[110px]" : "w-[245px]"
    } ${className}`.trim();
  const contentClass = `${currentVariant.content} ${
    collapsed ? "px-1 items-center gap-3" : "px-2 items-center gap-0"
  }`.trim();

  return (
    <div className="sticky top-0 self-start max-h-screen h-screen">
      <div className={containerClass}>
        {currentVariant.bg}
        <div className="relative z-40">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Ouvrir le menu" : "Fermer le menu"}
            aria-expanded={!collapsed}
            className="absolute -right-[25px] top-8 z-20 h-[50px] w-[25px] rounded-r-full bg-[#42cbe6] flex items-center justify-center pr-1.5"
          >
            {!collapsed ? (
              <span className="relative block h-4 w-40">
                <span className="absolute left-0 top-1/2 h-1 w-4 -translate-y-1/2 rotate-45 bg-bleu-canard" />
                <span className="absolute left-0 top-1/2 h-1 w-4 -translate-y-1/2 -rotate-45 bg-bleu-canard" />
              </span>
            ) : (
              <span className="ml-1 block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-bleu-canard" />
            )}
          </button>

          <div className={contentClass}>
            <Link to="/dashboard/adminpanel">
              <Button
                variant="btn-panel-home"
                iconImg={panel_icon_home}
                iconOnly={collapsed}
                className={collapsed ? "mb-4 ml-0" : "mb-5 ml-2"}
                iconClassName={collapsed ? "-translate-x-4" : "-translate-x-2"}
              >
                ACCUEIL
              </Button>
            </Link>

            {!isJuryPanel && (
              <Link to="/dashboard/movies">
                <Button
                  variant="btn-panel"
                  iconImg={panel_icon_assign1}
                  iconOnly={collapsed}
                  iconClassName={
                    collapsed ? "-translate-x-5" : "-translate-x-4"
                  }
                >
                  GÉRER LES VIDEOS
                </Button>
              </Link>
            )}

            {isJuryPanel && (
              <Link to="/dashboard/options">
                <Button
                  variant="btn-panel"
                  iconImg={panel_icon_mail}
                  iconOnly={collapsed}
                  iconClassName={
                    collapsed ? "-translate-x-4" : "-translate-x-4"
                  }
                >
                  CONFIRMATION EMAIL
                </Button>
              </Link>
            )}

            <Link to="/dashboard/top50">
              <Button
                variant="btn-panel"
                iconImg={panel_icon_50}
                iconClassName={collapsed ? "-translate-x-6" : "-translate-x-11"}
                iconOnly={collapsed}
              >
                TOP 50
              </Button>
            </Link>

            <Link to="/dashboard/top5">
              <Button
                variant="btn-panel"
                iconImg={panel_icon_5}
                iconClassName={
                  collapsed
                    ? "scale-250 !translate-x-[-50%]"
                    : "scale-250 -translate-x-11"
                }
                iconOnly={collapsed}
              >
                TOP 5
              </Button>
            </Link>

            {isJuryPanel && (
              <Link to="/dashboard/validation">
                <Button
                  variant="btn-panel"
                  iconImg={panel_icon_not_watched}
                  iconClassName={
                    collapsed ? "-translate-x-1" : "-translate-x-4"
                  }
                  iconOnly={collapsed}
                >
                  VOIR VIDÉOS NON JUGÉES
                </Button>
              </Link>
            )}

            {!isJuryPanel && (
              <Link to="/dashboard/adminpanel/invitejury">
                <Button
                  variant="btn-panel"
                  iconImg={panel_icon_add}
                  iconOnly={collapsed}
                  iconClassName={
                    collapsed ? "-translate-x-3.5" : "-translate-x-4"
                  }
                >
                  AJOUTER JURY
                </Button>
              </Link>
            )}
            {!isJuryPanel && (
              <Link to="/dashboard/adminpanel/editsite">
                <Button
                  variant="btn-panel"
                  iconImg={panel_icon_setting}
                  iconOnly={collapsed}
                  iconClassName={
                    collapsed ? "-translate-x-3.5" : "-translate-x-4"
                  }
                >
                  MODIFIER LE SITE
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
