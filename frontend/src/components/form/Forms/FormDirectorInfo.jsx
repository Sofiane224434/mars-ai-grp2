import { useState, useEffect } from "react";

import InputSuper from "../InputSuper";
import InputAdditiveGrouped from "../InputAdditiveGrouped";

import { verifyAge, verifyInputText, verifyInputDate } from "../VerifyInputFuncs";

export default function FormDirectorInfo({ hide = false, getFunction,
    classInput = "form_input", classContainer = null, classLabel = "form_label",
    currentstep, sendfunc
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
        if (sendfunc) {
            sendfunc(alldata);
        }
    }

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

    function clearAllErrors() {
        setErrorFirstname("");
        setErrorLastname("");
        setErrorGender("");
        setErrorSocials("");
        setErrorEmail("");
        setErrorTel("");
        setErrorBirthdate("");
        setErrorCountry("");
        setErrorAddress("");
        setErrorAddress2("");
        setErrorPostalCode("");
        setErrorCity("");
        setErrorMarketting("");
        setErrorMarkettingOther("");
        setErrorTosCheck("");
        setErrorRulesCheck("");
    }

    function verify() {

        clearAllErrors();

        const numberonly_regex = /^\d+$/;

        let error = false;

        let verification = [
            verifyInputText({
                value: lastname, required: true, max_length: 100,
                errorSetFunction: setErrorLastname
            }),
            verifyInputText({
                value: firstname, required: true, max_length: 100,
                errorSetFunction: setErrorFirstname
            }),
            verifyInputText({
                value: gender, required: true,
                errorSetFunction: setErrorGender
            }),
            verifyInputText({
                value: email, required: true, zodschema: "email", max_length: 100,
                errorSetFunction: setErrorEmail
            }),
            verifyInputText({
                value: tel, required: true, max_length: 10, regex: numberonly_regex,
                errorSetFunction: setErrorTel
            }),
            verifyInputDate({
                value: birthdate, max_date: new Date(Date.now()),
                required: true, errorSetFunction: setErrorBirthdate
            }),
            verifyInputText({
                value: country, max_length: 100,
                required: true, errorSetFunction: setErrorCountry
            }),
            verifyInputText({
                value: address, max_length: 100, required: true,
                errorSetFunction: setErrorAddress
            }),
            verifyInputText({
                value: address2, max_length: 100,
                errorSetFunction: setErrorAddress2
            }),
            verifyInputText({
                value: postalcode, max_length: 10, required: true,
                errorSetFunction: setErrorPostalCode
            }),
            verifyInputText({
                value: city, max_length: 100, required: true,
                errorSetFunction: setErrorCity
            }),
            verifyInputText({
                value: marketting, required: true,
                errorSetFunction: setErrorMarketting
            })
        ]

        if (verification.includes(false)) {
            error = true;
        }

        if (!tosCheck) {
            error = true;
            setErrorTosCheck("Vous devez accepter les conditions d'utilisation.");
        }

        if (!rulesCheck) {
            error = true;
            setErrorRulesCheck(`Vous devez accepter le réglement du festival.`)
        }

        if (!verifyAge(birthdate)) {
            error = true;
            if (!errorBirthdate) {
                setErrorBirthdate(`Vous devez avoir au moins 18 ans pour pouvoir 
                    participer.`)
            }
        }

        // console.log(socials);
        // if (socials.length = 0) {
        //     console.log("something bad happening here")
        //     error = true;
        //     setErrorSocials(`Vous devez renseigner au moins un réseau social.`)
        // }

        console.log("has error?", error);
        if (!error) {
            //Replace by the function to send data to backend
            if (sendfunc) {
                sendData();
                //stepfunc(currentstep + 1);
            }
        }

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
                    label={"Nom"} errormessage={errorLastname}></InputSuper>

                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setFirstname}
                    label={"Prénom"} errormessage={errorFirstname}></InputSuper>
            </div>

            <InputSuper type={"select"} options={genderoptions}
                getValueFunc={setGender}
                label={"Civilité :"} errormessage={errorGender}></InputSuper>

            <div>Vos réseaux sociaux :</div>
            <InputAdditiveGrouped inputnames={["socialname", "sociallink"]}
                getValuesFunc={setSocials} labels={["Nom du réseau social",
                    "Lien du réseau social"]} addlimit={6}></InputAdditiveGrouped>

            <InputSuper type={"email"} max_string={100}
                getValueFunc={setEmail}
                label={"Email"} errormessage={errorEmail}></InputSuper>

            <InputSuper type={"tel"} max_string={10}
                getValueFunc={setTel}
                label={"Numéro de téléphone"} numberonly={true}
                errormessage={errorTel}></InputSuper>

            <InputSuper type={"date"}
                getValueFunc={setBirthdate}
                label={"Date de naissance"} max_numdate={new Date().toISOString().split("T")[0]}
                errormessage={errorBirthdate}
            ></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCountry}
                label={"Pays de résidence actuel"}
                errormessage={errorCountry}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress}
                label={"Votre adresse"} errormessage={errorAddress}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress2}
                label={"Votre adresse ligne 2"}
                errormessage={errorAddress2}></InputSuper>

            <InputSuper type={"text"} max_string={10}
                getValueFunc={setPostalCode}
                label={"Code postal"} errormessage={errorPostalcode}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCity} label={"Ville"}></InputSuper>
            {errorCity && <div>{errorCity}</div>}

            <InputSuper type={"select"} options={markettingoptions}
                getValueFunc={setMarketting}
                label={`Comment avez-vous connu le festival MarsAI ?`}
                errormessage={errorMarketting}
            ></InputSuper>

            {marketting == "other" &&
                <InputSuper type={"text"} max_string={200}
                    getValueFunc={setMarkettingOther}
                    label={"Précisez :"} errormessage={markettingOther}></InputSuper>}

            <InputSuper type={"checkbox"}
                getValueFunc={setTosCheck}
                label={`J'accepte les conditions d'utilisation.`}
                errormessage={errorTosCheck}
            ></InputSuper>

            <InputSuper type={"checkbox"}
                getValueFunc={setRulesCheck}
                label={`J'accepte le règlement d'envoi de vidéos du festival 
                        MarsAI.`} errormessage={errorRulesCheck}></InputSuper>

            <button type="button" onClick={goback}>{">"} Précédent</button>
            <button type="button" onClick={verify}>ENVOYER</button>

        </div>
    )

}