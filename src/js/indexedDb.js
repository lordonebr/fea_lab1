import { fillTable } from '../js/index.js'
import { drawGraficos } from '../js/canvas.js'

const constDbObject = "registros";

var db;

function initIndexedDb(){
    var testIndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    
    if(!testIndexedDB)
    {
        console.log("Seu navegador não suporta o recurso HTML5 IndexedDB");
    }
    else
    {
        return new Promise(function(resolve, reject) {
            var request = window.indexedDB.open("Teste", 3);
            request.onerror = function(event){
                console.log("Erro ao abrir o banco de dados", event);
                reject("Erro ao abrir o banco de dados");
            }

            request.onupgradeneeded = function(event){
                console.log("Atualizando");
                db = event.target.result;
                var objectStore = db.createObjectStore(constDbObject, { autoIncrement : true });
                resolve("Atualizando");
            };
            request.onsuccess = function(event){
                console.log("Banco de dados aberto com sucesso");
                db = event.target.result;
                resolve("Banco de dados aberto com sucesso");
            }
        });
    }
}

// salva um registro no IndexedDb
function addDataIndexedDb(dataJson){
    var date = dataJson.date;
    var description = dataJson.description;
    var value = dataJson.value;
    
    var transaction = db.transaction([constDbObject],"readwrite");
    transaction.oncomplete = function(event) {
        console.log("Sucesso :)");
    };
    transaction.onerror = function(event) {
        console.log("Erro :(");
    };

    var objectStore = transaction.objectStore(constDbObject);
    objectStore.add({date:date, description:description, value:value});
}

// recupera todos os registro do IndexedDb
var registros = undefined;
function getAllRegistrosIndexedDb(){

    registros = [];

    var request = db.transaction(constDbObject).objectStore(constDbObject);
    request.openCursor().onsuccess = function(event) {

        var cursor = event.target.result;
        if (cursor) {
            registros.push({
                date : cursor.value.date,
                description : cursor.value.description,
                value : cursor.value.value
            })
            
            cursor.continue();
        }
        else{
            fillTable(registros);
            drawGraficos(registros);
        }

    };

}

// limpa todos os registros do IndexedDb
function removeAllRegistrosIndexedDb() {

    registros = [];
    var request = db.transaction([constDbObject], "readwrite")
            .objectStore(constDbObject)
            .clear();
    request.onsuccess = function(event) {
        fillTable(registros);
        drawGraficos(registros);
    };

}

export { initIndexedDb, addDataIndexedDb, getAllRegistrosIndexedDb, removeAllRegistrosIndexedDb }