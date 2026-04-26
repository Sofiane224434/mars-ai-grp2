// pages/Home.jsx
import { useTranslation } from 'react-i18next';
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import CountdownTimer from '../../components/sections/HeroSection/CountdownTimer/CountdownTimer.jsx';
import MaSectionFestival from '../../components/sections/ConceptFestival/MaSectionFestival.jsx';
import QuickAccessSection from '../../components/sections/ConceptFestival/QuickAccessSection.jsx';
import useFestivalPhase from '../../hooks/useFestivalPhase.js';

function Home() {
    const { t } = useTranslation();
    const { currentPhase } = useFestivalPhase();
    const isWinnersPhase = currentPhase === 3;

    return (

        <main className='background-gradient-black '>
            <>
                <HeroSection />
                {isWinnersPhase ? (
                    <section className="bg-gris-anthracite px-6 py-12">
                        <div className="mx-auto max-w-5xl rounded-3xl border border-jaune-souffre/20 bg-[#1e2124]/80 px-8 py-10 text-center shadow-2xl backdrop-blur-md">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-jaune-souffre/70">
                                MarsAI Festival
                            </p>
                            <h2 className="mt-4 text-3xl font-black uppercase tracking-wide text-white md:text-5xl">
                                {t('home.results-available')}
                            </h2>
                        </div>
                    </section>
                ) : (
                    <CountdownTimer />
                )}
                <MaSectionFestival />
                <QuickAccessSection />
            </>
        </main>

    );
}

export default Home;