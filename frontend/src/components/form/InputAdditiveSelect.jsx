import { useState, useEffect } from "react";

/**
 * Permet de générer un input de type select additif, pour les cas où qqun peut ajouter 
 * plusieurs valeurs qui doivent être présentées sous select.
 * Permet aussi d'avoir une valeur "autre"/"other" qui fait apparaitre un input texte.
 * 
 * @param valueother La valeur qui permet d'avoir un choix libre (autre), optionnelle.
 * @param options Les options à utiliser dans un format array. Exemple :
 * [<option value="...">...</option>, ...]
 */
export default function InputAdditiveSelect({ name, addlimit = 5, options, label, btntitle,
    valueother, getValuesFunc, declareSelfFunc, formstep = null
}) {

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
        let newoption = <option disabled selected value={""}>Sélectionnez...</option>;
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

    return (
        <div>
            <div>
                {label ? <div>{label}</div> : ""}
                <select onChange={(e) => { setFirstInput(e.target.value) }}>
                    {myoptionmap}
                </select>
                {checkforOther(firstInput) && <input type="text"
                    onChange={(e) => { setFirstInputText(e.target.value) }}></input>}
            </div>

            {selectValues.map((inp, index) => {
                return (
                    <div>
                        <select onChange={(e) => { updateSelectValues(e, index) }} name={index}
                            value={selectValues[index]}>
                            {myoptionmap}
                        </select>
                        {checkforOther(selectValues[index]) && <input type="text"
                            onChange={(e) => { updateTextValues(e, index) }}></input>}
                        <button type="button" onClick={() => { removeBothInput(index) }}>
                            (X) SUPPRIMER
                        </button>
                    </div>
                )
            })}

            <button type="button" onClick={addInput}>(+){btntitle ? btntitle : "Ajouter"}</button>
        </div>
    )
}