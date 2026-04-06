window.addEventListener("load", balloonsTriggerListener)
//window.addEventListener("load", balloonsCloseX)


function balloonsCloseX() {
    var arrayBalloonCloseXElements = document.getElementsByClassName("balloonStatus-Ativo");

    for (var i = 0; i < arrayBalloonCloseXElements.length; i++) {

        var closeX = document.createElement("div");
        closeX.innerText = "X";
        closeX.classList.add("balloonCloseX");

        //arrayBalloonCloseXElements[i].insertBefore(closeX, arrayBalloonCloseXElements[i].childs.firstChild);

        arrayBalloonCloseXElements[i].firstChild.appendChild(closeX);
        //arrayBalloonCloseXElements[i].addEventListener('click', balloonsTriggerClickAction, false);
    }
}



function balloonsTriggerListener() {
    var arrayBalloonTriggerElements = document.getElementsByClassName("balloonTrigger");

    for (var i = 0; i < arrayBalloonTriggerElements.length; i++) {
        arrayBalloonTriggerElements[i].addEventListener('click', balloonsTriggerClickAction, false);
        //arrayBalloonTriggerElements[i].addEventListener('focus', balloonsTriggerClickAction, false);
        //arrayBalloonTriggerElements[i].addEventListener('blur', balloonsTriggerClickAction, false);
    }
}


function balloonsTriggerClickAction() {
    var classeCssHelp = "balloonType";
    var classeCssAtivo = "balloonStatus-Ativo";
    var indexClasseCssHelp;
    var classesCssChildElement;

    var arrayChildElements = this.children;

    if (arrayChildElements.length == 0) {
        arrayChildElements = this.parentNode.children;
    }

    for (var i = 0; i < arrayChildElements.length; i++) {
        if (arrayChildElements[i].nodeName != "svg") {
            classesCssChildElement = arrayChildElements[i].className;
            indexClasseCssHelp = classesCssChildElement.search(classeCssHelp);

            if (indexClasseCssHelp > -1) {
                balloonsShowHide(arrayChildElements[i], classeCssAtivo)
            }
        }
    }
}


function balloonsShowHide(element, classeCSS) {
    var indexClasse = element.className.search(classeCSS)

    if (indexClasse > -1) {
        element.classList.remove(classeCSS);
    } else {
        element.classList.add(classeCSS);
    }

}