// pages/Home.jsx
import { Link } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import CountdownTimer from '../../components/sections/HeroSection/CountdownTimer/CountdownTimer.jsx';
import MaSectionFestival from '../../components/sections/ConceptFestival/MaSectionFestival.jsx';

function Home() {

    return (
        
        <main className='background-gradient-black '>
            <>
                <HeroSection />
                <CountdownTimer />
                <MaSectionFestival />
            </>
        </main>
      
    );
}

export default Home;