import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function SimplerFormTest() {

    const [results, setResults] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);

    const [correspondance, setCorrespondance] = useState([])

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(null);

    function getNested(obj, ...args) {
        let res = args.reduce((obj, level) => obj && obj[level], obj);
        //console.log(res);
        if (res == undefined) {
            return ("");
        } else {
            return res;
        }
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

        //copy result
        let newres = JSON.parse(JSON.stringify(results));

        if (e.target.ariaLabel) {
            if (newres[e.target.ariaLabel]) {
                newres[e.target.ariaLabel][inpname] = value;
            } else {
                newres[e.target.ariaLabel] = { [inpname]: value };
            }
        } else {
            newres[inpname] = value;
        }

        //set results
        setResults(newres);
        console.log(results);
    }

    function addToGroup(groupname) {
        if (!results[groupname]) {
            setResults(values => ({ ...values, [groupname]: { 0: "", 1: "" } }));
        } else {
            const valname = Object.keys(results[groupname]).length;
            let newres = JSON.parse(JSON.stringify(results));
            newres[groupname][valname] = "";
            setResults(newres);
        }

    }

    //debug
    useEffect(() => {
        console.log(results);
    }, [results])

    function deleteFromResults(name, isgroup = false, groupname = null) {
        const newResults = { ...results };
        if (isgroup) {
            delete newResults[groupname][name];
        } else {
            delete newResults[name];
        }
        setResults(newResults);
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
        setErrorMessages(newres);
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

    function geterrormessage(inputname) {
        let messages = errorMessages[inputname];
        if (messages) {
            return (<div>{errorMessages[inputname]}</div>);
        }
        return;
    }

    function clearerror(errorname) {
        let newerr = { ...errorMessages };
        newerr[errorname] = "";
        setErrorMessages(newerr);
    }

    function clearAllerrors() {
        let newerr = { ...errorMessages };
        for (let a in newerr) {
            newerr[a] = "";
        }
        setErrorMessages(newerr);
    }

    function editErrorMessages(errorkey, newvalue) {
        let newerr = { ...errorMessages };
        newerr[errorkey] = newvalue;
        setErrorMessages(newerr);
    }

    //form verifications functions

    /**
     * Vérifie un texte selon certains critères et set des messages d'erreurs si erreur
     * @param {*} keyname Le nom de la clé de valeur à vérifier (ex: "movietitle")
     * @param regex Si existe, le regex à vérifier 
     * @param maxlen La longueur maximale du texte si existe
     * @param minlen La longueur minimum du text si existe
     * @param required Si true, lance une erreur si le texte est vide
     * @returns {boolean} Si le texte passe ou non la vérification (true si tout est ok,
     * false si erreur)
     */
    function checkText({
        keyname,
        regex = null,
        maxlen = null,
        minlen = null,
        required = false
    }) {
        let value = results[keyname];
        // let trackobj = {
        //     regex_err: false,
        //     maxlen_err: false,
        //     minlen_err: false,
        //     required_err: false,
        // }

        let messages = {
            required: "Veuillez remplir ce champ.",
            maxlen: "Texte trop long, doit être moins de " + maxlen + " caractères.",
            minlen: "Texte trop court, doit avoir plus de " + minlen + " caractères.",
            regex: {
                name: {
                    message: "Erreur : ne doit contenir que des lettres, tirets, espaces ou chiffres.",
                    includes: ["firstname, lastname, language, movielanguage, country"]
                },
                email: {
                    message: "Erreur : doit suivre un modèle email (exemple@email.com).",
                    includes: ["email"]
                },
                youtube: {
                    message: "Erreur: doit être une url youtube.",
                    includes: ["youtubelink"]
                },
                url: {
                    message: "Erreur : doit être une url.",
                    includes: ["sociallink"]
                },
                numbers: {
                    message: "Erreur : ne doit contenir que des chiffres.",
                    includes: ["tel", "zipcode"]
                },
                default: "Erreur, texte incorrecte."
            }
        }

        if (required) {
            if (["", null, undefined].includes(value)) {
                editErrorMessages(keyname, messages.required)
                return false;
            }
        } else {
            if (["", null, undefined].includes(value)) {
                return true;
            }
        }
        if (regex) {
            if (!regex.test(value)) {
                let applied_message = false;
                for (let m in messages.regex) {
                    if (m !== "default") {
                        if (messages.regex[m].includes.includes(keyname)) {
                            editErrorMessages(keyname, messages.regex[m].message);
                            applied_message = true;
                        }
                        //console.log(m);
                    }
                }
                if (!applied_message) {
                    editErrorMessages(keyname, messages.regex.default);
                }
                return false;
            }
        }
        if (maxlen) {
            if (value.length > maxlen) {
                return false;
            }
        }
        if (minlen) {
            if (value.length < minlen) {
                return false;
            }
        }
        return true;
    }

    function checkNumber(
        {
            keyname,
            min = null,
            max = null,
            required = false
        }
    ) {

        let value = results[keyname];

        let trackobj = {
            required_err: false,
            min_err: false,
            max_err: false
        };

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
        if (max) {
            if (value > max) {
                trackobj.max_err = true;
            }
        }
        if (min) {
            if (value < min) {
                trackobj.min_err = true;
            }
        }
        return trackobj;
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
                clearAllerrors()
                let myverifications = [
                    checkText({ keyname: "movietitle", maxlen: 255, required: true }),
                    checkText({ keyname: "movietitletranslated", maxlen: 255, required: true }),
                    checkText({ keyname: "synopsis", maxlen: 500, required: true }),
                    checkText({ keyname: "movielanguage", maxlen: 100, required: true }),
                    checkText({ keyname: "youtubelink", required: true })
                ]
                //needs file checker ^^^
                if (results["soundbankcheck"]) {
                    //check for the extra inputs
                }
                if (myverifications.includes(false)) {
                    return false;
                } else {
                    return true;
                }
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
                {
                    results["soundbankcheck"] &&
                    <div>
                        <input type="text" name={0} aria-label="soundbank_group"
                            value={getNested(results, "soundbank_group", 0) ?
                                results["soundbank_group"][0] : ""
                            }></input>
                        {results["soundbank_group"] &&
                            Object.keys(results["soundbank_group"]).map(sb => {
                                console.log("sbres", results["soundbank_group"][sb] ?
                                    results["soundbank_group"][sb] : "cannot find"
                                );
                                if (sb > 0) {
                                    return (
                                        <input aria-label="soundbank_group" type="text" name={sb}
                                            value={results["soundbank_group"][sb] ?
                                                results["soundbank_group"][sb] : ""
                                            }
                                        ></input>)
                                }

                            }
                            )}
                        <button onClick={() => addToGroup("soundbank_group")}
                            type="button">(+) Ajouter une musique/banque son</button>
                    </div>
                }

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
        if (verifyForm()) {
            setCurrentStep(currentStep + 1);
        }
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