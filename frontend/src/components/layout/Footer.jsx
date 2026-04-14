import { useState } from "react";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MarsLogo from "../../assets/icons/Marsai.svg?react";
import InstagramIcon from "../../assets/icons/icon-instagrams.svg?react";
import YoutubeIcon from "../../assets/icons/Icon-youtube.svg?react";
import FacebookIcon from "../../assets/icons/Icons-facebook.svg?react";
import LinkedinIcon from "../../assets/icons/Icons-lin.svg?react";
import TwitterIcon from "../../assets/icons/Icons-twiter.svg?react";
import useFestivalPhase from "../../hooks/useFestivalPhase.js";

// components/Footer.jsx
function Footer() {
    const { t } = useTranslation();
    const { isSubmissionPhase } = useFestivalPhase();
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newsletterFeedback, setNewsletterFeedback] = useState({ type: "", message: "" });

    const handleNewsletterSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        const email = newsletterEmail.trim();
        if (!email) {
            setNewsletterFeedback({ type: "error", message: t("footer.newsletterInvalidEmail") });
            return;
        }

        setIsSubmitting(true);
        setNewsletterFeedback({ type: "", message: "" });

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || t("footer.newsletterSubscribeError"));
            }

            setNewsletterEmail("");
            setNewsletterFeedback({
                type: "success",
                message: t("footer.newsletterSubscribeSuccess"),
            });
        } catch (error) {
            setNewsletterFeedback({
                type: "error",
                message: error.message || t("footer.newsletterSubscribeError"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-noir-bleute text-white py-6 sm:py-8 lg:py-10 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:px-6">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center gap-1 mb-6 sm:mb-8 lg:mb-0 hover:opacity-90 transition lg:justify-self-start">
                        <Link to="/" className="flex flex-col items-center text-center">
                            <MarsLogo
                                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28"
                                viewBox="45 70 110 85"
                                preserveAspectRatio="xMidYMid meet"
                                aria-label="Logo Mars AI"
                                role="img"
                            />
                            <h1 className="font-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mt-2">{t('header.title')}</h1>
                        </Link>
                        <p className="text-xs sm:text-sm">{t('footer.collaborator')}</p>
                        <img src="/assets/icons/laplateforme.png" alt="La Plateforme" className="h-6 sm:h-8 mt-1" />
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-col items-stretch sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-0 lg:justify-self-center">
                        <Link to="/" className="w-full sm:w-72 lg:w-72 mx-auto">
                            <Button variant="filled-yellow" className="w-full">{t('nav.home')}</Button>
                        </Link>
                        <Link to="/movies" className="w-full sm:w-72 lg:w-72 mx-auto">
                            <Button variant="neon-yellow" className="w-full">{t('nav.movies')}</Button>
                        </Link>
                        <Link to="/about" className="w-full sm:w-72 lg:w-72 mx-auto">
                            <Button variant="neon-yellow" className="w-full">{t('nav.about')}</Button>
                        </Link>
                        <Link to="/faq" className="w-full sm:w-72 lg:w-72 mx-auto">
                            <Button variant="neon-yellow" className="w-full">{t('nav.faq')}</Button>
                        </Link>
                        {isSubmissionPhase && (
                            <Link to="/participate">
                                <div className="w-full sm:w-72 lg:w-72 mx-auto">
                                    <Button variant="gradient-blue" className="w-full">{t('nav.participate')}</Button>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Contact & Newsletter Section */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3 lg:justify-self-end">
                        <p className="text-sm sm:text-base">{t('footer.textcontact')}</p>
                        <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                            <a href="https://www.instagram.com/mars_ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-70 transition" aria-hidden="true" />
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <YoutubeIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-70 transition" aria-hidden="true" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-70 transition" aria-hidden="true" />
                            </a>
                            <a href="https://www.linkedin.com/company/mars-ai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-70 transition" aria-hidden="true" />
                            </a>
                            <a href="https://twitter.com/mars_ai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <TwitterIcon className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-70 transition" aria-hidden="true" />
                            </a>
                        </div>
                        <p className="text-sm sm:text-base">{t('footer.newsletter')}</p>
                        <form className="flex flex-col items-stretch sm:items-center gap-2 mt-2 w-full sm:w-72 lg:w-64" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(event) => setNewsletterEmail(event.target.value)}
                                required
                                placeholder={t('footer.emailplaceholder')}
                                className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-300 bg-white text-noir-bleute placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-jaune-souffre transition"
                            />
                            <Button
                                variant="square-yellow"
                                interactive
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? t('footer.newsletterLoading') : t('footer.subscribe')}
                            </Button>

                            {newsletterFeedback.message && (
                                <p className={`text-xs ${newsletterFeedback.type === "success" ? "text-green-300" : "text-red-300"}`}>
                                    {newsletterFeedback.message}
                                </p>
                            )}
                        </form>

                        <Link
                            to="/rgpd"
                            className="mt-2 text-xs text-white/80 underline decoration-white/40 underline-offset-2 transition hover:text-jaune-simpson hover:decoration-jaune-simpson"
                        >
                            {t('footer.rgpd')}
                        </Link>
                    </div>
                </div>

                {/* Footer Bottom */}
                <p className="text-xs sm:text-sm mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
                    MarsAI - © {new Date().getFullYear()} - {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
}
export default Footer;