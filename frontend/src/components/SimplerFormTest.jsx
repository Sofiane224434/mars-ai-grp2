import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function SimplerFormTest() {

    const [results, setResults] = useState({});
    //const [verifyrules, setVerifyrules] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);
    const [correspondance, setCorrespondance] = useState([])

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(null);

    function checkRegex({ value, regex }) {
        return regex.test(value);
    }

    function checklenght({ min, max, value }) {
        if (value.length < min || value.length > max) {
            return false;
        }
        return true;
    }

    function checkEmpty({ value }) {
        if (value == "") {
            return true;
        }
        if (!value || value != false) {
            return true;
        }
        return false;
    }

    function checkVideo({ file }) {
        //check if >size
        //check if .mp4, .mov
        //check if 16:9? optional?
    }

    function checkImage({ file }) {
        //check width height -> 16/9
        //check size
        //check .png, .jpg
    }

    function verifyValues(arrayofinputs, objwithrules) {
        for (let e in arrayofinputs) {
            let value = results[e];
        }
        //let value = e.target.value;
        if (objwithrules.required) {
            if (checkEmpty({ value: value })) {

            } else {
                //should return something to avoid other checks?
            }
        }
        if (objwithrules.regex) {
            if (!checkRegex({ regex: obj.regex, value: value })) {

            }
        }
    }

    function changeInput(e) {
        let ischeck = e.target.type === "checkbox" ? true : false;
        let inpname = e.target.name;
        let value;
        if (ischeck) {
            value = e.target.checked;
        } else if (e.target.type === "file") {
            return;
        } else {
            value = e.target.value;
        }
        //replace with results
        let newres = JSON.parse(JSON.stringify(results));
        newres[inpname] = value;
        //set results
        setResults(newres);
        //console.log(results);
    }

    function addToGroup(groupname) {
        if (!results[groupname]) {
            setResults(values => ({ ...values, [groupname]: { 0: "", 1: "" } }));
        } else {
            const valname = Object.keys(results[groupname]).length;
            let newres = JSON.parse(JSON.stringify(results));
            console.log("newres:", newres);
            newres[groupname][valname] = "";
            setResults(newres);
        }

    }

    function deleteFromResults(name, isgroup = false, groupname = null) {
        const newResults = { ...results };
        if (isgroup) {
            delete newResults[groupname][name];
        } else {
            delete newResults[name];
        }
        setResults(newResults);
    }

    function getvalue(e) {
        // console.log(e);
        // let targetname = e.target.name;
        // console.log(targetname);
        return "abc";
    }

    // const myinp = <input type="text" name="movies!!!" value={""}></input>
    // console.log(myinp);

    const myinputs = [
        <input type="text" name="movietitle"
            value={results["movietitle"] || ""}></input>,
        <input type="text" name="movietitletranslated"
            value={results["movietitletranslated"] || ""}></input>,
        <textarea name="synopsis" value={results["synopsis"] || ""}></textarea>,
        <input type="text" name="movielanguage"
            value={results["movielanguage"] || ""}></input>,
        <input type="file" name="videofile"></input>,
        <input name="soundbankcheck" type="checkbox"
            checked={results["soundbankcheck"] || false}></input>,
        <input type="url" name="youtubelink"
            value={results["youtubelink"] || ""}></input>,

        <input name="aiscenariocheck" type="checkbox"
            checked={results["aiscenariocheck"] || false}></input>,
        <input name="aivideocheck" type="checkbox"
            checked={results["aivideocheck"] || false}></input>,
        <input name="aipostprodcheck" type="checkbox"
            checked={results["aipostprodcheck"] || false}></input>,
        <select name="classification" value={results["classification"] || ""}>
            <option value={""}>...</option>
            <option value={"allai"}>Génération intégrale (100% IA)</option>
            <option value={"hybrid"}>Production hybride (Prises de vues réelles +
                apports IA)
            </option>
        </select>,
        <textarea name="prompts" value={results["prompts"] || ""}></textarea>,

        <input type="file" name="movieimage"></input>,
        <input type="file" name="moviescreenshots"></input>,
        <input type="checkbox" name="dialoguecheck"
            checked={results["dialoguecheck"] || false}></input>,

        <input type="text" name="lastname" value={results["lastname"] || ""}></input>,
        <input type="text" name="firstname" value={results["firstname"] || ""}></input>,
        <select name="gender" value={results["gender"] || ""}>
            <option value={""}>...</option>
            <option value={"m"}>Monsieur</option>
            <option value={"f"}>Madame</option>
            <option value={"other"}>Autre</option>
        </select>,
        <input name="socialname1" type="text" value={results["socialname1"] || ""}></input>,
        <input name="sociallink1" type="url" value={results["sociallink1"] || ""}></input>,
        <input name="email" type="email" value={results["email"] || ""}></input>,
        <input name="tel" type="tel" value={results["tel"] || ""}></input>,
        <input name="birthdate" type="date" value={results["birthdate"] || ""}></input>,
        <input name="country" type="text" value={results["country"] || ""}></input>,
        <input name="address" type="text" value={results["address"] || ""}></input>,
        <input name="address2" type="text" value={results["address2"] || ""}></input>,
        <input name="zipcode" type="text" value={results["zipcode"] || ""}></input>,
        <input name="city" type="text" value={results["city"] || ""}></input>,
        <select name="marketting" value={results["marketting"] || ""}>
            <option value={""}>...</option>
            <option value={"bouche à oreille"}>Bouche à oreille</option>
            <option value={"réseaux sociaux"}>Sur les réseaux sociaux</option>
            <option value={"autre"}>Autre (précisez)</option>
        </select>,
        <input type="checkbox" name="toscheck" checked={results["toscheck"] || false}></input>,
        <input type="checkbox" name="rulescheck" checked={results["rulescheck"] || false}></input>
    ];

    //build results
    useEffect(() => {
        let newres = {};
        for (let i in myinputs) {
            let getname = myinputs[i].props.name;
            newres[getname] = "";
        };
        //console.log(newres)
        setResults(newres);
    }, [])


    // for (let a in myinputs) {
    //     console.log(myinputs[a]);
    // }
    function getinputfromarray(inputname) {
        for (let a in myinputs) {
            //console.log(myinputs[a]);
            if (myinputs[a].props.name === inputname) {
                return myinputs[a];
            }
        }
    }
    //console.log(getinputfromarray("movietitle"))

    //form verifications functions
    function textVerify({
        value,
        regex = null,
        maxlen = null,
        minlen = null,
        required = false
    }) {
        let trackobj = {
            regex_err: false,
            maxlen_err: false,
            minlen_err: false,
            required_err: false,
        }
        if (required) {
            if (["", null, undefined].includes(value)) {
                trackobj.required_err = true;
                return trackobj;
            }
        } else {
            if (["", null, undefined].includes(value)) {
                return trackobj;
            }
        }
        if (regex) {
            if (!regex.test(value)) {
                trackobj.regex_err = true;
            }
        }
        if (maxlen) {
            if (value.length > maxlen) {
                trackobj.maxlen_err = true;
            }
        }
        if (minlen) {
            if (value.length < minlen) {
                trackobj.minlen_err = true;
            }
        }
        return trackobj;
    }

    function verifyNumber(
        {
            value,
            min = null,
            max = null,
            required = false
        }
    ) {
        let trackobj = {
            required_err: null,
            min_err: null,
            max_err: null
        };

        if (required) {
            if (["", null, undefined].includes(value)) {
                trackobj.required_err = "empty";
            }
        }
    }

    function verifyForm() {
        switch (currentStep) {
            case 1:
                /**
                 * Need to check:
                 * movietitle
                 * movietitletranslated
                 * synopsis
                 * movielanguage
                 * videofile
                 * soundbankcheck
                 * NOTE: if checked, look for additive inputs
                 * youtubelink
                 */
                return;
            case 2:
                /**
                 * aiscenariocheck
                 * aivideocheck
                 * aipostprodcheck
                 * NOTE: at least one of the 3 have to be checked
                 * NOTE: Must then check the additional inputs
                 * classification
                 * prompts
                 */
                return;
            case 3:
                /**
                 * movieimage
                 * moviescreenshots
                 * dialoguecheck
                 * NOTE : if checked look for srt input
                 */
                return;
            case 4:
                /**
                 * lastname
                 * firstname
                 * gender
                 * socials (socialname & sociallink) look for additives
                 * email
                 * tel
                 * birthdate
                 * country
                 * address
                 * address2
                 * zipcode
                 * country
                 * marketting
                 * toscheck
                 * rulescheck
                 */
                return;
        }
    }

    //form setup
    const myforms = [
        [
            <form onChange={changeInput}>
                <h2>Etape 1 : Fiche film</h2>
                <div>
                    <div>Titre original du film</div>
                    {getinputfromarray("movietitle")}
                </div>

                <div>
                    <div>Titre du film traduit en français</div>
                    {getinputfromarray("movietitletranslated")}
                </div>

                <div>
                    <div>Synopsis</div>
                    {getinputfromarray("synopsis")}
                </div>

                <div>
                    <div>Langue du film</div>
                    {getinputfromarray("movielanguage")}
                </div>

                <div>
                    <div>Fichier vidéo (.mp4 ou .mov)</div>
                    {getinputfromarray("videofile")}
                </div>

                <div>
                    <div>Ce film contient de la musique et/ou une banque de sons</div>
                    {getinputfromarray("soundbankcheck")}
                </div>

                {/* Additive conditional additive input here */}

                <div>
                    <div>Lien de votre film sur Youtube</div>
                    {getinputfromarray("youtubelink")}
                </div>

            </form>
        ],
        [
            <form onChange={changeInput}>
                <h2>Etape 2 : Déclaration d'usage de l'IA</h2>

                <div>
                    <div>Ce film utilise l'IA pour...</div>
                    <div>
                        {getinputfromarray("aiscenariocheck")}
                        <div>La génération du scénario</div>
                    </div>
                    {/* Insert additive here on conditional for each one (must be select) */}
                    <div>
                        {getinputfromarray("aivideocheck")}
                        <div>La génération de la vidéo</div>
                    </div>

                    <div>
                        {getinputfromarray("aipostprodcheck")}
                        <div>La post production (editing, etc...)</div>
                    </div>
                </div>

                <div>
                    <div>Classification de l'oeuvre</div>
                    {getinputfromarray("classification")}
                </div>

                <div>
                    <div>Notes de productions (vos prompts)</div>
                    {getinputfromarray("prompts")}
                </div>

            </form>
        ],
        [
            <form onChange={changeInput}>
                <h2>Etape 3 : Multimédia et accessibilité</h2>

                <div>
                    <div>Votre vignette (image représentant votre vidéo)</div>
                    {getinputfromarray("movieimage")}
                </div>

                <div>
                    <div>Captures d'écran de votre film</div>
                    {getinputfromarray("moviescreenshots")}
                    {/* Check how to add possibility for multiple
                    uploads */}
                </div>

                <div>
                    {getinputfromarray("dialoguecheck")}
                    <div>Ce film contient des dialogues ou des textes nécessitants
                        des sous-titres
                    </div>
                    {/* Insert conditional upload of srt file here */}
                    {results["dialoguecheck"] == true &&
                        <div>
                            <div>Veuillez déposer un fichier sous-titres (.srt)</div>
                            <input type="file" name="srtfile"></input>
                        </div>

                    }
                </div>

            </form>
        ],
        [
            <form onChange={changeInput}>
                <h2>Etape 4 : vos informations</h2>
                <div>
                    <div>
                        <div>Nom</div>
                        {getinputfromarray("lastname")}
                    </div>

                    <div>
                        <div>Prénom</div>
                        {getinputfromarray("firstname")}
                    </div>
                </div>

                <div>
                    <div>Civilité</div>
                    {getinputfromarray("gender")}
                </div>

                <div>
                    <div>Vos réseaux sociaux</div>

                    <div>
                        <div>Réseau 1</div>
                        <div>
                            <div>Nom du réseau</div>
                            {getinputfromarray("socialname1")}
                        </div>

                        <div>
                            <div>Lien vers le réseau</div>
                            {getinputfromarray("sociallink1")}
                        </div>
                    </div>

                    {/* Additive here */}

                    <button type="button">(+) Ajouter un réseau</button>
                </div>

                <div>
                    <div>Email</div>
                    {getinputfromarray("email")}
                </div>

                <div>
                    <div>Numéro de téléphone</div>
                    {getinputfromarray("tel")}
                </div>

                <div>
                    <div>Date de naissance</div>
                    {getinputfromarray("birthdate")}
                </div>

                <div>
                    <div>Pays</div>
                    {getinputfromarray("country")}
                </div>

                <div>
                    <div>Adresse</div>
                    {getinputfromarray("address")}
                </div>

                <div>
                    <div>Complément d'adresse</div>
                    {getinputfromarray("address2")}
                </div>

                <div>
                    <div>
                        <div>Code postal</div>
                        {/* Note: this should accept only numbers */}
                        {getinputfromarray("zipcode")}
                    </div>

                    <div>
                        <div>Ville</div>
                        {getinputfromarray("city")}
                    </div>
                </div>

                <div>
                    <div>Comment avez-vous connu MarsAi ?</div>
                    {getinputfromarray("marketting")}
                    {/* insert input on selecting "other" */}
                </div>

                <div>
                    {getinputfromarray("toscheck")}
                    <div>J'ai lu et j'accepte les conditions d'envoi vidéo</div>
                </div>

                <div>
                    {getinputfromarray("rulescheck")}
                    <div>J'ai lu et j'accepte le règlement du festival MarsAi</div>
                </div>

            </form>
        ]
    ];

    //set maxstep

    useEffect(() => {
        setMaxStep(myforms.length);
    }, [])

    //form functions

    function generateForms(step) {
        return (myforms[step - 1])
    }

    //button functions

    function goback() {
        setCurrentStep(currentStep - 1);
    }

    function gonext() {
        setCurrentStep(currentStep + 1);
    }

    function handleSubmit() {
        console.log("Your submit is ready!");
        console.log(results);
    }

    function generateBtns() {
        const nextbtn = <button onClick={gonext}>NEXT</button>;
        const prevbtn = <button onClick={goback}>PREVIOUS</button>;
        const submitbtn = <button onClick={handleSubmit}>SUBMIT</button>;

        if (currentStep == 1) {
            return (
                <div>
                    {nextbtn}
                </div>
            )
        }
        if (currentStep > 1 && currentStep < maxStep) {
            return (
                <div>
                    {prevbtn}
                    {nextbtn}
                </div>
            )
        }
        if (currentStep == maxStep) {
            return (
                <div>
                    {prevbtn}
                    {submitbtn}
                </div>
            )
        }
    }

    return (
        <>
            <StepsTrack step={currentStep} maxstep={maxStep} />
            {generateForms(currentStep)}
            {generateBtns()}
        </>
    )
}