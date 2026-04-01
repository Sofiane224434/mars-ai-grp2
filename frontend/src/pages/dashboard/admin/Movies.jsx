// pages/dashboard/admin/Movies.jsx
import MovieCard from "../../../components/ui/MovieCard.jsx";
import Filter from "../../../components/ui/Filter.jsx";
import Button from "../../../components/ui/Button.jsx";

function Movies() {
  const handlePlaceholder = () => {
    // Placeholder until admin actions are connected to backend.
  };

  return (
    <div className="min-h-screen bg-gris-anthracite pt-16">
      <h1 className="text-center text-5xl text-white mb-16">Tous les Films</h1>

      <div className="mx-auto max-w-6xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6 ml-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Filter variant="assignation"> Non assigné</Filter>
            <Filter variant="assignation"> Assigné</Filter>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Filter variant="approved"> Validé</Filter>
            <Filter variant="rejected"> Refusé</Filter>
            <Filter variant="review"> À revoir </Filter>
            <Filter variant="pending"> En attente</Filter>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2 md:pt-0 mr-10">
          <Button
            interactive
            className="w-64 flex items-center just ify-center text-center"
            variant="filled-yellow"
            onClick={handlePlaceholder}
          >
            Supprimer les filtres
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-10 lg:grid-cols-3">
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

export default Movies;
