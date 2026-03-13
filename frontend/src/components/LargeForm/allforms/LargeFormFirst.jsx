import { useState, useEffect } from "react";

export default function LargeFormFirst({ GetFirst }) {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    // const [formResults, setFormResults] = useState(
    //     {
    //         form: "form1",
    //         results: [input1, input2]
    //     }
    // )

    function sendData() {
        const newData = {
            form: "form1",
            results: [input1, input2]
        }
        GetFirst(newData);
    }

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