import { hostname, z } from "zod";

/**
 * Fonction qui vérifie une valeure texte.
 * @param value La valeur à vérifier
 * @param required (true | false) Si la valeur est obligatoire
 * @param regex (Optionel) Regex qui teste la valeur
 * @param zodschema (Optionel) Vérification via Zod schema.
 * Schemas possibles : "email" | "url"
 * @param min_length (Optionel) Longueur minimum du texte.
 * @param max_length (Optionel) Longeur maximale du texte.
 * @param errorSetFunction Une fonction à effectuer si il y a une erreur pour
 * récupérer le message d'erreur. Sert particulièrement à passer un setState.
 * @returns true | false / True = La valeur a passé la vérification correctement /
 * False = La valeur n'a pas pu passer la vérification.
 */
export function verifyInputText({ value, required = false, regex = null, max_length = null,
    min_length = null, errorSetFunction = null, zodschema = null
}) {

    const schemas = {
        "email": z.email(),
        "url": z.url(),
    }

    const error_messages = {
        required: `Veuillez remplir ce champ.`,
        regex: `Format de ce champ est invalide.`,
        max_len: `Texte trop long, doit avoir moins de ` + max_length +
            " caratères.",
        min_length: `Texte trop court, doit avoir au moins ` + min_length +
            " caratères.",
    }

    let currentmessage = null;

    let isempty = value == "" || value == null || value == undefined ? true : false;

    if (required) {
        if (isempty) {
            currentmessage = error_messages.required;
        }
    } else {
        if (isempty) {
            return true;
        }
    }

    if (zodschema) {
        if (schemas[zodschema]) {
            let zobj = schemas[zodschema].safeParse(value);
            if (!zobj.success) {
                if (currentmessage == null) {
                    currentmessage = error_messages.regex;
                }
            }
        } else {
            let possible_schemas = Object.keys(schemas);
            let buildstr = "";
            for (let s in possible_schemas) {
                if (s > 0) {
                    buildstr = buildstr + " | " + possible_schemas[s];
                } else {
                    buildstr = possible_schemas[s];
                }
            }
            console.warn("Schema : " + zodschema + `; introuvable. 
                Schemas disponibles : `+ buildstr);
        }

    }

    if (regex) {
        if (!regex.test(value)) {
            if (currentmessage == null) {
                currentmessage = error_messages.regex;
            }
        }
    }

    if (min_length) {
        if (value.length < min_length) {
            if (currentmessage == null) {
                currentmessage = error_messages.min_len;
            }
        }
    }

    if (max_length) {
        if (value.length > max_length) {
            if (currentmessage == null) {
                currentmessage = error_messages.max_len;
            }
        }
    }

    if (currentmessage != null) {
        if (errorSetFunction) {
            errorSetFunction(currentmessage);
        }
        return false;
    } else {
        return true;
    }

}

export function verifyInputNumber({ value, min = null, max = null, required = false,
    errorSetFunction }) {

    const error_messages = {
        nan: `Erreur : ceci n'est pas un nombre.`,
        required: `Veuillez remplir ce champ.`,
        min: `Nombre doit être supérieur à : ` + min + ".",
        max: `Nombre doit être inférieur à : ` + max + ".",
    }

    let currentmessage = null;

    let isempty = value == "" || value == null || value == undefined ? true : false;

    if (required) {
        if (isempty) {
            currentmessage = error_messages.required;
        }
    } else {
        if (isempty) {
            return true;
        }
    }

    if (typeof value != "number" && !isempty) {
        if (currentmessage != null) {
            currentmessage = error_messages.nan;
        }
    }

    if (value < min) {
        if (currentmessage != null) {
            currentmessage = error_messages.min;
        }
    }
    if (value > max) {
        if (currentmessage != null) {
            currentmessage = error_messages.max;
        }
    }

    if (currentmessage != null) {
        if (errorSetFunction) {
            errorSetFunction(currentmessage);
        }
        return false;
    } else {
        return true;
    }
}

export function verifyInputDate({ value, min_date = null, max_date = null,
    errorSetFunction
}) {

    //check if date
    //format: YYYY-MM-DD
}