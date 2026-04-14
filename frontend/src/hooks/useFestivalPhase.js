import { useCallback, useEffect, useState } from 'react';

const PHASE_STORAGE_KEY = 'festivalCurrentPhase';
const PHASE_MIN = 0;
const PHASE_MAX = 3;

const parsePhase = (value) => {
    const parsed = Number.parseInt(value || '0', 10);
    if (Number.isNaN(parsed) || parsed < PHASE_MIN || parsed > PHASE_MAX) {
        return 0;
    }
    return parsed;
};

const useFestivalPhase = () => {
    const [currentPhase, setCurrentPhase] = useState(() => parsePhase(localStorage.getItem(PHASE_STORAGE_KEY)));

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === PHASE_STORAGE_KEY && event.newValue) {
                setCurrentPhase(parsePhase(event.newValue));
            }
        };

        const handleCustomChange = (event) => {
            if (event.detail?.phaseIndex !== undefined) {
                setCurrentPhase(parsePhase(String(event.detail.phaseIndex)));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('festival-phase-updated', handleCustomChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('festival-phase-updated', handleCustomChange);
        };
    }, []);

    const setPersistedPhase = useCallback((phaseIndex) => {
        const safePhase = parsePhase(String(phaseIndex));
        setCurrentPhase(safePhase);
        localStorage.setItem(PHASE_STORAGE_KEY, String(safePhase));
        window.dispatchEvent(new CustomEvent('festival-phase-updated', {
            detail: { phaseIndex: safePhase },
        }));
    }, []);

    return {
        currentPhase,
        setPersistedPhase,
        isSubmissionPhase: currentPhase === 0,
    };
};

export default useFestivalPhase;