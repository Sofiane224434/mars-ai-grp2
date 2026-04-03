import { useState } from "react";
import { Button } from "../ui/Button";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import panel_icon_assign1 from "../../assets/icons/panel_icon_assign1.png";
import panel_icon_mail from "../../assets/icons/panel_icon_mail.png";
import panel_icon_setting from "../../assets/icons/panel_icon_setting.png";
import panel_icon_add from "../../assets/icons/panel_icon_add.png";
import panel_icon_home from "../../assets/icons/panel_icon_home.png";
import panel_icon_not_watched from "../../assets/icons/panel_icon_not_watched.png";

const Sidebar = ({ variant = "admin", className = "" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
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
  const { id: juryId } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la deconnexion :", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setMobileOpen(false);
      navigate("/auth", { replace: true });
      setIsLoggingOut(false);
    }
  };
  const containerClass =
    `mt-1 relative min-h-screen h-full transition-all duration-200 w-[245px] ${collapsed ? "lg:w-[110px]" : ""
      } ${className}`.trim();
  const contentClass = `${currentVariant.content} flex-1 px-2 items-center gap-0 ${collapsed ? "lg:px-1 lg:items-center lg:gap-3" : ""
    }`.trim();

  return (
    <>
      {/* ── MOBILE : drawer qui s'ouvre par le haut ── */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-50 bg-noir-bleute transition-transform duration-300 lg:hidden flex flex-col ${mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Bouton fermer */}
        <button
          type="button"
          className="absolute top-2 right-2 z-10 h-9 w-9 flex items-center justify-center rounded-full border border-white/30 bg-noir-bleute/90 text-white shadow-sm transition-colors hover:bg-bleu-ocean/85"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
        >
          <span className="relative block h-3.5 w-3.5">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-white" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-white" />
          </span>
        </button>

        {/* Items en grille 3×n */}
        <nav className="flex flex-wrap justify-center gap-3 px-4 pt-12 pb-5">
          <Link to={isJuryPanel ? `/dashboard/jury/${juryId}` : "/dashboard/admin"} onClick={() => setMobileOpen(false)}>
            <Button
              variant="btn-panel-home"
              iconImg={panel_icon_home}
              iconOnly
              className="h-12! w-12!"
            >
              ACCUEIL
            </Button>
          </Link>

          {!isJuryPanel && (
            <Link to="/dashboard/admin" onClick={() => setMobileOpen(false)}>
              <Button
                variant="btn-panel"
                iconImg={panel_icon_assign1}
                iconOnly
                className="h-12! w-12!"
              >
                GÉRER LES VIDEOS
              </Button>
            </Link>
          )}

          {!isJuryPanel && (
            <Link to="/dashboard/admin/confirmation-mail" onClick={() => setMobileOpen(false)}>
              <Button
                variant="btn-panel"
                iconImg={panel_icon_mail}
                iconOnly
                className="h-12! w-12!"
              >
                CONFIRMATION EMAIL
              </Button>
            </Link>
          )}

          {isJuryPanel && (
            <Link to={`/dashboard/jury/${juryId}/movies`} onClick={() => setMobileOpen(false)}>
              <Button
                variant="btn-panel"
                iconImg={panel_icon_not_watched}
                iconOnly
                className="h-12! w-12!"
              >
                JUGER LES VIDÉOS
              </Button>
            </Link>
          )}

          {!isJuryPanel && (
            <Link to="/dashboard/admin/invitejury" onClick={() => setMobileOpen(false)}>
              <Button
                variant="btn-panel"
                iconImg={panel_icon_add}
                iconOnly
                className="h-12! w-12!"
              >
                AJOUTER JURY
              </Button>
            </Link>
          )}

          {!isJuryPanel && (
            <Link to="/dashboard/admin/editsite" onClick={() => setMobileOpen(false)}>
              <Button
                variant="btn-panel"
                iconImg={panel_icon_setting}
                iconOnly
                className="h-12! w-12!"
              >
                MODIFIER LE SITE
              </Button>
            </Link>
          )}

        </nav>

        <div className="mt-auto px-4 pb-6 flex justify-center">
          <Button
            type="button"
            variant="email-cancel"
            interactive
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </Button>
        </div>
      </div>

      {/* Hamburger – mobile uniquement */}
      <button
        type="button"
        className={`fixed top-4 left-4 z-60 lg:hidden flex flex-col gap-1.5 items-center justify-center w-10 h-10 rounded-md bg-bleu-ocean transition-opacity duration-300 ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={mobileOpen}
      >
        <span className="block h-0.5 w-6 bg-white rounded" />
        <span className="block h-0.5 w-6 bg-white rounded" />
        <span className="block h-0.5 w-6 bg-white rounded" />
      </button>

      {/* ── DESKTOP : sidebar sticky classique ── */}
      <div className="hidden lg:block">
        <div className="sticky top-0 self-start max-h-screen h-screen">
          <div className={containerClass}>
            {currentVariant.bg}
            <div className="relative z-40 h-full flex flex-col">
              {/* Bouton collapse – desktop uniquement */}
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label={collapsed ? "Ouvrir le menu" : "Fermer le menu"}
                aria-expanded={!collapsed}
                className="hidden lg:flex absolute -right-[25px] top-8 z-20 h-[50px] w-[25px] rounded-r-full bg-[#42cbe6] items-center justify-center pr-1.5"
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
                <div className="w-full flex flex-col items-center pb-28">
                  <Link to={isJuryPanel ? `/dashboard/jury/${juryId}` : "/dashboard/admin"}>
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
                    <Link to="/dashboard/admin/movies">
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

                  {!isJuryPanel && (
                    <Link to="/dashboard/admin/email-confirmation">
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

                  {isJuryPanel && (
                    <Link to={`/dashboard/jury/${juryId}/movies`}>
                      <Button
                        variant="btn-panel"
                        iconImg={panel_icon_not_watched}
                        iconClassName={
                          collapsed ? "-translate-x-1" : "-translate-x-4"
                        }
                        iconOnly={collapsed}
                      >
                        JUGER LES VIDÉOS
                      </Button>
                    </Link>
                  )}

                  {!isJuryPanel && (
                    <Link to="/dashboard/admin/invite-jury">
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
                    <Link to="/dashboard/admin/edit-site">
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

              <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
                <Button
                  type="button"
                  variant="email-cancel"
                  interactive
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
