import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import InputSuper from "../InputSuper";
import { Button } from "../../ui/Button";
import InputAdditiveSelect from "../InputAdditiveSelect";

import { verifyInputText } from "../VerifyInputFuncs";

export default function FormAIUse({ hide = false, getFunction,
    stepfunc, currentstep
}) {

    const { t } = useTranslation();

    const [aiscenarioCheck, setAiScenarioCheck] = useState(false);
    const [aiscenarioData, setAiScenarioData] = useState([]);
    const [aivideoCheck, setAiVideoCheck] = useState(false);
    const [aivideoData, setAiVideoData] = useState([]);
    const [aipostprodCheck, setAiPostprodCheck] = useState(false);
    const [aipostprodData, setAiPostprodData] = useState([]);
    //note:must also have the other values (should be handled by the additive component)
    const [classification, setClassification] = useState("");
    const [prompts, setPrompts] = useState("");

    const [errorAiCheck, setErrorAiCheck] = useState("");
    const [errorClassification, setErrorClassification] = useState("");
    const [errorPrompts, setErrorPrompts] = useState("");

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

    // useEffect(() => {
    //     sendData();
    // }, [alldata])

    //Options pour inputadditiveselect des ia possibles
    const aiselectoptions = [
        <option value={"gemini"}>{t("form.step2.aiGemini")}</option>,
        <option value={"midjourney"}>{t("form.step2.aiMidjourney")}</option>,
        <option value={"chatGPT"}>{t("form.step2.aiChatGPT")}</option>,
        <option value={"claude"}>{t("form.step2.aiClaude")}</option>,
        <option value={"grok"}>{t("form.step2.aiGrok")}</option>,
        <option value={"other"}>{t("form.step2.aiOther")}</option>
    ];

    //Options pour inputsuper classification
    const classificationsoptions = [
        <option value={"allai"}>{t("form.step2.classificationAllAI")}</option>,
        <option value={"hybrid"}>{t("form.step2.classificationHybrid")}
        </option>,
    ];

    function clearallerrors() {
        setErrorAiCheck("");
        setErrorClassification("");
        setErrorPrompts("");
    }

    function verify() {

        clearallerrors();

        let error = false;

        if (!aiscenarioCheck && !aivideoCheck && !aipostprodCheck) {
            setErrorAiCheck(t("form.step2.errorAtLeastOne"))
            error = true;
        }

        let verification = [
            verifyInputText({
                value: prompts, max_length: 500, required: true,
                errorSetFunction: setErrorPrompts
            }),
            verifyInputText({
                value: classification, required: true,
                errorSetFunction: setErrorClassification
            })
        ]

        if (verification.includes(false)) {
            error = true;
        }

        if (!error) {
            if (stepfunc) {
                sendData();
                stepfunc(currentstep + 1);
            }
        }
    }

    function goback() {
        stepfunc(currentstep - 1);
    }

    return (
        <div style={hide ? { display: "none" } : null} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{t("form.step2.title")}</h2>
            <div>{t("form.step2.aiUsedFor")}</div>

            <InputSuper type={"checkbox"}
                label={t("form.step2.aiScenario")} getValueFunc={setAiScenarioCheck}
            ></InputSuper>

            {aiscenarioCheck && <InputAdditiveSelect
                getValuesFunc={setAiScenarioData} label={t("form.step2.chooseAIs")}
                options={aiselectoptions} valueother={"other"}
            ></InputAdditiveSelect>}

            <InputSuper type={"checkbox"}
                label={t("form.step2.aiVideo")} getValueFunc={setAiVideoCheck}
            ></InputSuper>

            {aivideoCheck && <InputAdditiveSelect getValuesFunc={setAiVideoData}
                label={t("form.step2.chooseAIs")} options={aiselectoptions}
                valueother={"other"}></InputAdditiveSelect>}

            <InputSuper type={"checkbox"}
                label={t("form.step2.aiPostprod")} getValueFunc={setAiPostprodCheck}
            ></InputSuper>

            {aipostprodCheck && <InputAdditiveSelect
                getValuesFunc={setAiPostprodData} label={t("form.step2.chooseAIs")}
                options={aiselectoptions} valueother={"other"}></InputAdditiveSelect>}

            {errorAiCheck && <div className="clear-both text-red-500">{errorAiCheck}</div>}

            <InputSuper type={"select"} options={classificationsoptions}
                label={t("form.step2.classificationLabel")}
                getValueFunc={setClassification}
                errormessage={errorClassification}></InputSuper>

            <InputSuper type={"textarea"} max_string={500} getValueFunc={setPrompts}
                label={t("form.step2.promptsLabel")}
                errormessage={errorPrompts}></InputSuper>

            <div className="mt-4 flex w-full items-center justify-center gap-4">
                <Button variant="filled-yellow" interactive type="button" onClick={goback}>{"<"} {t("form.previous")}</Button>
                <Button variant="filled-yellow" interactive type="button" onClick={verify}>{t("form.next")} {">"}</Button>
            </div>

        </div>
    )
}