// pages/Auth.jsx
import { useTranslation } from "react-i18next";

function Auth() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            <h1>{t("nav.auth")}</h1>
        </div>
    );
}

export default Auth;
