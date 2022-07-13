/* GEMEINSAME JS FÜR NAVIGATION UND FOOTER */

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
    let $fr = document.getElementsByTagName("footer");
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
            width: '100%',
            height: "10fr",
            duration: 0.5,
            ease: "none",
        });

        gsap.to(".footerSmall table", {
            visibility: "visible"
        });

        gsap.to(".footerSmall", {
            height: "25vh",
        });

    } else {
        gsap.to(".footerSmall", {
            height: "5vh",
        });
        gsap.to(".footerSmall table", {
            visibility: "hidden"
        });
        gsap.to(".ArrowFooter", {
            rotation: 360,
            duration: 0.5,
            ease: "none",
        });
        gsap.to(".footer-section", {
            height: "10fr",
            duration: 0.5,
            ease: "none",
        });
    }
    $footer.toggleClass('collapsed');

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
