import { useState } from "react";
import StepsTrack from "../StepsTrack";
import LargeFormFirst from "./allforms/LargeFormFirst";
import LargeFormSecond from "./allforms/LargeFormSecond";
import LargeFormThird from "./allforms/LargeFormThird";
import LargeFormFourth from "./allforms/LargeFormFourth";

export default function LargeFormMaster() {

    const maxstep = 4;
    const minstep = 1;
    const [currentStep, setCurrentStep] = useState(1);
    const [firstFormResults, setFirstFormResults] = useState(null);

    function firstFormGet(info) {
        setFirstFormResults(info);
        //console.log(info);
    }

    function getForm(step) {
        switch (step) {
            case 1:
                return (<LargeFormFirst GetFirst={firstFormGet} />);
            case 2:
                return (<LargeFormSecond />);
            case 3:
                return (<LargeFormThird />);
            case 4:
                return (<LargeFormFourth />);
            default:
                return (<LargeFormFirst />);
        }
    }

    function goBack() {
        if (currentStep > minstep) {
            setCurrentStep(currentStep - 1);
        }
    }

    function goForward() {
        if (currentStep < maxstep) {
            setCurrentStep(currentStep + 1);
        }
        console.log(firstFormResults);
    }

    function controlPrevButton() {
        if (currentStep > 1) {
            return (
                <button onClick={goBack}>Prev</button>
            )
        }
    }

    function controlNextButton() {
        if (currentStep == maxstep) {
            return (
                <button>Submit</button>
            )
        } else {
            return (
                <button onClick={goForward}>Next</button>
            )
        }
    }

    return (
        <div>
            <StepsTrack step={currentStep} maxstep={maxstep} />
            {getForm(currentStep)}
            {controlPrevButton()}
            {controlNextButton()}
        </div>
    )
}