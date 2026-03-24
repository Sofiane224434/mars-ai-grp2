import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function SimplerFormTest() {

    const [results, setResults] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(null);

    //input functions

    function handleChange(e, isgroup = false, groupname = null) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (isgroup) {
            if (results[groupname]) {
                let newres = JSON.parse(JSON.stringify(results));
                newres[groupname][name] = value;
                setResults(newres);
                console.log(results);
            } else {
                let obj = { [name]: value };
                setResults(values => ({ ...values, [groupname]: obj }));
            }
        } else {
            setResults(values => ({ ...values, [name]: value }));
        }
    }

    function addToGroup(groupname) {
        if (!results[groupname]) {
            setResults(values => ({ ...values, [groupname]: { 0: "", 1: "" } }));
        } else {
            const valname = Object.keys(results[groupname]).length;
            let newres = JSON.parse(JSON.stringify(results));
            console.log("newres:", newres);
            newres[groupname][valname] = "";
            setResults(newres);
        }

    }

    function deleteFromResults(name, isgroup = false, groupname = null) {
        const newResults = { ...results };
        if (isgroup) {
            delete newResults[groupname][name];
        } else {
            delete newResults[name];
        }
        setResults(newResults);
    }

    //form setup
    const myforms = [
        [
            <form>
                <div>My first input</div>
                <input type="text" name="inp1" onChange={handleChange}
                    value={results["inp1"]}></input>
                <div>My second input</div>
                <input type="text" name="inp2"></input>
            </form>
        ],
        [
            <form>
                <div>Grouped inputs</div>
                <div>
                    <div>
                        <div>Nom</div>
                        <input type="text" name="nom"></input>
                    </div>
                    <div>
                        <div>Prénom</div>
                        <input type="text" name="prenom"></input>
                    </div>
                </div>
            </form>
        ],
        [
            <form>
                <div>Talk about colors?</div>
                <input type="checkbox" name="checkbox1" onChange={handleChange}></input>
                {results.checkbox1 &&
                    <div>
                        <div>Enter fave color</div>
                        <input type="text" name="color"></input>
                    </div>
                }
                <div>All your meals; note: additive</div>
                {/* groupname: meals */}
                <div>
                    <input type="text" name={0}
                        onChange={(e) => handleChange(e, true, "meals")}></input>
                    {results.meals && Object.keys(results.meals).map((a, i) => {
                        if (i > 0) {
                            return (
                                <div>
                                    <input type="text" name={i}
                                        onChange={(e) => handleChange(e, true, "meals")}></input>
                                    <button type="button" onClick={() => deleteFromResults(i, true, "meals")}>X</button>
                                </div>
                            )
                        }
                    })}
                    <button type="button" onClick={() => addToGroup("meals")}>ADD</button>
                </div>
            </form>
        ]
    ]

    //set maxstep

    useEffect(() => {
        setMaxStep(myforms.length);
    }, [])

    //form functions

    function generateForms(step) {
        return (myforms[step - 1])
    }

    //button functions

    function goback() {
        setCurrentStep(currentStep - 1);
    }

    function gonext() {
        setCurrentStep(currentStep + 1);
    }

    function handleSubmit() {
        console.log("Your submit is ready!");
        console.log(results);
    }

    function generateBtns() {
        const nextbtn = <button onClick={gonext}>NEXT</button>;
        const prevbtn = <button onClick={goback}>PREVIOUS</button>;
        const submitbtn = <button onClick={handleSubmit}>SUBMIT</button>;

        if (currentStep == 1) {
            return (
                <div>
                    {nextbtn}
                </div>
            )
        }
        if (currentStep > 1 && currentStep < maxStep) {
            return (
                <div>
                    {prevbtn}
                    {nextbtn}
                </div>
            )
        }
        if (currentStep == maxStep) {
            return (
                <div>
                    {prevbtn}
                    {submitbtn}
                </div>
            )
        }
    }

    return (
        <>
            <StepsTrack step={currentStep} maxstep={maxStep} />
            {generateForms(currentStep)}
            {generateBtns()}
        </>
    )
}