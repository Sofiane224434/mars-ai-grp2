import { useState, useEffect } from "react";
import StepsTrack from "./StepsTrack";

export default function SimplerFormTest() {

    const [results, setResults] = useState({});
    //const [verifyrules, setVerifyrules] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);
    const [correspondance, setCorrespondance] = useState([])

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(null);

    //input functions

    // function generateRules(e, obj) {
    //     let formname = e.target.parent.name;

    //     let default_obj = {
    //         regex: null,
    //         length_range: { min: null, max: null },
    //         required: false,

    //     }
    //     let rulename = e.target.name;
    //     if (Object.keys(verifyrules).length === 0) {
    //         // setVerifyrules([{ [formname]: [{ [rulename]: obj }] }]);
    //         setVerifyrules({ [formname]: { [rulename]: obj } });
    //     } else {
    //         let newverif = JSON.parse(JSON.stringify(verifyrules));
    //         newverif[formname].push({ [rulename]: obj });
    //         setVerifyrules(newverif);
    //     }
    // }

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

    function handleChange(e, isgroup = false, groupname = null) {
        const target = e.target;
        let value;
        if (target.type === "checkbox") {
            value = target.checked;
        } else if (target.type === "file") {
            console.log(target);
            value = target.files[0];

            //for getting width and height modify later for video format
            let reader = new FileReader();
            reader.onload = function (event) {
                let image = new Image();
                image.src = event.target.result;

                image.onload = function () {
                    console.log(this);
                }
            };

            reader.readAsDataURL(value);
        } else {
            value = target.value;
        }
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (isgroup) {
            if (results[groupname]) {
                let newres = JSON.parse(JSON.stringify(results));
                newres[groupname][name] = value;
                setResults(newres);
                //console.log(results);
            } else {
                let obj = { [name]: value };
                setResults(values => ({ ...values, [groupname]: obj }));
            }
        } else {
            setResults(values => ({ ...values, [name]: value }));
        }
        console.log(results);
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

    //form setup
    const mytrueforms = [
        [
            <form>
                <h2>Etape 1 : Fiche film</h2>
                <div>
                    <div>Titre original du film</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>Titre du film traduit en français</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>Synopsis</div>
                    <textarea></textarea>
                </div>

                <div>
                    <div>Langue du film</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>Fichier vidéo (.mp4 ou .mov)</div>
                    <input type="file"></input>
                </div>

                <div>
                    <div>Ce film contient de la musique et/ou une banque de sons</div>
                    <input type="checkbox"></input>
                </div>

                {/* Additive conditional input here */}

                <div>
                    <div>Lien de votre film sur Youtube</div>
                    <input type="url"></input>
                </div>

            </form>
        ],
        [
            <form>
                <h2>Etape 2 : Déclaration d'usage de l'IA</h2>

                <div>
                    <div>Ce film utilise l'IA pour...</div>
                    <div>
                        <input type="checkbox"></input>
                        <div>La génération du scénario</div>
                    </div>
                    {/* Insert additive here on conditional for each one (must be select) */}
                    <div>
                        <input type="checkbox"></input>
                        <div>La génération de la vidéo</div>
                    </div>

                    <div>
                        <input type="checkbox"></input>
                        <div>La post production (editing, etc...)</div>
                    </div>
                </div>

                <div>
                    <div>Classification de l'oeuvre</div>
                    <select name="classification">
                        <option value={""}>...</option>
                    </select>
                </div>

                <div>
                    <div>Notes de productions (vos prompts)</div>
                    <textarea></textarea>
                </div>

            </form>
        ],
        [
            <form>
                <h2>Etape 3 : Multimédia et accessibilité</h2>

                <div>
                    <div>Votre vignette (image représentant votre vidéo)</div>
                    <input type="file"></input>
                </div>

                <div>
                    <div>Captures d'écran de votre film</div>
                    <input type="file"></input>
                </div>

                <div>
                    <input type="checkbox"></input>
                    <div>Ce film contient des dialogues ou des textes nécessitants
                        des sous-titres
                    </div>
                    {/* Insert conditional upload of srt file here */}
                </div>

            </form>
        ],
        [
            <form>
                <h2>Etape 4 : vos informations</h2>
                <div>
                    <div>
                        <div>Nom</div>
                        <input type="text" name="lastname"></input>
                    </div>

                    <div>
                        <div>Prénom</div>
                        <input type="text" name="firstname"></input>
                    </div>
                </div>

                <div>
                    <div>Civilité</div>
                    <select name="gender">
                        <option value={""}>...</option>
                        <option value={"m"}>Monsieur</option>
                        <option value={"f"}>Madame</option>
                        <option value={"other"}>Autre</option>
                    </select>
                </div>

                <div>
                    <div>Vos réseaux sociaux</div>

                    <div>
                        <div>Réseau 1</div>
                        <div>
                            <div>Nom du réseau</div>
                            <input type="text"></input>
                        </div>

                        <div>
                            <div>Lien vers le réseau</div>
                            <input type="url"></input>
                        </div>
                    </div>

                    {/* Additive here */}

                    <button type="button">(+) Ajouter un réseau</button>
                </div>

                <div>
                    <div>Email</div>
                    <input type="email"></input>
                </div>

                <div>
                    <div>Numéro de téléphone</div>
                    <input type="tel"></input>
                </div>

                <div>
                    <div>Date de naissance</div>
                    <input type="date"></input>
                </div>

                <div>
                    <div>Pays</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>Adresse</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>Complément d'adresse</div>
                    <input type="text"></input>
                </div>

                <div>
                    <div>
                        <div>Code postal</div>
                        {/* Note: this should accept only numbers */}
                        <input type="text"></input>
                    </div>

                    <div>
                        <div>Ville</div>
                        <input type="text"></input>
                    </div>
                </div>

                <div>
                    <div>Comment avez-vous connu MarsAi ?</div>
                    <select name="marketting">
                        <option value={""}>...</option>
                        <option>Bouche à oreille</option>
                        <option>Sur internet</option>
                    </select>
                </div>

                <div>J'ai lu et j'accepte les conditions d'envoi vidéo</div>
                <div>J'ai lu et j'accepte le règlement du festival MarsAi</div>
            </form>
        ]
    ]

    const myforms = [
        [
            <form>
                <div>My first input</div>
                <input type="text" name="inp1" onChange={handleChange}
                    value={results["inp1"] ? results["inp1"] : ""}></input>
                <div>My second input</div>
                <input type="text" name="inp2" onChange={handleChange}
                    value={results["inp2"] ? results["inp2"] : ""}></input>
                <div>Upload video/image file</div>
                <input type="file" name="upload" onChange={handleChange}
                    accept="image/png, image/jpg, video/mp4, video/mov"
                    value={results["upload" ? results["upload"] : ""]}
                    files={results['upload'] ? results["upload"].File : ""}></input>
                <div>Options test</div>
                <select name="optionstest" onChange={handleChange}
                    value={results["optionstest"] ? results["optionstest"] : ""}>
                    <option value={""}></option>
                    <option value={"first"}>First option</option>
                    <option value={"second"}>Second option</option>
                    <option value={"other"}>Other</option>
                </select>
                {results["optionstest"] == "other" &&
                    <div>
                        <div>Which one?</div>
                        <input name="optionresponse" onChange={handleChange}
                            value={results["optionresponse"] ? results["optionresponse"] : ""}></input>
                    </div>
                }
            </form>
        ],
        [
            <form>
                <div>Grouped inputs</div>
                <div>
                    <div>
                        <div>Lastname</div>
                        <input type="text" name="lastname"
                            onChange={handleChange}
                            value={results["lastname"] ? results["lastname"] : ""}></input>
                    </div>
                    <div>
                        <div>Name</div>
                        <input type="text" name="firstname"
                            onChange={handleChange}
                            value={results["firstname"] ? results["firstname"] : ""}></input>
                    </div>
                </div>
            </form>
        ],
        [
            <form>
                {/* group name: colors */}
                <div>Talk about colors? (optional)</div>
                <input type="checkbox" name="checkbox_color"
                    onChange={(e) => handleChange(e, true, "colors")}
                    checked={results["colors"] ?
                        results["colors"]["checkbox_color"] :
                        false}></input>
                {results.colors?.checkbox_color &&
                    <div>
                        <div>Enter fave color</div>
                        <input type="text" name="color" onChange={(e) => handleChange(e, true, "colors")}
                            value={results["colors"]["color"] ?
                                results["colors"]["color"] : ""}></input>
                    </div>
                }
                <div>All your meals; note: additive</div>
                {/* groupname: meals */}
                <div>
                    <input type="text" name={0}
                        onChange={(e) => handleChange(e, true, "meals")}
                        value={results["meals"] ? (results["meals"][0] ?
                            results["meals"][0] : "") : ""
                        }></input>
                    {results.meals && Object.keys(results.meals).map((a, i) => {
                        if (i > 0) {
                            return (
                                <div>
                                    <input type="text" name={i}
                                        onChange={(e) => handleChange(e, true, "meals")}
                                        value={results["meals"] ? (results["meals"][i] ?
                                            results["meals"][i] : "") : ""
                                        }></input>
                                    <button type="button" onClick={() => deleteFromResults(i, true, "meals")}>
                                        (X)</button>
                                </div>
                            )
                        }
                    })}
                    <button type="button" onClick={() => addToGroup("meals")}>ADD</button>
                </div>
            </form>
        ]
    ]

    //set maxstep

    useEffect(() => {
        setMaxStep(myforms.length);
    }, [])

    //form functions

    function generateForms(step) {
        return (myforms[step - 1])
    }

    //form verifications functions

    function verifyForm() {

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