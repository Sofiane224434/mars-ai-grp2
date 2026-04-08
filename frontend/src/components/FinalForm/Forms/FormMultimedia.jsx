import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";

export default function FormMultimedia({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label"
}) {

    const [thumbnail, setThumbnail] = useState({ file: "", value: "" });
    const [srtCheck, setSrtCheck] = useState(false);
    const [srtData, setSrtData] = useState({ file: "", value: "" });
    const [screenshot1, setScreenshot1] = useState({ file: "", value: "" });
    const [screenshot2, setScreenshot2] = useState({ file: "", value: "" });
    const [screenshot3, setScreenshot3] = useState({ file: "", value: "" });

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

    useEffect(() => {
        sendData();
    }, [alldata])

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>
            <h2>Etape 3 : Multimédia et accessibilité</h2>

            <InputSuper type={"file"}
                getValueFunc={setThumbnail}
                label={`La vignette de votre film (une image qui sera utilisée 
                        pour la représenter) :`} accept={"image/png, image/jpeg"}
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

            <InputSuper type={"checkbox"}
                getValueFunc={setSrtCheck}
                label={`Ce film contient des dialogues`}></InputSuper>

            {srtCheck && <InputSuper type={"file"} accept={".srt"}
                getValueFunc={setSrtData}
                label={`Veuillez renseigner un fichier sous-titre (.srt) :`}
            ></InputSuper>}

        </div>
    )
}