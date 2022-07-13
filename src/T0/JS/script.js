let currentModules = [];
let pos;

function aktiv(element){
    let obj = document.getElementsByClassName(element);
    for (var i=0; i < obj.length; i++) {
        obj[i].classList.remove("inaktiv");
    }
}

function inaktiv(element){
    let obj = document.getElementsByClassName(element);
    for (var i=0; i < obj.length; i++) {
        obj[i].classList.add("inaktiv");
    }
}


function semesterwahl(){
    inaktiv("sectionSmallNav");
    aktiv("semesterauswahl");
    inaktiv("vertiefungssicht");
    inaktiv("modulansicht");
    inaktiv("kreuzModule");
}

function modulwahl(){
   
    inaktiv("semesterauswahl");
    inaktiv("vertiefungssicht");
    aktiv("modulansicht");
    aktiv("kreuzModule");
    aktiv("sectionSmallNav");
}

function vertiefungswahl(val, modules){
    let aussenLinks = document.getElementsByClassName("aussenLinks");
    let aussenRechts = document.getElementsByClassName("aussenRechts");
    let mitte = document.getElementsByClassName("mitte");
    let text = document.getElementById("VInhalt");
    let ueberschrift = document.getElementById("ueberschrift");
    let figM = document.getElementsByClassName("figCapM");
   
    currentModules = modules;
    pos= Math.round(currentModules.length/2); 
    text.innerHTML = currentModules[pos].inhalt;
    ueberschrift.innerHTML = currentModules[pos].name;
        aussenLinks[0].src = currentModules[pos-1].imgLink;
        
        mitte[0].src = currentModules[pos].imgLink;
        figM[0].innerHTML = currentModules[pos].laufzeit;
        aussenRechts[0].src = currentModules[pos+1].imgLink;
       
        
    aktiv("sectionSmallNav");
    inaktiv("semesterauswahl");
    aktiv("vertiefungssicht");
    inaktiv("modulansicht");
    aktiv("kreuzModule");
}

function switchImgLeft(){
    let aussenLinks = document.getElementsByClassName("aussenLinks");
    let aussenRechts = document.getElementsByClassName("aussenRechts");
    let mitte = document.getElementsByClassName("mitte");
    let text = document.getElementById("modulInhalt");
    let ueberschrift = document.getElementById("ueberschrift");
    let figM = document.getElementsByClassName("figCapM");
    --pos; 
    if(pos < 0){
        aussenLinks[0].src = currentModules[currentModules.length-2].imgLink;
        mitte[0].src = currentModules[currentModules.length-1].imgLink;
        figM[0].innerHTML = currentModules[currentModules.length-1].laufzeit;
        aussenRechts[0].src = currentModules[0].imgLink; 
        pos = currentModules.length-1;
    } else {
        if(pos == 0){
             aussenLinks[0].src = currentModules[currentModules.length-1].imgLink;
        } else {
            aussenLinks[0].src = currentModules[pos-1].imgLink;
        }
        mitte[0].src = currentModules[pos].imgLink;
        figM[0].innerHTML = currentModules[pos].laufzeit;
        aussenRechts[0].src = currentModules[pos+1].imgLink;       
    }
    switchModuleText(pos);
}

function switchImgRight(){
    let aussenLinks = document.getElementsByClassName("aussenLinks");
    let aussenRechts = document.getElementsByClassName("aussenRechts");
    let mitte = document.getElementsByClassName("mitte");
    let text = document.getElementById("modulInhalt");
    let figM = document.getElementsByClassName("figCapM");
    let ueberschrift = document.getElementById("ueberschrift");
    ++pos; 
    if(pos > currentModules.length-1){
        aussenLinks[0].src = currentModules[currentModules.length-1].imgLink;
        mitte[0].src = currentModules[0].imgLink;
        figM[0].innerHTML = currentModules[0].laufzeit;
        aussenRechts[0].src = currentModules[1].imgLink; 
        pos = 0;
    } else {
        aussenLinks[0].src = currentModules[pos-1].imgLink;
        mitte[0].src = currentModules[pos].imgLink;
        figM[0].innerHTML = currentModules[pos].laufzeit;
        if(pos == currentModules.length-1){
            aussenRechts[0].src = currentModules[0].imgLink;
       } else {
            aussenRechts[0].src = currentModules[pos+1].imgLink;
       }   
    }
    switchModuleText(pos);

}

function switchModuleText(pos){
    let text = document.getElementById("VInhalt");
    let ueberschrift = document.getElementById("ueberschrift")
    text.innerHTML = currentModules[pos].inhalt;
    ueberschrift.innerHTML = currentModules[pos].name;
}


// SEITENWECHSEL VON DER SEMESTERWAHL, ZUR Praxisphasenwahl
function praxisphasenwahl(){
    var semester = document.getElementsByClassName("semesterauswahl");
    var praxisphase = document.getElementsByClassName("praxisphasenansicht");
    setPraxisphase();
    toggleBG();
    for (var i=0; i < semester.length; i++) {
        semester[i].classList.add("inaktiv");
    }
    for (var j=0; j < praxisphase.length; j++) {
        praxisphase[j].classList.remove("inaktiv");
    }
}

// Hintergrundwechsel
function toggleBG() {

    var mainvar = document.getElementById("mainid");
    mainvar.classList.toggle("bgimage");
}

