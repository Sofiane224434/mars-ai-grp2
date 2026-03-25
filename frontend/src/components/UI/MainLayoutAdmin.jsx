import { Button } from "./Button";
import panel_icon_assign1 from "../../assets/icons/panel_icon_assign1.png";
import panel_icon_film from "../../assets/icons/panel_icon_film.png";
import panel_icon_mail from "../../assets/icons/panel_icon_mail.png";
import panel_icon_setting from "../../assets/icons/panel_icon_setting.png";
import panel_icon_50 from "../../assets/icons/panel_icon_50.png";
import panel_icon_add from "../../assets/icons/panel_icon_add.png";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";
import panel_icon_not_watched from "../../assets/icons/panel_icon_not_watched.png";

const MainLayoutAdmin = ({ variant = "admin", title = "", className = "" }) => {
  const variants = {
    admin: {
      container: "mt-6 relative w-[245px] h-[1024px]",
      bg: <div className="absolute inset-0 bg-noir-bleute" />,
      content: "relative z-10 h-full px-6 pt-8 flex flex-col items-start gap-0",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
      heading: "PANEL ADMINISTRATION",
    },

    jury: {
      container: "mt-6 relative w-[245px] h-[1024px]",
      bg: <div className="absolute inset-0 bg-noir-bleute" />,
      content: "relative z-10 h-full px-6 pt-8 flex flex-col items-start gap-0",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
      heading: "PANEL JURY",
    },
  };

  const currentVariant = variants[variant] || variants.admin;
  const isJuryPanel = variant === "jury";
  const containerClass = `${currentVariant.container} ${className}`.trim();
  const displayedTitle = title || currentVariant.heading;

  return (
    <div className="min-h-screen">
      <div className={containerClass}>
        {currentVariant.bg}
        <div className={currentVariant.content}>
          <p className={currentVariant.title}>{displayedTitle}</p>
          <Button variant="btn-panel-home" iconImg={panel_icon_home}>
            ACCUEIL
          </Button>
          {!isJuryPanel && (
            <Button variant="btn-panel" iconImg={panel_icon_assign1}>
              ASSIGNER VIDEOS
            </Button>
          )}
          <Button variant="btn-panel" iconImg={panel_icon_film}>
            VOIR FILMS
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_mail}>
            OPTIONS MAIL
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_50}>
            TOP 50
          </Button>
          {isJuryPanel && (
            <Button variant="btn-panel" iconImg={panel_icon_not_watched}>
              VOIR VIDÉO NON JUGÉS
            </Button>
          )}
          {!isJuryPanel && (
            <Button variant="btn-panel" iconImg={panel_icon_add}>
              AJOUTER JURY
            </Button>
          )}
          {!isJuryPanel && (
            <Button variant="btn-panel" iconImg={panel_icon_setting}>
              MODIFIER LE SITE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayoutAdmin;
