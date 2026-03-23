// pages/Movies.jsx
import { useTranslation } from "react-i18next";

function Movies() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.movies")}</h1>
        </div>
    );
}

export default Movies;
