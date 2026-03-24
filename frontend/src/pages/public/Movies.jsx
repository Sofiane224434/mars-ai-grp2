// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import { PropertyPanel } from "../../components/ui/Panel";

function Movies() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.movies")}</h1>
            <PropertyPanel> DASHBORD </PropertyPanel>
        </div>
    );
}

export default Movies;
