
// DREHUNG ZAHNRÄDER - MASCHINENBAU

gsap.registerPlugin(CustomEase);
var animation = document.getElementById("animation");

CustomEase.create("myEase", "M0,0,C0,0,0.695,0.677,0.862,0.842,0.882,0.861,1,1,1,1")

var dur = 20;

var loopAnimpos360 = gsap.to(".grund, .erstes, .buttonlogo, .praxisphase, .drittes, .funftes, .image",  {
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



/*
$(window).on("load", function() {

    var tl = new TimelineMax({repeat:-1});
    tl.to(".tafelimg", 10, {
        backgroundPosition: "-80vw 0px",
        autoRound: true,
        ease: Linear.easeNone
    });
    
    });
*/
//NAVIGATION

var menuBar = gsap.timeline({ paused: true });
var navTl = gsap.timeline({ paused: true });


navTl.to('.sectionfull', {

    display: "block",
    ease: Expo.easeInOut
});

navTl.to('.backgroundnav', {
    duration: 0.2,
    opacity: 1,
    ease: Expo.easeInOut
});

navTl.from('.main-menu li a', {
    duration: 1,
    y: "100%",
    stagger: 0.2,
    ease: Expo.easeInOut
});

navTl.reverse();

buttonlogo.addEventListener('click', function() {
    menuBar.reversed(!menuBar.reversed());
    navTl.reversed(!navTl.reversed());
});



//FOOTER

function footerStart() {
    
    var footerArrow = document.getElementsByClassName("ArrowFooter");
    const $footer = $('.footer-section');
    
    if (!$footer.hasClass('collapsed')) {

        gsap.to(".ArrowFooter", {
            rotation: 0,
            duration: 0,
        });

       gsap.to(".ArrowFooter", {
            rotation: 180,
            duration: 0.5,
            ease: "none",
        });

        gsap.to(".footer-section", {
          height: "10vh",
          duration: 0.5,
          ease: "none",
        });

       
    } else {
        gsap.to(".ArrowFooter", {
            rotation: 360,
            duration: 0.5,
            ease: "none",
        });
        gsap.to(".footer-section", {
            height: "0vh",
            duration: 0.5,
            ease: "none",
          });
    }
    $footer.toggleClass('collapsed');
    
}

