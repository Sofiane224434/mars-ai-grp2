import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Permet de générer un input de type select additif, pour les cas où qqun peut ajouter 
 * plusieurs valeurs qui doivent être présentées sous select.
 * Permet aussi d'avoir une valeur "autre"/"other" qui fait apparaitre un input texte.
 * 
 * @param valueother La valeur qui permet d'avoir un choix libre (autre), optionnelle.
 * @param options Les options à utiliser dans un format array. Exemple :
 * [<option value="...">...</option>, ...]
 */
export default function InputAdditiveSelect({ name, addlimit = 5, options, label, btntitle = null,
    valueother, getValuesFunc, declareSelfFunc, formstep = null
}) {

    const { t } = useTranslation();

    //Valeurs pour le premier input
    const [firstInput, setFirstInput] = useState("");
    const [firstInputText, setFirstInputText] = useState("");
    //Valeurs pour les inputs suplémentaires
    const [selectValues, setSelectValues] = useState([]);
    const [textValues, setTextValues] = useState([]);

    //Vérifie que options existe
    if (!options) {
        throw new Error(`InputAdditiveSelect ERROR : Aucunes options trouvées, veuillez 
            préciser les options.`)
    }

    //Vérifie si les options sont un array
    if (!Array.isArray(options)) {
        throw new Error(`InputAdditiveSelect ERROR : Les options doivent être un array.`)
    }

    //Vérifie que la première option est vide, sinon, rajoute une option vide ("")
    //Ceci est important pour que la valeur par défaut soit vide afin que l'utilisateur
    //n'oublie pas de faire son choix.
    if (options[0].props.value != "") {
        let newoption = <option disabled selected value={""}>{t("form.select")}</option>;
        options = [newoption].concat(options);
    }

    let declared = false;
    useEffect(() => {
        if (!declared) {
            if (declareSelfFunc) {
                let declobj = {
                    name: name,
                    formstep: formstep
                }
                declareSelfFunc(declobj);
            }
            declared = true;
        }
        return;
    }, [])

    //Lorsque les valeurs changent, envoie au parent les valeurs
    useEffect(() => {
        //console.log("activated additiveselect change")
        // if (!selectValues
        //     && !firstInput
        //     && !firstInputText
        //     && !textValues) { return; }

        //console.log("does it continue...")

        let myfirstval, groupvals = [];

        //Décide de prendre l'input texte ou select selon si select est en mode "autre"
        //ou non
        if (firstInput == valueother) {
            myfirstval = firstInputText;
        } else {
            myfirstval = firstInput;
        }

        //Même tri pour les valeurs additionnelles
        for (let n in selectValues) {
            if (selectValues[n] == valueother) {
                groupvals.push(textValues[n]);
            } else {
                groupvals.push(selectValues[n]);
            }
        }

        let cleanvalues = [myfirstval].concat(groupvals);
        //console.log("cleanvalue ok?", cleanvalues);

        //Rend les valeurs triées à la fonction du parent
        if (name) {
            //console.log("does it think it has a name?")
            getValuesFunc({ [name]: cleanvalues });
        } else {
            getValuesFunc(cleanvalues);
            //console.log("here to check if this works...", cleanvalues);
        }

    }, [selectValues, firstInput, firstInputText, textValues])

    const myoptionmap = options.map(inp => { return (inp) });

    function checkforOther(val) {
        if (valueother != "" || valueother != undefined || valueother != null) {
            if (val == valueother) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    function addInput() {
        //Check pour si il n'y a pas encore de valeurs dans la liste d'inputs
        //supplémentaires.
        if (selectValues.length < 1) {
            if (firstInput != "") {
                if (firstInput == valueother) {
                    if (firstInputText != "") {
                        setSelectValues([...selectValues, ""]);
                        setTextValues([...textValues, ""]);
                    }
                } else {
                    setSelectValues([...selectValues, ""]);
                    setTextValues([...textValues, ""]);
                }

            }

            //Si il y a des valeurs supplémentaires...
        } else {

            let lastSelectVal = selectValues[selectValues.length - 1];
            let lastTextVal = textValues[textValues.length - 1];
            //Vérifie si arrivé à valeur maximale
            let reachedMax = selectValues.length < (addlimit - 1) ? false : true;
            if (addlimit == null) {
                reachedMax = false;
            }

            if (!reachedMax) {
                if (lastSelectVal != "") {
                    if (lastSelectVal == "other") {
                        if (lastTextVal != "") {
                            setSelectValues([...selectValues, ""]);
                            setTextValues([...textValues, ""]);
                        }
                    } else {
                        setSelectValues([...selectValues, ""]);
                        setTextValues([...textValues, ""]);
                    }
                }
            }
        }
    }

    function updateSelectValues(e, index) {
        const newval = selectValues.map((val, i) => {
            if (i == index) {
                return (e.target.value);
            } else {
                return (val);
            }
        });

        setSelectValues(newval);
    }

    function updateTextValues(e, index) {
        const newval = textValues.map((val, i) => {
            if (i == index) {
                return (e.target.value);
            } else {
                return (val);
            }
        });

        setTextValues(newval);
    }

    function removeSelectInput(index) {
        let newvals = [...selectValues];
        newvals.splice(index, 1);
        setSelectValues(newvals);
    }

    function removeTextInput(index) {
        let newvals = [...textValues];
        newvals.splice(index, 1);
        setTextValues(newvals);
    }

    function removeBothInput(index) {
        removeSelectInput(index);
        removeTextInput(index);
    }

    const selectClass = "w-full rounded-[7px] border-[3px] border-gris-anthracite bg-noir-bleute p-2.5 text-jaune-souffre outline-none transition duration-300 focus:border-jaune-souffre";
    const textInputClass = "mt-1 w-full rounded-[7px] border-[3px] border-gris-anthracite bg-noir-bleute p-2.5 text-jaune-souffre outline-none transition duration-300 focus:border-jaune-souffre";
    const btnAddClass = "mt-2 cursor-pointer rounded-full border-2 border-jaune-souffre px-4 py-1.5 text-sm font-semibold text-jaune-souffre transition hover:bg-jaune-souffre hover:text-noir-bleute";
    const btnRemoveClass = "ml-2 cursor-pointer rounded-full border-2 border-red-500 px-3 py-1 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white";

    return (
        <div className="ml-7 flex w-full flex-col gap-2 border-l-2 border-jaune-souffre/30 pl-4">
            <div className="flex flex-col gap-1">
                {label ? <div className="text-sm text-jaune-souffre">{label}</div> : ""}
                <select onChange={(e) => { setFirstInput(e.target.value) }} className={selectClass}>
                    {myoptionmap}
                </select>
                {checkforOther(firstInput) && <input type="text" placeholder={t("form.specify")}
                    onChange={(e) => { setFirstInputText(e.target.value) }} className={textInputClass}></input>}
            </div>

            {selectValues.map((inp, index) => {
                return (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <select onChange={(e) => { updateSelectValues(e, index) }} name={index}
                                value={selectValues[index]} className={selectClass}>
                                {myoptionmap}
                            </select>
                            <button type="button" onClick={() => { removeBothInput(index) }}
                                className={btnRemoveClass}>
                                ✕
                            </button>
                        </div>
                        {checkforOther(selectValues[index]) && <input type="text" placeholder={t("form.specify")}
                            onChange={(e) => { updateTextValues(e, index) }} className={textInputClass}></input>}
                    </div>
                )
            })}

            <button type="button" onClick={addInput} className={btnAddClass}>(+) {btntitle ? btntitle : t("form.add")}</button>
        </div>
    )
}