import Button from "../UI/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MarsLogo from "../../assets/icons/Marsai.svg?react";
import InstagramIcon from "../../assets/icons/icon-instagrams.svg?react";
import YoutubeIcon from "../../assets/icons/Icon-youtube.svg?react";
import FacebookIcon from "../../assets/icons/Icons-facebook.svg?react";
import LinkedinIcon from "../../assets/icons/Icons-lin.svg?react";
import TwitterIcon from "../../assets/icons/Icons-twiter.svg?react";

// components/Footer.jsx
function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-noir-bleute text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="relative">
                    <div className="flex flex-col items-center gap-1 mb-3 hover:opacity-90 transition md:absolute md:left-28 md:top-1/2 md:-translate-y-1/2 md:mb-0">
                        <Link to="/" className="flex flex-col items-center text-center">
                            <MarsLogo
                                className="w-20 h-20 md:w-30 md:h-30"
                                viewBox="45 70 110 85"
                                preserveAspectRatio="xMidYMid meet"
                                aria-label="Logo Mars AI"
                                role="img"
                            />
                            <h1 className="font-title text-3xl md:text-5xl font-bold tracking-wide">{t('header.title')}</h1>
                        </Link>
                        {t('footer.collaborator')}
                        <img src="/assets/icons/laplateforme.png" alt="La Plateforme" className="h-8" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Button variant="filled-yellow" className="w-[80%] max-w-90">{t('nav.home')}</Button>
                        <Button variant="neon-yellow" className="w-[80%] max-w-90">{t('nav.movies')}</Button>
                        <Button variant="neon-yellow" className="w-[80%] max-w-90">{t('nav.about')}</Button>
                        <Button variant="neon-yellow" className="w-[80%] max-w-90">{t('nav.faq')}</Button>
                        <Button variant="gradient-blue" className="w-[80%] max-w-90">{t('nav.participate')}</Button>
                    </div>
                    <div className="flex flex-col items-center gap-1 mt-6 md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2 text-center">
                        <p>{t('footer.textcontact')}</p>
                        <div className="flex items-center justify-center gap-4 w-full">
                            <a href="https://www.instagram.com/mars_ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <YoutubeIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.linkedin.com/company/mars-ai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://twitter.com/mars_ai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <TwitterIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>
                        <p>{t('footer.newsletter')}</p>
                        <form className="flex flex-col items-center gap-2 mt-2 w-full md:w-64">
                            <input
                                type="email"
                                placeholder={t('footer.emailplaceholder')}
                                className="w-full sm:w-64 px-4 py-2 rounded-md border border-gray-300 bg-white text-noir-bleute placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-jaune-souffre transition"
                            />
                            <Button variant="square-yellow" className="w-full">{t('footer.subscribe')}</Button>
                        </form>
                    </div>
                </div>
                <p className="text-sm">
                    MarsAI - © {new Date().getFullYear()} - {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
}
export default Footer;