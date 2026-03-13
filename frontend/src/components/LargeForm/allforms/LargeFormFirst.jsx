import { useState, useEffect } from "react";

export default function LargeFormFirst({ GetData, prevResults }) {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    function sendData() {
        const newData = {
            form: "form1",
            results: [input1, input2]
        }
        GetData(newData);
    }

    useEffect(() => {
        if (prevResults) {
            setInput1(prevResults.results[0]);
            setInput2(prevResults.results[1]);
        }
    }, prevResults)

    useEffect(() => {
        sendData();
    }, [input1, input2])

    return (
        <div>
            <div>Form 1</div>
            <form>
                <div>Input 1</div>
                <input type="text" onChange={(e) => setInput1(e.target.value)}
                    value={input1}></input>
                <div>Input 2</div>
                <input type="text" onChange={(e) => setInput2(e.target.value)}
                    value={input2}></input>
            </form>
        </div>
    )
}