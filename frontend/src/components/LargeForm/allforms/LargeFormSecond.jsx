import { useState } from "react";

export default function LargeFormSecond() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    return (
        <div>
            <div>Form 2</div>
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