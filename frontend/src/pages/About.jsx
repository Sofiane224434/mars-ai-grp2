// pages/About.jsx
import { useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.about")}</h1>
        </div>
    );
}

export default About;
