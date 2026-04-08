import { useEffect, useState } from "react"


const acceptable_types = ["text", "file", "tel", "email", "number", "select", "textarea",
    "checkbox", "url", "date"];

/**
 * Un "Super Input" qui permet d'activer une fonction dès qu'il est sur une page.
 * Pratique pour construire automatiquement un tableau de résultats d'un formulaire.
 * @param type Le type d'input à utiliser. Accepte :
 *  text | file | tel | email | number | select
 */
export default function InputSuper({ name, label, getValueFunc, declareSelfFunc,
    type, options = null, accept = null, min_numdate = null, max_numdate = null,
    min_string = null, max_string = null, placeholder = null, required = false,
    numberonly = false, classInput = null, classContainer = null, classLabel = null,
    regex = null, formstep = null
}) {

    //Style css
    const classDefaultInput = type == "checkbox" ? "" : "form_input";
    const classDefaultContainer = type == "checkbox" ? "float_left_withclear" : "";
    const classDefaultLabel = "form_label";

    const [value, setValue] = useState("");
    //const [file, setFile] = useState("");

    //debug
    // useEffect(() => {
    //     if (type === "file") {
    //         console.log(value, file);
    //     }
    // }, [file, value]);

    //Permet d'envoyer au parent le nom, peut construire automatiquement un tableau de données.
    let declared = false;

    //console.log("test", name);

    useEffect(() => {
        if (!declared) {
            declared = true;
            //console.log("test declaration!!");
            if (declareSelfFunc) {
                let declobj = {
                    name: name,
                    min_numdate: min_numdate,
                    max_numdate: max_numdate,
                    min_string: min_string,
                    max_string: max_string,
                    required: required,
                    numberonly: numberonly,
                    regex: regex,
                    formstep: formstep
                }
                declareSelfFunc(declobj);
            }
        }
        return;
    }, [])

    function updateParent(result) {
        if (getValueFunc) {
            if (name) {
                getValueFunc({ [name]: result });
            } else {
                getValueFunc(result);
            }

        }
    }

    function handleChange(e) {
        let typeofinput = e.target.type;
        let value = e.target.value;
        let check = e.target.checked;
        let files = e.target.files;
        let result;

        if (typeofinput == "file") {
            result = { file: files[0], value: value };
        }

        if (typeofinput == "checkbox") {
            //console.log("check changed: ", check);
            result = check;
        }

        if (numberonly) {
            console.log("numberonly time...");
            let stroke = e.nativeEvent.data;
            const numregex = /^\d+$/;
            if (numregex.test(stroke) || stroke == null) {
                result = value;
            } else {
                return;
            }
        }
        if (result == undefined || result == null) {
            result = value;
        }
        setValue(result);

        updateParent(result);
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

    if (type === "file") {
        return (
            <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
                {label && <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>}
                <input name={name} type={type} max={max_numdate} maxLength={max_string}
                    accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                    required={required} value={value.value} files={value.file} onChange={handleChange}
                    className={classInput ? classInput : classDefaultInput}
                ></input>
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