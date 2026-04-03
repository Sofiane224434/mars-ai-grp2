import { useEffect, useState } from "react"


const acceptable_types = ["text", "file", "tel", "email", "number", "select", "textarea",
    "checkbox", "url", "date"];

/**
 * Un "Super Input" qui permet d'activer une fonction dès qu'il est sur une page.
 * Pratique pour construire automatiquement un tableau de résultats d'un formulaire.
 * @param type Le type d'input à utiliser. Accepte :
 *  text | file | tel | email | number | select
 * @returns 
 */
export default function InputSuper({ name, label, getValueFunc, declareSelfFunc,
    type, options = null, accept = null, min_numdate = null, max_numdate = null,
    min_string = null, max_string = null, placeholder = null, required = false,
    numberonly = false, classInput = null, classContainer = null, classLabel = null,
    regex = null
}) {

    //Style css
    const classDefaultInput = type == "checkbox" ? "" : "form_input";
    const classDefaultContainer = type == "checkbox" ? "float_left_withclear" : "";
    const classDefaultLabel = "form_label";

    const [value, setValue] = useState(null);

    //Permet d'envoyer au parent le nom, peut construire automatiquement un tableau de données.
    useEffect(() => {
        if (declareSelfFunc) {
            declareSelfFunc(name);
        }
    }, [])

    useEffect(() => {
        if (getValueFunc) {
            getValueFunc({ [name]: value });
        }
    }, [value])

    function handleChange(e) {
        console.log(e.target);
        console.log("e get last keystroke = ", e.nativeEvent.data);
        let typeofinput = e.target.type;
        let value = e.target.value;
        let check = e.target.checked;
        let files = e.target.files;

        if (typeofinput == "file") {
            setValue({ file: files[0], value: value });
            return;
        }

        if (typeofinput == "checkbox") {
            console.log("check changed: ", check);
            setValue(check);
            return;
        }

        if (numberonly) {
            const numregex = /^\d+$/;
            if (numregex.test(e.nativeEvent.data)) {
                setValue(value);
            }
            return;
        }

        setValue(value);
    }

    // const input_text = <input name={name} type={"text"} max={max_numdate} maxLength={max_string}
    //     accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
    //     onChange={handleChange} required={required} value={value}
    //     className={classInput ? classInput : classDefaultInput}></input>;

    if (!acceptable_types.includes(type)) {
        console.warn("InputSuper " + name + " ERROR : Type non reconnu, retourne un input de type " +
            "text à la place."
        )
        type = "text";
        // return (
        //     <div>
        //         {label && <div className={classLabel ? classLabel : classDefaultLabel}
        //         >{label}</div>}
        //         {input_text}
        //     </div>
        // )
    }

    if (type === "select") {
        if (options) {
            if (Array.isArray(options)) {
                return (
                    <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
                        {label && <div className={classLabel ? classLabel : classDefaultLabel}
                        >{label}</div>}
                        <select required={required} name={name} value={value}
                            onChange={handleChange}
                            className={classInput ? classInput : classDefaultInput}>
                            {options.map(op => {
                                return (op)
                            })}
                        </select>
                    </div>
                )
            } else {
                throw new Error(`InputSuper ERROR : type select, options n'est pas un array.`)
            }
        } else {
            throw new Error(`InputSuper ERROR : type select n'a pas d'options.`)
        }
    }

    if (type === "textarea") {
        return (
            <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
                {label && <div className={classLabel ? classLabel : classDefaultLabel}
                >{label}</div>}
                <textarea name={name} value={value} maxLength={max_string} minLength={min_string}
                    placeholder={placeholder} required={required} onChange={handleChange}
                    className={classInput ? classInput : classDefaultInput}></textarea>
            </div>
        )
    }

    if (type === "checkbox") {
        return (
            <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
                <input name={name} type={type} max={max_numdate} maxLength={max_string}
                    accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                    required={required} value={value} onChange={handleChange}
                    className={classInput ? classInput : classDefaultInput}
                ></input>
                {label && <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>}
            </div>
        )
    }

    return (
        <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
            {label && <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>}
            <input name={name} type={type} max={max_numdate} maxLength={max_string}
                accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                required={required} value={value} onChange={handleChange}
                className={classInput ? classInput : classDefaultInput}
            ></input>
        </div>

    )
}