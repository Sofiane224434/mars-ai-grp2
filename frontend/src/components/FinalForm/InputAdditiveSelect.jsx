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
export default function InputAdditiveSelect({ groupname, addlimit = 5, options, label, btntitle,
    valueother,
    getValuesFunc
}) {

    const [firstInput, setFirstInput] = useState("");
    const [firstInputText, setFirstInputText] = useState("");
    const [selectValues, setSelectValues] = useState([]);
    const [textValues, setTextValues] = useState([]);

    //Vérifie que la première option est vide, sinon, rajoute une option vide ("")
    //Ceci est important pour que la valeur par défaut soit vide afin que l'utilisateur
    //n'oublie pas de faire son choix.
    if (options[0].props.value != "") {
        let newoption = <option value={""}>...</option>;
        options = [newoption].concat(options);
    }

    //Lorsque les valeurs changent, envoie au parent les valeurs
    useEffect(() => {
        // console.log(
        //     {
        //         "selvals": selectValues,
        //         "firstInput": firstInput,
        //         "firstInputText": firstInputText,
        //         "textValues": textValues
        //     }
        // )

        //Tri des valeurs pour obtenir seulements celles qui comptent
        let myfirstval, groupvals = [];

        if (firstInput == valueother) {
            myfirstval = firstInputText;
        } else {
            myfirstval = firstInput;
        }

        for (let n in selectValues) {
            if (selectValues[n] == valueother) {
                groupvals.push(textValues[n]);
            } else {
                groupvals.push(selectValues[n]);
            }
        }

        let cleanvalues = [myfirstval].concat(groupvals);

        getValuesFunc({ [groupname]: cleanvalues });
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

            // if (selectValues.length < (addlimit - 1) &&
            //     selectValues[selectValues.length - 1] != "") {
            //     setSelectValues([...selectValues, ""]);
            // }
        }

        // if (textValues.length < 1) {
        //     if (firstInput != "") {
        //         setTextValues([...textValues, ""]);
        //     }

        // } else {
        //     if (textValues.length < (addlimit - 1) &&
        //         selectValues[selectValues.length - 1] != "") {
        //         setTextValues([...textValues, ""]);
        //     }
        // }
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