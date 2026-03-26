// On simule des appels asynchrones à une base de données avec des Promesses
const getMoviesByJuryId = async (juryId) => {
  console.log(`[MOCK] Recherche des films pour le jury n°${juryId}...`);
  return [
    { id: 1, title: "L'éveil de l'IA", statusId: 4 },
    { id: 2, title: "Futur Imparfait", statusId: 1 }
  ];
};

const updateStatus = async (movieId, juryId, statusId) => {
  console.log(`[MOCK] Le jury n°${juryId} a mis le film n°${movieId} au statut ${statusId}`);
  return { id: movieId, statusId: statusId, message: "Ceci est un faux retour de BDD" };
};

export default {
  getMoviesByJuryId,
  updateStatus
};