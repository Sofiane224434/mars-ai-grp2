// pages/dashboard/admin/AdminMovies.jsx
import { useState } from "react";
import MovieCard from "../../../components/ui/MovieCard.jsx";
import Filter from "../../../components/ui/Filter.jsx";
import Button from "../../../components/ui/Button.jsx";

function AdminMovies() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handlePlaceholder = () => {
    // Placeholder until admin actions are connected to backend.
  };

  return (
    <div className="min-h-screen bg-gris-anthracite pt-20 lg:pt-16">
      <h1 className="text-center text-3xl sm:text-5xl text-white mb-8 sm:mb-16 px-4">Tous les Films</h1>

      <div className="mx-auto max-w-6xl mb-3 px-4 sm:px-10">
        {/* Barre toggle */}
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-gris-steelix px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gris-magneti"
          >
            <span>Filtres</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Panneau déroulant */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${filtersOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="rounded-lg border border-white/10 bg-gris-steelix px-4 py-3">
            {/* Mobile / tablette */}
            <div className="lg:hidden">
              <div className="mx-auto w-fit flex flex-col gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                  <Filter variant="assignation"> Non assigné</Filter>
                  <Filter variant="assignation"> Assigné</Filter>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Filter variant="approved"> Validé</Filter>
                  <Filter variant="rejected"> Refusé</Filter>
                  <Filter variant="review"> À revoir</Filter>
                  <Filter variant="pending"> En attente</Filter>
                </div>

                <div className="pt-1">
                  <Button
                    interactive
                    className="w-full flex items-center justify-center text-center text-sm"
                    variant="filled-yellow"
                    onClick={handlePlaceholder}
                  >
                    Supprimer les filtres
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop (inchangé) */}
            <div className="hidden lg:flex items-center justify-between gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <Filter variant="assignation"> Non assigné</Filter>
                  <Filter variant="assignation"> Assigné</Filter>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Filter variant="approved"> Validé</Filter>
                  <Filter variant="rejected"> Refusé</Filter>
                  <Filter variant="review"> À revoir</Filter>
                  <Filter variant="pending"> En attente</Filter>
                </div>
              </div>
              <Button
                interactive
                className="shrink-0 self-center flex items-center justify-center text-center text-sm"
                variant="filled-yellow"
                onClick={handlePlaceholder}
              >
                Supprimer les filtres
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 sm:mt-8 grid max-w-6xl gap-4 px-4 sm:px-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center lg:justify-items-stretch">
        <MovieCard
          variant="admin-assign"
          status="pending"
          title="Titre de la video"
          directorName="Nom Prénom"
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />

        <MovieCard
          variant="admin-assigned"
          status="rejected"
          title="Titre de la video"
          directorName="Nom Prenom"
          assignedJurors={[
            "Jury nom prénom",
            "Jury nom prénom",
            "Jury nom prénom",
          ]}
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />
        <MovieCard
          variant="admin-assigned"
          status="rejected"
          title="Titre de la video"
          directorName="Nom Prénom"
          assignedJurors={[
            "Jury nom prénom",
            "Jury nom prénom",
            "Jury nom prénom",
          ]}
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />
        <MovieCard
          variant="admin-assigned"
          status="rejected"
          title="Titre de la video"
          directorName="Nom Prénom"
          assignedJurors={[
            "Jury nom prénom",
            "Jury nom prénom",
            "Jury nom prénom",
          ]}
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />
        <MovieCard
          variant="admin-assigned"
          status="rejected"
          title="Titre de la video"
          directorName="Nom Prénom"
          assignedJurors={[
            "Jury nom prénom",
            "Jury nom prénom",
            "Jury nom prénom",
          ]}
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />
        <MovieCard
          variant="admin-assigned"
          status="rejected"
          title="Titre de la video"
          directorName="Nom Prénom"
          assignedJurors={[
            "Jury nom prénom",
            "Jury nom prénom",
            "Jury nom prénom",
          ]}
          onAssign={handlePlaceholder}
          onMoreInfo={handlePlaceholder}
        />
      </div>
    </div>
  );
}

export default AdminMovies;
