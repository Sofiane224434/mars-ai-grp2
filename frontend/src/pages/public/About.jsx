// pages/About.jsx
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/layout/SideBar";

function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.about")}</h1>
            <Sidebar> </Sidebar>
        
        </div>
    );
}

export default About;
