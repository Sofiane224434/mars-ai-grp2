import { useState, useEffect } from "react"

export default function FormStepsButtons({ step, maxstep, verificationFunction,
    submitFunction, getStepUpdate
}) {

    //const [currentStep, setCurrentStep] = useState(step);

    const NextBtn = <button type="button" onClick={increaseStep}>Suivant {">"}</button>
    const PrevBtn = <button type="button" onClick={decreaseStep}>{"<"} Précédent</button>
    const SubmitBtn = <button type="submit">Envoyer</button>

    //Gestion d'erreurs pour être sûr d'avoir toutes les fonctions et params nécessaires
    if (!step) {
        throw new Error(`FormStepsButtons ERROR : Pas de param step, veuillez renseigner step.`);
    }
    if (!verificationFunction) {

    }
    if (!submitFunction) {

    }

    //Permet de transmettre les informations au parent
    // useEffect(() => {
    //     if (getStepUpdate) {
    //         getStepUpdate(currentStep);
    //         setCurrentStep(step);
    //     }
    // }, [currentStep])

    function increaseStep(e) {
        e.preventDefault();
        console.log("increasing")
        // if (currentStep < maxstep) {
        //     setCurrentStep(currentStep + 1);
        // }
        if (step < maxstep) {
            getStepUpdate(step + 1);
        }
    }

    function decreaseStep(e) {
        e.preventDefault();
        console.log("decreasinf")
        // if (currentStep > 1) {
        //     setCurrentStep(currentStep - 1);
        // }
        if (step > 1) {
            getStepUpdate(step - 1);
        }
    }

    return (
        <div>
            {step > 1 && PrevBtn}
            {step < maxstep && NextBtn}
            {step == maxstep && SubmitBtn}
        </div>
    )
}