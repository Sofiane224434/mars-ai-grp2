// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Button from "../../components/ui/Button";
import MovieCard from '../../components/ui/MovieCard.jsx';

function Movies() {
  const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
            <h1 className="text-center text-5xl text-white">{t("nav.movies")}</h1>

            <div className="mx-auto mt-8 flex max-w-6xl justify-center">
                <MovieCard
                    variant="basic"
                    title="Titre de la video"
                    directorName="Nom Prenom"
                />
            </div>
        </div>
    );
}

export default Movies;
