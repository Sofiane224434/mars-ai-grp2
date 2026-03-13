import { useState, useEffect } from "react";
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
    const [secondFormResults, setSecondFormResults] = useState(null);
    const [thirdFormResults, setThirdFormResults] = useState(null);
    const [fourthFormResults, setFourthFormResults] = useState(null);
    const [finalResult, setFinalResult] = useState();

    function firstFormGet(info) {
        setFirstFormResults(info);
    }

    function secondFormGet(info) {
        setSecondFormResults(info);
    }

    function thirdFormGet(info) {
        setThirdFormResults(info);
    }

    function fourthFormGet(info) {
        setFourthFormResults(info);
    }

    function getForm(step) {
        switch (step) {
            case 1:
                return (<LargeFormFirst GetData={firstFormGet} prevResults={firstFormResults} />);
            case 2:
                return (<LargeFormSecond GetData={secondFormGet} />);
            case 3:
                return (<LargeFormThird GetData={thirdFormGet} />);
            case 4:
                return (<LargeFormFourth GetData={fourthFormGet} />);
            default:
                return (<LargeFormFirst GetData={firstFormGet} prevResults={firstFormResults} />);
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
    }

    function handleSubmit() {
        setFinalResult(
            [
                firstFormResults,
                secondFormResults,
                thirdFormResults,
                fourthFormResults
            ]
        )
        //console.log(finalResult);
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
                <button onClick={handleSubmit}>Submit</button>
            )
        } else {
            return (
                <button onClick={goForward}>Next</button>
            )
        }
    }

    function controlResults() {
        if (finalResult) {
            return (finalResult.map(e =>
                <div>
                    <div>{e.form}</div>
                    {e.results.map(i => <div>{i}</div>)}
                </div>
            ))
        }
    }

    return (
        <div>
            <StepsTrack step={currentStep} maxstep={maxstep} />
            {getForm(currentStep)}
            {controlPrevButton()}
            {controlNextButton()}
            {controlResults()}
        </div>
    )
}