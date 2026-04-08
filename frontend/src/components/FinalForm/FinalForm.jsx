import { useState, useEffect } from "react";

import FormMovieInfo from "./Forms/FormMovieInfo";
import FormAIUse from "./Forms/FormAIUse";
import FormMultimedia from "./Forms/FormMultimedia";
import FormDirectorInfo from "./Forms/FormDirectorInfo";

import StepsTrack from "./StepsTrack";
import FormStepsButtons from "./FormStepsButtons";

export default function FinalForm() {

    const [currentStep, setCurrentStep] = useState(1);

    const [formMovieInfo, setFormMovieInfo] = useState({});
    const [formAIUse, setFormAIUse] = useState({});

    const myforms = [
        <FormMovieInfo hide={currentStep == 1 ? false : true} getFunction={tester}></FormMovieInfo>,
        <FormAIUse hide={currentStep == 2 ? false : true} getFunction={tester}></FormAIUse>,
        <FormMultimedia hide={currentStep == 3 ? false : true} getFunction={tester}></FormMultimedia>,
        <FormDirectorInfo hide={currentStep == 4 ? false : true} getFunction={tester}></FormDirectorInfo>
    ]

    const maxstep = myforms.length;

    function tester(values) {
        console.log(values);
    }

    //-------------------------------
    //Gestion des étapes
    //-------------------------------

    function handlestep(stepchange) {
        console.log("stepchange!", stepchange);
        if (currentStep <= maxstep && currentStep >= 1) {
            // if (results["movietitle"] == "abc") {
            //     setCurrentStep(stepchange);
            // }
            //verifyForm();
            setCurrentStep(stepchange);
        }
    }

    return (
        <div className="form_page">
            <div>Envoyez votre vidéo</div>
            <StepsTrack step={currentStep} maxstep={maxstep}></StepsTrack>
            <form className="form_container">
                {myforms.map(form => { return form }
                )}
                <FormStepsButtons step={currentStep} maxstep={maxstep}
                    getStepUpdate={handlestep}></FormStepsButtons>
            </form>
        </div>
    )
}