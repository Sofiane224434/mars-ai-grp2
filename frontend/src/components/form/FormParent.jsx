import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useMovie from "../../hooks/useMovie";

import FormMovieInfo from "./Forms/FormMovieInfo";
import FormAIUse from "./Forms/FormAIUse";
import FormMultimedia from "./Forms/FormMultimedia";
import FormDirectorInfo from "./Forms/FormDirectorInfo";

import StepsTrack from "./StepsTrack";

export default function FormParent() {

    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const formTopRef = useRef(null);

    const { createMovie } = useMovie();
    const [loading, setLoading] = useState(false);

    const [formMovieInfo, setFormMovieInfo] = useState({});
    const [formAIUse, setFormAIUse] = useState({});
    const [formMultimedia, setFormMultimedia] = useState({});
    const [formDirectorInfo, setFormDirectorInfo] = useState({});

    const myforms = [
        <FormMovieInfo key="step-1" hide={currentStep == 1 ? false : true}
            getFunction={setFormMovieInfo} stepfunc={handlestep} currentstep={currentStep}></FormMovieInfo>,
        <FormAIUse key="step-2" hide={currentStep == 2 ? false : true} getFunction={setFormAIUse}
            stepfunc={handlestep} currentstep={currentStep}></FormAIUse>,
        <FormMultimedia key="step-3" hide={currentStep == 3 ? false : true}
            getFunction={setFormMultimedia} stepfunc={handlestep} currentstep={currentStep}></FormMultimedia>,
        <FormDirectorInfo key="step-4" hide={currentStep == 4 ? false : true}
            sendfunc={sendtoback} currentstep={currentStep} stepfunc={handlestep}></FormDirectorInfo>
    ]

    const maxstep = myforms.length;

    let allvalues = [formMovieInfo, formMultimedia, formAIUse, formDirectorInfo];

    function tester() {
        //
    }

    async function sendtoback(lastvalues) {
        // e.preventDefault();
        setLoading(true);

        setFormDirectorInfo(lastvalues);
        console.log("Successfully filled form");
        console.log(formMovieInfo, formMultimedia, formAIUse, lastvalues);
        const directorInfo = lastvalues;

        try {

            //Construction des objets à envoyer dans le back
            //NE PAS OUBLIER de rajouter plus tard "movie_id" dans tous les objets
            //SAUF movies après que "movies" soit envoyé en bdd

            const movies = {
                classification: formAIUse["classification"],
                created_at: "NOW()",
                description: formMovieInfo["description"],
                language: formMovieInfo["movielanguage"],
                movie_duration: formMovieInfo["videolength"],
                prompt: formAIUse["prompts"],
                status: 0,
                subtitles: formMultimedia["srtData"],
                synopsis_english: formMovieInfo["synopsisEng"],
                synopsis_original: formMovieInfo["synopsis"],
                thumbnail: formMultimedia["thumbnail"],
                title_english: formMovieInfo["movietitleeng"],
                title_original: formMovieInfo["movietitle"],
                updated_at: "NOW()",
                videofile: formMovieInfo["movievideo"],
                youtube_url: formMovieInfo["ytlink"],
            };

            //convert to formdata
            let moviesformdata = new FormData();
            for (let key in movies) {
                moviesformdata.append(key, movies[key]);
            }
            console.log(moviesformdata);

            const director_profile = {
                address: directorInfo["address"],
                address2: directorInfo["address2"],
                city: directorInfo["city"],
                country: directorInfo["country"],
                current_job: directorInfo["job"],
                date_of_birth: directorInfo["birthdate"],
                director_language: directorInfo["language"],
                email: directorInfo["email"],
                firstname: directorInfo["firstname"],
                fix_phone: directorInfo["fixtel"],
                gender: directorInfo["gender"],
                lastname: directorInfo["lastname"],
                marketting: directorInfo["marketting"],
                mobile_phone: directorInfo["tel"],
                postal_code: directorInfo["postalcode"],
                school: directorInfo["school"]
            };

            //can be multiple
            let ex_sound_data = { sound: "", type: "" };
            let sound_data = [];

            //Construction de l'objet IAs utilisées
            let ex_used_ai = { ai_name: "", category: "" };

            let used_ai = [];

            if (formAIUse["aiscenarioData"]) {
                for (let n in formAIUse["aiscenarioData"]) {
                    ex_used_ai.ai_name = formAIUse["aiscenarioData"][n];
                    ex_used_ai.category = "script";
                    used_ai.push(ex_used_ai);
                }
            }
            if (formAIUse["aivideoData"]) {
                for (let n in formAIUse["aivideoData"]) {
                    ex_used_ai.ai_name = formAIUse["aivideoData"][n];
                    ex_used_ai.category = "movie";
                    used_ai.push(ex_used_ai);
                }
            }
            if (formAIUse["aipostprodData"]) {
                for (let n in formAIUse["aipostprodData"]) {
                    ex_used_ai.ai_name = formAIUse["aipostprodData"][n];
                    ex_used_ai.category = "postprod";
                    used_ai.push(ex_used_ai);
                }
            }


            //Construction de screenshots
            //NE PAS OUBLIER dans le back, chaque fichier doit être:
            //- Envoyé dans le bucket
            //- Extraire le lien du bucket
            //- Remplacer chaque "link" par le lien du bucket au lieu du fichier du formulaire
            const screenshots = [
                formMultimedia["screenshot1"] && { link: formMultimedia["screenshot1"] },
                formMultimedia["screenshot2"] && { link: formMultimedia["screenshot2"] },
                formMultimedia["screenshot3"] && { link: formMultimedia["screenshot3"] },
            ];

            //Construction de socials
            //NE PAS OUBLIER de rajouter "movie_id" dans le back
            let socialsData = formDirectorInfo["socials"];

            let socials = [];

            for (let n in socialsData) {
                socials.push({
                    social_link: socialsData[n]["sociallink"],
                    social_name: socialsData[n]["socialname"]
                })
            }

            const moviedata = {
                movies: moviesformdata,
                director_profile: director_profile,
                sound_data: sound_data,
                used_ai: used_ai,
                screenshots: screenshots,
                socials: socials
            }

            await createMovie(moviesformdata);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

        //Should redirect to another page confirming form sent
    }

    //debugging
    useEffect(() => {
        console.log("ALL my forms info!");
        console.log(formMovieInfo, formAIUse, formMultimedia, formDirectorInfo);
    }, [currentStep])

    //-------------------------------
    //Gestion des étapes
    //-------------------------------

    function handlestep(stepchange) {
        //console.log("stepchange!", stepchange);
        if (currentStep <= maxstep && currentStep >= 1) {
            if (stepchange) {
                setCurrentStep(stepchange);
                formTopRef.current?.scrollIntoView({ behavior: "smooth" });
            }

        }
    }

    return (
        <div ref={formTopRef} className="flex flex-col items-center gap-6 bg-brun-brule pb-10">
            <div className="w-full bg-linear-to-b from-ocre-rouge to-brun-brule py-6 text-center text-4xl font-bold text-jaune-souffre">{t("form.title")}</div>
            <StepsTrack step={currentStep} maxstep={maxstep}></StepsTrack>
            <form className="flex w-[90%] flex-col items-center gap-5 rounded-[20px] bg-linear-to-t from-gris-anthracite to-noir-bleute p-8 text-jaune-souffre">
                {myforms.map(form => { return form }
                )}
                {/* <FormStepsButtons step={currentStep} maxstep={maxstep}
                    getStepUpdate={handlestep}></FormStepsButtons> */}
            </form>
        </div>
    )
}