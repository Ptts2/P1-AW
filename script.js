

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

}



function checkInputLength(element, evt){

    if(element.innerHTML.length >= element.getAttribute('max')){

        evt.preventDefault();
        return false;
    }
}