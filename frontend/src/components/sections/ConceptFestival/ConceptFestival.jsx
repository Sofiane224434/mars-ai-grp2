
import { useTranslation } from 'react-i18next';

const ConceptFestival = () => {
// {t('home.HeroSection')}
    

     const { t } = useTranslation();

     return(
    <>
    <section>
      <h2 className="concept-festival">{t('home.titles1')}</h2>
      <p className=' px-10 text-amber-50 font-bold '>{t('home.description1')}</p>
   
      <h2 className=" concept-festival">{t('home.titles2')}</h2>
      <p className='px-10 text-amber-50 font-bold'>{t('home.description2')}</p>
  
      <h2 className="concept-festival">{t('home.titles3')}</h2>
      <p className='px-10 text-amber-50 font-bold'>{t('home.description3')}</p>
      </section>
    </>
    );
}

export default ConceptFestival;

