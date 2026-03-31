import React from "react";
import { useTranslation } from "react-i18next";
import AboutBlock from "./AboutBlock";

function AboutSection() {
    const { t } = useTranslation();
    // Keep image config local while text is fully translated via locale keys.
    const blocks = [
        {
            id: 1,
            title: t("about.blocks.block1.title"),
            text: t("about.blocks.block1.text"),
            image: "/assets/img/about-1.png",
            imagePosition: "right"
        },
        {
            id: 2,
            title: t("about.blocks.block2.title"),
            text: t("about.blocks.block2.text"),
            image: "/assets/img/about-2.png",
            imagePosition: "left"
        },
        {
            id: 3,
            title: t("about.blocks.block3.title"),
            text: t("about.blocks.block3.text"),
            image: "/assets/img/about-3.png",
            imagePosition: "right"
        },
        {
            id: 4,
            title: t("about.blocks.block4.title"),
            subtitle: t("about.blocks.block4.subtitle"),
            text: t("about.blocks.block4.text"),
            image: "/assets/img/about-4.png",
            imagePosition: "left"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {blocks.map((block) => (
                <AboutBlock 
                    key={block.id} 
                    title={block.title}
                    subtitle={block.subtitle}
                    text={block.text}
                    image={block.image}
                    imagePosition={block.imagePosition}
                />
            ))}
        </div>
    );
}

export default AboutSection;