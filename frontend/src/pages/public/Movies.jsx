// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import { Filtre } from "../../components/ui/Filtre";

function Movies() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <h1>{t("nav.movies")}</h1>
      <Filtre variant="filtre_horizontal"> TEST </Filtre>
      <Filtre variant="filtre_vertical"> TEST </Filtre>
    </div>
  );
}

export default Movies;
