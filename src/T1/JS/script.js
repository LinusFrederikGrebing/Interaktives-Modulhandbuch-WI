function semesterwahl(){
    var semester = document.getElementsByClassName("semesterauswahl");
    var modul = document.getElementsByClassName("modulansicht");
    for (var i=0; i < semester.length; i++) {
        semester[i].classList.remove("inaktiv");
        }
    for (var j=0; j < modul.length; j++) {
        modul[j].classList.add("inaktiv");
        }
}


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
