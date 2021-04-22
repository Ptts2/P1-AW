
var HINT_QTY = 3;

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
    }

    updateHints();
    getCookies();
}
function checkInputLength(element, evt){

    if(element.innerHTML.length >= element.getAttribute('max')){

        evt.preventDefault();
        return false;
    }
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
    }

}

function getCookies(){

    var cells = document.getElementsByClassName("tableInputs");
    for(var i in cells){
        cells[i].innerHTML = localStorage.getItem('cell'+i);
    }

}

function cleanCookies(){

    if(confirm("Todos los datos existentes se borraran y serán irrecuperables, ¿desea continuar?")){
        var cells = document.getElementsByClassName("tableInputs");
        for(var i in cells){
            localStorage.setItem('cell'+i, '');
        }
    }
}

function restartGame(){

    if(confirm("El tablero se vaciará y se borraran los datos locales, ¿desea continuar?")){
        HINT_QTY = 3;
        updateHints();
        //Limpiar tablero
        //Limpiar caché
    }
}

function giveHint(){

    if(updateHints(true)){

    }else{
        alert("¡No te quedan pistas!");
    }


}