import { useState, useEffect } from "react"

/**
 * Permet de créer un groupe d'input additif, pour les cas où qqun peut ajouter 
 * plusieurs autres valeurs.
 * 
 * @param addlimit Limite d'inputs qui peuvent être ajoutés, par défaut : 5
 * @param name Rassemble toutes les données dans un objet avec key "name".
 * Obligatoire.
 * @param btntitle Le texte que devrait afficher le bouton
 * @param label Le titre de l'input
 * @param getValuesFunc Fonction callback qui permet de renvoyer les valeurs au parent.
 * @param classContainer Classe pour le container de ce component
 * @param classInput Classe pour les inputs
 * @param classLabel Classe pour le label input
 * @param declareSelfFunc Fonction à passer provenant du parent, permet de transmettre
 * des informations dès que ce component apparait dans le DOM
 * @param getValuesFunc Fonction à passer provenant du parent, permet de transmettre
 * les valeurs des inputs au parent.
 */
export default function InputAdditive({ name, label, addlimit = 5, getValuesFunc, declareSelfFunc,
    btntitle = "Ajouter", classInput = null, classContainer = null,
    classLabel = null, formstep = null }) {

    //Le tout premier input, séparé car il ne peut pas être supprimé ou faire parti de map
    const [firstInput, setFirstInput] = useState("");
    //Les valeurs supplémentaires
    const [myValues, setMyValues] = useState([]);

    const classDefaultInput = "form_input";
    const classDefaultContainer = "";
    const classDefaultLabel = "form_label";

    let alldata = [firstInput].concat(myValues);

    function sendalldata() {
        getValuesFunc(alldata)
    }

    useEffect(() => {
        if (getValuesFunc) {
            sendalldata();
        }

    }, [alldata])

    //Si la fonction d'auto déclaration de la fonction existe, envoie au parent ses informations
    //dès que l'élément apparait sur le DOM
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

    /**
     * Ajoute un input texte en plus en ajoutant un vide ("") à l'array des valeurs
     */
    function addInput() {
        if (myValues.length < 1) {
            if (firstInput != "") {
                setMyValues([...myValues, ""]);
            }

        } else {
            if (myValues.length < (addlimit - 1) && myValues[myValues.length - 1] != "") {
                setMyValues([...myValues, ""]);
            }
        }

    }

    /**
     * Met à jour le premier input
     * @param e L'événement et ses informations
     */
    function updateFirstInput(e) {
        let value = e.target.value;
        setFirstInput(value);
    }

    /**
     * Permet de mettre à jour les valeurs
     * @param {*} e event (qui contient la valeur)
     * @param {*} index Index de la valeur à modifier
     */
    function updateValues(e, index) {
        const newval = myValues.map((val, i) => {
            if (i == index) {
                return (e.target.value);
            } else {
                return (val);
            }
        });
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
            {label && <div className={classLabel ? classLabel : classDefaultLabel}> {label} </div>}
            <input className={classInput ? classInput : classDefaultInput}
                onChange={(e) => { setFirstInput(e.target.value) }} name={1} type="text"
                value={firstInput}></input>
            {/* Map des valeurs additives */}
            {myValues.map((inp, index) => {
                return (
                    <>
                        <input className={classInput ? classInput : classDefaultInput}
                            onChange={(e) => { updateValues(e, index) }} name={index} type="text"
                            value={myValues[index]}></input>
                        <button type="button" onClick={() => { removeInput(index) }}>
                            (X) SUPPRIMER
                        </button>
                    </>
                )
            })}
            {myValues.length < (addlimit - 1) &&
                <button type="button" onClick={addInput}>(+){btntitle ? btntitle : "Ajouter"}</button>
            }
        </div>
    )
}