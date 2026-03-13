

export const Button = ({ variant = 'inactive', children = 'Button', className = '' }) => {
  // Styles de base communs à tous les boutons
  const baseStyles = "relative flex items-center justify-center text-xl text-center leading-normal tracking-[0]";
  
  // Configuration des variantes
  const variants = {
    // Variante 1 : Jaune avec effet de lueur (Glow) - Bouton page non active 
    inactive: {
      container: "w-[134px] h-[63px] font-normal [font-family:'Inter-Regular',Helvetica] text-[#fcff6b]",
      bg: (
        <>
          <div className="blur-[3.9px] absolute w-full h-[67.97%] top-[15.81%] left-0 rounded-[31.63px] border-[5px] border-solid border-[#fcff6b]" />
          <div className="absolute w-full h-[67.97%] top-[15.81%] left-0 rounded-[31.63px] border-[5px] border-solid border-[#fcff6b]" />
        </>
      )
    },
    // Variante 2 : Dégradé bleu (Gradient) - Bouton participer
    submit: {
      container: "w-[197px] h-[63px] font-bold [font-family:'Inter-Bold',Helvetica] text-white",
      bg: (
        <div className="absolute w-full h-[67.97%] top-[15.81%] left-0 rounded-[31.63px] bg-[linear-gradient(90deg,rgba(77,246,255,1)_0%,rgba(43,148,152,1)_100%)]" />
      )
    },
    // Variante 3 : Grande taille (basée sur ton premier snippet) - Bouton page active
    active: {
      container: "w-[168px] h-20 font-normal [font-family:'Inter-Regular',Helvetica] text-[#be6422]",
      bg: (
        <div className="absolute w-full h-[67.97%] top-[15.81%] left-0 rounded-[31.63px] border-[5px] border-solid border-[#fcff6b] bg-[#fcff6b]" />
      )
    }
  };

  const currentVariant = variants[variant] || variants.glow;

  return (
    <div className={`${baseStyles} ${currentVariant.container} ${className}`}>
      {/* Couche de fond (Background/Borders) */}
      {currentVariant.bg}
      
      {/* Contenu du texte */}
      <span className="relative z-10">
        {children}
      </span>
    </div>
  );
};

