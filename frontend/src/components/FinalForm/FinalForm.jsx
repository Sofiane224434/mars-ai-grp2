import { useState, useEffect } from "react";

import InputAdditive from "./InputAdditive";
import InputAdditiveSelect from "./InputAdditiveSelect";
import InputAdditiveGrouped from "./InputAdditiveGrouped";
import InputSuper from "./InputSuper";

import StepsTrack from "../StepsTrack";
import FormStepsButtons from "./FormStepsButtons";

export default function FinalForm() {

    //----------------------------
    //PARTIE CONSTRUCTION
    //----------------------------

    let init_results = {};

    const [currentStep, setCurrentStep] = useState(1);
    const [results, setResults] = useState({});
    const [errors, setErrors] = useState({});

    function buildResults(name) {
        //console.log("buildresults for : ", name);
        if (!init_results[name]) {
            init_results[name] = "";
        }
    }

    //debugging
    useEffect(() => {
        //console.log("result debug:", results, errors);
    }, [results, errors])

    //Rentre toutes les valeurs du formulaire dans le state results et errors
    useEffect(() => {
        setResults(init_results);
        setErrors(init_results);
    }, [])

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
        //console.log(values);
        let newres = getStateCopy(results);
        let valuekey = Object.keys(values)[0];
        newres[valuekey] = values[valuekey];
        setResults(newres);
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

    //Options pour inputsuper classification
    const classificationsoptions = [
        <option value={""}>...</option>,
        <option value={"allai"}>Génération intégrale (100% IA)</option>,
        <option value={"hybrid"}>Production hybride (Prises de vues réelles +
            apports IA)
        </option>,
    ];

    const genderoptions = [
        <option value={""}>...</option>,
        <option value={"m"}>Monsieur</option>,
        <option value={"f"}>Madame</option>,
        <option value={"other"}>Autre</option>,
    ]

    const markettingoptions = [
        <option value={""}>...</option>,
        <option value={"bouche à oreille"}>Bouche à oreille</option>,
        <option value={"réseaux sociaux"}>Sur les réseaux sociaux</option>,
        <option value={"other"}>Autre (précisez)</option>
    ]

    //Tous les inputs que le formulaire va ensuite utiliser.
    const myforms = [
        <div className={currentStep == 1 ? null : "hide"}>
            <h2>Etape 1 : Fiche Film</h2>
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
                getValueFunc={retrieveValues} label={`Lien youtube vers cette vidéo :`}
            ></InputSuper>

        </div>

        ,


        <div className={currentStep == 2 ? "" : "hide"}>
            <h2>Etape 1 : Déclaration d'usage de l'IA</h2>
            <div>Vous avez utilisé l'IA pour :</div>

            <InputSuper name={"aiscenariocheck"} type={"checkbox"}
                label={"La génération du scénario"} getValueFunc={retrieveValues}
                declareSelfFunc={buildResults}></InputSuper>

            {results["aiscenariocheck"] && <InputAdditiveSelect name={"aiscenario"}
                getValuesFunc={retrieveValues} label={"Choisissez les IAs utilisées."}
                options={aiselectoptions}
            ></InputAdditiveSelect>}

            <InputSuper type={"checkbox"} name={"aivideocheck"}
                label={"La génération de la vidéo"} getValueFunc={retrieveValues}
                declareSelfFunc={buildResults}></InputSuper>

            {results["aivideocheck"] && <InputAdditiveSelect name={"aivideo"} getValuesFunc={retrieveValues}
                label={"Choisissez les IAs utilisées."} options={aiselectoptions}
                declareSelfFunc={buildResults}
            ></InputAdditiveSelect>}

            <InputSuper type={"checkbox"} name={"aipostprodcheck"}
                label={"La génération de la vidéo"} getValueFunc={retrieveValues}
                declareSelfFunc={buildResults}></InputSuper>

            {results["aipostprodcheck"] && <InputAdditiveSelect name={"aipostprod"}
                getValuesFunc={retrieveValues} label={"Choisissez les IAs utilisées :"}
                options={aiselectoptions} declareSelfFunc={buildResults}></InputAdditiveSelect>}

            <InputSuper type={"select"} options={classificationsoptions}
                label={"Choisissez la classification de votre film :"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                name={"classification"}></InputSuper>

            <InputSuper name={"prompts"} type={"textarea"} max_string={500}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Prompts que vous avez utilisé pour la génération IA :"}></InputSuper>

        </div>



        ,

        <div className={currentStep == 3 ? "" : "hide"}>
            <h2>Etape 3 : Multimédia et accessibilité</h2>

            <InputSuper type={"file"} name={"thumbnail"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`La vignette de votre film (une image qui sera utilisée 
                pour la représenter) :`} accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"file"} name={"moviescreenshots"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`Quelques captures d'écrans de votre film :`}
                accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"checkbox"} name={"dialoguecheck"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`Ce film contient des dialogues`}></InputSuper>

            {results["dialoguecheck"] && <InputSuper type={"file"} name={"srtfile"} accept={".srt"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`Veuillez renseigner un fichier sous-titre (.srt) :`}></InputSuper>}

        </div>
        ,

        <div className={currentStep == 4 ? "" : "hide"}>

            <h2>Etape 4 : Vos Informations</h2>
            <div>
                <InputSuper type={"text"} name={"lastname"} max_string={100}
                    getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                    label={"Nom"}></InputSuper>

                <InputSuper type={"text"} name={"firstname"} max_string={100}
                    getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                    label={"Prénom"}></InputSuper>
            </div>

            <InputSuper name={"gender"} type={"select"} options={genderoptions}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Civilité :"}></InputSuper>

            <div>Vos réseaux sociaux :</div>
            <InputAdditiveGrouped name={"socials"} inputnames={["socialname", "sociallink"]}
                getValuesFunc={retrieveValues} labels={["Nom du réseau social", "Lien du réseau social"]}
            ></InputAdditiveGrouped>

            <InputSuper name={"email"} type={"email"} max_string={100}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Email"}></InputSuper>

            <InputSuper name={"tel"} type={"tel"} max_string={10}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Numéro de téléphone"} numberonly={true}></InputSuper>

            <InputSuper name={"birthdate"} type={"date"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Date de naissance"}></InputSuper>

            <InputSuper name={"country"} type={"text"} max_string={100}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Pays de résidence actuel"}></InputSuper>

            <InputSuper name={"address"} type={"text"} max_string={100}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Votre adresse"}></InputSuper>

            <InputSuper name={"address2"} type={"text"} max_string={100}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Votre adresse ligne 2"}></InputSuper>

            <InputSuper name={"zipcode"} type={"text"} max_string={10}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Code postal"}></InputSuper>

            <InputSuper name={"city"} type={"text"} max_string={100}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={"Ville"}></InputSuper>

            <InputSuper name={"marketting"} type={"select"} options={markettingoptions}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`Comment avez-vous connu le festival MarsAI ?`}></InputSuper>

            {results["marketting"] == "other" &&
                <InputSuper name={"markettingother"} type={"text"} max_string={200}
                    getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                    label={"Précisez :"}></InputSuper>}

            <InputSuper type={"checkbox"} name={"toscheck"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`J'accepte les conditions d'utilisation.`}></InputSuper>

            <InputSuper type={"checkbox"} name={"rulescheck"}
                getValueFunc={retrieveValues} declareSelfFunc={buildResults}
                label={`J'accepte le règlement d'envoi de vidéos du festival 
                MarsAI.`}></InputSuper>

        </div>

    ]

    const maxstep = myforms.length;

    //-------------------------------
    //Gestion des étapes
    //-------------------------------

    function handlestep(stepchange) {
        console.log("stepchange!", stepchange);
        if (currentStep <= maxstep && currentStep >= 1) {
            setCurrentStep(stepchange);
        }
    }

    //--------------------------
    //Vérification du formulaire
    //--------------------------

    function verifyForm() {
        //A besoin de vérifications par input (ex: regex, max/min string...)
        //Et de vérifications de relations d'inputs (ex: si "valuecheck" est checked,
        //vérifie "value", sinon pass)
    }

    let allmyinputs = [];

    function getallinputs(array) {
        //for this test, see:
        // https://stackoverflow.com/questions/29516136/how-to-print-all-values-of-a-nested-object
        for (let e in array) {
            if (typeof e == "object") {

            }
        }
    }

    return (
        <div className="form_page">
            <StepsTrack step={currentStep} maxstep={maxstep}></StepsTrack>
            <form className="form_container">
                {myforms.map(form => {
                    return (form)
                })}
                <FormStepsButtons step={currentStep} maxstep={maxstep}
                    getStepUpdate={handlestep}></FormStepsButtons>
            </form>
        </div>

    )
}