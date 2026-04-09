import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";
import InputAdditiveGrouped from "../InputAdditiveGrouped";

export default function FormDirectorInfo({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label",
    currentstep, stepfunc
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

    const [errorFirstname, setErrorFirstname] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorGender, setErrorGender] = useState("");
    const [errorSocials, setErrorSocials] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorTel, setErrorTel] = useState("");
    const [errorBirthdate, setErrorBirthdate] = useState("");
    const [errorCountry, setErrorCountry] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [errorAddress2, setErrorAddress2] = useState("");
    const [errorPostalcode, setErrorPostalCode] = useState("");
    const [errorCity, setErrorCity] = useState("");
    const [errorMarketting, setErrorMarketting] = useState("");
    const [errorMarkettingOther, setErrorMarkettingOther] = useState("");
    const [errorTosCheck, setErrorTosCheck] = useState("");
    const [errorRulesCheck, setErrorRulesCheck] = useState("");

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
        stepfunc(currentstep - 1)
    }

    return (
        <div style={hide ? { display: "none" } : null} className={classContainer}>

            <h2>Etape 4 : Vos Informations</h2>
            <div>
                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setLastname}
                    label={"Nom"}></InputSuper>
                {errorLastname && <div>{errorLastname}</div>}

                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setFirstname}
                    label={"Prénom"}></InputSuper>
                {errorFirstname && <div>{errorFirstname}</div>}
            </div>

            <InputSuper type={"select"} options={genderoptions}
                getValueFunc={setGender}
                label={"Civilité :"}></InputSuper>
            {errorGender && <div>{errorGender}</div>}

            <div>Vos réseaux sociaux :</div>
            <InputAdditiveGrouped inputnames={["socialname", "sociallink"]}
                getValuesFunc={setSocials} labels={["Nom du réseau social",
                    "Lien du réseau social"]} addlimit={6}></InputAdditiveGrouped>

            <InputSuper type={"email"} max_string={100}
                getValueFunc={setEmail}
                label={"Email"}></InputSuper>
            {errorEmail && <div>{errorEmail}</div>}

            <InputSuper type={"tel"} max_string={10}
                getValueFunc={setTel}
                label={"Numéro de téléphone"} numberonly={true}></InputSuper>
            {errorTel && <div>{errorTel}</div>}

            <InputSuper type={"date"}
                getValueFunc={setBirthdate}
                label={"Date de naissance"} max_numdate={new Date().toISOString().split("T")[0]}
            ></InputSuper>
            {errorBirthdate && <div>{errorBirthdate}</div>}

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCountry}
                label={"Pays de résidence actuel"}></InputSuper>
            {errorCountry && <div>{errorCountry}</div>}

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress}
                label={"Votre adresse"}></InputSuper>
            {errorAddress && <div>{errorAddress}</div>}

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress2}
                label={"Votre adresse ligne 2"}></InputSuper>
            {errorAddress2 && <div>{errorAddress2}</div>}

            <InputSuper type={"text"} max_string={10}
                getValueFunc={setPostalCode}
                label={"Code postal"}></InputSuper>
            {errorPostalcode && <div>{errorPostalcode}</div>}

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCity} label={"Ville"}></InputSuper>
            {errorCity && <div>{errorCity}</div>}

            <InputSuper type={"select"} options={markettingoptions}
                getValueFunc={setMarketting}
                label={`Comment avez-vous connu le festival MarsAI ?`}
            ></InputSuper>
            {errorMarketting && <div>{errorMarketting}</div>}

            {marketting == "other" &&
                <InputSuper type={"text"} max_string={200}
                    getValueFunc={setMarkettingOther}
                    label={"Précisez :"}></InputSuper>}

            <InputSuper type={"checkbox"}
                getValueFunc={setTosCheck}
                label={`J'accepte les conditions d'utilisation.`}
            ></InputSuper>
            {errorTosCheck && <div>{errorTosCheck}</div>}

            <InputSuper type={"checkbox"}
                getValueFunc={setRulesCheck}
                label={`J'accepte le règlement d'envoi de vidéos du festival 
                        MarsAI.`}></InputSuper>
            {errorRulesCheck && <div>{errorRulesCheck}</div>}

            <button type="button" onClick={goback}>{">"} Précédent</button>
            <button type="button" onClick={verify}>ENVOYER</button>

        </div>
    )

}