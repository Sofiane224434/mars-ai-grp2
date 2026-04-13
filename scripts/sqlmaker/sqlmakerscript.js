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
function createSQLInsert({ tablename, named = false, addAvailableRows = false }) {

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
    let i_values = "", i_insert = ""; available_tables = "";


    for (let i in myrows) {
        if (myrows[i] != "id") {
            if (i == 0) {
                i_insert += insert + " ";
                i_insert += start_par;
                i_values += values + " ";
                i_values += start_par;
                available_tables += "[";
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
                available_tables += ", ";
            }
            if (i == myrows.length - 1) {
                i_insert += end_par;
                i_values += end_par;
                available_tables += "]";
            }
        }

    }

    mysql = i_insert + " " + i_values;
    if (addAvailableRows) {
        mysql += "\n" + "\n";
        mysql += available_tables;
    }
    return mysql;
}

let sql = createSQLInsert({ tablename: "director_profile", named: true, addAvailableRows: true });

//console.log(sql);

if (sql) {
    fs.writeFile("./scripts/sqlmaker/results/myresult.txt", sql, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Fichier écrit.");
    })
}

