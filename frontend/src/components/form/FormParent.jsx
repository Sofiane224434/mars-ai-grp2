import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMovie from "../../hooks/useMovie";

import FormMovieInfo from "./Forms/FormMovieInfo";
import FormAIUse from "./Forms/FormAIUse";
import FormMultimedia from "./Forms/FormMultimedia";
import FormDirectorInfo from "./Forms/FormDirectorInfo";

import StepsTrack from "./StepsTrack";
import Button from "../ui/Button";

export default function FormParent() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const formTopRef = useRef(null);

  const { createMovie } = useMovie();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);
  //console.log(isSubmissionComplete);
  function onclickSetSubmissionComplete() {
    setIsSubmissionComplete(prev => !prev);
  }

  const [formMovieInfo, setFormMovieInfo] = useState({});
  const [formAIUse, setFormAIUse] = useState({});
  const [formMultimedia, setFormMultimedia] = useState({});

  const buildUsedAiPayload = () => {
    const usedAi = [];

    const appendAiList = (aiList, category) => {
      if (!Array.isArray(aiList)) {
        return;
      }

      for (const aiName of aiList) {
        const normalized = String(aiName || "").trim();
        if (!normalized) {
          continue;
        }

        usedAi.push({
          ai_name: normalized,
          category,
        });
      }
    };

    appendAiList(formAIUse?.aiscenarioData, "script");
    appendAiList(formAIUse?.aivideoData, "movie");
    appendAiList(formAIUse?.aipostprodData, "postprod");

    return usedAi;
  };

  const buildSoundDataPayload = () => {
    if (!formMovieInfo?.soundbankCheck || !Array.isArray(formMovieInfo?.soundbankData)) {
      return [];
    }

    return formMovieInfo.soundbankData
      .map((soundName) => String(soundName || "").trim())
      .filter(Boolean);
  };

  const buildSocialsPayload = (socialsData) => {
    if (!Array.isArray(socialsData)) {
      return [];
    }

    return socialsData
      .map((social) => ({
        social_name: String(social?.socialname || "").trim(),
        social_link: String(social?.sociallink || "").trim(),
      }))
      .filter((social) => social.social_name && social.social_link);
  };

  async function sendtoback(lastvalues) {
    setLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const directorInfo = lastvalues || {};

      const directorProfile = {
        email: String(directorInfo?.email || "").trim(),
        firstname: String(directorInfo?.firstname || "").trim(),
        lastname: String(directorInfo?.lastname || "").trim(),
        address: String(directorInfo?.address || "").trim(),
        address2: String(directorInfo?.address2 || "").trim(),
        postal_code: String(directorInfo?.postalcode || "").trim(),
        city: String(directorInfo?.city || "").trim(),
        country: String(directorInfo?.country || "").trim(),
        marketting: String(directorInfo?.marketting || "inconnu").trim(),
        date_of_birth: String(directorInfo?.birthdate || "").trim(),
        gender: String(directorInfo?.gender || "").trim(),
        fix_phone: String(directorInfo?.fixtel || "").trim(),
        mobile_phone: String(directorInfo?.tel || "").trim(),
        school: String(directorInfo?.school || "").trim(),
        current_job: String(directorInfo?.job || "").trim(),
        director_language: String(directorInfo?.language || "").trim(),
      };

      const usedAi = buildUsedAiPayload();
      const soundData = buildSoundDataPayload();
      const socials = buildSocialsPayload(directorInfo?.socials);

      const screenshotFiles = [
        formMultimedia?.screenshot1?.file,
        formMultimedia?.screenshot2?.file,
        formMultimedia?.screenshot3?.file,
      ].filter(Boolean);

      const formData = new FormData();
      formData.append("title_original", String(formMovieInfo?.movietitle || "").trim());
      formData.append("title_english", String(formMovieInfo?.movietitleeng || "").trim());
      formData.append("description", String(formMovieInfo?.description || "").trim());
      formData.append("synopsis_original", String(formMovieInfo?.synopsis || "").trim());
      formData.append("synopsis_english", String(formMovieInfo?.synopsisEng || "").trim());
      formData.append("language", String(formMovieInfo?.movielanguage || "").trim());
      formData.append("classification", String(formAIUse?.classification || "").trim());
      formData.append("prompt", String(formAIUse?.prompts || "").trim());
      formData.append("movie_duration_seconds", String(formMovieInfo?.videoLength || 0));
      formData.append("youtube_link_input", String(formMovieInfo?.ytlink || "").trim());

      formData.append("director_profile_json", JSON.stringify(directorProfile));
      formData.append("used_ai_json", JSON.stringify(usedAi));
      formData.append("sound_data_json", JSON.stringify(soundData));
      formData.append("socials_json", JSON.stringify(socials));

      if (formMovieInfo?.movievideo) {
        formData.append("video_file", formMovieInfo.movievideo);
      }

      if (formMultimedia?.thumbnail) {
        formData.append("thumbnail_file", formMultimedia.thumbnail);
      }

      if (formMultimedia?.srtCheck && formMultimedia?.srtData) {
        formData.append("subtitles_file", formMultimedia.srtData);
      }

      for (const screenshotFile of screenshotFiles) {
        formData.append("screenshot_files", screenshotFile);
      }

      if (directorInfo.newsletterCheck) {
        let email = directorInfo.email;
        const response = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
      }
      const result = await createMovie(formData);
      setSubmitSuccess(result?.message || "Votre film a ete envoye avec succes.");
      setIsSubmissionComplete(true);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setSubmitError(error?.message || "Une erreur est survenue lors de l'envoi du formulaire.");
    } finally {
      setLoading(false);
    }
  }

  function handlestep(stepchange) {
    if (stepchange && stepchange >= 1 && stepchange <= 4) {
      setCurrentStep(stepchange);
      formTopRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const myforms = [
    <FormMovieInfo
      key="step-1"
      hide={currentStep !== 1}
      getFunction={setFormMovieInfo}
      stepfunc={handlestep}
      currentstep={currentStep}
    />,
    <FormAIUse
      key="step-2"
      hide={currentStep !== 2}
      getFunction={setFormAIUse}
      stepfunc={handlestep}
      currentstep={currentStep}
    />,
    <FormMultimedia
      key="step-3"
      hide={currentStep !== 3}
      getFunction={setFormMultimedia}
      stepfunc={handlestep}
      currentstep={currentStep}
    />,
    <FormDirectorInfo
      key="step-4"
      hide={currentStep !== 4}
      sendfunc={sendtoback}
      currentstep={currentStep}
      stepfunc={handlestep}
    />,
  ];

  return (
    <div ref={formTopRef} className="flex flex-col items-center gap-6 bg-brun-brule pb-10">
      <div className="w-full bg-linear-to-b from-ocre-rouge to-brun-brule py-6 text-center text-4xl font-bold text-jaune-souffre">
        {t("form.title")}
      </div>

      {isSubmissionComplete ? (
        <div className="flex w-[90%] max-w-3xl flex-col items-center gap-5 rounded-[20px] bg-linear-to-t from-gris-anthracite to-noir-bleute p-8 text-center text-jaune-souffre">
          <h2 className="text-3xl font-bold">Film envoyé avec succes</h2>

          <p className="max-w-2xl text-base text-jaune-souffre/90">
            {/* {submitSuccess || "Votre film a bien été enregistré."} */}
            Votre film a bien été enregistré.
          </p>

          {/* <p className="max-w-2xl text-sm text-jaune-souffre/70">
            Vous pourrez proposer un nouveau film plus tard en revenant sur la page Participer.
          </p> */}

          <Link
            onClick={onclickSetSubmissionComplete}
            to="/participate"
          >
            <Button variant="gradient-blue">Participer de nouveau</Button>
          </Link>

          <Link
            to="/"
            className="rounded-full border-2 border-jaune-souffre px-6 py-2 font-semibold text-jaune-souffre transition hover:bg-jaune-souffre hover:text-noir-bleute"
          >
            Retourner a l'accueil
          </Link>

        </div>
      ) : (
        <>
          <StepsTrack step={currentStep} maxstep={myforms.length} />

          <form className="flex w-[90%] flex-col items-center gap-5 rounded-[20px] bg-linear-to-t from-gris-anthracite to-noir-bleute p-8 text-jaune-souffre">
            {myforms.map((form) => form)}

            {loading && (
              <div className="w-full rounded-md border border-jaune-souffre/40 bg-jaune-souffre/10 p-3 text-center text-jaune-souffre">
                Envoi en cours...
              </div>
            )}

            {submitError && (
              <div className="w-full rounded-md border border-red-500/50 bg-red-500/10 p-3 text-center text-red-400">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="w-full rounded-md border border-green-500/50 bg-green-500/10 p-3 text-center text-green-300">
                {submitSuccess}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
