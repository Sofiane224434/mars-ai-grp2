const movieSeeds = [
  {
    title: "L'Echo des Montagnes",
    directorFirstName: "Jean",
    directorLastName: "Dupont",
    email: "jean.dupont@example.com",
    statusId: 4,
    thumbnail: "https://images.unsplash.com/photo-1485095329183-d0797bf1a2ba?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Sombre Ruelle",
    directorFirstName: "Alice",
    directorLastName: "Martin",
    email: "alice.martin@example.com",
    statusId: 2,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Le Dernier Souffle",
    directorFirstName: "Paul",
    directorLastName: "Rousseau",
    email: "paul.rousseau@example.com",
    statusId: 3,
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=600",
  },
];

export const mockReviewedMovies = Array.from({ length: 36 }, (_, index) => {
  const seed = movieSeeds[index % movieSeeds.length];

  return {
    id: 101 + index,
    title: `${seed.title} #${index + 1}`,
    directorFirstName: seed.directorFirstName,
    directorLastName: seed.directorLastName,
    email: seed.email,
    statusId: seed.statusId,
    thumbnail: seed.thumbnail,
  };
});