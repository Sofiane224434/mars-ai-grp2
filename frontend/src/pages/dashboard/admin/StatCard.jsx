import { Link } from 'react-router-dom';

const StatCard = ({ title, value, color, to, variant = 'default', updatedAt = null }) => {

  const isNeon = variant === 'pro' || variant === 'neon';
  const formattedUpdateTime = updatedAt
    ? new Date(updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;
  const cardClassName = isNeon
    ? `rounded-xl border-2 border-solid ${color} bg-linear-to-b from-noir-bleute/95 to-gris-steelix/70 p-6 shadow-[0_0_0_1px_rgba(77,246,255,0.18),0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xs`
    : `rounded-lg border-2 border-solid ${color} bg-gris-steelix/90 p-6 shadow-md`;

  const content = isNeon ? (
    <>
      <h3 className="text-turquoise-vif text-xs text-center font-bold uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(77,246,255,0.45)]">
        {title}
      </h3>
      <p className="mt-3 text-center text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(253,255,107,0.38)]">
        {value}
      </p>
      <p className="mt-2 text-center text-[11px] uppercase tracking-[0.12em] text-gris-magneti/95">
        {formattedUpdateTime ? `mise a jour a ${formattedUpdateTime}` : 'mise a jour recente'}
      </p>
    </>
  ) : (
    <>
      <h3 className="text-turquoise-vif text-sm text-center font-bold uppercase tracking-wide">{title}</h3>
      <p className="text-3xl text-center font-bold text-white mt-2">{value}</p>
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