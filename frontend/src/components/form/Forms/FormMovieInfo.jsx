import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import InputSuper from "../InputSuper";
import InputAdditive from "../InputAdditive";
import { Button } from "../../ui/Button";

import { verifyInputText, verifyVideo } from "../VerifyInputFuncs";

import { z } from "zod";

/**
 * Premier formulaire : Fiche Film
 * @param hide Si ce formulaire doit être caché ou non 
 * @param getFunction La fonction qui permettra de faire passer des informations à un parent
 */
export default function FormMovieInfo({ hide = false, getFunction,
    stepfunc, currentstep
}) {

    const { t } = useTranslation();

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

    // useEffect(() => {
    //     sendData();
    // }, [alldata])

    const ytregex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img;

    function clearAllErrors() {
        setErrorMovieTitle("");
        setErrorMovieTitlefr("");
        setErrorSynopsis("");
        setErrorSynopsisEng("");
        setErrorMovieLanguage("");
        setErrorMovieVideo("");
        setErrorSoundbankCheck("");
        setErrorSoundbankData("");
        setErrorYtLink("");
    }

    function verify() {

        clearAllErrors();

        let error = false;

        let baseverification = [
            verifyInputText({
                value: movietitle, required: true, max_length: 100,
                errorSetFunction: setErrorMovieTitle
            }),
            verifyInputText({
                value: movietitlefr, max_length: 100,
                errorSetFunction: setErrorMovieTitlefr
            }),
            verifyInputText({
                value: synopsis, max_length: 300, required: true,
                errorSetFunction: setErrorSynopsis
            }),
            verifyInputText({
                value: movielanguage, max_length: 100,
                errorSetFunction: setErrorMovieLanguage
            }),
            verifyInputText({
                value: ytlink, required: true, regex: ytregex,
                errorSetFunction: setErrorYtLink
            }),
            verifyVideo({
                file: movievideo.file, maxsize: 50000000, required: true,
                errorSetFunction: setErrorMovieVideo
            })
        ];

        if (baseverification.includes(false)) {
            error = true;
        }

        if (soundbankCheck) {
            //Vérifier si la première valeur n'est pas vide..
        }

        if (!error) {
            if (stepfunc) {
                stepfunc(currentstep + 1);
                sendData();
            }
        }

        //return true;

    }

    // let testschema = z.url({ hostname: /^www\.youtube\.com$/ });
    // console.log(testschema.safeParse("https://www.youtube.com/embed/DFYRQ_zQ-gk?autoplay=1"));

    return (
        <div style={hide ? { display: "none" } : null} className="flex flex-col gap-4">

            <h2 className="text-2xl font-bold">{t("form.step1.title")}</h2>

            <InputSuper label={t("form.step1.movieTitle")} type={"text"}
                getValueFunc={setMovieTitle} errormessage={errorMovieTitle}
                max_string={100}></InputSuper>

            <InputSuper label={t("form.step1.movieTitleFr")}
                type={"text"} getValueFunc={setMovieTitlefr}
                errormessage={errorMovieTitlefr} max_string={100}></InputSuper>

            <InputSuper type={"textarea"} getValueFunc={setSynopsis}
                max_string={300} label={t("form.step1.synopsis")}
                errormessage={errorSynopsis}></InputSuper>

            <InputSuper type={"text"} label={t("form.step1.movieLanguage")}
                getValueFunc={setMovieLanguage} max_string={100}
                errormessage={errorMovieLanguage}></InputSuper>

            <InputSuper type={"file"} accept={"video/mp4,video/x-m4v,video/mov"}
                getValueFunc={setMovieVideo} required={true}
                errormessage={errorMovieVideo}></InputSuper>

            <InputSuper type={"checkbox"} label={t("form.step1.soundbankCheck")} getValueFunc={setSoundbankCheck}
                errormessage={errorSoundbankCheck}></InputSuper>

            {
                soundbankCheck &&
                <InputAdditive btntitle={t("form.step1.soundbankAdd")}
                    getValuesFunc={setSoundbankData} label={t("form.step1.soundbankLabel")} addlimit={100}
                    classContainer="ml-7 flex w-full flex-col gap-2 border-l-2 border-jaune-souffre/30 pl-4">
                </InputAdditive>
            }

            <InputSuper type={"url"} getValueFunc={setYTlink}
                label={t("form.step1.ytLink")}
                errormessage={errorYtLink}></InputSuper>

            <div className="mt-4 flex w-full items-center justify-center gap-4">
                <Button variant="filled-yellow" interactive type="button" onClick={verify}>{t("form.next")} {">"}  </Button>
            </div>

        </div>
    )

}