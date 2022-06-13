// JSON DATEI EINBINDEN
const modules = []
window.onload = function() {
    fetch("../../../res/modules.json")
        .then(response => response.json()
            .then(module => {
                for (const [key, value] of Object.entries(module)) {
                    modules.push(value);
                }
            }))

 
}


// SEITENWECHSEL VON DER SEMESTERWAHL, ZUR MODULWAHL
function modulwahl(){
    var semester = document.getElementsByClassName("semesterauswahl");
    var modul = document.getElementsByClassName("modulansicht");
    for (var i=0; i < semester.length; i++) {
        semester[i].classList.add("inaktiv");
    }
    for (var j=0; j < modul.length; j++) {
        modul[j].classList.remove("inaktiv");
    }
}

// SEITENWECHSEL VON DER SEMESTERWAHL, ZUR Praxisphasenwahl
function praxisphasenwahl(){
    var semester = document.getElementsByClassName("semesterauswahl");
    var praxisphase = document.getElementsByClassName("praxisphasenansicht");
    setPraxisphase();
    toggleBG();
    console.log("test")
    for (var i=0; i < semester.length; i++) {
        semester[i].classList.add("inaktiv");
    }
    for (var j=0; j < praxisphase.length; j++) {
        praxisphase[j].classList.remove("inaktiv");
    }
}


// SIDEBAR-LISTE LÖSCHEN
function delLi(){
    let limodul = document.getElementById("modulList");
    let modul = document.getElementsByClassName("mList");
    for (var i=0; i < modul.length; i++) {
      limodul.remove();     
    }

}

var aktuellesSem = 0;
// SIDEBAR-LISTE AUS JSON-DATEI ERSTELLEN
function setList(sem){
    aktuellesSem = sem;
    let semModules = [];
    delLi();
    let seccon = document.getElementById("sidesection");
    let ul = document.createElement("ul");
     ul.setAttribute("id", "modulList");
     seccon.appendChild(ul);

    let semList= document.getElementsByClassName("mList");
    for (const [key, value] of Object.entries(modules)) {
        if(value.semester == sem && (value.schwerpunkt=="Maschinenbau"||value.schwerpunkt=="Grundlagenmodul")){
            semModules.push(value.name);
            
        }
    }

    for (let i = 0; i < semModules.length; i++) {
        let li = document.createElement("li");
        li.classList.add("mList");
        let content = document.createTextNode(semModules[i]);
        li.appendChild(content);
        ul.appendChild(li);
        semList[i].onclick = function(){          
              setModule(semList[i].innerHTML);
              modulwahl();
              toggleBG();
              sidebarend();
              xy = 0;  
        }
        
    }
    
}




//AKTUELLES SEMESTER DES JEWEILIGEN SCHWERPUNKTES
let semModul = [];
function semArray(){
    if(semModul.length > 1){
        semModul = [];
    }
    for (const [key, value] of Object.entries(modules)) {
        if(value.semester == aktuellesSem && (value.schwerpunkt=="Maschinenbau" || value.schwerpunkt=="Grundlagenmodul")){
            semModul.push(value);
        }
    }

}

// SWITCH MODULE RIGHT
function switchmodulright() {
    semArray();
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let c = document.getElementById("modulCrP");
    for (var j=0; j < semModul.length + 1; j++) {
        if( j > (semModul.length - 1) ) {
            h.innerHTML = semModul[0].name;
            t.innerHTML = semModul[0].inhalt;
            c.innerHTML = semModul[0].crp;
            break;
        } else if(h.innerHTML == semModul[j].name && j < (semModul.length-1)){
            h.innerHTML = semModul[j+1].name;
            t.innerHTML = semModul[j+1].inhalt;
            c.innerHTML = semModul[j+1].crp;
            break;
       }
           
    }
    
}

// SWITCH MODULE LEFT
function switchmodulleft() {
    semArray();
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let c = document.getElementById("modulCrP");
    for (var j=semModul.length-1; j >= 0; j--) {
        if( j < 1 ) {
            h.innerHTML = semModul[semModul.length-1].name;
            t.innerHTML = semModul[semModul.length-1].inhalt;
            c.innerHTML = semModul[semModul.length-1].crp;
            break;
        } else if(h.innerHTML == semModul[j].name && j > 0){
            h.innerHTML = semModul[j-1].name;
            t.innerHTML = semModul[j-1].inhalt;
            c.innerHTML = semModul[j-1].crp;
            break;
       }
           
    }
    
}





// HEADER MODULSPEZIFISCH SETZEN
function setModule(moduleName) {
    console.log(moduleName);
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let c = document.getElementById("modulCrP");
    for (const [key, value] of Object.entries(modules)) {
        if (value.name == moduleName) {
            h.innerHTML = value.name;
            t.innerHTML = value.inhalt;
            c.innerHTML = value.crp;
       
            let imgsec = document.getElementById("modulSec");
            let links = []
            for(const[key,valuelinks] of Object.entries(value.imgLinks)){
                links = Object.values(valuelinks);
                for(let i=0; i<links.length; i++){
                    let img = document.getElementById("modulBild");
                    img.classList.add("circleImg");
                    img.src = links[i];
                    
                }

            }
           
       /*
            for(const [key, imglink] of Object.entries(value.imgLinks)){
                for(const[key, rimglink] of Object.entries(imglink)){
                    let img = document.createElement('img');
                    img.src = rimglink;
                    img.setAttribute('alt', "modulBild");
                    img.classList.add("createdModuleImage");
                    imgsec.appendChild(img);
                }
            }
            */
        }   
    }
}

function setPraxisphase() {
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("praxisphasenInhalt");
    let c = document.getElementById("praxisphasenCrP");
            h.innerHTML = "Praxisphase";
            t.innerHTML = "Inhalt in Funktion, nicht von json";
            c.innerHTML = "Same here";
}

// HEADER ZURÜCKSETZTEN
function closeModule(){
    let h = document.getElementById("modulUeberschrift");
    h.innerHTML = "Semesterauswahl";
}

function toggleBG(){
    var mainvar = document.getElementById("mainid");
    mainvar.classList.toggle("bgimage");    
}



// SIDEBAR ANIMATION
var xy = 0;
function sidebarswitch(x){
if(xy != x){
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

function sidebarend(){
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