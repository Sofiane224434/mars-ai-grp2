import { useState } from "react";
//forms
import StepOne from "./Forms/StepOne";

export default function MasterForm() {

    const [currentStep, setCurrentStep] = useState(1);

    function handleForms() {
        switch (currentStep) {
            case 1:
                return (
                    <StepOne></StepOne>
                );
            case 2:
                return ('');
            default:
                return null;
        }
    }

    function increaseStep() {
        setCurrentStep(currentStep + 1);
    }

    function decreaseStep() {
        setCurrentStep(currentStep - 1);
    }

    return (
        <div>
            {handleForms()}
        </div>
    )

}