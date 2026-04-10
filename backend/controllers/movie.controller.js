import Movie from "../models/movie.model";

export async function createMovie(req, res) {

    try {

    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
        console.log(error);
    }

}