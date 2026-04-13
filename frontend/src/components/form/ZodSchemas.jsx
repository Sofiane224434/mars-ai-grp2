import { z } from "zod";

function getErrorMessage(errortype, spec = "") {
    const error_messages = {
        required: `Veuillez remplir ce champs.`,
        wrongtype: `Input invalide.`,
        toolong: `Input trop long : doit être de moins de ` + spec + ` caractères.`,
        tooshort: `Input trop court : doit être de plus de ` + spec + ` caractères.`,

    }

    return error_messages[errortype];
}



export const Zod_firststep = z.object({
    movietitle: z.string({
        error: (i) => i.input === undefined ? getErrorMessage("required") :
            getErrorMessage("wrongtype")
    }).max(200, getErrorMessage("toolong", 200)),
    movietitlefr: z.string(getErrorMessage("wrongtype")).max(200,
        getErrorMessage("toolong", 200)
    ).nullable(),
    synopsis: z.string({
        error: (i) => i.input === undefined ? getErrorMessage("required") :
            getErrorMessage("wrongtype")
    }).max(500, getErrorMessage("toolong", 500)),
    movielanguage: z.string(getErrorMessage("wrongtype")).max(100,
        getErrorMessage("toolong", 100)
    ).nullable(),
    videofile: z.file({
        error: (i) => i.input === undefined ? getErrorMessage("required") :
            getErrorMessage("wrongtype")
    }).max(20_000_000).mime(["video/mp4", "video/mov"]),
    ytlink: z.url({
        error: (i) => i.input === undefined ? getErrorMessage("required") :
            getErrorMessage("wrongtype")
    }),
})

export const z_namemodel = z.string().max(100);
export const z_urlmodel = z.url();
export const z_emailmodel = z.email();
export const z_longtextmodel = z.string().max(500);