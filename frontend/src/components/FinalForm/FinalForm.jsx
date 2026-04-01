import { useState, useEffect } from "react";

import InputAdditive from "./InputAdditive";
import InputAdditiveSelect from "./InputAdditiveSelect";

export default function FinalForm() {

    function retrieveValues(values) {
        console.log(values);
    }

    const myinputs = [
        <InputAdditive getValuesFunc={retrieveValues} groupname={"grp1"} label={"First input"}></InputAdditive>,
        <InputAdditive getValuesFunc={retrieveValues} groupname={"grp2"}></InputAdditive>
    ]

    // for (let a in myinputs) {
    //     console.log(myinputs[a].props);
    // }

    const myselectoptions = [
        <option value="">...</option>,
        <option value={"gemini"}>Google : (Gemini)</option>,
        <option value={"midjourney"}>Midjourney</option>,
        <option value={"chatGPT"}>OpenAI : (ChatGPT)</option>,
        <option value={"claude"}>Anthropic (Claude)</option>,
        <option value={"grok"}>Grok</option>,
        <option value={"other"}>Autre...</option>
    ];

    // for (let a in myselectoptions) {
    //     console.log(myselectoptions[a].props);
    // }

    return (
        <form>
            {/* Map of my inputs here */}
            <InputAdditiveSelect label={"Veuillez indiquer les IAs utilisées."}
                valueother={"other"} options={myselectoptions} groupname={"aiselect"}
                getValuesFunc={retrieveValues}></InputAdditiveSelect>
        </form>
    )
}