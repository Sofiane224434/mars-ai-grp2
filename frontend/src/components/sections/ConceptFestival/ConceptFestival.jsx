
import { useTranslation } from 'react-i18next';

const ConceptFestival = () => {
// {t('home.HeroSection')}
    

     const { t } = useTranslation();

     return(
    <>
    <section className='bg-noir-bleute'>
      <h2 className="pt-10 px-10 mt-8 text-5xl md:text-6xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-green-400 to-cyan-600 drop-shadow-sm">{t('home.titles1')}</h2>
      <p className=' px-10 text-amber-50 font-bold '>{t('home.description1')}</p>
   
      <h2 className=" px-10 mt-8 text-5xl md:text-6xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-green-400 to-cyan-600 drop-shadow-sm">{t('home.titles2')}</h2>
      <p className='px-10 text-amber-50 font-bold'>{t('home.description2')}</p>
  
      <h2 className=" px-10 mt-8 text-5xl md:text-6xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-green-400 to-cyan-600 drop-shadow-sm">{t('home.titles3')}</h2>
      <p className='px-10 text-amber-50 font-bold'>{t('home.description3')}</p>
      </section>
    </>
    );
}

export default ConceptFestival;

