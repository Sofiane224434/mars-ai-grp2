import { useEffect, useState } from "react"

import InputLengthUI from "./InputLengthUI";


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
    regex = null, formstep = null, errormessage = null
}) {

    //Style css
    const classDefaultInput = type == "checkbox" ? "" : "form_input";
    const classDefaultContainer = type == "checkbox" ? "float_left_withclear" : "";
    const classDefaultLabel = "form_label";

    let classUseInput, classUseContainer, classUseLabel;

    if (classInput) {
        classUseInput = classInput;
    } else {
        classUseInput = classDefaultInput;
    }
    if (errormessage) {
        if (classInput) {
            classUseInput = classinput + " form_input_error";
        } else {
            classUseInput = classDefaultInput + " form_input_error";
        }
    }


    const [value, setValue] = useState("");

    let declared = false;

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

    if (!acceptable_types.includes(type)) {
        console.warn("InputSuper ERROR : Type non reconnu, retourne un input de type " +
            "text à la place."
        )
        type = "text";
    }

    //Vérifie que la première option est vide si options est utilisé, 
    //sinon, rajoute une option vide ("")
    //Ceci est important pour que la valeur par défaut soit vide afin que l'utilisateur
    //n'oublie pas de faire son choix.
    if (options) {
        if (Array.isArray(options)) {
            if (options[0].props.value != "") {
                let newoption = <option disabled selected value={""}>Sélectionnez...</option>;
                options = [newoption].concat(options);
            }
        }
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
                            className={classUseInput}>
                            {options.map(op => {
                                return (op)
                            })}
                        </select>
                        {errormessage && <div className="form_error_message">{errormessage}</div>}
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
                    className={classUseInput}></textarea>
                {max_string && <InputLengthUI currentlength={value.length}
                    maxlength={max_string}></InputLengthUI>}
                {errormessage && <div className="form_error_message">{errormessage}</div>}
            </div>
        )
    }

    if (type === "checkbox") {
        return (
            <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
                <input name={name} type={type} max={max_numdate} maxLength={max_string}
                    accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                    required={required} value={value} onChange={handleChange}
                    className={classUseInput}
                ></input>
                {label && <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>}
                {errormessage && <div className="form_error_message">{errormessage}</div>}
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
                {errormessage && <div className="form_error_message">{errormessage}</div>}
            </div>
        )
    }

    return (
        <div style={{ clear: "both" }} className={classContainer ? classContainer : classDefaultContainer}>
            {label && <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>}
            <input name={name} type={type} max={max_numdate} maxLength={max_string}
                accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                required={required} value={value} onChange={handleChange}
                className={classUseInput}
            ></input>
            {max_string && <InputLengthUI currentlength={value.length}
                maxlength={max_string}></InputLengthUI>}
            {errormessage && <div className="form_error_message">{errormessage}</div>}
        </div>

    )
}