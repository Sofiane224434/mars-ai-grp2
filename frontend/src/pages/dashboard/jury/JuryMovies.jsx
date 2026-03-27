import { useState } from 'react';
import MovieCard from '../../../components/UI/MovieCard.jsx';
import Pagination from '../../../components/UI/Pagination.jsx';

function JuryMovies() {
  // 1. La "fausse" base de données (pour tester avant l'API)
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

  // 2. Les variables de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; // On décide d'afficher 2 films par page
  
  // On calcule automatiquement le nombre de pages (ici 5 films / 2 = 3 pages)
  const totalPages = Math.ceil(fakeMovies.length / ITEMS_PER_PAGE);

  // 3. LA MAGIE : On découpe le tableau selon la page actuelle
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMoviesToDisplay = fakeMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePlaceholder = () => {
    console.log("Action déclenchée !");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10">
        <h1 className="mb-8 text-center text-5xl text-white">Films Assignés au Jury</h1>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          
          {/* 4. On utilise .map() pour afficher UNIQUEMENT les films de la page actuelle */}
          {currentMoviesToDisplay.map((movie) => (
            <MovieCard
              key={movie.id}
              variant={movie.status === 'wait' ? 'jury-pending' : 'jury-reviewed'}
              status={movie.status}
              title={movie.title}
              directorName={movie.directorName}
              onJudge={handlePlaceholder}
              onMoreInfo={handlePlaceholder}
            />
            
          ))}

        </div>
        
        {/* La pagination contrôle maintenant la variable currentPage */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
        
      </div>
    </>
  );
}

export default JuryMovies;