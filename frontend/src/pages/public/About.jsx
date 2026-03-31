import React from "react";
import { useTranslation } from "react-i18next";
import AboutSection from "../../components/sections/About/AboutSection";

function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.about")}</h1>   
        </div>
    );
}

export default About;
