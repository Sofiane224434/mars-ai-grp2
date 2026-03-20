// pages/Awards.jsx
import { useTranslation } from "react-i18next";

function Awards() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.awards")}</h1>
        </div>
    );
}

export default Awards;
