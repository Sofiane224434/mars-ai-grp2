import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../ui/Button';
import useFestivalCountdown from '../../../../hooks/useFestivalCountdown';
import useFestivalPhase from '../../../../hooks/useFestivalPhase';

const PHASES = [
  'Phase de soumission',
  'Phase de jugement',
  'Phase du top 50',
  'Phase du top 5',
];

const DEFAULT_PHASE_DURATION_MS = (12 * 86400000) + (8 * 3600000) + (45 * 60000);

const CountdownTimer = ({
  targetDate,
  showHeader = true,
  showFooter = true,
  showControls = false,
}) => {
  const { t } = useTranslation();
  const { timeLeft, endTimeMs, setPersistedEndTimeMs } = useFestivalCountdown({ targetDate });
  const { currentPhase, setPersistedPhase, isSubmissionPhase } = useFestivalPhase();
  const [inputDays, setInputDays] = useState(12);
  const [inputHours, setInputHours] = useState(8);
  const [inputMinutes, setInputMinutes] = useState(45);
  const [inputSeconds, setInputSeconds] = useState(0);
  const hasAutoAdvancedRef = useRef(false);

  useEffect(() => {
    if (!showControls || !endTimeMs) {
      return;
    }

    const diff = endTimeMs - Date.now();
    if (diff <= 0) {
      setInputDays(0);
      setInputHours(0);
      setInputMinutes(0);
      return;
    }

    setInputDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    setInputHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
    setInputMinutes(Math.floor((diff / 1000 / 60) % 60));
    setInputSeconds(Math.floor((diff / 1000) % 60));
  }, [showControls, endTimeMs]);

  useEffect(() => {
    const isTimerExpired =
      timeLeft.jours === 0
      && timeLeft.heures === 0
      && timeLeft.minutes === 0
      && timeLeft.secondes === 0;

    if (isTimerExpired && currentPhase < 3 && !hasAutoAdvancedRef.current) {
      hasAutoAdvancedRef.current = true;
      setPersistedPhase(currentPhase + 1);
      setPersistedEndTimeMs(Date.now() + DEFAULT_PHASE_DURATION_MS);
      return;
    }

    if (!isTimerExpired) {
      hasAutoAdvancedRef.current = false;
    }
  }, [currentPhase, setPersistedEndTimeMs, setPersistedPhase, timeLeft]);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const handleApplyTime = () => {
    const days = Number.parseInt(inputDays, 10) || 0;
    const hours = Number.parseInt(inputHours, 10) || 0;
    const minutes = Number.parseInt(inputMinutes, 10) || 0;
    const seconds = Number.parseInt(inputSeconds, 10) || 0;

    const durationMs = (
      (days * 24 * 60 * 60)
      + (hours * 60 * 60)
      + (minutes * 60)
      + seconds
    ) * 1000;

    setPersistedEndTimeMs(Date.now() + durationMs);
  };

  const handlePhaseChange = (phaseIndex) => {
    setPersistedPhase(phaseIndex);
  };

  return (
    <div className="bg-gris-anthracite flex flex-col items-center w-full">
      {showHeader && (
        <h2 className="text-white m-10 text-4xl">{PHASES[currentPhase]}</h2>
      )}

      <div className="bg-[#1e2124]/80 backdrop-blur-md border border-white/5 rounded-xl px-8 py-6 flex gap-6 md:gap-10 shadow-2xl">
        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.jours)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            {t('countdown.days')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.heures)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            {t('countdown.hours')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            {t('countdown.minutes')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-widest tabular-nums">
            {formatNumber(timeLeft.secondes)}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs mt-2 uppercase font-semibold tracking-wider">
            {t('countdown.seconds')}
          </span>
        </div>
      </div>

      {showFooter && (
        <>
          {currentPhase <= 1 ? (
            <h3 className="mt-8 text-5xl md:text-6xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-green-400 to-cyan-400 drop-shadow-sm">
              {t('countdown.top50')}
            </h3>
          ) : (
            <div className="mt-8" />
          )}

          {isSubmissionPhase && (
            <Link to="/participate">
              <Button variant="gradient-blue" className="px-60 py-15 text-3xl m-4">
                {t('countdown.participate')}
              </Button>
            </Link>
          )}
        </>
      )}

      {showControls && (
        <div className="mt-12 bg-noir-bleute border border-jaune-souffre/30 rounded-lg p-8 w-full max-w-2xl">
          <h3 className="text-jaune-souffre text-2xl font-bold mb-6">Changer la phase</h3>

          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {PHASES.map((phase, index) => (
              <button
                key={phase}
                onClick={() => handlePhaseChange(index)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentPhase === index
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {phase}
              </button>
            ))}
          </div>

          <h3 className="text-jaune-souffre text-2xl font-bold mb-6">Modifier le temps</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="text-jaune-souffre text-sm font-semibold mb-2">Jours</label>
              <input
                type="number"
                min="0"
                max="365"
                value={inputDays}
                onChange={(e) => setInputDays(e.target.value)}
                className="bg-gris-anthracite border border-jaune-souffre/50 text-jaune-souffre rounded-lg px-4 py-2 focus:outline-none focus:border-jaune-souffre"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-jaune-souffre text-sm font-semibold mb-2">Heures</label>
              <input
                type="number"
                min="0"
                max="23"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                className="bg-gris-anthracite border border-jaune-souffre/50 text-jaune-souffre rounded-lg px-4 py-2 focus:outline-none focus:border-jaune-souffre"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-jaune-souffre text-sm font-semibold mb-2">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="bg-gris-anthracite border border-jaune-souffre/50 text-jaune-souffre rounded-lg px-4 py-2 focus:outline-none focus:border-jaune-souffre"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-jaune-souffre text-sm font-semibold mb-2">Secondes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                className="bg-gris-anthracite border border-jaune-souffre/50 text-jaune-souffre rounded-lg px-4 py-2 focus:outline-none focus:border-jaune-souffre"
              />
            </div>
          </div>

          <button
            onClick={handleApplyTime}
            className="w-full bg-jaune-souffre text-noir-bleute font-bold py-3 px-6 rounded-lg hover:bg-jaune-souffre/90 transition-all"
          >
            Appliquer le temps
          </button>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;