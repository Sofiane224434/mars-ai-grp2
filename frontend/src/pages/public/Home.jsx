// pages/Home.jsx
import { Link } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import CountdownTimer from '../../components/sections/HeroSection/CountdownTimer/CountdownTimer.jsx';
import ConceptFestival from '../../components/sections/ConceptFestival/ConceptFestival.jsx';

function Home() {

    return (
        
        <main className='bg-gris-anthracite '>
            <>
                <HeroSection />
                <CountdownTimer />
                <ConceptFestival />
            </>
        </main>
      
    );
}

export default Home;