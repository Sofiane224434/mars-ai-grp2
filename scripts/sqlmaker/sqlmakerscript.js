/**
 * EXPLICATIONS : 
 * Commande SQL pour récupérer la structure de toutes les tables d'une bd :
 * select TABLE_NAME, COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = "marsai";
 * 
 * Puis, sur phpmyadmin, utiliser "export" en dessous des résultats.
 * Exporter en json.
 * Placer le json dans le dossier avec ce script.
 * Importer avec le modèle :
 * import nomdevariable from "./...chemindujson" with {type:"json"};
 */

import data from "./COLUMNS.json" with { type: "json" };

import fs from "fs";

//console.log(data[2].data);

//Tri des données : récupère uniquement l'index dans json contenant les données
//de colonnes de tables.

const dataWanted = data[2].data;
let myobj = {};

for (let o in dataWanted) {
    if (myobj[dataWanted[o].TABLE_NAME]) {
        myobj[dataWanted[o].TABLE_NAME].push(dataWanted[o].COLUMN_NAME);
    } else {
        myobj[dataWanted[o].TABLE_NAME] = [dataWanted[o].COLUMN_NAME];
    }
}

let available_tables = Object.keys(myobj);

//console.log(myobj);

/**
 * Crée une requête SQL insert
 * @param {*} param0 
 * @returns 
 */
function createSQLInsert({ tablename, named = false }) {

    if (!myobj[tablename]) {
        console.warn("Il semble que cette table n'existe pas... " +
            "Vérifier bien que vous ayez demandé une table disponible : "
        );
        for (let a in available_tables) {
            console.warn(available_tables[a]);
        }
        console.warn("------");
        return null;
    }

    const myrows = myobj[tablename];

    const insert = "INSERT INTO " + tablename;
    const values = "VALUES";
    const start_par = "(";
    const end_par = ")";

    let mysql = "";
    let i_values = "", i_insert = "";


    for (let i in myrows) {
        if (myrows[i] != "id") {
            if (i_insert == "" && i_values == "") {
                i_insert += insert + " ";
                i_insert += start_par;
                i_values += values + " ";
                i_values += start_par;
            }
            i_insert += myrows[i];

            if (named) {
                i_values += ":" + myrows[i];
            } else {
                i_values += "?";
            }


            available_tables += myrows[i];
            if (i < myrows.length - 1) {
                i_insert += ", ";
                i_values += ", ";
            }
            if (i == myrows.length - 1) {
                i_insert += end_par;
                i_values += end_par;
            }
        }

    }

    mysql = i_insert + " " + i_values;

    return mysql;
}

function createSQLSelectMoviedata({ movieid = null, diremail = null, status = null,
    named = false
}) {

    /**
     * SELECT * FROM `movies` 
LEFT JOIN status on movies.status = status.id
LEFT JOIN director_profile on director_profile.movie_id = movies.id
LEFT JOIN sound_data on sound_data.movie_id = movies.id
LEFT JOIN used_ai on used_ai.movie_id = movies.id
LEFT JOIN screenshots on screenshots.movie_id = movies.id
LEFT JOIN socials on socials.movie_id = movies.id
     */

    if (movieid) { console.log(movieid) };

    const tables = ["movies", "status", "director_profile", "sound_data", "used_ai", "screenshots",
        "socials"
    ];

    let str_SelectList = "";
    let leftjoins = "";

    for (let t in tables) {

        if (tables[t] != "movies") {
            if (tables[t] == "status") {
                leftjoins += "LEFT JOIN " + tables[t] + " ON " + tables[t] + ".id = movies.status \n";
            } else {
                leftjoins += "LEFT JOIN " + tables[t] + " ON " + tables[t] + ".movie_id = movies.id \n";
            }
        }

        //Construction de str_SelectList (tout ce qui va être dans la partie SELECT)
        let rows = myobj[tables[t]];
        for (let r in rows) {
            if (rows[r] != "movie_id" && rows[r] != "id" || tables[t] == "movies") {
                str_SelectList += tables[t] + "." + rows[r];
                if (t == tables.length - 1 && r == rows.length - 1) {
                    str_SelectList += " \n";
                } else {
                    str_SelectList += ", ";
                }
            }
        }
    }

    const available_status = {
        1: "pending",
        2: "rejected",
        3: "review",
        4: "approved",
        5: "top50",
        6: "top5"
    };

    const selectcommand = "SELECT " + str_SelectList + "FROM movies";

    let conditions = [];
    let where = "";

    if (status) {
        if (named) {
            conditions.push("movies.status = :moviestatus")
        } else {
            conditions.push("movies.status = ?");
        }
    }
    if (movieid) {
        if (named) {
            conditions.push("movies.id = :id")
        } else {
            conditions.push("movies.id = ?");
        }
    }
    if (diremail) {
        if (named) {
            conditions.push("director_profile.email = :diremail")
        } else {
            conditions.push("director_profile.email = ?");
        }
    }

    if (conditions.length > 0) {
        for (let c in conditions) {
            if (c == 0) {
                where += "WHERE ";
            } else {
                where += " AND ";
            }
            where += conditions[c]
        }
    }

    let result = "";
    if (conditions.length > 0) {
        result = selectcommand + "\n" + leftjoins + where;
    } else {
        result = selectcommand + "\n" + leftjoins;
    }

    return result;

}

function getAvailableRows(tablename) {
    if (!available_tables.includes(tablename)) {
        return null;
    }

    let stringtable = "";

    let myrows = myobj[tablename]

    for (let i in myrows) {
        if (i == 0) {
            stringtable += "[";
        }
        stringtable += myrows[i];
        if (i < myrows.length - 1) {
            stringtable += ", ";
        }
        if (i == myrows.length - 1) {
            stringtable += "]";
        }
    }

    return stringtable;
}

function createSQLNamedObject(tablename) {
    if (!available_tables.includes(tablename)) {
        return null;
    }

    let namedobject = "";

    const mytable = myobj[tablename];

    for (let i in mytable) {
        if (i == 0) {
            namedobject += "{";
        }
        if (mytable[i] != "id") {
            namedobject += mytable[i] + ":" + '""';
        }
        if (i < mytable.length - 1 && namedobject.length > 1) {
            namedobject += ", ";
        }
        if (i == mytable.length - 1) {
            namedobject += "}";
        }
    }

    return namedobject;

}

let sql_list = [
    "---CODE à COPIER COLLER POUR LES REQUÊTES SQL---",
    createSQLInsert({ tablename: "movies", named: true }) + ";",
    createSQLInsert({ tablename: "director_profile", named: true }) + ";",
    createSQLInsert({ tablename: "sound_data", named: true }) + ";",
    createSQLInsert({ tablename: "used_ai", named: true }) + ";",
    createSQLInsert({ tablename: "socials", named: true }) + ";",
    createSQLInsert({ tablename: "screenshots", named: true }) + ";",
    createSQLSelectMoviedata({}),
    "-- Modèles d'objets à rentrer dans la BDD : ",
    "-- movies = " + createSQLNamedObject("movies"),
    "-- director_profile = " + createSQLNamedObject("director_profile"),
    "-- sound_data = " + createSQLNamedObject("sound_data"),
    "-- used_ai = " + createSQLNamedObject("used_ai"),
    "-- socials = " + createSQLNamedObject("socials"),
    "-- screenshots = " + createSQLNamedObject("screenshots")
];

let sql = "";
for (let s in sql_list) {
    sql += sql_list[s] + "\n\n";
}

//console.log(sql);

if (sql) {
    fs.writeFile("./scripts/sqlmaker/results/myresult.sql", sql, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Fichier écrit.");
    })
}

