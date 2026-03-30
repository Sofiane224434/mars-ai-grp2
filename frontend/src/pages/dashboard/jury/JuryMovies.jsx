// pages/dashboard/jury/JuryMovies.jsx
import MovieCard from '../../../components/UI/MovieCard.jsx';

function JuryMovies() {
    const handlePlaceholder = () => {
        // Placeholder until jury actions are connected to backend.
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
            <h1 className="text-center text-5xl text-white">Films Assignes au Jury</h1>

            <div className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-2">
                <MovieCard
                    variant="jury-pending"
                    status="pending"
                    title="Titre de la video"
                    directorName="Nom Prenom"
                    onJudge={handlePlaceholder}
                    onMoreInfo={handlePlaceholder}
                />

                <MovieCard
                    variant="jury-reviewed"
                    status="approved"
                    title="Titre de la video"
                    directorName="Nom Prenom"
                    onMoreInfo={handlePlaceholder}
                />
            </div>
        </div>
    );
}

export default JuryMovies;
