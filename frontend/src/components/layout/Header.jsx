// components/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MarsLogo from '../../assets/icons/Marsai.svg?react';
import LanguageIcon from '../../assets/icons/language-svgrepo-com.svg?react';
import Navbar from './Navbar';

const LANGUAGES = [
    { code: 'fr', labelKey: 'Français' },
    { code: 'en', labelKey: 'English' },
    { code: 'es', labelKey: 'Español' },
    { code: 'ar', labelKey: 'العربية' },
    { code: 'pt', labelKey: 'Português' },
    { code: 'zh', labelKey: '普通话' },
    { code: 'de', labelKey: 'Deutsch' },
    { code: 'hi', labelKey: 'हिंदी' },
    { code: 'ru', labelKey: 'Русскийs' },
    { code: 'ja', labelKey: '日本語' },
];

function Header() {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { i18n, t } = useTranslation();

    const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().split('-')[0];

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setIsLanguageOpen(false);
    };

    //Contient la référence de l'élément qui affiche tous les boutons d'options de langues
    const dropDownRef = useRef(null);

    //Fonction à utiliser lors d'un click qui peut être en dehors du tableau des langues
    function handleClickOutisde(e) {
        //Si la cible événement (clique) ne contient pas la ref (tableau de langues)...
        if (!dropDownRef.current?.contains(e.target)) {
            setIsLanguageOpen(false);
        }
    }

    useEffect(() => {
        //Si le menu est ouvert, écoute l'événement clique et utilise la fonction
        if (isLanguageOpen) {
            document.addEventListener("mousedown", handleClickOutisde);
        }

        //Une fois terminé, enlène l'eventlistener
        return () => document.removeEventListener("mousedown", handleClickOutisde);
    }, [isLanguageOpen])

    return (
        <>
            <header
                className="bg-noir-bleute text-white shadow-2xl bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "linear-gradient(rgba(29, 29, 36, 0.25), rgba(29, 29, 36, 0.25)), url('/assets/img/header.png')",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
                    <div className="relative flex justify-end min-h-11 mb-2">
                        <button
                            type="button"
                            onClick={() => setIsLanguageOpen((prev) => !prev)}
                            aria-label={t('header.language.change')}
                            className="w-10 h-10 rounded-md border border-gray-500 bg-noir-bleute/70 flex items-center justify-center hover:bg-noir-bleute transition"
                        >
                            <LanguageIcon
                                aria-label={t('header.language.change')}
                                className="w-5 h-5"
                                style={{ filter: 'brightness(0) invert(1)', transform: 'scale(1.25)' }}
                            />
                        </button>

                        {isLanguageOpen && (
                            <div ref={dropDownRef} className="absolute top-12 right-0 bg-noir-bleute border border-gray-600 rounded-md shadow-2xl overflow-y-auto z-20 min-w-36 max-h-56"
                            >
                                {LANGUAGES.map(({ code, labelKey }) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => changeLanguage(code)}
                                        className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-reglisse transition ${activeLanguage === code ? 'text-jaune-souffre' : 'text-white'}`}
                                    >
                                        {labelKey}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/" className="flex flex-col items-center gap-1 mb-3 hover:opacity-90 transition">
                        <MarsLogo
                            className="w-32 h-32 md:w-40 md:h-40"
                            viewBox="45 70 110 85"
                            preserveAspectRatio="xMidYMid meet"
                            aria-label="Logo Mars AI"
                            role="img"
                        />
                        <h1 className="font-title text-6xl md:text-8xl font-bold tracking-wide">{t('header.title')}</h1>
                    </Link>
                </div>

            </header>
            <div className="sticky top-0 z-50 bg-noir-bleute pt-2">
                <Navbar />
                <div className="h-1.5 w-full bg-jaune-souffre -mb-px" aria-hidden="true" />
            </div>
        </>
    );
}

export default Header;