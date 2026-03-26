// pages/Movies.jsx
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/layout/SideBar";
import Button from "../../components/ui/Button";

function Movies() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <h1>{t("nav.movies")}</h1>
      <Sidebar variant="admin" />
      <Button variant="review-jury"> Valider </Button>
    </div>
  );
}

export default Movies;
