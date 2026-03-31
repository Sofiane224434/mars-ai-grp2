import { useState, useEffect } from "react";

/**
 * Permet de générer un input de type select additif, pour les cas où qqun peut ajouter 
 * plusieurs valeurs qui doivent être présentées sous select.
 * Permet aussi d'avoir une valeur "autre"/"other" qui fait apparaitre un input texte.
 * 
 * @param {object} myinput L'input complet à utiliser.
 * @param valueother La valeur qui permet d'avoir un choix libre (autre), optionnelle.
 */
export default function InputAdditiveSelect({ groupname, addlimit = 5, myinput, valueother,
    getValuesFunc
}) {

    const [firstInput, setFirstInput] = useState("")



    return (<>{myinput}</>)
}