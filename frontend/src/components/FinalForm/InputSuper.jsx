import { useEffect, useState } from "react"


const acceptable_types = ["text", "file", "tel", "email", "number", "select", "textarea",
    "checkbox", "url"];

/**
 * Un "Super Input" qui permet d'activer une fonction dès qu'il est sur une page.
 * Pratique pour construire automatiquement un tableau de résultats d'un formulaire.
 * @param type Le type d'input à utiliser. Accepte :
 *  text | file | tel | email | number | select
 * @returns 
 */
export default function InputSuper({ name, label, getValueFunc, declareSelfFunc,
    type, options = null, accept = null, min_num = null, max_num = null,
    min_string = null, max_string = null, placeholder = null, required = false,
}) {

    const [value, setValue] = useState("");

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
        let typeofinput = e.target.type;
        let value = e.target.value;
        let check = e.target.checked;
        let files = e.target.files;

        if (typeofinput == "file") {
            setValue({ file: files[0], value: value });
            return;
        }

        if (typeofinput == "checked") {
            setValue(check);
            return;
        }

        setValue(value);
    }

    const input_text = <input name={name} type={"text"} max={max_num} maxLength={max_string}
        accept={accept} min={min_num} minLength={min_string} placeholder={placeholder}
        onChange={handleChange} required={required} value={value}></input>;

    if (!acceptable_types.includes(type)) {
        console.warn("InputSuper " + name + " ERROR : Type non reconnu, retourne un input de type " +
            "text à la place."
        )
        return (
            <div>
                {label && <div>{label}</div>}
                {input_text}
            </div>
        )
    }

    if (type === "select") {
        if (options) {
            if (Array.isArray(options)) {
                return (
                    <div>
                        {label && <div>{label}</div>}
                        <select required={required} name={name} value={value}>
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
            <div>
                {label && <div>{label}</div>}
                <textarea name={name} value={value} maxLength={max_string} minLength={min_string}
                    placeholder={placeholder} required={required}></textarea>
            </div>
        )
    }

    return (
        <div>
            {label && <div>{label}</div>}
            <input name={name} type={type} max={max_num} maxLength={max_string}
                accept={accept} min={min_num} minLength={min_string} placeholder={placeholder}
                required={required} value={value}
            ></input>
        </div>

    )
}