import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

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
    btntitle = null, classInput, classContainer,
    classLabel, formstep = null }) {

    const { t } = useTranslation();

    //Le tout premier input, séparé car il ne peut pas être supprimé ou faire parti de map
    const [firstInput, setFirstInput] = useState("");
    //Les valeurs supplémentaires
    const [myValues, setMyValues] = useState([]);

    const classDefaultInput = "w-full resize-none rounded-[7px] border-[3px] border-gris-anthracite bg-noir-bleute p-2.5 text-jaune-souffre outline-none transition duration-300 focus:border-jaune-souffre";
    const classDefaultContainer = "w-full";
    const classDefaultLabel = "text-jaune-souffre";

    function sendalldata(firstval, othervals) {
        let alldata = [firstval].concat(othervals)
        getValuesFunc(alldata)
    }

    // useEffect(() => {
    //     if (getValuesFunc) {
    //         sendalldata();
    //     }

    // }, [alldata])

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
        sendalldata(value, myValues);
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
        sendalldata(firstInput, newval);
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

    const btnAddClass = "mt-2 cursor-pointer rounded-full border-2 border-jaune-souffre px-4 py-1.5 text-sm font-semibold text-jaune-souffre transition hover:bg-jaune-souffre hover:text-noir-bleute";
    const btnRemoveClass = "ml-2 cursor-pointer rounded-full border-2 border-red-500 px-3 py-1 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white";

    return (
        <div className={classContainer ? classContainer : classDefaultContainer}>
            {label && <div className={classLabel ? classLabel : classDefaultLabel}> {label} </div>}
            <input className={classInput ? classInput : classDefaultInput}
                onChange={(e) => { setFirstInput(e.target.value) }} name={1} type="text"
                value={firstInput}></input>
            {/* Map des valeurs additives */}
            {myValues.map((inp, index) => {
                return (
                    <div key={index} className="flex items-center gap-2">
                        <input className={classInput ? classInput : classDefaultInput}
                            onChange={(e) => { updateValues(e, index) }} name={index} type="text"
                            value={myValues[index]}></input>
                        <button type="button" onClick={() => { removeInput(index) }}
                            className={btnRemoveClass}>
                            ✕
                        </button>
                    </div>
                )
            })}
            {myValues.length < (addlimit - 1) &&
                <button type="button" onClick={addInput} className={btnAddClass}>(+) {btntitle ? btntitle : t("form.add")}</button>
            }
        </div>
    )
}