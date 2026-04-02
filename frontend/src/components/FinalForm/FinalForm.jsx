import { useState, useEffect } from "react";

import InputAdditive from "./InputAdditive";
import InputAdditiveSelect from "./InputAdditiveSelect";
import InputAdditiveGrouped from "./InputAdditiveGrouped";
import InputSuper from "./InputSuper";

export default function FinalForm() {

    //----------------------------
    //PARTIE CONSTRUCTION
    //----------------------------

    let init_results = {};

    const [currentStep, setCurrentStep] = useState(1);
    const [results, setResults] = useState({});

    function buildResults(name) {
        init_results[name] = "";
        setResults(init_results);
    }

    useEffect(() => {
        console.log("result debug:", results);
    }, [results])

    /**
     * Rend une copy indépendante d'un state react.
     * @param state Le state react à copier.
     * @returns 
     */
    function getStateCopy(state) {
        let mycopy = JSON.parse(JSON.stringify(state));
        return mycopy;
    }

    /**
     * Fonction qui récupère les valeurs dans les components faits pour le formulaire.
     * @param {*} values 
     */
    function retrieveValues(values) {
        console.log(values);
    }

    //Options pour les InputAdditiveSelect concernants les IA
    const aiselectoptions = [
        <option value="">...</option>,
        <option value={"gemini"}>Google (Gemini)</option>,
        <option value={"midjourney"}>Midjourney</option>,
        <option value={"chatGPT"}>OpenAI (ChatGPT)</option>,
        <option value={"claude"}>Anthropic (Claude)</option>,
        <option value={"grok"}>Grok</option>,
        <option value={"other"}>Autre...</option>
    ];

    //Tous les inputs que le formulaire va ensuite utiliser.
    const myforms = {
        1: <div>
            <InputSuper type={"text"} name={"movietitle"} getValueFunc={retrieveValues}
                declareSelfFunc={buildResults} label={"Titre de votre film :"} required={true}
            ></InputSuper>

            <InputSuper type={"text"} name={"movietitletranslated"} declareSelfFunc={buildResults}
                getValueFunc={retrieveValues} label={`Titre de votre film traduit en 
                français (si possible) :`}></InputSuper>

            <InputSuper type={"textarea"} name={"synopsis"} declareSelfFunc={buildResults}
                getValueFunc={retrieveValues} max_string={300} required={true}
                label={`Synopsis (résumé) de votre film :`}></InputSuper>

            <InputSuper type={"text"} name={"movielanguage"} label={`Langue de votre film 
                (si a un dialogue ou du texte)`} getValueFunc={retrieveValues}
                declareSelfFunc={buildResults}></InputSuper>

            <InputSuper type={"file"} name={"videofile"} accept={"video/mp4,video/x-m4v,video/mov"}
                declareSelfFunc={buildResults} getValueFunc={retrieveValues} required={true}
            ></InputSuper>

            <InputSuper name={"soundbankcheck"} type={"checkbox"} label={`Cete vidéo possède 
                de la musique et/ou utilise une banque son.`} declareSelfFunc={buildResults}
                getValueFunc={retrieveValues}></InputSuper>

            {
                results["soundbankcheck"] &&
                <InputAdditive name={"soundbank"} btntitle="AJOUTER UNE SOUNDBANK/MUSIQUE"
                    getValuesFunc={retrieveValues} label={"Veuillez informer les soundbanks ou " +
                        "musiques utilisés."} declareSelfFunc={buildResults} addlimit={100}>
                </InputAdditive>
            }

            <InputSuper type={"url"} name={"youtubelink"} declareSelfFunc={buildResults}
                getValueFunc={retrieveValues} label={`Lien youtube vers cette vidéo :`}></InputSuper>
        </div>

        ,
        2: [
            <input name="aiscenariocheck" type="checkbox"
                checked={results["aiscenariocheck"] || false}></input>,
            <InputAdditiveSelect name={"aiscenario"} getValuesFunc={retrieveValues}
                label={"Choisissez les IAs utilisées."} options={aiselectoptions}></InputAdditiveSelect>,
            <input name="aivideocheck" type="checkbox"
                checked={results["aivideocheck"] || false}></input>,
            <InputAdditiveSelect name={"aivideo"} getValuesFunc={retrieveValues}
                label={"Choisissez les IAs utilisées."} options={aiselectoptions}></InputAdditiveSelect>,
            <input name="aipostprodcheck" type="checkbox"
                checked={results["aipostprodcheck"] || false}></input>,
            <InputAdditiveSelect name={"aipostprod"} getValuesFunc={retrieveValues}
                label={"Choisissez les IAs utilisées."} options={aiselectoptions}></InputAdditiveSelect>,
            <select name="classification" value={results["classification"] || ""}>
                <option value={""}>...</option>
                <option value={"allai"}>Génération intégrale (100% IA)</option>
                <option value={"hybrid"}>Production hybride (Prises de vues réelles +
                    apports IA)
                </option>
            </select>,
            <textarea name="prompts" value={results["prompts"] || ""}></textarea>,
        ],
        3: [
            <input type="file" name="movieimage"></input>,
            <input type="file" name="moviescreenshots"></input>,
            <input type="checkbox" name="dialoguecheck"
                checked={results["dialoguecheck"] || false}></input>,
            <input type="file" name="srtfile" accept=".srt"></input>
        ],
        4: [
            <input type="text" name="lastname" value={results["lastname"] || ""}></input>,
            <input type="text" name="firstname" value={results["firstname"] || ""}></input>,
            <select name="gender" value={results["gender"] || ""}>
                <option value={""}>...</option>
                <option value={"m"}>Monsieur</option>
                <option value={"f"}>Madame</option>
                <option value={"other"}>Autre</option>
            </select>,
            <InputAdditiveGrouped name={"socials"} inputnames={["socialname", "sociallink"]}
                getValuesFunc={retrieveValues} labels={["Nom du réseau social", "Lien du réseau social"]}
            ></InputAdditiveGrouped>,
            <input name="email" type="email" value={results["email"] || ""}></input>,
            <input name="tel" type="tel" value={results["tel"] || ""}></input>,
            <input name="birthdate" type="date" value={results["birthdate"] || ""}></input>,
            <input name="country" type="text" value={results["country"] || ""}></input>,
            <input name="address" type="text" value={results["address"] || ""}></input>,
            <input name="address2" type="text" value={results["address2"] || ""}></input>,
            <input name="zipcode" type="text" value={results["zipcode"] || ""}></input>,
            <input name="city" type="text" value={results["city"] || ""}></input>,
            <select name="marketting" value={results["marketting"] || ""}>
                <option value={""}>...</option>
                <option value={"bouche à oreille"}>Bouche à oreille</option>
                <option value={"réseaux sociaux"}>Sur les réseaux sociaux</option>
                <option value={"autre"}>Autre (précisez)</option>
            </select>,
            <input type="text" name="markettingother" value={results["markettingother"] || ""}
            ></input>,
            <input type="checkbox" name="toscheck" checked={results["toscheck"] || false}></input>,
            <input type="checkbox" name="rulescheck" checked={results["rulescheck"] || false}></input>,
        ]
    }

    const maxstep = Object.keys(myforms).length;

    // Construction de results pour avoir les valeurs possibles du formulaire
    // useEffect(() => {
    //     let buildobj = {};
    //     for (let key in myinputs) {
    //         for (let index in myinputs[key]) {
    //             buildobj[myinputs[key][index].props.name] = "";
    //         }
    //     }
    //     console.log(buildobj);
    // }, [])

    // function getInputfromArray(inputname) {
    //     for (let n in myinputs) {
    //         for (let ind in myinputs[n]) {
    //             if (myinputs[n][ind].props.name === inputname) {
    //                 return myinputs[a];
    //             }
    //         }
    //     }
    // }

    return (
        <form>
            {myforms[1]}
        </form>
    )
}