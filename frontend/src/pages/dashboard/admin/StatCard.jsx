import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const clampPercent = (value) => Math.max(0, Math.min(100, Number(value) || 0));

const StatCard = ({
  title,
  value,
  color,
  to,
  variant = 'default',
  updatedAt = null,
  animate = false,
  suffix = '',
  progress = null,
  centerNumber = false,
}) => {

  const isNeon = variant === 'pro' || variant === 'neon';
  const numericValue = typeof value === 'number' ? value : Number.NaN;
  const shouldAnimateNumber = isNeon && animate && Number.isFinite(numericValue);
  const [animatedValue, setAnimatedValue] = useState(0);
  const normalizedProgress = useMemo(
    () => (progress === null ? null : clampPercent(progress)),
    [progress]
  );
  const [animatedProgress, setAnimatedProgress] = useState(
    normalizedProgress ?? 0
  );

  const displayValue = shouldAnimateNumber ? animatedValue : value;

  useEffect(() => {
    if (!shouldAnimateNumber) {
      return;
    }

    const durationMs = 900;
    const startTime = performance.now();
    const start = animatedValue;
    const target = numericValue;
    let frameId = 0;

    const step = (now) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      setAnimatedValue(Math.round(start + (target - start) * eased));

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [shouldAnimateNumber, numericValue, animatedValue]);

  useEffect(() => {
    if (normalizedProgress === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setAnimatedProgress(normalizedProgress);
    }, 40);

    return () => clearTimeout(timeoutId);
  }, [normalizedProgress]);

  const formattedUpdateTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;
  const cardClassName = isNeon
    ? `h-full min-h-[220px] rounded-xl border-2 border-solid ${color} bg-linear-to-b from-noir-bleute/95 to-gris-steelix/70 p-6 shadow-[0_0_0_1px_rgba(77,246,255,0.18),0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xs`
    : `h-full min-h-[180px] rounded-lg border-2 border-solid ${color} bg-gris-steelix/90 p-6 shadow-md`;

  const content = isNeon ? (
    <>
      <div className="flex h-full flex-col justify-between">
        <h3 className="text-turquoise-vif text-xs text-center font-bold uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(77,246,255,0.45)]">
        {title}
        </h3>
        <div className="flex flex-1 flex-col justify-center">
          <p className="mt-3 flex w-full items-center justify-center text-3xl font-bold text-white tabular-nums drop-shadow-[0_0_12px_rgba(253,255,107,0.38)]">
            {displayValue}{suffix}
          </p>
          {normalizedProgress !== null && (
            <div className="mt-3">
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-turquoise-vif via-bleu-ciel to-jaune-souffre transition-[width] duration-700 ease-out"
                  style={{ width: `${animatedProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] uppercase tracking-[0.12em] text-gris-magneti/95">
          {formattedUpdateTime ? `mise a jour a ${formattedUpdateTime}` : 'mise a jour recente'}
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="flex h-full flex-col justify-between">
        <h3 className="text-turquoise-vif text-sm text-center font-bold uppercase tracking-wide">{title}</h3>
        <div className={`${centerNumber ? 'flex flex-1 items-center justify-center' : 'mt-2 flex flex-1 items-center justify-center'} `}>
          <p className="flex w-full items-center justify-center text-3xl font-bold text-white tabular-nums">{value}</p>
        </div>
      </div>
    </>
  );

  return (
    to ? (
      <Link
        to={to}
        className={`${cardClassName} block transition-all duration-150 hover:-translate-y-0.5 ${isNeon ? 'hover:shadow-[0_0_0_1px_rgba(77,246,255,0.32),0_14px_34px_rgba(0,0,0,0.5)] hover:ring-1 hover:ring-turquoise-vif/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-vif/70' : 'hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-vif/50'}`}
      >
        {content}
      </Link>
    ) : (
      <div className={cardClassName}>
        {content}
      </div>
    )
  );
};

export default StatCard;