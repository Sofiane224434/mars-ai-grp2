// pages/Home.jsx
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import CountdownTimer from '../../components/sections/HeroSection/CountdownTimer/CountdownTimer.jsx';
import MaSectionFestival from '../../components/sections/ConceptFestival/MaSectionFestival.jsx';
import QuickAccessSection from '../../components/sections/ConceptFestival/QuickAccessSection.jsx';

function Home() {

    return (

        <main className='background-gradient-black '>
            <>
                <HeroSection />
                <CountdownTimer />
                <MaSectionFestival />
                <QuickAccessSection />
            </>
        </main>

    );
}

export default Home;