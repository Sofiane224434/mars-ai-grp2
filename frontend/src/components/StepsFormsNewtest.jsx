import FormData from "./LargeForm/allforms/AllFormsData.json";
import StepsTrack from "./StepsTrack";
import { useState } from "react";

//add empty value for each input
for (let i of FormData) {
    for (let e of i.inputdata) {
        if (e.type == "group") {
            for (let e2 of e.content) {
                e2.value = ""
                    ;
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
    const [additions, setAdditions] = useState([]);

    function makeInputText(name, value, isrequired = true) {
        if (isrequired) {
            return (<input type="text" name={name} value={value} required></input>);
        }
        return (<input type="text" name={name} value={value}></input>);
    }

    function makeInputSelect(name, options, isrequired = true) {
        let optionmap;
        if (typeof options != "object" && options.length == 0) {
            throw new Error("No options availble");
        }
        optionmap = options.map(o => <option value={e.value}>{e.name}</option>)
        if (isrequired) {
            return (
                <select required name={name}>
                    <option value="">...</option>
                    {optionmap}
                </select>
            )
        }
        return (
            <select name={name}>
                <option value="">...</option>
                {optionmap}
            </select>
        )
    }

    function makeInputUpload(name, isrequired = true, accepts = null) {
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

    function makeInputTextarea(name, value, maxlength = null, isrequired = true) {
        if (maxlength) {

        }
        return (<textarea style={{ resize: "none" }} name={name} value={value}></textarea>)
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
    }

    //add an input
    function addInput() {
        setAdditions([...additions, "Added something..."]);
    }

    //remove an input
    function removeInput() {
        //
    }

    function generateAdditions() {
        if (additions.length > 0) {
            return (additions.map(e => <div>{e}</div>))
        }
    }

    //auto modify current values
    function updateResults(e, inputName) { }

    return (
        <div>
            <input type="text" maxLength={null}></input>
        </div>
    )
}