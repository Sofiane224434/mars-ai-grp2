import { useState, useEffect } from "react";

import InputAdditive from "./InputAdditive";
import InputAdditiveSelect from "./InputAdditiveSelect";

export default function FinalForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const [results, setResults] = useState({});

    function getStateCopy(state) {
        let mycopy = JSON.parse(JSON.stringify(state));
        return mycopy;
    }

    function retrieveValues(values) {
        console.log(values);
    }

    function updateTextValue(e) {

    }

    const myinputs = {
        1: [
            <input type="text" name="movietitle"
                value={results["movietitle"] || ""}></input>,
            <input type="text" name="movietitletranslated"
                value={results["movietitletranslated"] || ""}></input>,
            <textarea name="synopsis" value={results["synopsis"] || ""}></textarea>,
            <input type="text" name="movielanguage"
                value={results["movielanguage"] || ""}></input>,
            <input type="file" name="videofile" accept="video/mp4,video/x-m4v,video/mov"></input>,
            <input name="soundbankcheck" type="checkbox"
                checked={results["soundbankcheck"] || false}></input>,
            <InputAdditive name={"soundbank"} btntitle="AJOUTER UNE SOUNDBANK/MUSIQUE">
            </InputAdditive>,
            <input type="url" name="youtubelink"
                value={results["youtubelink"] || ""}></input>,
        ],
        2: [
            <input name="aiscenariocheck" type="checkbox"
                checked={results["aiscenariocheck"] || false}></input>,
            <InputAdditiveSelect name={"aiscenario"}></InputAdditiveSelect>,
            <input name="aivideocheck" type="checkbox"
                checked={results["aivideocheck"] || false}></input>,
            <InputAdditiveSelect name={"aivideo"}></InputAdditiveSelect>,
            <input name="aipostprodcheck" type="checkbox"
                checked={results["aipostprodcheck"] || false}></input>,
            <InputAdditiveSelect name={"aipostprod"}></InputAdditiveSelect>,
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
            <InputAdditive name={socialname}></InputAdditive>,
            <InputAdditive name={sociallinks}></InputAdditive>,
            <input name="socialname1" type="text" value={results["socialname1"] || ""}></input>,
            <input name="sociallink1" type="url" value={results["sociallink1"] || ""}></input>,
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
            <input type="checkbox" name="toscheck" checked={results["toscheck"] || false}></input>,
            <input type="checkbox" name="rulescheck" checked={results["rulescheck"] || false}></input>,
        ]
    }

    const maxstep = Object.keys(myinputs).length;

    // Construction de results pour avoir les valeurs possibles du formulaire
    useEffect(() => {
        let buildobj = {};
        for (let key in myinputs) {
            for (let index in myinputs[key]) {
                //console.log(myinputs[key][input]);
                buildobj[myinputs[key][index].props.name] = "";
            }
        }
        console.log(buildobj);
    }, [])

    const myselectoptions = [
        <option value="">...</option>,
        <option value={"gemini"}>Google : (Gemini)</option>,
        <option value={"midjourney"}>Midjourney</option>,
        <option value={"chatGPT"}>OpenAI : (ChatGPT)</option>,
        <option value={"claude"}>Anthropic (Claude)</option>,
        <option value={"grok"}>Grok</option>,
        <option value={"other"}>Autre...</option>
    ];

    function getInputfromArray(inputname) {
        for (let n in myinputs) {
            //console.log(myinputs[a]);
            for (let ind in myinputs[n]) {
                if (myinputs[n][ind].props.name === inputname) {
                    return myinputs[a];
                }
            }
        }
    }

    return (
        <form>
            {/* Map of my inputs here */}
        </form>
    )
}