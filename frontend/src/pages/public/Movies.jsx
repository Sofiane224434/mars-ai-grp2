// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/layout/SideBar";

function Movies() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <h1>{t("nav.movies")}</h1>
      <Sidebar variant="admin" />
    </div>
  );
}

export default Movies;
