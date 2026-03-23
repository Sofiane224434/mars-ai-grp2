// pages/Home.jsx
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection/HeroSection.jsx';
import CountdownTimer from '../components/sections/HeroSection/CountdownTimer/CountdownTimer.jsx';

function Home() {

    return (
        <main>
        <>
        <HeroSection />
        <CountdownTimer />
        </>
        </main>
    );
}

export default Home;