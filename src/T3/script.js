gsap.registerPlugin(CustomEase);

// Slide Animation

const slides = document.querySelectorAll(".page");
const container = document.querySelector(".page-container");

let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;
let ih;
/*const mouseAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const handAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const cursorAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const arrowAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });*/

for (let i = 0; i < slides.length; i++) {
    let newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.index = i;
    navDots.push(newDot);
    newDot.addEventListener("click", slideAnim);
    dots.appendChild(newDot);
  }

  function getActiveSlideIndex(e){
    activeSlide = e;
  }

  function getTafelspalteId(slideIndex){
    if (slideIndex == 0) return "#tafelspalte1";
    else if (slideIndex == 1) return "#tafelspalte2";
    else if (slideIndex == 2) return "#tafelspalte3";
  }
  
  gsap.set(".dots", {xPercent: -50});  
  
  const dotAnim = gsap.timeline({ paused: true });
  dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none"
  },
  0.5
  );
  dotAnim.time(1);

  let dragMe = Draggable.create(container, {
    type: "x",
    edgeResistance: 1,
    snap: offsets,
    inertia: true,
    bounds: ".master-container",
    onDrag: tweenDot,
    onThrowUpdate: tweenDot,
    onDragEnd: slideAnim,
    allowNativeTouchScrolling: false,
    zIndexBoost: false
  });
  dragMe[0].id = "dragger"; 

  function slideAnim(e) {
    //gsap.set(getTafelspalteId(oldSlide),{visibility: "hidden"});
    oldSlide = activeSlide;
    if (this.id === "dragger") {
      activeSlide = offsets.indexOf(this.endX);
    } else {
      if (gsap.isTweening(container)) {
        return;
      }if (this.className === "dot") {
        activeSlide = this.index;
      }
    } 
    // Am Anfang oder Ende stoppen
    activeSlide = activeSlide < 0 ? 0 : activeSlide;
    activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
    if (oldSlide === activeSlide) {
      return;
    }
    gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
    //gsap.set(getTafelspalteId(activeSlide),{visibility: "visible"});

  }

  function sizeIt() {
    offsets = [];
    gsap.set(".master-container",{width: "100%", height: "100%", position: "absolute", overflow: "hidden", top: "0"});
    gsap.set(".page", {position: "relative", float: "left"});
    gsap.set(".page-container", { visibility: "visible",});
    gsap.set(".page-container", { width: slides.length * iw,});
    gsap.set(slides, { width: iw });
    for (let i = 0; i < slides.length; i++) {
      offsets.push(-slides[i].offsetLeft);
    }
    gsap.set(container, { x: offsets[activeSlide] });
    dragMe[0].vars.snap = offsets;
  }

  function tweenDot() {
    gsap.set(dotAnim, {
      time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
    });
  }

//Zoom Animation
  


var root  = document.documentElement;
var body  = document.body;
var pages = document.querySelectorAll(".page");
var tiles = document.querySelectorAll(".tafelspalte");
var icons = document.querySelectorAll(".responsiveimg");


for (var i = 0; i < tiles.length; i++) {  
  addListeners(tiles[i], pages[i], icons[i]);
}

function addListeners(tile, page, icon) {
  
  icon.addEventListener("click", function() {
    animateHero(tile, page);
  });
  
  /*page.addEventListener("click", function() {
    animateHero(page, tile);
  }); */ 
}

function animateHero(fromHero, toHero) {
  $(function() {
    var hheight = parseFloat($('.header').height()) + parseFloat($(".header").css("borderBottomWidth"));
    var fheight = parseFloat($(".footer").height()) + parseFloat($(".footer").css("borderTopWidth"));
    $('.page').css({'top' : hheight + 'px'});
    $(".page").height($(window).height() - (hheight + fheight));
  })

  var clone = fromHero.cloneNode(true);
      
  var from = calculatePosition(fromHero);
  var to = calculatePosition(toHero);
  var header = document.querySelector(".header");
  let headerheight = header.offsetHeight; 
  
  TweenLite.set([fromHero, toHero], { visibility: "hidden" });
  TweenLite.set(clone, { position: "absolute", margin: 0 });
  
  body.appendChild(clone);  
      
  var style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: Power1.easeOut,
    onComplete: onComplete
  };
   
  TweenLite.set(clone, from);  
  TweenLite.to(clone, 1, style)
    
  function onComplete() {
    
    TweenLite.set(toHero, { visibility: "visible",});
    body.removeChild(clone);
    sizeIt();
    tweenDot();
    gsap.set(".dots",{visibility: "visible"});
  }
}

function calculatePosition(element) {
    
  var rect = element.getBoundingClientRect();
  
  var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
  
  var clientTop  = root.clientTop  || body.clientTop  || 0;
  var clientLeft = root.clientLeft || body.clientLeft || 0;
    
  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
}

// Navigation
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


