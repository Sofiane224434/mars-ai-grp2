// pages/FAQ.jsx
import { useTranslation } from "react-i18next";

function FAQ() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen text-white">
            <section className="bg-[url('/assets/img/faq-background1.png')] bg-cover bg-center bg-no-repeat px-6 py-20 md:px-10 md:py-28">
                <h1 className="text-center text-3xl font-black uppercase tracking-wide md:text-5xl">
                    {t("faq.title")}
                </h1>
            </section>

            <div className="bg-gris-anthracite">
                <section className="bg-[url('/assets/img/faq-background2.png')] bg-cover bg-center bg-no-repeat px-6 py-10 md:px-10 md:py-14">
                    <p className="font-title mx-auto max-w-4xl text-center text-3xl font-semibold text-jaune-simpson md:text-4xl">
                        {t("faq.disclaimer")}
                    </p>
                </section>

                <section className="px-6 py-14 md:px-10 md:py-18">
                    <h2 className="text-4xl font-bold md:text-5xl">{t("faq.informations-title")}</h2>
                    <p className="mt-4 text-lg leading-8 text-white md:text-xl">
                        {t("faq.informations-content")}
                    </p>
                </section>
            </div>

            <section className="min-h-136 bg-[url('/assets/img/faq-background3.png')] bg-size-[100%_100%] bg-center bg-no-repeat px-6 py-16 md:px-10 md:py-20">
                <div className="max-w-5xl space-y-8">
                    <h3 className="text-3xl font-semibold md:text-4xl">{t("faq.question1")}</h3>
                    <ul className="list-disc space-y-3 pl-5 text-lg leading-8 text-white md:text-xl">
                        <li>{t("faq.answer1-1")}</li>
                        <li>{t("faq.answer1-2")}</li>
                        <li>{t("faq.answer1-3")}</li>
                    </ul>
                    <p className="text-lg leading-8 text-white md:text-xl">{t("faq.answer1-4")}</p>
                </div>
            </section>

            <section className="bg-gris-anthracite bg-[url('/assets/img/faq-background4.png')] bg-contain bg-right bg-no-repeat px-6 py-16 md:px-10 md:py-20">
                <div className="max-w-4xl space-y-8">
                    <h2 className="text-center text-4xl font-bold md:text-5xl">{t("faq.access-title")}</h2>
                    <div className="h-px w-full bg-linear-to-r from-transparent via-white/80 to-transparent" />
                    <div className="max-w-3xl space-y-3 text-left">
                        <p className="text-2xl font-semibold text-white md:text-3xl">{t("faq.question2")}</p>
                        <p className="text-lg leading-8 text-white md:text-xl">{t("faq.answer2")}</p>
                    </div>
                    <div className="ml-auto max-w-3xl space-y-3 text-right">
                        <h3 className="text-2xl font-semibold md:text-3xl">{t("faq.question3")}</h3>
                        <p className="text-lg leading-8 text-white md:text-xl">{t("faq.answer3")}</p>
                    </div>
                    <h2 className="pt-6 text-center text-4xl font-bold md:text-5xl">{t("faq.programation-title")}</h2>
                    <div className="h-px w-full bg-linear-to-r from-transparent via-white/80 to-transparent" />
                    <div className="max-w-3xl space-y-3 text-left">
                        <h3 className="text-2xl font-semibold md:text-3xl">{t("faq.question4")}</h3>
                        <p className="text-lg leading-8 text-white md:text-xl">{t("faq.answer4")}</p>
                    </div>
                    <div className="ml-auto max-w-3xl space-y-3 text-right">
                        <h3 className="text-2xl font-semibold md:text-3xl">{t("faq.question5")}</h3>
                        <p className="text-lg leading-8 text-white md:text-xl">{t("faq.answer5")}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQ;
