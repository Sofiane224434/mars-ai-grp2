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

    for (let a in myinputs) {
        console.log(myinputs[a].props);
    }

    let example_select =
        <select>
            <option value={""}>...</option>
            <option value={"val1"}>Valeur 1</option>
            <option value={"val2"}>Valeur 2</option>
        </select>

    return (
        <form>
            {/* Map of my inputs here */}
            <InputAdditiveSelect myinput={example_select}></InputAdditiveSelect>
        </form>
    )
}