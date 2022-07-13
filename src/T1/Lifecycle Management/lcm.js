window.addEventListener('resize', function() {
        location.href = "lcm.html";
  }, true);


//Pfeile
var container = document.getElementById('arrow-master');

var setup = function () {
    var width = parseFloat($('#arrow-master').width()) / 2;
    var height = parseFloat($('#arrow-master').height()) / 2;
    if (width > height) {
        radius = height;
    }
    else {
        radius = width * 1.5;
    }
    //var containerWidth = parseFloat($('#arrow-master').width());
    var theta = [0, Math.PI / 4, Math.PI / 2, 3 * (Math.PI / 4), Math.PI, 5 * (Math.PI / 4), 3 * (Math.PI / 2), 7 * (Math.PI / 4)];
    var arrowSrcs = ["../../../res/images/T1/pfeil3.png", "../../../res/images/T1/pfeil2.png", "../../../res/images/T1/pfeil1.png", "../../../res/images/T1/pfeil8.png", "../../../res/images/T1/pfeil7.png", "../../../res/images/T1/pfeil6.png", "../../../res/images/T1/pfeil5.png", "../../../res/images/T1/pfeil4.png"]
    var degrees = [100, 55, 10, 325, 280, 235, 190, 145];
    var helperArray = [3, 2, 1, 8, 7, 6, 5, 4]; //3 2 1 P 7 6 5 4
    var circleArray = [];
    var arrowArray = [];
    for (let i = 0; i < 8; i++) {
        var arrowDiv = document.createElement('div');
        var arrow = document.createElement("img");
        arrowDiv.className = 'arrow-container number' + i;
        arrow.className = 'arrow number' + i;
        arrow.src = arrowSrcs[i];
        arrow.addEventListener("click", function () { setList(helperArray[i], 'Life Cycle Management') });
        arrow.addEventListener("click", function () { sidebarswitch(helperArray[i]) });
        circleArray.push(arrowDiv);
        arrowArray.push(arrow);
        circleArray[i].posx = Math.round(radius * (Math.cos(theta[i]))) + 'px';
        circleArray[i].posy = Math.round(radius * (Math.sin(theta[i]))) + 'px';
        circleArray[i].style.position = "absolute";
        circleArray[i].style.top = ((height) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
        circleArray[i].style.left = ((width) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
        gsap.set(circleArray[i], { xPercent: -50 });
        gsap.set(circleArray[i], { yPercent: -50 });
        arrowArray[i].style.transform = "rotate(" + degrees[i] + "deg)";
        arrowArray[i].style.height = radius * 1 + "px";
        arrowArray[i].style.width = radius * 1 + "px";
        container.appendChild(circleArray[i]);
        circleArray[i].appendChild(arrowArray[i]);
    }
    //gsap.set("#arrow-master", {xPercent: 0});
    //$('.arrow').css({'max-width' : '100%', "height" : "auto"});

};
setup();
gsap.to(container, 45, { rotation: "360", ease: Linear.easeNone, repeat: -1 });

