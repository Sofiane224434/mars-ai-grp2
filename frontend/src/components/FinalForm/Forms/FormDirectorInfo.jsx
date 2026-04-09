import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";
import InputAdditiveGrouped from "../InputAdditiveGrouped";

export default function FormDirectorInfo({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label"
}) {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [socials, setSocials] = useState([]);
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [marketting, setMarketting] = useState("");
    const [markettingOther, setMarkettingOther] = useState("");
    const [tosCheck, setTosCheck] = useState(false);
    const [rulesCheck, setRulesCheck] = useState(false);

    let alldata = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        socials: socials,
        email: email,
        tel: tel,
        birthdate: birthdate,
        country: country,
        address: address,
        address2: address2,
        postalcode: postalcode,
        city: city,
        marketting: marketting,
        tosCheck: tosCheck,
        rulesCheck: rulesCheck
    }

    function sendData() {
        if (getFunction) {
            getFunction(alldata);
        }
    }

    useEffect(() => {
        sendData();
    }, [alldata])

    const genderoptions = [
        <option disabled selected value={""}>Sélectionnez...</option>,
        <option value={"m"}>Monsieur</option>,
        <option value={"f"}>Madame</option>,
        <option value={"other"}>Autre</option>,
    ]

    const markettingoptions = [
        <option disabled selected value={""}>Sélectionnez...</option>,
        <option value={"bouche à oreille"}>Bouche à oreille</option>,
        <option value={"réseaux sociaux"}>Sur les réseaux sociaux</option>,
        <option value={"news"}>Via un journal</option>,
        <option value={"école"}>Via mon école</option>,
        <option value={"panneau"}>Via un panneau ou un prospectus</option>,
        <option value={"other"}>Autre (précisez)</option>
    ]

    function verify() {

    }

    function goback() {

    }

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>

            <h2>Etape 4 : Vos Informations</h2>
            <div>
                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setLastname}
                    label={"Nom"}></InputSuper>

                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setFirstname}
                    label={"Prénom"}></InputSuper>
            </div>

            <InputSuper type={"select"} options={genderoptions}
                getValueFunc={setGender}
                label={"Civilité :"}></InputSuper>

            <div>Vos réseaux sociaux :</div>
            <InputAdditiveGrouped inputnames={["socialname", "sociallink"]}
                getValuesFunc={setSocials} labels={["Nom du réseau social",
                    "Lien du réseau social"]} addlimit={6}></InputAdditiveGrouped>

            <InputSuper type={"email"} max_string={100}
                getValueFunc={setEmail}
                label={"Email"}></InputSuper>

            <InputSuper type={"tel"} max_string={10}
                getValueFunc={setTel}
                label={"Numéro de téléphone"} numberonly={true}></InputSuper>

            <InputSuper type={"date"}
                getValueFunc={setBirthdate}
                label={"Date de naissance"} max_numdate={new Date().toISOString().split("T")[0]}
            ></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCountry}
                label={"Pays de résidence actuel"}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress}
                label={"Votre adresse"}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress2}
                label={"Votre adresse ligne 2"}></InputSuper>

            <InputSuper type={"text"} max_string={10}
                getValueFunc={setPostalCode}
                label={"Code postal"}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCity} label={"Ville"}></InputSuper>

            <InputSuper type={"select"} options={markettingoptions}
                getValueFunc={setMarketting}
                label={`Comment avez-vous connu le festival MarsAI ?`}
            ></InputSuper>

            {marketting == "other" &&
                <InputSuper type={"text"} max_string={200}
                    getValueFunc={setMarkettingOther}
                    label={"Précisez :"}></InputSuper>}

            <InputSuper type={"checkbox"}
                getValueFunc={setTosCheck}
                label={`J'accepte les conditions d'utilisation.`}
            ></InputSuper>

            <InputSuper type={"checkbox"}
                getValueFunc={setRulesCheck}
                label={`J'accepte le règlement d'envoi de vidéos du festival 
                        MarsAI.`}></InputSuper>

            <button type="button" onClick={goback}>{">"} Précédent</button>
            <button type="button" onClick={verify}>Suivant {">"}</button>

        </div>
    )

}