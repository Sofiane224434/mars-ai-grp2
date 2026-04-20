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
      container:
        "mt-6 relative max-h-screen transition-all duration-500 ease-in-out",
      bg: (
        <div className="absolute -top-1 -bottom-5 left-0 right-0 bg-noir-bleute" />
      ),
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-500 ease-in-out",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },

    jury: {
      container:
        "mt-6 relative max-h-screen transition-all duration-500 ease-in-out",
      bg: (
        <div className="absolute -top-1 -bottom-5 left-0 right-0 bg-noir-bleute" />
      ),
      content:
        "relative z-10 h-full px-6 pt-7 flex flex-col items-start gap-0 transition-all duration-500 ease-in-out",
      title: "w-full text-center text-white font-normal text-2xl mb-10",
    },
  };

  const currentVariant = variants[variant] || variants.admin;
  const isJuryPanel = variant === "jury";
  const { id: juryId } = useParams();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const mobileIconOnlyProps = {
    iconOnly: true,
    iconOnlyButtonSizeClass: "h-9 w-9",
    iconOnlyImageSizeClass: "h-4 w-4",
  };

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
        },
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
    `mt-1 relative min-h-screen h-full transition-all duration-500 ease-in-out ${className}`.trim();
  const containerStyle = collapsed ? { width: "110px" } : { width: "320px" };
  const contentClass =
    `${currentVariant.content} flex-1 px-2 items-center gap-0 ${
      collapsed ? "lg:px-1 lg:items-center lg:gap-3" : ""
    }`.trim();

  return (
    <>
      {/* ── MOBILE : barre déroulante légère du haut ── */}
      <div
        className={`fixed top-0 left-0 right-0 max-h-80 z-50 bg-noir-bleute transition-all duration-300 lg:hidden overflow-hidden ${
          mobileOpen
            ? "translate-y-0 shadow-lg"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* En-tête fixe avec bouton fermer */}
        <div className="flex items-center justify-end px-3 pt-2 pb-1 shrink-0">
          <button
            type="button"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-white/40 bg-noir-bleute/80 text-white hover:bg-bleu-ocean/70 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          >
            <span className="relative block h-3 w-3">
              <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-white" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-white" />
            </span>
          </button>
        </div>

        {/* Contenu du menu */}
        <nav className="flex flex-wrap justify-center gap-2 px-3 pb-3 overflow-y-auto max-h-64">
          <Link
            to={isJuryPanel ? `/dashboard/jury/${juryId}` : "/dashboard/admin"}
          >
            <Button
              variant="btn-panel-home"
              iconImg={panel_icon_home}
              {...mobileIconOnlyProps}
            >
              ACCUEIL
            </Button>
          </Link>

          {!isJuryPanel && (
            <Link to="/dashboard/admin/movies">
              <Button
                variant="btn-panel"
                iconImg={panel_icon_assign1}
                {...mobileIconOnlyProps}
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
                {...mobileIconOnlyProps}
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
                {...mobileIconOnlyProps}
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
                {...mobileIconOnlyProps}
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
                {...mobileIconOnlyProps}
              >
                MODIFIER LE SITE
              </Button>
            </Link>
          )}

          <div className="w-full border-t border-noir-bleute" />

          <Button
            type="button"
            variant="email-cancel"
            interactive
            className="w-11/12 max-w-xs justify-center text-sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </Button>
        </nav>
      </div>

      {/* Hamburger – mobile uniquement */}
      <button
        type="button"
        className={`fixed top-4 left-4 z-40 lg:hidden flex flex-col gap-1.5 items-center justify-center w-10 h-10 rounded-md bg-bleu-ocean transition-all duration-300 ${
          mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
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
          <div className={containerClass} style={containerStyle}>
            {currentVariant.bg}
            <div className="relative z-40 h-full flex flex-col">
              {/* Bouton collapse – desktop uniquement */}
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label={collapsed ? "Ouvrir le menu" : "Fermer le menu"}
                aria-expanded={!collapsed}
                className="hidden lg:flex absolute top-8 z-20 rounded-r-full bg-bleu-ciel items-center justify-center pr-1.5"
                style={{ right: "-25px", width: "25px", height: "50px" }}
              >
                {!collapsed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-4 w-4 text-bleu-canard"
                    aria-hidden="true"
                  >
                    <path
                      d="M10.5 3.5L5.5 8L10.5 12.5"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="ml-0.5 h-3.5 w-3.5 text-bleu-canard"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5 3.5L11 8L5 12.5V3.5Z" />
                  </svg>
                )}
              </button>

              <div className={contentClass}>
                <div
                  className={`w-full flex flex-col items-center pb-28 ${collapsed ? "gap-3" : ""}`}
                >
                  <Link
                    to={
                      isJuryPanel
                        ? `/dashboard/jury/${juryId}`
                        : "/dashboard/admin"
                    }
                  >
                    <Button
                      variant="btn-panel-home"
                      iconImg={panel_icon_home}
                      iconOnly={collapsed}
                      className={collapsed ? "mb-4 ml-0" : "mb-5 ml-2"}
                      iconClassName={
                        collapsed ? "-translate-x-4" : "-translate-x-2"
                      }
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
                {collapsed ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    aria-label="Déconnexion"
                    className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-turquoise-vif text-white hover:bg-gris-magneti/10 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                ) : (
                  <Button
                    type="button"
                    variant="email-cancel"
                    interactive
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
