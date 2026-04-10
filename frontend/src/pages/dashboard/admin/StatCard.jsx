 const StatCard = ({ title, value, color }) => {

  return (

    <div className={`bg-gris-steelix p-6 rounded-lg shadow-md border-3 ${color}`}>

     <h3 className="text-turquoise-vif text-m text-center font-bold uppercase">{title}</h3>

<p className="text-3xl text-center font-bold text-yellow-300 mt-2">{value}</p>

    </div>

  );

}; 

export default StatCard;