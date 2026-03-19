import FormData from "./LargeForm/allforms/AllFormsData.json";
import StepsTrack from "./StepsTrack";
import { useState } from "react";

const grouped_inputs = ["group", "addition"];
//Ajout de value dans chaque inputs pour pouvoir sauvegarder leur valeurs plus
//tard
for (let i of FormData) {
    for (let e of i.inputdata) {
        if (grouped_inputs.includes(e.type)) {
            for (let e2 of e.content) {
                e2.value = "";
            }
        } else {
            e.value = "";
        }
    }
}
console.log(FormData);

export default function StepsFormsNewtest() {

    const [currentStep, setCurrentStep] = useState(1);
    const maxStep = FormData.length;
    const [results, setResults] = useState(FormData);

    function updateResults(e, index, groupindex = null) {
        const newData = results.map((elem, i) => {
            if (groupindex) {
                if (i == groupindex) {
                    elem.map((el2, i2) => {
                        if (i2 == index) {
                            return { ...el2, value: e.target.value }
                        } else {
                            return el2;
                        }
                    })
                }
                return elem;
            } else {
                if (i == index) {
                    return { ...elem, value: e.target.value };
                } else {
                    return elem;
                }
            }

        })
        setResults(newData);
    }

    function makeInputText({ name, value, label, isrequired = true }) {
        return (
            <div>
                <div>{label}</div>
                <input type="text" name={name} value={value} required={isrequired}></input>
            </div>
        );
    }

    function makeInputSelect({ name, options, isrequired = true }) {
        let optionmap;
        if (typeof options != "object" && options.length == 0) {
            throw new Error("No options availble");
        }
        optionmap = options.map(o => <option value={o.value}>{o.name}</option>)
        return (
            <select required={isrequired} name={name}>
                <option value="">...</option>
                {optionmap}
            </select>
        )
    }

    function makeInputUpload({ name, isrequired = true, accepts = null }) {
        let accept_param;
        if (accepts) {
            for (let i in accepts) {
                if (i + 1 < accepts.length) {
                    accept_param += accepts[i] + ", ";
                } else {
                    accept_param += accepts[i];
                }
            }
        }
        if (isrequired) {
            return (<input required type="file" name={name} accept={accept_param}></input>);
        }
        return (<input type="file" name={name} accept={accept_param}></input>);
    }

    function makeInputTextarea({ name, value, maxlength = null, isrequired = true }) {
        return (<textarea style={{ resize: "none" }} name={name} value={value}
            maxLength={maxlength}></textarea>)
    }

    function autoInput({ type, label, isrequired = true, name, value, options, maxlength, accepts }) {
        switch (type) {
            case "text":
                return makeInputText({
                    name: name,
                    label: label,
                    value: value,
                    isrequired: isrequired
                });
                break;
            case "select":
                return makeInputSelect({
                    name: name,
                    options: options,
                    isrequired: isrequired
                });
                break;
            case "textarea":
                return makeInputTextarea({
                    name: name,
                    value: value,
                    maxlength: maxlength
                });
                break;
            case "upload":
                return makeInputUpload({
                    name: name,
                    isrequired: isrequired,
                    accepts: accepts
                });
        }
    }

    //generate the form
    function generateForm(step) {
        //should have groups formed in the json in type?
        //or have it be set as a bool of "isgrouped:true" with "groupinputs:["inp1","inp2"]"?
        //or ignore, map, THEN reorder in groups (complex cannot find method)
        //maybe should just build the main data const here?

        //also careful on additive, might need another bool "isadditive":true
        //makes it have a button to add input and each inp/group has a delete button as well
        //these buttons need a function to activate onclick
        const FormDataMap =
            <form name={FormData[step - 1].formname}>
                {FormData[step - 1].inputdata.map(inp => {
                    console.log(inp.label);
                    if (inp.type == "group") {
                        return (
                            <div>
                                {inp.content.map(inp => {
                                    return (autoInput({
                                        type: inp.type,
                                        label: inp.label,
                                        isrequired: true,
                                        name: inp.name,
                                        value: inp.value,
                                        options: inp.options,
                                        maxlength: inp.maxlength,
                                        accepts: inp.accepts,
                                    }))
                                })}
                            </div>
                        )
                    }
                    if (inp.type == "addition") {
                        return (
                            <div>
                                <div>{inp.label}</div>
                                {inp.content.map(inp => {
                                    return (autoInput({
                                        type: inp.type,
                                        label: inp.label,
                                        isrequired: true,
                                        name: inp.name,
                                        value: inp.value,
                                        options: inp.options,
                                        maxlength: inp.maxlength,
                                        accepts: inp.accepts,
                                    }))
                                })}
                                {/* <button type="button" onClick={addInput(input)}>AJOUT</button> */}
                            </div>
                        )
                    }
                    return (autoInput({
                        type: inp.type,
                        label: inp.label,
                        isrequired: true,
                        name: inp.name,
                        value: inp.value,
                        options: inp.options,
                        maxlength: inp.maxlength,
                        accepts: inp.accepts,
                    }))
                })}
                {buttonControl()}
            </form>

        return FormDataMap;
    }

    //add an input
    function addInput(input) {
        console.log("wip");
    }

    //remove an input
    function removeInput() {
        //
    }

    //auto modify current values
    function updateResults(e, inputName) { }

    function handleSubmit() {
        console.log("wip");
    }

    function buttonControl() {
        const nextbtn = <button type="submit" onClick={() => setCurrentStep(currentStep + 1)}>
            SUIVANT</button>;
        const prevbtn = <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            PRECEDENT</button>;
        const submitbtn = <button type="submit" onClick={handleSubmit}>
            SUBMIT</button>;
        if (currentStep == 1) {
            return (
                <div>
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
        return (
            <div>
                {prevbtn}
                {nextbtn}
            </div>
        )
    }

    return (
        <div>
            <StepsTrack step={currentStep} maxstep={maxStep} />
            {generateForm(currentStep)}
        </div>
    )
}