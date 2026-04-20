import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import useFestivalPhase from "../../hooks/useFestivalPhase";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import InfoPanel from "../../components/sections/DashboardJury/InfoPanel";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube-nocookie.com/embed/${match[2]}`
    : null;
};

const getAiCategoryStyle = (category) => {
  const normalizedCategory = String(category || "").toLowerCase().trim();

  if (["hybride", "hybrid"].includes(normalizedCategory)) {
    return {
      label: "Hybride",
      classes: "bg-amber-900/40 text-amber-300 border-amber-500/50",
    };
  }

  if (["100% ia", "100%ia", "100 % ia", "100% d'ia", "100% d ia"].includes(normalizedCategory)) {
    return {
      label: "100% IA",
      classes: "bg-cyan-900/40 text-cyan-300 border-cyan-500/50",
    };
  }

  return {
    label: category || "IA",
    classes: "bg-gray-800 text-gray-300 border-gray-600",
  };
};

function PublicMovieDetail() {
  const { t } = useTranslation();
  const { movieId } = useParams();
  const { currentPhase } = useFestivalPhase();
  const showMovies = currentPhase >= 2;

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!showMovies || !movieId) return;

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const res = await axios.get(`${API_BASE_URL}/movies/public/${movieId}`, {
          headers: { "x-festival-phase-index": String(currentPhase) },
        });
        setMovie(res.data?.data || null);
      } catch {
        setMovie(null);
        setErrorMessage(t("movies.detail-not-found"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [currentPhase, movieId, showMovies, t]);

  if (!showMovies) {
    return (
      <div className="min-h-screen bg-gris-anthracite text-white">
        <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("movies.empty-title")}</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/50">
            {t("movies.empty-description")}
          </p>
          <Link
            to="/movies"
            className="mt-8 inline-block"
          >
            <Button variant="neon-yellow" className="w-fit px-8 whitespace-nowrap">
              {t("movies.back-to-list")}
            </Button>
          </Link>
        </section>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gris-anthracite text-white flex items-center justify-center">
        <Spinner text={t("movies.detail-loading")} fullScreen={true} />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gris-anthracite text-white">
        <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("movies.detail-error-title")}</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/50">
            {errorMessage || t("movies.detail-not-found")}
          </p>
          <Link
            to="/movies"
            className="mt-8 inline-block"
          >
            <Button variant="neon-yellow" className="w-fit px-8 whitespace-nowrap">
              {t("movies.back-to-list")}
            </Button>
          </Link>
        </section>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(movie.videoUrl);
  const usedAis = Array.isArray(movie.usedAis) ? movie.usedAis : [];

  return (
    <div className="min-h-screen background-gradient-black p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <div className="mb-4 w-full">
          <Link
            to="/movies"
            className="inline-block"
          >
            <Button variant="neon-yellow" className="w-fit px-8 whitespace-nowrap">
              {t("movies.back-to-list")}
            </Button>
          </Link>
        </div>

        <div className="mb-6 text-center text-white">
          <h1 className="text-4xl font-bold font-title">{movie.title}</h1>
          <p className="mt-1 text-sm text-gris-magneti">
            {t("movies.by-director", {
              director: movie.directorName || [movie.directorFirstName, movie.directorLastName].filter(Boolean).join(" ") || t("movies.unknown-director"),
            })}
          </p>
        </div>

        <div className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-xl border border-gris-magneti/20 bg-reglisse shadow-2xl">
          {embedUrl ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title={movie.title || "Video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-gris-magneti italic">
              {t("movies.detail-no-video")}
            </div>
          )}
        </div>

        <div className="my-8 w-full border-b border-gris-magneti/30" />

        <InfoPanel title={t("movies.detail-film-info-title")}>
          <div className="text-gris-magneti font-medium">{t("movies.detail-synopsis-label")}</div>
          <div className="whitespace-pre-wrap">{movie.synopsis || t("movies.not-provided")}</div>

          <div className="text-gris-magneti font-medium">{t("movies.detail-description-label")}</div>
          <div className="whitespace-pre-wrap">{movie.description || t("movies.not-provided")}</div>

          <div className="text-gris-magneti font-medium">{t("movies.detail-language-label")}</div>
          <div>{movie.language || t("movies.not-provided")}</div>

          <div className="text-gris-magneti font-medium">{t("movies.detail-classification-label")}</div>
          <div>{movie.classification || t("movies.not-provided")}</div>
        </InfoPanel>

        <InfoPanel title={t("movies.detail-ai-tools-title")}>
          <div className="text-gris-magneti font-medium">{t("movies.detail-ai-tools-label")}</div>
          {usedAis.length > 0 ? (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {usedAis.map((ai, index) => {
                const style = getAiCategoryStyle(ai.category);
                return (
                  <div
                    key={`${ai.ai_name || "ai"}-${index}`}
                    className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-md border ${style.classes}`}
                  >
                    <span className="font-bold text-sm wrap-break-word">{ai.ai_name || "Outil IA"}</span>
                    <span className="ml-1 shrink-0 border-l border-current pl-2 text-xs opacity-75">
                      {style.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="italic text-gris-magneti">{t("movies.detail-no-ai-tools")}</div>
          )}
        </InfoPanel>
      </div>
    </div>
  );
}

export default PublicMovieDetail;
