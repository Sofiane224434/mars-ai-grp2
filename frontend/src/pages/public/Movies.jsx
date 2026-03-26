// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";

function Movies() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <h1>{t("nav.movies")}</h1>
      <MainLayoutAdmin variant="admin" />
    </div>
  );
}

export default Movies;
