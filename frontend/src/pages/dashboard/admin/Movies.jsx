// pages/dashboard/admin/Movies.jsx
import MovieCard from '../../../components/ui/MovieCard.jsx';

function Movies() {
    const handlePlaceholder = () => {
        // Placeholder until admin actions are connected to backend.
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
            <h1 className="text-center text-5xl text-white">Tous les Films</h1>

            <div className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-2">
                <MovieCard
                    variant="admin-assign"
                    status="pending"
                    title="Titre de la video"
                    directorName="Nom Prenom"
                    onAssign={handlePlaceholder}
                    onMoreInfo={handlePlaceholder}
                />

                <MovieCard
                    variant="admin-assigned"
                    status="rejected"
                    title="Titre de la video"
                    directorName="Nom Prenom"
                    assignedJurors={['Jury nom prenom', 'Jury nom prenom', 'Jury nom prenom']}
                    onAssign={handlePlaceholder}
                    onMoreInfo={handlePlaceholder}
                />
            </div>
        </div>
    );
}

export default Movies;
