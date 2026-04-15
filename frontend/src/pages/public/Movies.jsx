// pages/Movies.jsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useFestivalPhase from "../../hooks/useFestivalPhase";
import MovieCard from "../../components/ui/MovieCard";
import Pagination from "../../components/ui/Pagination";
import Spinner from "../../components/ui/Spinner";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ITEMS_PER_PAGE = 6;

const PHASE_LABELS = [
    "movies.current-phase",
    "movies.phase-judgment",
    "movies.phase-top50",
    "movies.phase-top5",
];

function Movies() {
    const { t } = useTranslation();
    const { currentPhase } = useFestivalPhase();
    const showMovies = currentPhase >= 2;

    const [rawMovies, setRawMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!showMovies) return;

        const fetchPublicMovies = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/movies/public`, {
                    headers: { 'x-festival-phase-index': String(currentPhase) },
                });
                const payload = res.data?.data || res.data || [];
                setRawMovies(Array.isArray(payload) ? payload : []);
            } catch {
                setRawMovies([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicMovies();
    }, [currentPhase, showMovies]);

    const movies = useMemo(() => rawMovies, [rawMovies]);
    const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
    const currentMovies = movies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Phases 0 et 1 : état vide
    if (!showMovies) {
        return (
            <div className="min-h-screen bg-gris-anthracite text-white">
                <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">{t("movies.empty-title")}</h2>
                    <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/50">
                        {t("movies.empty-description")}
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm">
                        <span className="text-sm uppercase tracking-widest text-white/40">{t("movies.current-phase-label")}</span>
                        <span className="text-xl font-semibold text-jaune-simpson">{t(PHASE_LABELS[currentPhase])}</span>
                    </div>
                </section>
            </div>
        );
    }

    // Phases 2 et 3 : affichage des films
    return (
        <div className="min-h-screen bg-gris-anthracite text-white">
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold md:text-4xl">
                            {currentPhase >= 3 ? t("movies.phase-top5") : t("movies.phase-top50")}
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/50">
                            {currentPhase >= 3
                                ? "Découvrez les 5 films finalistes sélectionnés par le jury."
                                : "Découvrez les 50 films sélectionnés par le jury."}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Spinner />
                        </div>
                    ) : currentMovies.length > 0 ? (
                        <>
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center pb-8">
                                {currentMovies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        layout="grid"
                                        variant="basic"
                                        title={movie.title}
                                        directorName={movie.directorName}
                                        description={movie.description || "Description non renseignée."}
                                        thumbnailSrc={movie.thumbnail || movie.screenshotLink}
                                    />
                                ))}
                            </div>

                            {movies.length > ITEMS_PER_PAGE && (
                                <div className="mt-4 pb-10 flex justify-center">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={(newPage) => {
                                            setCurrentPage(newPage);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12 text-gray-400 text-lg">
                            Aucun film disponible pour le moment.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Movies;
