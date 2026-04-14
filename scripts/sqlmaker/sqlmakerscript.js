/**
 * EXPLICATIONS : 
 * Commande SQL pour récupérer la structure de toutes les tables d'une bd :
 * select * from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = "marsai";
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

//console.log(myobj);

/**
 * Crée une requête SQL insert
 * @param {*} param0 
 * @returns 
 */
function createSQLInsert({ tablename, named = false }) {

    let available_tables = Object.keys(myobj);

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
            if (tablename == "movies" && myrows[i] == "status") {
                i_values += "1";
            } else {
                if (named) {
                    i_values += ":" + myrows[i];
                } else {
                    i_values += "?";
                }
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

let sql_list = [
    createSQLInsert({ tablename: "movies" }),
    createSQLInsert({ tablename: "director_profile" }),
    createSQLInsert({ tablename: "sound_data" }),
    createSQLInsert({ tablename: "used_ai" }),
    createSQLInsert({ tablename: "socials" }),
    createSQLInsert({ tablename: "screenshots" }),
    createSQLSelectMoviedata({})
];

let sql = "";
for (let s in sql_list) {
    sql += sql_list[s] + "\n\n";
}

//console.log(sql);

if (sql) {
    fs.writeFile("./scripts/sqlmaker/results/myresult.txt", sql, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Fichier écrit.");
    })
}

