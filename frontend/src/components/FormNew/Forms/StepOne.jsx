import { useState } from "react";
import FormButton from "../FormButtons/FormButton";
import { ZodSchema } from "../ZodSchemas";

export default function StepOne() {

    const [results, setResults] = useState({});
    const [errors, setErrors] = useState({});

    function verify() {
        console.log("I work!");
    }

    function inputSimpleChange(e) {
        const propname = e.target.name;
        const propvalue = e.target.value;

        let newres = JSON.parse(JSON.stringify(results));
        newres[propname] = propvalue;
        setResults(newres);
    }



    return (
        <form>

            <div>
                <div>Titre original du film</div>
                <input name="movietitle" type="text"></input>
            </div>

            <div>
                <div>Titre du film traduit en français</div>
                <input name="movietitlefr" type="text"></input>
            </div>

            <div>
                <div>Synopsis</div>
                <textarea name="synopsis" style={{ resize: "none" }} maxLength={300}></textarea>
            </div>

            <div>
                <div>Langue du film</div>
                <input name="movielanguage" type="text"></input>
            </div>

            <div>
                <div>Votre fichier vidéo (.mp4, .mov)</div>
                <input name="moviefile" type="file"></input>
            </div>

            <div>
                <input type="checkbox"></input>
                <div>Ce film contient une banque son ou de la musique</div>
            </div>

            <div>
                <div>Un lien de votre film sur Youtube</div>
                <input type="url"></input>
            </div>

            <FormButton functionOnClick={verify} textContent={"Suivant"}></FormButton>
        </form>

    )
}