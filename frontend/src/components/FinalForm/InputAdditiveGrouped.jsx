import { useState, useEffect } from "react"

/**
 * Permet de créer un groupe d'input additif, pour les cas où qqun peut ajouter 
 * plusieurs autres valeurs.
 * 
 * @param addlimit Limite d'inputs qui peuvent être ajoutés, par défaut : 5
 * @param name Rassemble toutes les données dans un objet avec key "name".
 * Obligatoire.
 * @param inputnames Le nom de chaque input, obligatoire. Chaque nom doit être unique.
 * Doit être sous forme d'array (ex : [name1, name2, name3]).
 * Permet aussi de créer tous les inputs nécessaires (1 nom = 1 input).
 * @param btntitle Le texte que devrait afficher le bouton
 * @param labels Titres de chaque input dans un array (ex : [label1, label2, label3]).
 * Doit correspondre à l'ordre de inputnames.
 * @param getValuesFunc Fonction callback qui permet de renvoyer les valeurs au parent.
 */
export default function InputAdditiveGrouped({ name, inputnames, labels, addlimit = 5,
    getValuesFunc, declareSelfFunc, btntitle = "Ajouter", classInput = null,
    classContainer = null, classLabel = null, classGroup = null, formstep = null }) {

    //Vérification que chaque noms soient uniques
    if (new Set(inputnames).size !== inputnames.length) {
        throw new Error("InputAdditiveGrouped ERROR : Duplicats dans inputnames!")
    }

    //Vérification que inputnames est un array
    if (!Array.isArray(inputnames)) {
        throw new Error("InputAdditiveGrouped ERROR : inputnames doit être un array")
    }

    //Construction objet firstInput
    let init_obj = {};
    for (let n in inputnames) {
        init_obj[inputnames[n]] = "";
    }

    //Le tout premier groupe d'input, séparé car il ne peut pas être supprimé ou faire parti de map
    const [firstInput, setFirstInput] = useState(JSON.parse(JSON.stringify(init_obj)));
    //Les valeurs supplémentaires
    const [myValues, setMyValues] = useState([]);

    let allvalues = [firstInput].concat(myValues);

    const classDefaultInput = "form_input";
    const classDefaultContainer = "float_column";
    const classDefaultGroup = "float_left_row";
    const classDefaultLabel = "form_label";

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
        //if (!myValues || !firstInput) { return; }
        let allvalues = [firstInput].concat(myValues)
        if (getValuesFunc) {
            if (name == undefined || name == null) {
                getValuesFunc(allvalues);
            } else {
                getValuesFunc({ [name]: allvalues });
            }
        }
    }, [myValues, firstInput])

    function updateFirstInput(e) {
        let inpname = e.target.name;
        let value = e.target.value;
        let newval = { ...firstInput };
        newval[inpname] = value;
        setFirstInput(newval);
    }

    /**
     * Ajoute un groupe d'inputs vides en plus
     */
    function addInput() {
        let values = [];
        if (myValues.length < 1) {
            values = Object.values(firstInput);
            if (!values.includes("")) {
                setMyValues([...myValues, JSON.parse(JSON.stringify(init_obj))]);
            }

        } else {
            values = Object.values(myValues[myValues.length - 1]);
            if (myValues.length < (addlimit - 1) && !values.includes("")) {
                setMyValues([...myValues, JSON.parse(JSON.stringify(init_obj))]);
            }
        }

    }

    /**
     * Permet de mettre à jour les valeurs
     * @param {*} e event (qui contient la valeur)
     * @param {*} index Index de la valeur à modifier
     */
    function updateValues(e, index) {
        let newval = JSON.parse(JSON.stringify(myValues));
        const inpname = e.target.name;
        const value = e.target.value;
        newval[index][inpname] = value;
        // const newval = myValues.map((val, i) => {
        //     if (i == index) {
        //         return (e.target.value);
        //     } else {
        //         return (val);
        //     }
        // });
        setMyValues(newval);
    }

    /**
     * Supprime un input additionel à la position index
     * @param {*} index Position de l'élément à supprimer dans l'array
     */
    function removeInput(index) {
        let newvals = [...myValues];
        newvals.splice(index, 1);
        setMyValues(newvals);
    }

    return (
        <div className={classContainer ? classContainer : classDefaultContainer}>
            <div className={classGroup ? classGroup : classDefaultGroup}>
                {inputnames.map((n, ind) => {
                    return (
                        <div>
                            {labels && labels[ind] && <div
                                className={classLabel ? classLabel : classDefaultLabel}
                            > {labels[ind]} </div>}
                            <input onChange={updateFirstInput} name={n}
                                type="text" value={firstInput[n]}
                                className={classInput ? classInput : classDefaultInput}></input>
                        </div>
                    )
                })}
            </div>

            {/* Map des valeurs additives */}

            {myValues.map((group, index) => {

                return (
                    <div>
                        <div className={classGroup ? classGroup : classDefaultGroup}>{
                            inputnames.map((inp, i) => {
                                return (
                                    <div>
                                        {labels && labels[i] && <div
                                            className={classLabel ? classLabel : classDefaultLabel}
                                        > {labels[i]} </div>}
                                        <input onChange={(e) => { updateValues(e, index) }}
                                            name={inp} type="text"
                                            value={myValues[index][inp]}
                                            className={classInput ? classInput : classDefaultInput}
                                        ></input>
                                    </div>
                                )
                            })
                        }</div>
                        <button type="button" onClick={() => { removeInput(index) }}>
                            (X) SUPPRIMER
                        </button>
                    </div>
                )



            })}

            {myValues.length < (addlimit - 1) &&
                <button type="button" onClick={addInput}>(+){btntitle ? btntitle : "Ajouter"}</button>}
        </div>
    )
}