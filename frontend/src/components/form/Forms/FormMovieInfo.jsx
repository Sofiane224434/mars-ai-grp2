import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import InputSuper from "../InputSuper";
import InputAdditive from "../InputAdditive";
import { Button } from "../../ui/Button";

import { verifyInputText, verifyVideo } from "../VerifyInputFuncs";

import { z } from "zod";
import { movieService } from "../../../services/api";

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
    const [movietitleeng, setMovieTitleeng] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [synopsisEng, setSynopsisEng] = useState("");
    const [movielanguage, setMovieLanguage] = useState("");
    const [movievideo, setMovieVideo] = useState({ file: "", value: "" });
    const [soundbankCheck, setSoundbankCheck] = useState(false);
    const [soundbankData, setSoundbankData] = useState([]);
    const [ytlink, setYTlink] = useState("");
    const [description, setDescription] = useState("");
    const [videoLength, setVideoLength] = useState("");

    const [errorMovieTitle, setErrorMovieTitle] = useState("");
    const [errorMovieTitleeng, setErrorMovieTitleeng] = useState("");
    const [errorSynopsis, setErrorSynopsis] = useState("");
    const [errorSynopsisEng, setErrorSynopsisEng] = useState("");
    const [errorMovieLanguage, setErrorMovieLanguage] = useState("");
    const [errorMovieVideo, setErrorMovieVideo] = useState("");
    const [errorSoundbankCheck, setErrorSoundbankCheck] = useState("");
    const [errorSoundbankData, setErrorSoundbankData] = useState("");
    const [errorYtLink, setErrorYtLink] = useState("");
    const [errorDescription, setErrorDescription] = useState("");

    let alldata = {
        movietitle: movietitle,
        movietitleeng: movietitleeng,
        synopsis: synopsis,
        synopsisEng: synopsisEng,
        movielanguage: movielanguage == "" ? null : movielanguage,
        movievideo: movievideo.file,
        soundbankCheck: soundbankCheck,
        soundbankData: soundbankCheck ? soundbankData : null,
        ytlink: ytlink,
        description: description,
        videoLength: videoLength
    }

    //debug
    useEffect(() => {
        console.log(alldata);
    }, [alldata])

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
        setErrorMovieTitleeng("");
        setErrorSynopsis("");
        setErrorSynopsisEng("");
        setErrorMovieLanguage("");
        setErrorMovieVideo("");
        setErrorSoundbankCheck("");
        setErrorSoundbankData("");
        setErrorYtLink("");
        setErrorDescription("");
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
                value: movietitleeng, max_length: 100,
                errorSetFunction: setErrorMovieTitleeng
            }),
            verifyInputText({
                value: description, max_length: 300, required: true,
                errorSetFunction: setErrorDescription
            }),
            verifyInputText({
                value: synopsis, max_length: 500, required: true,
                errorSetFunction: setErrorSynopsis
            }),
            verifyInputText({
                value: synopsisEng, max_length: 500, required: true,
                errorSetFunction: setErrorSynopsisEng
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
            if (soundbankData.length < 0 || soundbankData[0] == "") {
                setErrorSoundbankData("Vous devez en renseigner au moins un.");
                error = true;
            }
        }

        if (videoLength > 90) {
            setErrorMovieVideo("Votre vidéo doit être de moins d'une minute.")
            error = true;
        }

        if (!error) {
            if (stepfunc) {
                stepfunc(currentstep + 1);
                sendData();
            }
        }

        //return true;

    }

    //Obtenir longueur de la vidéo
    function getVideoInfo(value) {
        let videofile = value.file;

        let video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {

            window.URL.revokeObjectURL(video.src);

            let duration = video.duration;

            //Enregistre la longueur de la vidéo en state
            setVideoLength(duration);
        }

        video.src = URL.createObjectURL(videofile);

        //Enregistre les infos fichier vidéo dans le state
        setMovieVideo(value);
    }

    return (
        <div style={hide ? { display: "none" } : null} className="flex flex-col gap-4">

            <h2 className="text-2xl font-bold">{t("form.step1.title")}</h2>

            <InputSuper label={t("form.step1.movieTitle")} type={"text"}
                getValueFunc={setMovieTitle} errormessage={errorMovieTitle}
                max_string={100}></InputSuper>

            <InputSuper label={t("form.step1.movieTitleeng")}
                type={"text"} getValueFunc={setMovieTitleeng}
                errormessage={errorMovieTitleeng} max_string={100}></InputSuper>

            <InputSuper type={"textarea"} label={t("form.step1.description")}
                getValueFunc={setDescription} max_string={300}
                errormessage={errorDescription}></InputSuper>

            <InputSuper type={"textarea"} getValueFunc={setSynopsis}
                max_string={500} label={t("form.step1.synopsis")}
                errormessage={errorSynopsis}></InputSuper>

            <InputSuper type={"textarea"} getValueFunc={setSynopsisEng}
                max_string={500} label={"Votre synopsis en anglais."}
                errormessage={errorSynopsisEng}></InputSuper>

            <InputSuper type={"text"} label={t("form.step1.movieLanguage")}
                getValueFunc={setMovieLanguage} max_string={100}
                errormessage={errorMovieLanguage}></InputSuper>

            <InputSuper type={"file"} accept={"video/mp4,video/x-m4v,video/mov"}
                getValueFunc={getVideoInfo} required={true}
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