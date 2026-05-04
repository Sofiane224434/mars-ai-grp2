import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import InputSuper from "../InputSuper";
import { Button } from "../../ui/Button";
import InputRequirementStar from "../InputRequirementStar";

import { verifyImage } from "../VerifyInputFuncs";

export default function FormMultimedia({ hide = false, getFunction,
    stepfunc, currentstep
}) {

    const { t } = useTranslation();

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
        thumbnail: thumbnail.file,
        srtCheck: srtCheck,
        srtData: srtCheck ? srtData.file : null,
        screenshot1: screenshot1.file == "" ? null : screenshot1,
        screenshot2: screenshot2.file == "" ? null : screenshot2,
        screenshot3: screenshot3.file == "" ? null : screenshot3
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
            setErrorAllScreenshot(t("form.step3.errorAtLeastOneScreenshot"))
        }

        if (!error) {
            if (stepfunc) {
                sendData();
                stepfunc(currentstep + 1);
            }
        }

    }

    return (
        <div style={hide ? { display: "none" } : null} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{t("form.step3.title")}</h2>

            <InputSuper type={"file"}
                getValueFunc={setThumbnail}
                label={t("form.step3.thumbnail")} accept={"image/png, image/jpeg"}
                errormessage={errorThumbnail} required={true}
            ></InputSuper>

            <div>
                <div className="float-left">{t("form.step3.screenshots")}</div>
                <InputRequirementStar></InputRequirementStar>
            </div>

            <InputSuper type={"file"}
                getValueFunc={setScreenshot1}
                accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"file"}
                getValueFunc={setScreenshot2}
                accept={"image/png, image/jpeg"}></InputSuper>

            <InputSuper type={"file"}
                getValueFunc={setScreenshot3}
                accept={"image/png, image/jpeg"}></InputSuper>

            {errorAllScreenshot && <div className="clear-both text-red-500">
                {errorAllScreenshot}</div>}

            <InputSuper type={"checkbox"}
                getValueFunc={setSrtCheck}
                label={t("form.step3.dialogueCheck")}></InputSuper>

            {srtCheck && <InputSuper type={"file"} accept={".srt"}
                getValueFunc={setSrtData}
                label={t("form.step3.srtLabel")}
            ></InputSuper>}

            <div className="mt-4 flex w-full items-center justify-center gap-4">
                <Button variant="filled-yellow" interactive type="button" onClick={goback}>{"<"} {t("form.previous")}</Button>
                <Button variant="filled-yellow" interactive type="button" onClick={verify}>{t("form.next")} {">"}</Button>
            </div>

        </div>
    )
}