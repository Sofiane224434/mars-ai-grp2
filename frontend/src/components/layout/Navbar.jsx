import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

function Navbar({ isRounded = false }) {

  //Pour ouvrir ou fermer le menu hamburger
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Style de la barre selon si elle est arrondie ou non (variant isRounded exemple utilisation:  <Navbar  isRounded />)
  const navbarStyle = isRounded
    ? "rounded-full max-w-5xl mx-auto my-6 px-10" // Version arrondie
    : "w-full m-0 px-0 rounded-none"; // Version rectangulaire

  return (
    <nav className={`relative bg-noir-bleute py-4 flex items-center justify-center shadow-2xl ${navbarStyle}`}>

      {/* 2. BOUTON BURGER MOBILE  */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-12 h-12 bg-jaune-souffre flex flex-col justify-center items-center gap-1.5 cursor-pointer"
        aria-label="Menu"
      >
        {/* Lignes très épaisses (h-[5px]) et sombres */}
        <span className={`w-7 h-1.25 bg-[#0A0A0A] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.75" : ""}`}></span>
        <span className={`w-7 h-1.25 bg-[#0A0A0A] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
        <span className={`w-7 h-1.25 bg-[#0A0A0A] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.75" : ""}`}></span>
      </button>

      {/* Conteneur pour tous les boutons */}
      <div className="flex items-center gap-4">
        {/* Liens - Cachés sur petit mobile */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          <Link to="/">
            <Button variant="filled-yellow">{t('nav.home')}</Button>
          </Link>
          <Link to="/movies">
            <Button variant="neon-yellow">{t('nav.movies')}</Button>
          </Link>
          <Link to="/about">
            <Button variant="neon-yellow">{t('nav.about')}</Button>
          </Link>
          <Link to="/faq">
            <Button variant="neon-yellow">{t('nav.faq')}</Button>
          </Link>
          <Button variant="gradient-blue">{t('nav.participate')}</Button>

        </div>
      </div>

      {/* --- MENU MOBILE DÉROULANT --- */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-noir-bleute py-8 px-6 flex flex-col items-center gap-4 md:hidden border-t border-white/10 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="w-[80%] max-w-70 flex justify-center">
            <Button variant="filled-yellow" className="w-full">{t('nav.home')}</Button>
          </Link>
          <Link to="/movies" onClick={() => setIsOpen(false)} className="w-[80%] max-w-70 flex justify-center">
            <Button variant="neon-yellow" className="w-full">{t('nav.movies')}</Button>
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="w-[80%] max-w-70 flex justify-center">
            <Button variant="neon-yellow" className="w-full">{t('nav.about')}</Button>
          </Link>
          <Link to="/faq" onClick={() => setIsOpen(false)} className="w-[80%] max-w-70 flex justify-center border-t border-white/10 my-2">
            <Button variant="neon-yellow" className="w-full">{t('nav.faq')}</Button>
          </Link>
          <div className="w-[80%] max-w-70 flex justify-center">
            <Button variant="gradient-blue" className="w-full">{t('nav.participate')}</Button>
          </div>
        </div>
      )}

    </nav>
  );
}


export default Navbar;

