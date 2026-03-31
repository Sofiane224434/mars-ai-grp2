import { useState, useEffect } from "react"

/**
 * Permet de créer un groupe d'input additif, pour les cas où qqun peut ajouter 
 * plusieurs autres valeurs.
 * 
 * @param {*} addlimit Limite d'inputs qui peuvent être ajoutés, par défaut : 5
 * @param {*} groupname Existe seulement pour le traitement dans le formulaire et rassembler toutes
 * les données dans un seul groupe objet.
 * @param btntitle Le texte que devrait afficher le bouton
 * @param label Le titre de l'input
 * @param getValuesFunc Fonction callback qui permet de renvoyer les valeurs au parent.
 */
export default function InputAdditive({ groupname, label, addlimit = 5, getValuesFunc,
    btntitle = "Ajouter" }) {

    //Le tout premier input, séparé car il ne peut pas être supprimé ou faire parti de map
    const [firstInput, setFirstInput] = useState("");
    //Les valeurs supplémentaires
    const [myValues, setMyValues] = useState([]);

    useEffect(() => {
        let allvalues = [firstInput].concat(myValues)
        getValuesFunc({ [groupname]: allvalues });
    }, [myValues, firstInput])

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

    function removeInput(index) {
        let newvals = [...myValues];
        newvals.splice(index, 1);
        setMyValues(newvals);
    }

    return (
        <div>
            <div>{label ? label : "..."}</div>
            <input onChange={(e) => { setFirstInput(e.target.value) }} name={1} type="text" value={firstInput}></input>
            {myValues.map((inp, index) => {
                return (
                    <>
                        <input onChange={(e) => { updateValues(e, index) }} name={1} type="text"
                            value={myValues[index]}></input>
                        <button type="button" onClick={() => { removeInput(index) }}>
                            (X) SUPPRIMER
                        </button>
                    </>
                )
            })}
            <button type="button" onClick={addInput}>(+){btntitle}</button>
        </div>
    )
}