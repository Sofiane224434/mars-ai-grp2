import { useState, useEffect } from "react";
import Data from "./AllFormsData.json";

let newdata = [];
for (let i of Data) {
    for (let e of i.inputdata) {
        console.log("inputdata", e);
    }
}

let initial_inputs = [
    {
        name: "input1",
        label: "Enter input 1",
        value: ""
    },
    {
        name: "input2",
        label: "Enter input 2",
        value: ""
    }
]

let init_only_inp = [];
for (let i of initial_inputs) {
    let obj = { name: i.name, value: "" };
    init_only_inp.push(obj)
}
console.log(init_only_inp);

let test = {
    1:
        <form>
            <div>A</div>
        </form>,
    2:
        <form>
            <div>B</div>
        </form>
}

export default function LargeFormFirst({ GetData, prevResults }) {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const [allInputs, setAllInputs] = useState(initial_inputs);

    function modifyInputValue(e, name) {
        const newData = allInputs.map(i => {
            if (i.name == name) {
                return { ...i, value: e.target.value };
            } else {
                return i;
            }
        })
        setAllInputs(newData);
    }

    // function sendData() {
    //     const newData = {
    //         form: "form1",
    //         results: allInputs
    //     }
    //     GetData(newData);
    // }

    useEffect(() => {
        if (prevResults) {
            console.log("prev res detected", prevResults);
            setAllInputs[prevResults];
        }
    }, [prevResults])

    useEffect(() => {
        // sendData();
        GetData({ form: "form1", results: allInputs });
    }, [allInputs])

    function generateForm() {
        let formMap = allInputs.map(inp =>
            <>
                <div>{inp.label}</div>
                <input onChange={(e) => modifyInputValue(e, inp.name)} value={inp.value}></input>
            </>
        )

        return formMap;
    }

    return (
        <div>
            <div>Form 1</div>
            <form>
                {generateForm()}
            </form>
        </div>
    )
}