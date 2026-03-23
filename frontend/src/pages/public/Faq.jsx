// pages/FAQ.jsx
import { useTranslation } from "react-i18next";

function FAQ() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.faq")}</h1>
        </div>
    );
}

export default FAQ;
