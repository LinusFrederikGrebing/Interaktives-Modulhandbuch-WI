// DREHUNG ZAHNRÄDER - MASCHINENBAU
var dur = 20;

var loopAnimpos360 = gsap.to(".grund, .erstes, .praxisphase, .drittes, .funftes",  {
    rotation: 360,
    duration: dur,
    ease: "none",
    onComplete: () => loopAnimpos360.play(0)
});

const loopAnimneg360 = gsap.to(".zweites, .viertes, .sechstes, .siebtes, .Kolloquium, .Bachelor", {
    rotation: -360,
    duration: dur,
    ease: "none",
    onComplete: () => loopAnimneg360.play(0)
});


