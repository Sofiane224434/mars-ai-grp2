import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
//import useMovie from "../../hooks/useMovie";

import FormMovieInfo from "./Forms/FormMovieInfo";
import FormAIUse from "./Forms/FormAIUse";
import FormMultimedia from "./Forms/FormMultimedia";
import FormDirectorInfo from "./Forms/FormDirectorInfo";

import StepsTrack from "./StepsTrack";

export default function FormParent() {

    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const formTopRef = useRef(null);

    //const { createMovie } = useMovie();
    const [loading, setLoading] = useState(false);

    const [formMovieInfo, setFormMovieInfo] = useState({});
    const [formAIUse, setFormAIUse] = useState({});
    const [formMultimedia, setFormMultimedia] = useState({});
    const [formDirectorInfo, setFormDirectorInfo] = useState({});

    const myforms = [
        <FormMovieInfo key="step-1" hide={currentStep == 1 ? false : true}
            getFunction={setFormMovieInfo} stepfunc={handlestep} currentstep={currentStep}></FormMovieInfo>,
        <FormAIUse key="step-2" hide={currentStep == 2 ? false : true} getFunction={setFormAIUse}
            stepfunc={handlestep} currentstep={currentStep}></FormAIUse>,
        <FormMultimedia key="step-3" hide={currentStep == 3 ? false : true}
            getFunction={setFormMultimedia} stepfunc={handlestep} currentstep={currentStep}></FormMultimedia>,
        <FormDirectorInfo key="step-4" hide={currentStep == 4 ? false : true}
            sendfunc={sendtoback} currentstep={currentStep} stepfunc={handlestep}></FormDirectorInfo>
    ]

    const maxstep = myforms.length;

    let allvalues = [formMovieInfo, formMultimedia, formAIUse, formDirectorInfo];

    function tester() {
        //
    }

    async function sendtoback(lastvalues) {
        e.preventDefault();
        setLoading(true);

        setFormDirectorInfo(lastvalues);
        console.log("Successfully filled form");
        console.log(formMovieInfo, formMultimedia, formAIUse, lastvalues);

        try {
            const moviedata = {
                movieInfo: formMovieInfo,
                movieMultimedia: formMultimedia,
                movieAIuse: formAIUse,
                movieDirectorProfile: lastvalues
            }

            await createMovie(moviedata);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

        //Should redirect to another page confirming form sent
    }

    //debugging
    useEffect(() => {
        console.log("ALL my forms info!");
        console.log(formMovieInfo, formAIUse, formMultimedia, formDirectorInfo);
    }, [currentStep])

    //-------------------------------
    //Gestion des étapes
    //-------------------------------

    function handlestep(stepchange) {
        //console.log("stepchange!", stepchange);
        if (currentStep <= maxstep && currentStep >= 1) {
            if (stepchange) {
                setCurrentStep(stepchange);
                formTopRef.current?.scrollIntoView({ behavior: "smooth" });
            }

        }
    }

    return (
        <div ref={formTopRef} className="flex flex-col items-center gap-6 bg-brun-brule pb-10">
            <div className="w-full bg-linear-to-b from-ocre-rouge to-brun-brule py-6 text-center text-4xl font-bold text-jaune-souffre">{t("form.title")}</div>
            <StepsTrack step={currentStep} maxstep={maxstep}></StepsTrack>
            <form className="flex w-[90%] flex-col items-center gap-5 rounded-[20px] bg-linear-to-t from-gris-anthracite to-noir-bleute p-8 text-jaune-souffre">
                {myforms.map(form => { return form }
                )}
                {/* <FormStepsButtons step={currentStep} maxstep={maxstep}
                    getStepUpdate={handlestep}></FormStepsButtons> */}
            </form>
        </div>
    )
}