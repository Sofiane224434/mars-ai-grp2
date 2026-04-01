import { useState, useEffect } from "react";

export default function InputCheckboxCod({ label, checkbox_message, groupname }) {

    const [check, setCheck] = useState(false);

    useEffect(() => {

    }, [checked])

    return (
        <div>
            {label && <div>{label}</div>}
            <div>
                <input type="checkbox" name="check" value={check}
                    onChange={(e) => { setCheck(e.target.checked) }}></input>
                {checkbox_message && <div>{checkbox_message}</div>}
            </div>
            {check && ""}
        </div>
    )
}