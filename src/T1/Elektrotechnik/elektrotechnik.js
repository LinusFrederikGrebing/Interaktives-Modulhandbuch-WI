// Bewegt Licht zum nächsten Pin in X- oder Y-Richtung

function lightY(i) {
    let x = window.matchMedia("(max-width: 449px)")
    if (x.matches) {
        return (23.8 * i) + "vw";
    } else {
        return (16.35 * i) + "vh";
    }
}

function lightX(i) {
    let x = window.matchMedia("(max-width: 449px)")
    if (x.matches) {
        return (9.13 * i) + "vw";
    } else {
        return (6.27 * i) + "vh";
    }
}


// Pins und Kabel im Chip erzeugen

function generatePins() {
    let et = '"Elektrotechnik"';
    for (let i = 1; i <= 7; i++) {
        let pin = document.createElement("div");
        pin.setAttribute('onclick', 'sidebarswitch(' + i + '); setList(' + i + ', ' + et + ') ');
        pin.className = "pindefault";
        pin.id = "pin" + i;
        let num = document.createElement("span");
        num.className = "number";
        num.textContent = i;
        document.getElementsByClassName("pins")[0].appendChild(pin);
        document.getElementById("pin" + [i]).appendChild(num);
    }
}

function generateWires() {
    for (let i = 1; i <= 6; i++) {
        let wire = document.createElement("div");
        wire.className = "wiredefault";
        wire.id = "wire" + i;
        document.getElementsByClassName("wires")[0].appendChild(wire);
    }
}

function generateLights() {
    let li = $(".lightdefault:first")
    for (let i = 1; i <= 10; i++) {
        li.clone().appendTo(".lights");
    }
}

generateLights();
generatePins();
generateWires();

gsap.from("#pin7, #pin8", {
        backgroundColor: "orange",
        duration: 1.5,
        repeat: -1,
        yoyo: 1
    }
)

function lights() {
    let tl = gsap.timeline({repeat: -1, defaults: {duration: 0.4, stagger: 0.4}});

    tl
        .to(".lightdefault", {
                y: lightY(1),
            }
        )
        .to(".lightdefault", {
                x: lightX(1.5),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                x: lightX(0),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                y: lightY(2),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                x: lightX(3),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                y: lightY(1),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                x: lightX(4.5),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                x: lightX(3),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                y: lightY(0),
            },
            '<+0.4'
        )
        .to(".lightdefault", {
                x: lightX(0),
            },
            '<+0.4'
        );
    return tl;
}

let master = gsap.timeline();
master  
    .add(lights())
    .add(lights(), '>-4');
