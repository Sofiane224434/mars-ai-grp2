import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";
import InputAdditive from "../InputAdditive";

/**
 * Premier formulaire : Fiche Film
 * @param hide Si ce formulaire doit être caché ou non 
 * @param getFunction La fonction qui permettra de faire passer des informations à un parent
 * @param classInput Classe à appliquer aux inputs (optionnel)
 * @param classContainer Classe à appliquer au container de ce formulaire (optionnel)
 * @param classLabel Classe à appliquer aux labels (optionnel)
 */
export default function FormMovieInfo({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label"
}) {

    const [movietitle, setMovieTitle] = useState("");
    const [movietitlefr, setMovieTitlefr] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [synopsisEng, setSynopsisEng] = useState("");
    const [movielanguage, setMovieLanguage] = useState("");
    const [movievideo, setMovieVideo] = useState({ file: "", value: "" });
    const [soundbankCheck, setSoundbankCheck] = useState(false);
    const [soundbankData, setSoundbankData] = useState([]);
    const [ytlink, setYTlink] = useState("");

    const [errorMovieTitle, setErrorMovieTitle] = useState("");
    const [errorMovieTitlefr, setErrorMovieTitlefr] = useState("");
    const [errorSynopsis, setErrorSynopsis] = useState("");
    const [errorSynopsisEng, setErrorSynopsisEng] = useState("");
    const [errorMovieLanguage, setErrorMovieLanguage] = useState("");
    const [errorMovieVideo, setErrorMovieVideo] = useState("");
    const [errorSoundbankCheck, setErrorSoundbankCheck] = useState("");
    const [errorSoundbankData, setErrorSoundbankData] = useState("");
    const [errorYtLink, setErrorYtLink] = useState("");

    let alldata = {
        movietitle: movietitle,
        movietitlefr: movietitlefr,
        synopsis: synopsis,
        synopsisEng: synopsisEng,
        movielanguage: movielanguage,
        movievideo: movievideo,
        soundbankCheck: soundbankCheck,
        soundbankData: soundbankData,
        ytlink: ytlink
    }

    function sendData() {
        if (getFunction) {
            getFunction(alldata);
        }
    }

    useEffect(() => {
        sendData();
    }, [alldata])

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>

            <h2>Etape 1 : Fiche Film</h2>

            <InputSuper label={"Titre du film"} type={"text"}
                getValueFunc={setMovieTitle}></InputSuper>

            <InputSuper label={`Titre du film traduit en français (si possible)`}
                type={"text"} getValueFunc={setMovieTitlefr}></InputSuper>

            <InputSuper type={"textarea"} getValueFunc={setSynopsis}
                max_string={300} label={`Synopsis (résumé) de votre film :`}></InputSuper>

            <InputSuper type={"text"} label={`Langue de votre film (si a un dialogue ou du texte)`}
                getValueFunc={setMovieLanguage} max_string={100}></InputSuper>

            <InputSuper type={"file"} accept={"video/mp4,video/x-m4v,video/mov"}
                getValueFunc={setMovieVideo} required={true}></InputSuper>

            <InputSuper type={"checkbox"} label={`Cete vidéo possède de la musique et/ou utilise 
            une banque son.`} getValueFunc={setSoundbankCheck}></InputSuper>

            {
                soundbankCheck &&
                <InputAdditive btntitle="AJOUTER UNE SOUNDBANK/MUSIQUE"
                    getValuesFunc={setSoundbankData} label={"Veuillez informer les soundbanks ou " +
                        "musiques utilisés."} addlimit={100}>
                </InputAdditive>
            }

            <InputSuper type={"url"} getValueFunc={setYTlink}
                label={`Lien youtube vers cette vidéo :`}></InputSuper>

        </div>
    )

}