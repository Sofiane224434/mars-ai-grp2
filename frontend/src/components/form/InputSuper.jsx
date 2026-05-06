import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import InputLengthUI from "./InputLengthUI";
import InputRequirementStar from "./InputRequirementStar";


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
    numberonly = false, classInput, classContainer, classLabel,
    regex = null, formstep = null, errormessage = null
}) {

    const { t } = useTranslation();

    //Style css
    const classDefaultInput = type == "checkbox"
        ? "h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border-2 border-jaune-souffre bg-noir-bleute checked:bg-jaune-souffre checked:border-jaune-souffre transition"
        : "w-full resize-none rounded-[7px] border-[3px] border-gris-anthracite bg-noir-bleute p-2.5 text-jaune-souffre outline-none transition duration-300 focus:border-jaune-souffre";
    const classDefaultContainer = type == "checkbox" ? "flex items-center gap-2.5 py-1" : "";
    const classDefaultLabel = "text-jaune-souffre float-left";
    const classBaseContainer = "w-full";
    const classErrorMessage = "text-red-500";
    const classInputError = "border-red-500 focus:border-red-500";

    let classUseInput;

    if (classInput) {
        classUseInput = classInput;
    } else {
        classUseInput = classDefaultInput;
    }
    if (errormessage) {
        if (classInput) {
            classUseInput = `${classInput} ${classInputError}`;
        } else {
            classUseInput = `${classDefaultInput} ${classInputError}`;
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
            //console.log("numberonly time...");
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
                let newoption = <option disabled selected value={""}>{t("form.select")}</option>;
                options = [newoption].concat(options);
            }
        }
    }

    if (type === "select") {
        if (options) {
            if (Array.isArray(options)) {
                return (
                    <div className={`${classBaseContainer} ${classContainer ? classContainer : classDefaultContainer}`.trim()}>
                        {label &&
                            <div>
                                <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>
                                {required && <InputRequirementStar></InputRequirementStar>}
                            </div>}
                        <select required={required} name={name} value={value}
                            onChange={handleChange}
                            className={classUseInput}>
                            {options.map(op => {
                                return (op)
                            })}
                        </select>
                        {errormessage && <div className={classErrorMessage}>{errormessage}</div>}
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
            <div className={`${classBaseContainer} ${classContainer ? classContainer : classDefaultContainer}`.trim()}>
                {label && <div>
                    <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>
                    {required && <InputRequirementStar></InputRequirementStar>}
                </div>}
                <textarea name={name} value={value} maxLength={max_string} minLength={min_string}
                    placeholder={placeholder} required={required} onChange={handleChange}
                    className={classUseInput}></textarea>
                {max_string && <InputLengthUI currentlength={value.length}
                    maxlength={max_string}></InputLengthUI>}
                {errormessage && <div className={classErrorMessage}>{errormessage}</div>}
            </div>
        )
    }

    if (type === "checkbox") {
        return (
            <div className={`${classBaseContainer}`.trim()}>
                <div className={`${classContainer ? classContainer : classDefaultContainer}`.trim()}>
                    <input name={name} type={type} max={max_numdate} maxLength={max_string}
                        accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                        required={required} value={value} onChange={handleChange}
                        className={classUseInput}
                    ></input>
                    {label && <div>
                        <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>
                        {required && <InputRequirementStar></InputRequirementStar>}
                    </div>}
                </div>
                {errormessage && <div className={classErrorMessage}>{errormessage}</div>}
            </div>
        )
    }

    if (type === "file") {
        const selectedFileName = value && typeof value === "object" && value.file
            ? value.file.name
            : "";
        const fileButtonClass = classInput
            ? classInput
            : "inline-flex cursor-pointer items-center rounded-full border-2 border-jaune-souffre px-4 py-1.5 text-sm font-semibold text-jaune-souffre transition hover:bg-jaune-souffre hover:text-noir-bleute";

        return (
            <div className={`${classBaseContainer} ${classContainer ? classContainer : classDefaultContainer}`.trim()}>
                {label && <div>
                    <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>
                    {required && <InputRequirementStar></InputRequirementStar>}
                </div>}
                <div className="flex items-center gap-3">
                    <label className={fileButtonClass}>
                        {t("form.file.choose")}
                        <input name={name} type={type} max={max_numdate} maxLength={max_string}
                            accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                            required={required} onChange={handleChange}
                            className="hidden"
                        ></input>
                    </label>
                    <span className="text-sm text-jaune-souffre/80">
                        {selectedFileName || t("form.file.noneSelected")}
                    </span>
                </div>
                {errormessage && <div className={classErrorMessage}>{errormessage}</div>}
            </div>
        )
    }

    return (
        <div className={`${classBaseContainer} ${classContainer ? classContainer : classDefaultContainer}`.trim()}>
            {label &&
                <div>
                    <div className={classLabel ? classLabel : classDefaultLabel}>{label}</div>
                    {required && <InputRequirementStar></InputRequirementStar>}
                </div>}
            <input name={name} type={type} max={max_numdate} maxLength={max_string}
                accept={accept} min={min_numdate} minLength={min_string} placeholder={placeholder}
                required={required} value={value} onChange={handleChange}
                className={classUseInput}
            ></input>
            {max_string && <InputLengthUI currentlength={value.length}
                maxlength={max_string}></InputLengthUI>}
            {errormessage && <div className={classErrorMessage}>{errormessage}</div>}
        </div>

    )
}