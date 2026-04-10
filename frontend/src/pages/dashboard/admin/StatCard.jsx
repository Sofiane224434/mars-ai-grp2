import { Link } from 'react-router-dom';

const StatCard = ({ title, value, color, to }) => {

  const cardClassName = `bg-gris-steelix p-6 rounded-lg shadow-md border-3 ${color}`;

  const content = (
    <>
      <h3 className="text-turquoise-vif text-m text-center font-bold uppercase">{title}</h3>
      <p className="text-3xl text-center font-bold text-yellow-300 mt-2">{value}</p>
    </>
  );

  return (
    to ? (
      <Link to={to} className={`${cardClassName} block transition-transform hover:-translate-y-0.5`}>
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