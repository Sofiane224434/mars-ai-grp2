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
 */
export default function InputAdditive({ name, label, addlimit = 5, getValuesFunc, declareSelfFunc,
    btntitle = "Ajouter" }) {

    //Le tout premier input, séparé car il ne peut pas être supprimé ou faire parti de map
    const [firstInput, setFirstInput] = useState("");
    //Les valeurs supplémentaires
    const [myValues, setMyValues] = useState([]);

    useEffect(() => {
        if (declareSelfFunc) {
            declareSelfFunc(name);
        }
    }, [])

    //Lorsque les valeurs changent, envoie au parent les valeurs
    useEffect(() => {
        let allvalues = [firstInput].concat(myValues)
        if (name == undefined || name == null) {
            //Sans name, ne peut pas renvoyer la valeur groupe dont le parent a
            //besoin, donc : lance une erreur.
            throw new Errror("Module : InputAdditive; oublie de groupname!");
        }
        if (getValuesFunc) {
            getValuesFunc({ [name]: allvalues });
        }
    }, [myValues, firstInput])

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
        <div>
            <div>{label ? label : "..."}</div>
            <input onChange={(e) => { setFirstInput(e.target.value) }} name={1} type="text" value={firstInput}></input>
            {/* Map des valeurs additives */}
            {myValues.map((inp, index) => {
                return (
                    <>
                        <input onChange={(e) => { updateValues(e, index) }} name={index} type="text"
                            value={myValues[index]}></input>
                        <button type="button" onClick={() => { removeInput(index) }}>
                            (X) SUPPRIMER
                        </button>
                    </>
                )
            })}
            <button type="button" onClick={addInput}>(+){btntitle ? btntitle : "Ajouter"}</button>
        </div>
    )
}