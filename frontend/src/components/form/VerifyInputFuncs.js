import { hostname, z } from "zod";
import { da } from "zod/v4/locales";
import i18n from "../../i18n";

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
        required: i18n.t("form.validation.required"),
        regex: i18n.t("form.validation.invalidFormat"),
        max_len: i18n.t("form.validation.textTooLong", { max: max_length }),
        min_length: i18n.t("form.validation.textTooShort", { min: min_length }),
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
        nan: i18n.t("form.validation.notANumber"),
        required: i18n.t("form.validation.required"),
        min: i18n.t("form.validation.numberTooSmall", { min }),
        max: i18n.t("form.validation.numberTooLarge", { max }),
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

export function verifyInputDate({ value, min_date = null, max_date = null, required = false,
    errorSetFunction
}) {

    const error_messages = {
        notdate: i18n.t("form.validation.invalidDate"),
        required: i18n.t("form.validation.required"),
        max_date: i18n.t("form.validation.dateTooLate", { max: max_date }),
        min_date: i18n.t("form.validation.dateTooEarly", { min: min_date })
    }

    //Vérifie si la date est sous le bon format (YYYY-MM-DD)
    const dateregex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (!dateregex.test(value)) {
        errorSetFunction(error_messages.notdate);
        return false;
    }

    //Convertie la date en objet Date
    const dateconvert = new Date(value);

    let currentmessage = null;

    let isempty = value == "" || value == null || value == undefined ? true : false;

    if (required) {
        if (isempty) {
            if (currentmessage == null) {
                currentmessage = error_messages.required;
            }
        }
    } else {
        if (isempty) {
            return true;
        }
    }

    if (max_date) {
        let maxconvert;
        if (max_date instanceof Date) {
            maxconvert = max_date;
        } else {
            maxconvert = new Date(max_date);
        }

        if (dateconvert > maxconvert) {
            if (currentmessage == null) {
                currentmessage = error_messages.max_date;
            }
        }
    }

    if (min_date) {
        let minconvert;
        if (min_date instanceof Date) {
            minconvert = max_date;
        } else {
            minconvert = new Date(min_date);
        }

        if (dateconvert < minconvert) {
            if (currentmessage == null) {
                currentmessage = error_messages.min_date;
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

export function verifyAge(dateofbirth) {

    //Vérifie si la date est sous le bon format (YYYY-MM-DD)
    const dateregex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (!dateregex.test(dateofbirth)) {
        return null;
    }

    //Convertie la date en objet Date
    const dateconvert = new Date(dateofbirth);
    //Ajoute 18 ans à la Date
    dateconvert.setFullYear(dateconvert.getFullYear() + 18);

    //Date d'aujourd'hui
    let today = new Date(Date.now());

    //Si la date + 18 ans est plus petite que la date d'aujourd'hui, alors l'utilisateur
    //a 18 ans ou plus.
    return (dateconvert < today);
}

export function verifyVideo({ file, maxsize = null, minsize = null, required = false,
    errorSetFunction
}) {

    const error_messages = {
        required: i18n.t("form.validation.videoRequired"),
        nofile: i18n.t("form.validation.noFile"),
        notvideo: i18n.t("form.validation.notVideo"),
        maxsize: i18n.t("form.validation.fileTooLarge", { max: Math.floor(maxsize / 1000000) }),
        minsize: i18n.t("form.validation.fileTooSmall", { min: Math.floor(minsize / 1000000) })
    }

    let currentmessage = null;

    if (required) {
        if (!file) {
            if (currentmessage == null) {
                currentmessage = error_messages.required;
            }
        }
    } else {
        if (!file) {
            return true;
        }
    }

    if (!file.name) {
        if (currentmessage == null) {
            currentmessage = error_messages.nofile;
        }
    }

    if (file.type != "video/mp4" && file.type != "video/mov") {
        if (!currentmessage) {
            currentmessage = error_messages.notvideo;
        }
    }

    if (maxsize) {
        if (file.size > maxsize) {
            if (!currentmessage) {
                currentmessage = error_messages.maxsize;
            }
        }
    }

    if (minsize) {
        if (file.size < minsize) {
            if (!currentmessage) {
                currentmessage = error_messages.minsize;
            }
        }
    }

    if (currentmessage) {
        if (errorSetFunction) {
            errorSetFunction(currentmessage);
            return false;
        }
    } else {
        return true;
    }
}

export function verifyImage({ file, maxsize = null, minsize = null, required = false,
    errorSetFunction
}) {

    const error_messages = {
        nofile: i18n.t("form.validation.noFile"),
        notimage: i18n.t("form.validation.notImage"),
        maxsize: i18n.t("form.validation.fileTooLarge", { max: Math.floor(maxsize / 1000000) }),
        minsize: i18n.t("form.validation.fileTooSmall", { min: Math.floor(minsize / 1000000) })
    }

    let currentmessage = null;

    let isempty = file == "" || file == null || file == undefined
        || file.length == 0 ? true : false;

    if (required) {
        if (isempty) {
            if (!currentmessage) {
                currentmessage = error_messages.nofile;
            }
        }
    } else {
        if (isempty) {
            return true;
        }
    }

    if (!file.name) {
        if (required) {
            if (!currentmessage) {
                currentmessage = error_messages.nofile;
            }
        } else {
            return true;
        }
    }

    if (file.type != "image/png" && file.type != "image/jpeg") {
        if (!currentmessage) {
            currentmessage = error_messages.notimage;
        }
    }

    if (maxsize) {
        if (file.size > maxsize) {
            if (!currentmessage) {
                currentmessage = error_messages.maxsize;
            }
        }
    }

    if (minsize) {
        if (file.size < minsize) {
            if (!currentmessage) {
                currentmessage = error_messages.minsize;
            }
        }
    }

    if (currentmessage) {
        if (errorSetFunction) {
            errorSetFunction(currentmessage);
            return false;
        }
    } else {
        return true;
    }
}