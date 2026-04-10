import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";

import { verifyImage } from "../VerifyInputFuncs";

export default function FormMultimedia({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label",
    stepfunc, currentstep
}) {

    const [thumbnail, setThumbnail] = useState({ file: "", value: "" });
    const [srtCheck, setSrtCheck] = useState(false);
    const [srtData, setSrtData] = useState({ file: "", value: "" });
    const [screenshot1, setScreenshot1] = useState({ file: "", value: "" });
    const [screenshot2, setScreenshot2] = useState({ file: "", value: "" });
    const [screenshot3, setScreenshot3] = useState({ file: "", value: "" });

    const [errorThumbnail, setErrorThumbnail] = useState("");
    const [errorAllScreenshot, setErrorAllScreenshot] = useState("");
    const [errorScreenshot1, setErrorScreenshot1] = useState("");
    const [errorScreenshot2, setErrorScreenshot2] = useState("");
    const [errorScreenshot3, setErrorScreenshot3] = useState("");

    let alldata = {
        thumbnail: thumbnail,
        srtCheck: srtCheck,
        srtData: srtData,
        screenshot1: screenshot1,
        screenshot2: screenshot2,
        screenshot3: screenshot3
    }

    function sendData() {
        if (getFunction) {
            getFunction(alldata);
        }
    }

    function goback() {
        clearallerrors();
        stepfunc(currentstep - 1);
    }

    function clearallerrors() {
        setErrorAllScreenshot("");
        setErrorScreenshot1("");
        setErrorScreenshot2("");
        setErrorScreenshot3("");
        setErrorThumbnail("");
    }

    function verify() {

        clearallerrors();

        let error = false;

        const maximagesize = 2000000

        let validation = [
            verifyImage({
                file: thumbnail.file, maxsize: maximagesize, required: true,
                errorSetFunction: setErrorThumbnail
            }),
            verifyImage({
                file: screenshot1.file, maxsize: maximagesize,
                errorSetFunction: setErrorThumbnail
            }),
            verifyImage({
                file: screenshot2.file, maxsize: maximagesize,
                errorSetFunction: setErrorThumbnail
            }),
            verifyImage({
                file: screenshot3.file, maxsize: maximagesize,
                errorSetFunction: setErrorThumbnail
            })
        ]

        if (validation.includes(false)) {
            error = true;
        }

        if (!screenshot1.file && !screenshot2.file && !screenshot3.file) {
            error = true;
            setErrorAllScreenshot("Vous devez renseigner au moins un screenshot.")
        }

        if (!error) {
            if (stepfunc) {
                sendData();
                stepfunc(currentstep + 1);
            }
        }

    }

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>
            <h2>Etape 3 : Multimédia et accessibilité</h2>

            <InputSuper type={"file"}
                getValueFunc={setThumbnail}
                label={`La vignette de votre film (une image qui sera utilisée 
                        pour la représenter) :`} accept={"image/png, image/jpeg"}
                errormessage={errorThumbnail}
            ></InputSuper>


            <InputSuper type={"file"}
                getValueFunc={setScreenshot1}
                label={`Quelques captures d'écrans de votre film :`}
                accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"file"}
                getValueFunc={setScreenshot2}
                accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"file"}
                getValueFunc={setScreenshot3}
                accept={"image/png, image/jpeg"}></InputSuper>

            {errorAllScreenshot && <div className="form_error_message">
                {errorAllScreenshot}</div>}

            <InputSuper type={"checkbox"}
                getValueFunc={setSrtCheck}
                label={`Ce film contient des dialogues`}></InputSuper>

            {srtCheck && <InputSuper type={"file"} accept={".srt"}
                getValueFunc={setSrtData}
                label={`Veuillez renseigner un fichier sous-titre (.srt) :`}
            ></InputSuper>}

            <button type="button" onClick={goback}>{">"} Précédent</button>
            <button type="button" onClick={verify}>Suivant {">"}</button>

        </div>
    )
}