import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import InputSuper from "../InputSuper";
import { Button } from "../../ui/Button";
import InputAdditiveGrouped from "../InputAdditiveGrouped";

import { verifyAge, verifyInputText, verifyInputDate } from "../VerifyInputFuncs";
import InputRequirementStar from "../InputRequirementStar";

export default function FormDirectorInfo({ hide = false, getFunction,
    currentstep, sendfunc, stepfunc
}) {

    const { t } = useTranslation();

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
    const [job, setJob] = useState("");
    const [fixtel, setFixtel] = useState("");
    const [school, setSchool] = useState("");
    const [language, setLanguage] = useState("");
    const [newsletterCheck, setNewsletterCheck] = useState("");

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
    const [errorJob, setErrorJob] = useState("");
    const [errorFixtel, setErrorFixtel] = useState("");
    const [errorSchool, setErrorSchool] = useState("");
    const [errorLanguage, setErrorLanguage] = useState("");

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
        address2: address2 ? address2 : null,
        postalcode: postalcode,
        city: city,
        marketting: marketting == "other" ? markettingOther : marketting,
        tosCheck: tosCheck,
        rulesCheck: rulesCheck,
        job: job,
        school: school,
        language: language,
        fixtel: fixtel ? fixtel : null,
        newsletterCheck: newsletterCheck
    }

    function sendData() {
        if (sendfunc) {
            sendfunc(alldata);
        }
    }

    const genderoptions = [
        <option disabled selected value={""}>{t("form.select")}</option>,
        <option value={"m"}>{t("form.step4.genderMale")}</option>,
        <option value={"f"}>{t("form.step4.genderFemale")}</option>,
        <option value={"other"}>{t("form.step4.genderOther")}</option>,
    ];

    const markettingoptions = [
        <option disabled selected value={""}>{t("form.select")}</option>,
        <option value={"bouche à oreille"}>{t("form.step4.marketingWordOfMouth")}</option>,
        <option value={"réseaux sociaux"}>{t("form.step4.marketingSocialMedia")}</option>,
        <option value={"news"}>{t("form.step4.marketingNews")}</option>,
        <option value={"école"}>{t("form.step4.marketingSchool")}</option>,
        <option value={"panneau"}>{t("form.step4.marketingPoster")}</option>,
        <option value={"other"}>{t("form.step4.marketingOther")}</option>
    ];

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
        setErrorJob("");
        setErrorSchool("");
        setErrorFixtel("");
        setErrorLanguage("");
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
            verifyInputText({
                value: fixtel, required: false, max_length: 10, regex: numberonly_regex,
                errorSetFunction: setErrorFixtel
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
                value: language, max_length: 100, required: true,
                errorSetFunction: setErrorLanguage
            }),
            verifyInputText({
                value: marketting, required: true,
                errorSetFunction: setErrorMarketting
            }),
            verifyInputText({
                value: job, required: true,
                errorSetFunction: setErrorJob
            }),
            verifyInputText({
                value: school, required: true,
                errorSetFunction: setErrorSchool
            })
        ]

        if (verification.includes(false)) {
            error = true;
        }

        if (!tosCheck) {
            error = true;
            setErrorTosCheck(t("form.step4.errorTos"));
        }

        if (!rulesCheck) {
            error = true;
            setErrorRulesCheck(t("form.step4.errorRules"))
        }

        if (!verifyAge(birthdate)) {
            error = true;
            if (!errorBirthdate) {
                setErrorBirthdate(t("form.step4.errorAge"))
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
        <div style={hide ? { display: "none" } : null} className="flex flex-col gap-4">

            <h2 className="text-2xl font-bold">{t("form.step4.title")}</h2>
            <div>
                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setLastname}
                    label={t("form.step4.lastName")} errormessage={errorLastname}
                    required={true}></InputSuper>

                <InputSuper type={"text"} max_string={100}
                    getValueFunc={setFirstname} required={true}
                    label={t("form.step4.firstName")} errormessage={errorFirstname}></InputSuper>
            </div>

            <InputSuper type={"select"} options={genderoptions}
                getValueFunc={setGender} required={true}
                label={t("form.step4.gender")} errormessage={errorGender}></InputSuper>

            <div>
                <div className="float-left">{t("form.step4.socials")}</div>
                <InputRequirementStar></InputRequirementStar>
            </div>

            <InputAdditiveGrouped inputnames={["socialname", "sociallink"]}
                getValuesFunc={setSocials} labels={[t("form.step4.socialName"),
                t("form.step4.socialLink")]} addlimit={6}></InputAdditiveGrouped>

            <InputSuper type={"email"} max_string={100}
                getValueFunc={setEmail} required={true}
                label={t("form.step4.email")} errormessage={errorEmail}></InputSuper>

            <InputSuper type={"tel"} max_string={10}
                getValueFunc={setTel} required={true}
                label={t("form.step4.phone")} numberonly={true}
                errormessage={errorTel}></InputSuper>

            <InputSuper type={"tel"} max_string={10}
                getValueFunc={setFixtel}
                label={t("form.step4.phonefix")} numberonly={true}
                errormessage={errorFixtel}></InputSuper>

            <InputSuper type={"date"} required={true}
                getValueFunc={setBirthdate}
                label={t("form.step4.birthdate")} max_numdate={new Date().toISOString().split("T")[0]}
                errormessage={errorBirthdate}
            ></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setCountry} required={true}
                label={t("form.step4.country")}
                errormessage={errorCountry}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setLanguage} required={true}
                label={t("form.step4.directorlanguage")}
                errormessage={errorLanguage}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress} required={true}
                label={t("form.step4.address")} errormessage={errorAddress}></InputSuper>

            <InputSuper type={"text"} max_string={100}
                getValueFunc={setAddress2}
                label={t("form.step4.address2")}
                errormessage={errorAddress2}></InputSuper>

            <InputSuper type={"text"} max_string={10}
                getValueFunc={setPostalCode} required={true}
                label={t("form.step4.postalCode")} errormessage={errorPostalcode}></InputSuper>

            <InputSuper type={"text"} max_string={100} required={true}
                getValueFunc={setCity} label={t("form.step4.city")}></InputSuper>
            {errorCity && <div>{errorCity}</div>}

            <InputSuper type={"select"} options={markettingoptions}
                getValueFunc={setMarketting} required={true}
                label={t("form.step4.marketingLabel")}
                errormessage={errorMarketting}
            ></InputSuper>

            {marketting == "other" &&
                <InputSuper type={"text"} max_string={200}
                    getValueFunc={setMarkettingOther}
                    label={t("form.step4.specifyLabel")}
                    errormessage={markettingOther}></InputSuper>}

            <InputSuper type={"text"} getValueFunc={setSchool}
                label={t("form.step4.school")} required={true}
                errormessage={errorSchool}></InputSuper>

            <InputSuper type={"text"} getValueFunc={setJob}
                label={t("form.step4.job")} required={true}
                errormessage={errorJob}></InputSuper>

            <InputSuper type={"checkbox"}
                getValueFunc={setTosCheck} required={true}
                label={t("form.step4.tosCheck")}
                errormessage={errorTosCheck}
            ></InputSuper>

            <InputSuper type={"checkbox"}
                getValueFunc={setRulesCheck} required={true}
                label={t("form.step4.rulesCheck")} errormessage={errorRulesCheck}></InputSuper>

            <InputSuper type={"checkbox"}
                getValueFunc={setNewsletterCheck}
                label={"Je souhaite m'inscrire à la newsletter de MarsAI festival"}
            ></InputSuper>

            <div className="mt-4 flex w-full items-center justify-center gap-4">
                <Button variant="filled-yellow" interactive type="button" onClick={goback}>{"<"} {t("form.previous")}</Button>
                <Button variant="filled-yellow" interactive type="button" onClick={verify}>{t("form.submit")}</Button>
            </div>

        </div>
    )

}