import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_DURATION_MS = (12 * 86400000) + (8 * 3600000) + (45 * 60000);

const toTimeLeft = (endTimeMs) => {
    const difference = endTimeMs - Date.now();

    if (difference <= 0) {
        return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
    }

    return {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
    };
};

const resolveInitialEndTimeMs = ({ storageKey, targetDate, defaultDurationMs }) => {
    const storedEndTime = localStorage.getItem(storageKey);
    if (storedEndTime) {
        return parseInt(storedEndTime, 10);
    }

    if (targetDate) {
        return new Date(targetDate).getTime();
    }

    return Date.now() + defaultDurationMs;
};

const useFestivalCountdown = ({
    storageKey = 'festivalCountdownEndTime',
    targetDate,
    defaultDurationMs = DEFAULT_DURATION_MS,
} = {}) => {
    const initialEndTimeMs = useMemo(
        () => resolveInitialEndTimeMs({ storageKey, targetDate, defaultDurationMs }),
        [storageKey, targetDate, defaultDurationMs],
    );

    const [endTimeMs, setEndTimeMs] = useState(initialEndTimeMs);
    const [timeLeft, setTimeLeft] = useState(() => toTimeLeft(initialEndTimeMs));

    useEffect(() => {
        const nextEndTimeMs = resolveInitialEndTimeMs({ storageKey, targetDate, defaultDurationMs });
        setEndTimeMs(nextEndTimeMs);
    }, [storageKey, targetDate, defaultDurationMs]);

    useEffect(() => {
        const updateTimer = () => {
            setTimeLeft(toTimeLeft(endTimeMs));
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [endTimeMs]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === storageKey && event.newValue) {
                setEndTimeMs(parseInt(event.newValue, 10));
            }
        };

        const handleCustomChange = (event) => {
            if (event.detail?.storageKey === storageKey) {
                setEndTimeMs(event.detail.endTimeMs);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('festival-countdown-updated', handleCustomChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('festival-countdown-updated', handleCustomChange);
        };
    }, [storageKey]);

    const setPersistedEndTimeMs = useCallback((nextEndTimeMs) => {
        setEndTimeMs(nextEndTimeMs);
        localStorage.setItem(storageKey, nextEndTimeMs.toString());
        window.dispatchEvent(new CustomEvent('festival-countdown-updated', {
            detail: { storageKey, endTimeMs: nextEndTimeMs },
        }));
    }, [storageKey]);

    return {
        timeLeft,
        endTimeMs,
        setPersistedEndTimeMs,
    };
};

export default useFestivalCountdown;