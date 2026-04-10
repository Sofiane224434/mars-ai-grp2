import { query } from '../config/db.js';

const Movie = {
    async createMovie({
        movieInfo,
        movieAIuse,
        movieMultimedia,
        movieDirector }) {

        //Triage des valeurs



        //Construction de la requête SQL
        const tablecols = [
            "title_original", "subtitles", "videofile", "language",
            "description", "prompt", "status", "synopsis_original", "classification",
            "thumbnail", "created_at", "updated_at", "title_english", "synopsis_english",
            "youtube_url", "movie_duration"
        ]

        //use prepared queries with named placeholder
        // ex: :movietile, :synopsis ...
        //VALUES (:movietitle,...)
        //Then build array for my result with Object.keys for each part
        //Separate this loop to avoid overload
        //Make this a separate code to write the code for me and paste it here
        let question_marks, valuenames;
        for (let i in tablecols) {
            if (i == 0) {
                question_marks = "(";
                valuenames = "("
            }

            if (i != tablecols.length - 1) {
                question_marks += "?, ";
                valuenames += tablecols[i] + ", ";
            } else {
                question_marks += "?";
                valuenames += tablecols[i];
            }


            if (i == tablecols.length - 1) {
                question_marks += ")";
                valuenames += ")";
            }
        }

        const sql = "INSERT INTO movies " + valuenames +
            "VALUES " + question_marks;
        //étape 1: remplir la table movie
        //étape 2: utiliser l'id obtenu pour remplir la table director
        //const result = await query(sql, []);

        //get id
        //const myid = result.id;
    }
}
export default Movie;