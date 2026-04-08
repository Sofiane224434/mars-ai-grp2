import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";
import InputAdditiveSelect from "../InputAdditiveSelect";

export default function FormAIUse({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label"
}) {

    const [aiscenarioCheck, setAiScenarioCheck] = useState(false);
    const [aiscenarioData, setAiScenarioData] = useState([]);
    const [aivideoCheck, setAiVideoCheck] = useState(false);
    const [aivideoData, setAiVideoData] = useState([]);
    const [aipostprodCheck, setAiPostprodCheck] = useState(false);
    const [aipostprodData, setAiPostprodData] = useState([]);
    //note:must also have the other values (should be handled by the additive component)
    const [classification, setClassification] = useState("");
    const [prompts, setPrompts] = useState("");

    let alldata = {
        aiscenarioCheck: aiscenarioCheck,
        aiscenarioData: aiscenarioData,
        aivideoCheck: aivideoCheck,
        aivideoData: aivideoData,
        aipostprodCheck: aipostprodCheck,
        aipostprodData: aipostprodData,
        classification: classification,
        prompts: prompts
    }

    function sendData() {
        if (getFunction) {
            getFunction(alldata);
        }
    }

    useEffect(() => {
        sendData();
    }, [alldata])

    //Options pour inputadditiveselect des ia possibles
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

    function checkVal(val) {
        console.log(val)
    }

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>
            <h2>Etape 2 : Déclaration d'usage de l'IA</h2>
            <div>Vous avez utilisé l'IA pour :</div>

            <InputSuper type={"checkbox"}
                label={"La génération du scénario"} getValueFunc={setAiScenarioCheck}
            ></InputSuper>

            {aiscenarioCheck && <InputAdditiveSelect
                getValuesFunc={setAiScenarioData} label={"Choisissez les IAs utilisées."}
                options={aiselectoptions} valueother={"other"}
            ></InputAdditiveSelect>}

            <InputSuper type={"checkbox"}
                label={"La génération de la vidéo"} getValueFunc={setAiVideoCheck}
            ></InputSuper>

            {aivideoCheck && <InputAdditiveSelect getValuesFunc={setAiVideoData}
                label={"Choisissez les IAs utilisées."} options={aiselectoptions}
                valueother={"other"}></InputAdditiveSelect>}

            <InputSuper type={"checkbox"}
                label={"La génération de la post production"} getValueFunc={setAiPostprodCheck}
            ></InputSuper>

            {aipostprodCheck && <InputAdditiveSelect
                getValuesFunc={setAiPostprodData} label={"Choisissez les IAs utilisées :"}
                options={aiselectoptions} valueother={"other"}></InputAdditiveSelect>}

            <InputSuper type={"select"} options={classificationsoptions}
                label={"Choisissez la classification de votre film :"}
                getValueFunc={setClassification}
            ></InputSuper>

            <InputSuper type={"textarea"} max_string={500} getValueFunc={setPrompts}
                label={"Prompts que vous avez utilisé pour la génération IA :"}
            ></InputSuper>

        </div>
    )
}