import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function StepsForms() {

    const [result1, setResult1] = useState("");
    const [result2, setResult2] = useState("");
    const [result3, setResult3] = useState("");
    const [result4, setResult4] = useState("");

    const [currentStep, setCurrentStep] = useState(1);
    const maxStep = 4;

    function getFormByStep(step) {
        switch (step) {
            case 1:
                return (
                    <>
                        <div>Input 1</div>
                        <input type="text" onChange={(e) => setResult1(e.target.value)}></input>
                    </>
                )
            case 2:
                return (
                    <>
                        <div>Input 2</div>
                        <input type="text" onChange={(e) => setResult2(e.target.value)}></input>
                    </>
                )
            case 3:
                return (
                    <>
                        <div>Input 3</div>
                        <input type="text" onChange={(e) => setResult3(e.target.value)}></input>
                    </>
                )
            case 4:
                return (
                    <>
                        <div>Input 4</div>
                        <input type="text" onChange={(e) => setResult4(e.target.value)}></input>
                    </>
                )
            default:
                return (
                    <>
                        <div>Input 1</div>
                        <input type="text" onChange={(e) => setResult1(e.target.value)}></input>
                    </>
                );
        }
    }

    function goBack() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function goForward() {
        if (currentStep < maxStep) {
            setCurrentStep(currentStep + 1);
        }
    }

    function generateSubmit() {
        if (currentStep == maxStep) {
            return (
                <button>SUBMIT</button>
            )
        } else {
            return (
                <button type="button" onClick={goForward}>Go forward</button>
            )
        }
    }

    return (
        <>
            <StepsTrack step={currentStep} />
            {getFormByStep(currentStep)}
            <button type="button" onClick={goBack}>Go back</button>
            {generateSubmit()}
        </>
    )
}