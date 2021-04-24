
var HINT_QTY = 3;
var dictionary;

window.onload = () => {

    var tableInputs = document.getElementsByClassName("tableInputs");

    for(let i = 0; i<tableInputs.length; i++){

        /* Evento para no permitir que se escriba mas de una letra*/
        tableInputs[i].addEventListener("keypress", function(evt) {

            if(this.innerHTML.length >= this.getAttribute("max")){
                evt.preventDefault();
                return false;
            }

        }, false);

        //Para chequear el input
        tableInputs[i].addEventListener("input", function(evt) {

            if(!(/[A-Za-zÑñÁáÉéÍíÓóÚúÜü]/).test(this.innerText)){
                this.innerText ="";
                return false;
            }
            this.innerText = this.innerText.toUpperCase();

            //Poner el cursor al final
            this.focus();
            document.execCommand('selectAll', false, null);
            document.getSelection().collapseToEnd();
        }, false);

        //Para checkear la palabra si se completa
        tableInputs[i].addEventListener("input", function(evt) {

            var elemClass = this.className.split(" ")[1];
            var elemsFila = document.getElementsByClassName(elemClass);
            var palabra = "";
            var i = 0;

            while(i<elemsFila.length){
                if(elemsFila[i].innerHTML=="") return;
                palabra += elemsFila[i].innerHTML;
                i++;
            }

            if(!dictionary.includes(palabra.toLocaleLowerCase())){
                alert("La palabra "+palabra+" no existe!!!");
            }

        }, false);

    }
    getDictionaryData('https://ordenalfabetix.unileon.es/aw/diccionario.txt');
    loadCookies();
    updateHints();
}

function updateHints(used, qty){ 
    if(HINT_QTY == 0) return false;
    if(used) HINT_QTY--;
    document.getElementById("remainingHints").innerHTML=HINT_QTY;
    return true;
}

function saveCookies(){

    if(confirm("Todos los datos existentes se sobreescribiran, ¿desea continuar?")){
        var cells = document.getElementsByClassName("tableInputs");
        for(var i in cells){
            localStorage.setItem('cell'+i, cells[i].innerHTML);
        }
        localStorage.setItem('pistas', HINT_QTY);
    }

}

function loadCookies(){

    var cells = document.getElementsByClassName("tableInputs");
    for(var i in cells){
        cells[i].innerHTML = localStorage.getItem('cell'+i);
    }
    var pistasLocal = localStorage.getItem('pistas');
    if(pistasLocal) HINT_QTY = pistasLocal;
}

function cleanCookies(){

    if(confirm("Todos los datos existentes se borraran y serán irrecuperables, ¿desea continuar?")){
        var cells = document.getElementsByClassName("tableInputs");
        for(var i in cells){
            localStorage.setItem('cell'+i, '');
        }
        localStorage.setItem('pistas', 3);
    }
}

function restartGame(){

    if(confirm("El tablero se vaciará y se borraran los datos locales, ¿desea continuar?")){
        HINT_QTY = 3;
        updateHints();
        cleanCookies();

        //Limpiar tablero
        var cells = document.getElementsByClassName('tableInputs');
        for(c of cells){
            c.innerHTML ="";
        }

    }
}

async function giveHint(){

    if(updateHints(true)){
        
        
    }else{
        alert("¡No te quedan pistas!");
    }
}

async function getDictionaryData(url){

    if(!dictionary){
        var URLPRUEBA = 'https://cors-anywhere.herokuapp.com/'; //Para hacerlo desde localhost
        fetch(URLPRUEBA + url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        })
            .then((response) => response.text())
            .then((data) => dictionary = data.split("\n"))
            .catch((err) => console.log(err));
    }
}