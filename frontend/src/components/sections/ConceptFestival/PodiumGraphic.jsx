import { useTranslation } from 'react-i18next';

const PodiumGraphic = () => {
// {t('home.HeroSection')}
    

     const { t } = useTranslation();

     return(
    <>
    <section>
      <div className="flex flex-col items-center justify-center p-6 gap-4">
        <img 
          src="/assets/img/Podium.png" 
          alt="Podium" 
          className="w-96 h-auto rounded-lg shadow-lg"
        />
        <p className='w-full text-amber-50 font-bold text-center'>{t('home.PodiumGraphic')}</p>
      </div>
      </section>
    </>
    );
}

export default PodiumGraphic;
