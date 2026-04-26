import React from "react";
import { useTranslation } from "react-i18next";
import AboutSection from "../../components/sections/About/AboutSection";

function About() {
    const { t } = useTranslation();

    return (
      <article className="min-h-screen w-full bg-gris-anthracite overflow-x-hidden pb-0">
            {/* Title reserved for SEO only to prevent white spacing */}
            <h1 className="sr-only">{t("nav.about")}</h1>

            {/* Content Sections - Full width */}
            <AboutSection />
        </article>
    );
}

export default About;
