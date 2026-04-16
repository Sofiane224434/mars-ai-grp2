// pages/Movies.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useFestivalPhase from "../../hooks/useFestivalPhase";
import MovieCard from "../../components/ui/MovieCard";
import Pagination from "../../components/ui/Pagination";
import Spinner from "../../components/ui/Spinner";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ITEMS_PER_PAGE = 20;

const PHASE_LABELS = [
    "movies.current-phase",
    "movies.phase-judgment",
    "movies.phase-top50",
    "movies.phase-top5",
];

function Movies() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentPhase } = useFestivalPhase();
    const showMovies = currentPhase >= 2;
    const isWinnersPhase = currentPhase === 3;

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
    const top5Movies = useMemo(
        () => movies
            .filter((movie) => Number(movie.statusId) === 6)
            .sort((a, b) => {
                const rankA = Number(a.top5Rank);
                const rankB = Number(b.top5Rank);
                const hasRankA = [1, 2, 3].includes(rankA);
                const hasRankB = [1, 2, 3].includes(rankB);

                if (hasRankA && hasRankB) return rankA - rankB;
                if (hasRankA) return -1;
                if (hasRankB) return 1;
                return Number(a.id) - Number(b.id);
            }),
        [movies]
    );
    const top50Movies = useMemo(
        () => movies.filter((movie) => [5, 6].includes(Number(movie.statusId))),
        [movies]
    );
    const totalPages = Math.ceil(top50Movies.length / ITEMS_PER_PAGE);
    const currentTop50Movies = top50Movies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const podiumMovies = useMemo(
        () => top5Movies.filter((movie) => [1, 2, 3].includes(Number(movie.top5Rank))),
        [top5Movies]
    );
    const otherTop5Movies = useMemo(
        () => top5Movies.filter((movie) => ![1, 2, 3].includes(Number(movie.top5Rank))),
        [top5Movies]
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [currentPhase, top50Movies.length]);

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
                            {isWinnersPhase ? t("movies.results-title") : t("movies.phase-top50")}
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/50">
                            {isWinnersPhase
                                ? t("movies.results-description")
                                : "Découvrez les 50 films sélectionnés par le jury."}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Spinner />
                        </div>
                    ) : top50Movies.length > 0 ? (
                        <>
                            {isWinnersPhase && top5Movies.length > 0 && (
                                <div className="mb-16">
                                    <div className="mb-8 text-center">
                                        <h3 className="text-2xl font-bold md:text-3xl">
                                            {t("movies.top5-title")}
                                        </h3>
                                        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                                            {t("movies.top5-description")}
                                        </p>
                                    </div>

                                    {podiumMovies.length > 0 && (
                                        <div className="mb-10 rounded-3xl border border-jaune-souffre/20 bg-[#1e2124]/70 p-6 md:p-8">
                                            <h4 className="text-center text-xl font-bold text-jaune-souffre md:text-2xl mb-6">
                                                {t("movies.podium-title")}
                                            </h4>
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
                                                {[2, 1, 3].map((rank) => {
                                                    const podiumMovie = podiumMovies.find((movie) => Number(movie.top5Rank) === rank);
                                                    const placeLabel = rank === 1 ? t("movies.podium-first") : rank === 2 ? t("movies.podium-second") : t("movies.podium-third");
                                                    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
                                                    const borderColor = rank === 1 ? 'border-jaune-souffre' : 'border-white/20';
                                                    const DEFAULT_THUMBNAIL = "https://picsum.photos/id/1005/1200/675";

                                                    return (
                                                        <article
                                                            key={`podium-${rank}`}
                                                            className={`flex flex-col rounded-3xl border ${borderColor} bg-gris-steelix p-3 text-white shadow-lg sm:p-4`}
                                                        >
                                                            {/* Badge rang */}
                                                            <div className="mb-2 flex items-center gap-2">
                                                                <span className="text-2xl">{rankEmoji}</span>
                                                                <span className="text-sm font-semibold uppercase tracking-widest text-jaune-souffre/90">{placeLabel}</span>
                                                            </div>

                                                            {podiumMovie ? (
                                                                <>
                                                                    {/* Titre + réalisateur */}
                                                                    <div className="min-h-16">
                                                                        <h3 className="font-title text-xl leading-tight sm:text-2xl line-clamp-2 min-h-12">{podiumMovie.title}</h3>
                                                                        <p className="text-base sm:text-lg line-clamp-1 text-white/70">Par : {podiumMovie.directorName}</p>
                                                                    </div>

                                                                    {/* Vignette */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => navigate(`/movies/${podiumMovie.id}`)}
                                                                        className="mt-2 block w-full overflow-hidden rounded-2xl bg-gris-magneti focus:outline-none focus:ring-2 focus:ring-bleu-ocean/80"
                                                                    >
                                                                        <img
                                                                            src={podiumMovie.thumbnail || podiumMovie.screenshotLink || DEFAULT_THUMBNAIL}
                                                                            alt={`Miniature de ${podiumMovie.title}`}
                                                                            className="aspect-video w-full object-cover"
                                                                        />
                                                                    </button>

                                                                    {/* Description + bouton */}
                                                                    <div className="mt-auto flex flex-col pt-3">
                                                                        <p className="my-2 text-base leading-snug line-clamp-2 text-white/80">
                                                                            {podiumMovie.description || "Description non renseignée."}
                                                                        </p>
                                                                        <button
                                                                            type="button"
                                                                            className="mt-2 h-12 w-full rounded-full bg-jaune-souffre px-4 text-sm font-semibold text-gris-anthracite hover:opacity-90 transition-opacity"
                                                                            onClick={() => navigate(`/movies/${podiumMovie.id}`)}
                                                                        >
                                                                            {t("movies.view-movie")}
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <p className="mt-4 text-white/40 text-center">-</p>
                                                            )}
                                                        </article>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {otherTop5Movies.length > 0 && (
                                        <div className="flex flex-wrap justify-center gap-6 pb-2">
                                            {otherTop5Movies.map((movie) => (
                                                <div key={`top5-${movie.id}`} className="w-full max-w-sm">
                                                    <MovieCard
                                                        layout="grid"
                                                        variant="basic"
                                                        title={movie.title}
                                                        directorName={movie.directorName}
                                                        description={movie.description || "Description non renseignée."}
                                                        thumbnailSrc={movie.thumbnail || movie.screenshotLink}
                                                        onThumbnailClick={() => navigate(`/movies/${movie.id}`)}
                                                        onMoreInfo={() => navigate(`/movies/${movie.id}`)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <div className="mb-8 text-center">
                                    <h3 className="text-2xl font-bold md:text-3xl">
                                        {t("movies.top50-title")}
                                    </h3>
                                    <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                                        {t("movies.top50-description")}
                                    </p>
                                </div>

                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center pb-8">
                                    {currentTop50Movies.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            layout="grid"
                                            variant="basic"
                                            title={movie.title}
                                            directorName={movie.directorName}
                                            description={movie.description || "Description non renseignée."}
                                            thumbnailSrc={movie.thumbnail || movie.screenshotLink}
                                            onThumbnailClick={() => navigate(`/movies/${movie.id}`)}
                                            onMoreInfo={() => navigate(`/movies/${movie.id}`)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {top50Movies.length > ITEMS_PER_PAGE && (
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
