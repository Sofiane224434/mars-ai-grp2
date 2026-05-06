import { movieService } from "../services/api";
//import { useState } from "react";

export default function useMovie() {
    //create movie
    const createMovie = async (moviedata) => {
        const data = await movieService.savedata(moviedata);
        return data;
    };

    return { createMovie }
}