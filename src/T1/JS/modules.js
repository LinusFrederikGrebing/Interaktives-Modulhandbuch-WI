// JSON DATEI EINBINDEN
const modules = [];
const specmodules = [];
const twpm = [];
const tvm = [];
const wwpm = [];
const wvm = [];
const lcm = [];
var lcmwahl = [];

window.onload = function () {
    fetch("../../../res/modules.json")
        .then(response => response.json()
            .then(module => {
                for (const [key, value] of Object.entries(module)) {
                    modules.push(value);
                }
            }))
    fetch("../../../res/specificModules.json")
        .then(response => response.json()
            .then(specmodule => {
                for (const [key, value] of Object.entries(specmodule)) {
                    specmodules.push(value);
                }
                for (let i = 0; i < specmodules.length; i++) {
                    if (specmodules[i].art == "Technisches Wahlpflichtmodul") {
                        twpm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Technisches Vertiefungsmodul") {
                        tvm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Wirtschaftliches Wahlpflichtmodul") {
                        wwpm.push(specmodules[i]);
                    } else if (specmodules[i].art == "LCM-Vertiefungsmodul") {
                        lcm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Wirtschaftliches Vertiefungsmodul") {
                        wvm.push(specmodules[i]);
                    }

                }
                lcmwahl = lcm.concat(wwpm, wvm);
            }))
}


// SIDEBAR-LISTE LÖSCHEN
function delLi() {
    let limodul = document.getElementById("modulList");
    let modul = document.getElementsByClassName("mList");
    for (var i = 0; i < modul.length; i++) {
        limodul.remove();
    }
}

let bigDotpos;
let semList = document.getElementsByClassName("mList");
var aktuellesSem = 0;
var aktschwerpunkt;
// SIDEBAR-LISTE AUS JSON-DATEI ERSTELLEN
function setList(sem, schwerpunkt) {
    aktschwerpunkt = schwerpunkt
    let head;

    aktuellesSem = sem;
    let semModules = [];
    delLi();
    let seccon = document.getElementById("sidesection");
    let ul = document.createElement("ul");
    ul.setAttribute("id", "modulList");
    seccon.appendChild(ul);

    for (const [key, value] of Object.entries(modules)) {
        if (value.semester == sem && (value.schwerpunkt == schwerpunkt || value.schwerpunkt == "Grundlagenmodul")) {
            semModules.push(value.name);
        }
    }

    for (let i = 0; i < semModules.length; i++) {
        let li = document.createElement("li");
        li.classList.add("mList");
        let content = document.createTextNode(semModules[i]);
        li.appendChild(content);
        ul.appendChild(li);

        semList[i].onclick = function () {
            for (const [key, value] of Object.entries(specmodules)) {
                if (semList[i].innerHTML == "Wahlpflichtmodul (technisch, wirtschaftlich, LCM-spezifisch)") {
                    findVWModules(semList[i].innerHTML);
                    setModule(semList[i].innerHTML, semList);
                    head = semList[i].innerHTML;
                    break;
                } else if (semList[i].innerHTML == value.art && (value.schwerpunkt == schwerpunkt || value.schwerpunkt == "Grundlagenmodul")) {
                    findVWModules(value.art);
                    setModule(semList[i].innerHTML, semList);
                    head = semList[i].innerHTML;
                    break;
                } else {
                    modulwahl();
                    setModule(semList[i].innerHTML, semList);
                    head = semList[i].innerHTML;
                }

            }
            sidebarend();
            xy = 0;
            toggleBG();
            setDots(semList, head);
        }

    }


}

function setDots(semList, head) {
    delDots();
    let smallsec = document.getElementById("smallsec");
    let wrap = document.getElementById("dots");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < semList.length; i++) {
        let newDot = document.createElement("div");
        newDot.classList.add("dot")
        wrap.appendChild(newDot);
    }
    for (let j = 0; j < dots.length; j++) {
        if (semList[j].innerHTML == head) {
            dots[j].classList.add("bigDot")
            bigDotpos = j;
        }
    }
    smallsec.appendChild(wrap);
}


function delDots() {
    let dots = document.getElementById("dots");

    while (dots.firstChild) {
        dots.removeChild(dots.firstChild);
    }

}

//AKTUELLES SEMESTER DES JEWEILIGEN SCHWERPUNKTES
let semModul = [];
function semArray() {
    if (semModul.length > 1) {
        semModul = [];
    }

    for (const [key, value] of Object.entries(modules)) {
        if (value.semester == aktuellesSem && (value.schwerpunkt == aktschwerpunkt || value.schwerpunkt == "Grundlagenmodul")) {
            semModul.push(value);
        }
    }

}

//dots

function dotPlus() {
    let dots = document.getElementsByClassName("dot");
    dots[bigDotpos].classList.remove("bigDot");
    if (bigDotpos == dots.length - 1) {
        bigDotpos = 0;
        dots[bigDotpos].classList.add("bigDot");
    } else {
        ++bigDotpos;
        dots[bigDotpos].classList.add("bigDot");

    }
}

function dotMinus() {

    let dots = document.getElementsByClassName("dot");
    dots[bigDotpos].classList.remove("bigDot");
    if (bigDotpos == 0) {
        bigDotpos = dots.length - 1;
        dots[bigDotpos].classList.add("bigDot");
    } else {
        --bigDotpos;
        dots[bigDotpos].classList.add("bigDot");
    }
}


// SETZE DEN INHALT MODULSPZIFISCH
function setAllContent(x) {
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let img = document.getElementById("modulBild");
    h.innerHTML = semModul[x].name;
    t.innerHTML = semModul[x].inhalt;
    img.src = semModul[x].imgLink;

}

// UNTERSCHEIDE ZWISCHEN VERTIEFUNGS- UND WAHLPFLICHT-MODULEN
function findVWModules(x) {
    if (x == "Technisches Vertiefungsmodul") {
        vertiefungswahl(x, tvm);
    } else if (x == "Wirtschaftliches Wahlpflichtmodul") {
        vertiefungswahl(x, wwpm)
    } else if (x == "Technisches Wahlpflichtmodul") {
        vertiefungswahl(x, twpm)
    } else if (x == "Wirtschaftliches Vertiefungsmodul") {
        vertiefungswahl(x, wvm);
    } else if (x == "LCM-Vertiefungsmodul") {
        vertiefungswahl(x, lcm);
    } else if (x == "Wahlpflichtmodul (technisch, wirtschaftlich, LCM-spezifisch)") {
        vertiefungswahl(x, lcmwahl);
    }
    else {
        modulwahl();
    }
}

// SWITCH MODULE RIGHT
function switchmodulright() {
    let h = document.getElementById("modulUeberschrift");
    semArray();
    for (var j = 0; j < semModul.length + 1; j++) {
        if (j > (semModul.length - 1)) {
            findVWModules(semModul[0].name);
            setAllContent(0);
            break;
        } else if (h.innerHTML == semModul[j].name && j < (semModul.length - 1)) {
            findVWModules(semModul[j + 1].name);
            setAllContent(j + 1);
            break;
        }
    }
}

// SWITCH MODULE LEFT
function switchmodulleft() {
    let h = document.getElementById("modulUeberschrift");
    semArray();
    for (var j = semModul.length - 1; j >= 0; j--) {
        if (j < 1) {
            findVWModules((semModul.length - 1).name);
            setAllContent(semModul.length - 1);
            break;
        } else if (h.innerHTML == semModul[j].name && j > 0) {
            findVWModules(semModul[j - 1].name);
            setAllContent(j - 1);
            break;
        }
    }
}

// HEADER MODULSPEZIFISCH SETZEN
function setModule(moduleName, semList) {
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let img = document.getElementById("modulBild");
    let value = findModuleViaName(moduleName);
    h.innerHTML = value.name;
    t.innerHTML = value.inhalt;
    img.src = value.imgLink;
}

function findModuleViaName(modulName) {
    let val;
    for (const [key, value] of Object.entries(modules)) {
        if (value.name == modulName) {
            val = value
        }
    }
    return val;
}

// HEADER ZURÜCKSETZTEN
function closeModule() {
    let h = document.getElementById("modulUeberschrift");
    h.innerHTML = "Semesterauswahl";
}

// Hintergrundwechsel
function toggleBG() {

    var mainvar = document.getElementById("mainid");
    mainvar.classList.toggle("bgimage");
}



// SIDEBAR ANIMATION
var xy = 0;
function sidebarswitch(x) {
    if (xy != x) {
        sidebarstart();
        xy = x;
    } else if (xy == x) {
        sidebarend();
        xy = 0;
    }
}

function sidebarstart() {
    const sidebartimeline = new TimelineLite();
    const $sidebar = $('.sidebar');
    let obj = document.getElementsByClassName("sidebar");
    sidebartimeline.to($sidebar, 0, {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        ease: Power4.easeOut
    });
    sidebartimeline.to($sidebar, 0.3, {
        width: '40vw',
        height: "100%",
        ease: Back.easeOut
    });
    sidebartimeline.to($sidebar, 0.25, {
        borderTopRightRadius: '0%',
        borderBottomRightRadius: '0%',
        ease: Power4.easeOut
    }, '-=0.13')

    $sidebar.toggleClass("toggelsidebar");
}

function sidebarend() {
    const sidebartimeline = new TimelineLite();
    const $sidebar = $('.sidebar');
    let obj = document.getElementsByClassName("sidebar");
    sidebartimeline.to($sidebar, 0.3, {
        width: 0,
        height: "100%",
        ease: Power4.easeOut
    });

    $sidebar.toggleClass("toggelsidebar");
}

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

