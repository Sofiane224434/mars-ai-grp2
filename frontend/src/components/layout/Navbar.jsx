import React, { useState } from "react";
import { Button } from '../UI/Button.jsx';

export function Navbar({ isRounded = false }) {

    //Pour ouvrir ou fermer le menu hamburger
    const [isOpen, setIsOpen] = useState(false);
  
  // Style de la barre selon si elle est arrondie ou non (variant isRounded exemple utilisation:  <Navbar  isRounded />)
  const navbarStyle = isRounded 
    ? "rounded-full max-w-5xl mx-auto my-6 px-10" // Version arrondie
    : "w-full px-6";                             // Version rectangulaire

  return (
    <nav className={`bg-[#1D1D24] py-4 flex items-center justify-center shadow-2xl ${navbarStyle}`}>

        {/* 2. BOUTON BURGER MOBILE  */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 bg-[#FDFF6B] flex flex-col justify-center items-center gap-1.5 cursor-pointer"
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
          <Button variant="filled-yellow">ACCUEIL</Button>
          <Button variant="neon-yellow">FILMS</Button>
          <Button variant="neon-yellow">À PROPOS</Button>
          <Button variant="neon-yellow">FAQ</Button>
        <Button variant="gradient-blue">PARTICIPER</Button>
        
        </div>
      </div>

      {/* --- MENU MOBILE DÉROULANT --- */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1D1D24] py-8 px-6 flex flex-col items-center gap-4 md:hidden border-t border-white/10 shadow-2xl">
          <Button variant="filled-yellow" className="w-[80%] max-w-70" onClick={() => setIsOpen(false)}>ACCUEIL</Button>
          <Button variant="neon-yellow" className="w-[80%] max-w-70" onClick={() => setIsOpen(false)}>FILMS</Button>
          <Button variant="neon-yellow" className="w-[80%] max-w-70" onClick={() => setIsOpen(false)}>À PROPOS</Button>
          <Button variant="neon-yellow" className="w-[80%] max-w-70 border-t border-white/10 my-2" onClick={() => setIsOpen(false)}>FAQ</Button>
          <Button variant="gradient-blue" className="w-[80%] max-w-70" onClick={() => setIsOpen(false)}>PARTICIPER</Button>
        </div>
      )}
      
    </nav>
  );
}

