// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import useFestivalPhase from "../../hooks/useFestivalPhase";

const PHASE_LABELS = [
    "movies.current-phase",
    "movies.phase-judgment",
    "movies.phase-top50",
    "movies.phase-top5",
];

function Movies() {
    const { t } = useTranslation();
    const { currentPhase } = useFestivalPhase();

    return (
        <div className="min-h-screen bg-gris-anthracite text-white">

            {/* État vide */}
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

export default Movies;
