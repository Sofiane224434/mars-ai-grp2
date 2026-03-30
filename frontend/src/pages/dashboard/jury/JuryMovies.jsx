import { useState, useEffect } from 'react';
import MovieCard from '../../../components/ui/MovieCard.jsx';
import Pagination from '../../../components/ui/Pagination.jsx';
import Spinner from '../../../components/ui/Spinner.jsx'; 

function JuryMovies() {
  // 1. États pour la gestion des données et du chargement
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Le spinner tourne par défaut
  
  // 2. Les variables de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; 

  // 3. Simulation de l'appel API (au montage du composant)
  useEffect(() => {
    const fakeMovies = [
      { id: 1, title: "Le Voyage", directorName: "Alice Dupont", status: "wait" },
      { id: 2, title: "Dans l'ombre", directorName: "Bob Martin", status: "valid" },
      { id: 3, title: "Éclipse", directorName: "Charlie Chaplin", status: "refuse" },
      { id: 4, title: "Rêve éveillé", directorName: "David Lynch", status: "wait" },
      { id: 5, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 6, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 7, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 8, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 9, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 10, title: "Mirage", directorName: "Emma Stone", status: "review" },
      { id: 11, title: "Mirage", directorName: "Emma Stone", status: "review" },
    ];

    // On simule un délai réseau de 1.5 seconde avant de livrer les données
    const timer = setTimeout(() => {
      setMovies(fakeMovies);
      setIsLoading(false); // On coupe le spinner
    }, 1500);

    return () => clearTimeout(timer); // Nettoyage propre
  }, []);

  // 4. Logique de pagination (basée sur l'état 'movies' maintenant)
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMoviesToDisplay = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePlaceholder = () => {
    console.log("Action déclenchée !");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
        <h1 className="mb-8 text-center text-5xl text-white">Films Assignés au Jury</h1>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          
          {/* --- INTÉGRATION DU SPINNER --- */}
          {isLoading ? (
            <div className="col-span-full">
              <Spinner />
            </div>
          ) : (
            /* --- AFFICHAGE DES CARTES UNE FOIS CHARGÉES --- */
            currentMoviesToDisplay.map((movie) => (
              <MovieCard
                key={movie.id}
                variant={movie.status === 'wait' ? 'jury-pending' : 'jury-reviewed'}
                status={movie.status}
                title={movie.title}
                directorName={movie.directorName}
                onJudge={handlePlaceholder}
                onMoreInfo={handlePlaceholder}
              />
            ))
          )}

        </div>
        
        {/* On masque la pagination pendant le chargement pour éviter les bugs visuels */}
        {!isLoading && movies.length > 0 && (
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </div>
        )}
        
      </div>
    </>
  );
}

export default JuryMovies;