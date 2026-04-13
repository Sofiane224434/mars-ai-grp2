import { useState, useEffect } from "react";
//import useMovie from "../../hooks/useMovie";

import FormMovieInfo from "./Forms/FormMovieInfo";
import FormAIUse from "./Forms/FormAIUse";
import FormMultimedia from "./Forms/FormMultimedia";
import FormDirectorInfo from "./Forms/FormDirectorInfo";

import StepsTrack from "./StepsTrack";

export default function FormParent() {

    const [currentStep, setCurrentStep] = useState(1);

    //const { createMovie } = useMovie();
    const [loading, setLoading] = useState(false);

    const [formMovieInfo, setFormMovieInfo] = useState({});
    const [formAIUse, setFormAIUse] = useState({});
    const [formMultimedia, setFormMultimedia] = useState({});
    const [formDirectorInfo, setFormDirectorInfo] = useState({});

    const myforms = [
        <FormMovieInfo hide={currentStep == 1 ? false : true}
            getFunction={setFormMovieInfo} stepfunc={handlestep} currentstep={currentStep}></FormMovieInfo>,
        <FormAIUse hide={currentStep == 2 ? false : true} getFunction={setFormAIUse}
            stepfunc={handlestep} currentstep={currentStep}></FormAIUse>,
        <FormMultimedia hide={currentStep == 3 ? false : true}
            getFunction={setFormMultimedia} stepfunc={handlestep} currentstep={currentStep}></FormMultimedia>,
        <FormDirectorInfo hide={currentStep == 4 ? false : true}
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
            }

        }
    }

    return (
        <div className="form_page">
            <div className="form_bigtitle">Envoyez votre vidéo</div>
            <StepsTrack step={currentStep} maxstep={maxstep}></StepsTrack>
            <form className="form_container">
                {myforms.map(form => { return form }
                )}
                {/* <FormStepsButtons step={currentStep} maxstep={maxstep}
                    getStepUpdate={handlestep}></FormStepsButtons> */}
            </form>
        </div>
    )
}