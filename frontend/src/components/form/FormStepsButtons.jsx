import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/Button"

export default function FormStepsButtons({ step, maxstep, verificationFunction,
    submitFunction, getStepUpdate
}) {

    //const [currentStep, setCurrentStep] = useState(step);

    const { t } = useTranslation();

    const btnClass = "appearance-none [&_.btn-bg-base]:h-full [&_.btn-bg-base]:top-0 [&_.btn-bg-base]:rounded-full"
    const NextBtn = <Button variant="filled-yellow" interactive type="button" onClick={increaseStep} className={btnClass}>{t("form.next")} {">"}  </Button>
    const PrevBtn = <Button variant="filled-yellow" interactive type="button" onClick={decreaseStep} className={btnClass}>{"<"} {t("form.previous")}</Button>
    const SubmitBtn = <Button variant="filled-yellow" interactive type="submit" className={btnClass}>{t("form.send")}</Button>

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
        //console.log("increasing")
        // if (currentStep < maxstep) {
        //     setCurrentStep(currentStep + 1);
        // }
        if (step < maxstep) {
            getStepUpdate(step + 1);
        }
    }

    function decreaseStep(e) {
        e.preventDefault();
        //console.log("decreasinf")
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