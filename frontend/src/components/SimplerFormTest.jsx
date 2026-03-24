import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function SimplerFormTest() {

    const [results, setResults] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(null);

    //input functions

    function handleChange(e, isgroup = false, groupname = null) {
        const target = e.target;
        let value;
        if (target.type === "checkbox") {
            value = target.checked;
        } else if (target.type === "file") {
            console.log(target);
            value = target.files[0];

            //for getting width and height modify later for video format
            let reader = new FileReader();
            reader.onload = function (event) {
                let image = new Image();
                image.src = event.target.result;

                image.onload = function () {
                    console.log(this);
                }
            };

            reader.readAsDataURL(value);
        } else {
            value = target.value;
        }
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (isgroup) {
            if (results[groupname]) {
                let newres = JSON.parse(JSON.stringify(results));
                newres[groupname][name] = value;
                setResults(newres);
                //console.log(results);
            } else {
                let obj = { [name]: value };
                setResults(values => ({ ...values, [groupname]: obj }));
            }
        } else {
            setResults(values => ({ ...values, [name]: value }));
        }
        console.log(results);
    }

    // function handleConditionalGroup(e, groupname) {
    //     if(!e.target.checked) {
    //         let newres = JSON.parse(JSON.stringify(results));

    //     }
    // }

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
                    value={results["inp1"] ? results["inp1"] : ""}></input>
                <div>My second input</div>
                <input type="text" name="inp2" onChange={handleChange}
                    value={results["inp2"] ? results["inp2"] : ""}></input>
                <div>Upload video/image file</div>
                <input type="file" name="upload" onChange={handleChange}
                    accept="image/png, image/jpg, video/mp4, video/mov"
                    value={results["upload" ? results["upload"] : ""]}
                    files={results['upload'] ? results["upload"].File : ""}></input>
                <div>Options test</div>
                <select name="optionstest" onChange={handleChange}>
                    <option value={""}></option>
                    <option value={"first"}>First option</option>
                    <option value={"second"}>Second option</option>
                    <option value={"other"}>Other</option>
                </select>
                {results["optionstest"] == "other" &&
                    <div>
                        <div>Which one?</div>
                        <input name=""></input>
                    </div>
                }
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
                {/* group name: colors */}
                <div>Talk about colors? (optional)</div>
                <input type="checkbox" name="checkbox_color"
                    onChange={(e) => handleChange(e, true, "colors")}
                    checked={results["colors"] ?
                        results["colors"]["checkbox_color"] :
                        false}></input>
                {results["color"] && results["color"]["checkbox_color"] &&
                    <div>
                        <div>Enter fave color</div>
                        <input type="text" name="color" onChange={(e) => handleChange(e, true, "colors")}
                            value={results["colors"]["color"] ?
                                results["colors"]["color"] : ""}></input>
                    </div>
                }
                <div>All your meals; note: additive</div>
                {/* groupname: meals */}
                <div>
                    <input type="text" name={0}
                        onChange={(e) => handleChange(e, true, "meals")}
                        value={results["meals"] ? (results["meals"][0] ?
                            results["meals"][0] : "") : ""
                        }></input>
                    {results.meals && Object.keys(results.meals).map((a, i) => {
                        if (i > 0) {
                            return (
                                <div>
                                    <input type="text" name={i}
                                        onChange={(e) => handleChange(e, true, "meals")}
                                        value={results["meals"] ? (results["meals"][i] ?
                                            results["meals"][i] : "") : ""
                                        }></input>
                                    <button type="button" onClick={() => deleteFromResults(i, true, "meals")}>
                                        (X)</button>
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