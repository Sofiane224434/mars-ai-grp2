import { Button } from "./Button";
import panel_icon_assign1 from "../../assets/icons/panel_icon_assign1.png";
import panel_icon_film from "../../assets/icons/panel_icon_film.png";
import panel_icon_mail from "../../assets/icons/panel_icon_mail.png";
import panel_icon_setting from "../../assets/icons/panel_icon_setting.png";
import panel_icon_50 from "../../assets/icons/panel_icon_50.png";
import panel_icon_add from "../../assets/icons/panel_icon_add.png";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";

function MainLayoutAdmin() {
  return (
    <div className="min-h-screen">
      <div className="mt-6 relative w-[245px] h-[1024px]">
        <div className="absolute inset-0 bg-noir-bleute" />
        <div className="relative z-10 h-full px-6 flex flex-col items-start gap-0">
          <p className="w-full text-center text-white font-normal text-2xl mb-2">
            PANEL ADMINISTRATION
          </p>
          <Button variant="btn-panel-home" iconImg={panel_icon_home}>
            ACCUEIL
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_assign1}>
            ASSIGNER VIDEOS
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_film}>
            VOIR FILMS
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_mail}>
            OPTIONS MAIL
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_50}>
            TOP 50
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_add}>
            AJOUTER JURY
          </Button>
          <Button variant="btn-panel" iconImg={panel_icon_setting}>
            MODIFIER LE SITE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainLayoutAdmin;
