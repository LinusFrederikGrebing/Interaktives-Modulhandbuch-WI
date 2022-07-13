// timeline für die Animation des THM-Logos

function logo() {
    var tl = gsap.timeline();
    tl
        .from('body', {
                backgroundImage: 'linear-gradient(rgba(255, 255,255,1) 0%, rgba(255,255,255,1) 100%)',
                duration: 2,
                delay: 2
            }
        )
        .to('#gesamtesLogo', {
                duration: 1.8,
                delay: 2,
                transform: 'translateY(40vh)',
                ease: "sine"
            },
            "-=3"
        )
        .to('#gesamtesLogo', {
                duration: 0.5,
                autoAlpha: 0
            },
            "+=1"
        );
    return tl;
}


// timeline für Animation der Blöcke des THM-Logos

function bloecke() {
    var tl = gsap.timeline();
    tl
        .from('.bloecke', {
                autoAlpha: 0,
                duration: 2,
            },
            ""
        )
        .to('.gruen', {
                background: '#4C5C66',
                duration: 0.75,
            },
            "+=0.2"
        )
        .set('.bloecke', {autoAlpha: 0});
    return tl;
}



    // Erstellt Noten

    function generateNoten() {
        for (let i = 1; i <= 4; i++) {
            let svgNote = document.createElement("img");
            svgNote.src = "svgs/note.svg";
            svgNote.id = "svg_note" + i;
            document.getElementById("noten").appendChild(svgNote);
        }
    }

    generateNoten();


    // Bestimmt welchen Pfad der Papierflieger nehmen soll (je nach Bildschirmbreite)

    function pathFinder() {
        if (window.matchMedia("(max-width: 1000px)").matches) {
            return "#pathMobile";
        } else if (window.matchMedia("(min-width: 1000px) and (max-width: 1500px)").matches) {
            return "#pathDesktopKlein";
        } else {
            return "#pathDesktopGross"
        }
    }


// timeline für Animationen bezüglich Haus, Natur, Himmel, etc.

function haus() {

    var tl = gsap.timeline();
    tl
        .to('#svg_gebäude, .boden', {
                autoAlpha: 1,
                duration: 1.5,
                ease: "circ"
            }
        )
        .from('#svg_thmSchriftzug, #svg_wirtschaftsingenieurwesen',
            {
                autoAlpha: 0,
                y: 20,
                duration: 1.5,
                stagger: 0.4
            },
            '>'
        )
        .from('#svg_baeume', {
                autoAlpha: 0,
                y: 30,
                duration: 1.5,
            },
            '>'
        )
        .from('#svg_baeumeFullHD', {
                autoAlpha: 0,
                y: 30,
                duration: 1.5,
            },
            '<'
        )
        .from('#svg_türLinks, #svg_türRechts, .türspalt, #svg_portal', {
                autoAlpha: 0,
                y: 30,
            },
            '<'
        )
        .from('#svg_wolken', {
                autoAlpha: 0,
                y: 300,
                duration: 1.5
            },
            '+=0.5'
        )
        .from('#svg_sonne', {
                autoAlpha: 0,
                y: -100,
                duration: 1
            },
            '<'
        )
        .to('#svg_sonne', {
                duration: 4,
                rotate: 360,
                ease: "back.out(1.2)",
                repeat: -1,
                repeatDelay: 10,
            },
            '<'
        )
        .set('#svg_papierflieger', {
            autoAlpha: 1
        })
        .to('#svg_papierflieger', {
                duration: 8,
                motionPath: {
                    path: pathFinder(),
                    align: pathFinder(),
                    autoRotate: true,
                }
            },
            '>'
        )
        .set('#svg_papierflieger', {
                autoAlpha: 0,
            },
            '>'
        )
        .from('#svg_vogel1, #svg_vogel2', {
                autoAlpha: 0,
                y: -100,
                duration: 2,
                ease: Elastic.easeOut.config(0.5, 0.3)
            },
            '>-2'
        )
        .to('#noten img', {
                autoAlpha: 0,
                duration: 2,
                y: "random(-200, -250)",
                x: "random(-40, 40)",
                stagger: 0.3,
                width: "random(30, 50)",
                repeat: -1,
                repeatDelay: 7,
            },
            '>'
        )
        .to('#scooter img', {
            autoAlpha: 1
        })
        .from('#scooter img', {
                duration: 5,
                transform: 'translateX(-45vw)',
            },
            '+=0.5'
        )
        .to('#scooter img', {
                duration: 2,
                opacity: 0.2,
                repeat: -1,
                yoyo: true
            }
        )
        .to('#svg_hand', {
                autoAlpha: 1,
                duration: 2,
                yoyo: true,
                repeat: -1
            },
            '+=0.5'
        );
    return tl;
}


// master timeline

let master = gsap.timeline();
master
    .set('img:not(#gesamtesLogo), .boden', {visibility: 'hidden',})
    .add(logo())
    .add(bloecke())
    .add(haus());


// Animationen zur Türöffnung

function tuerenKlick() {
    var tuerenKlick = gsap.timeline();

    tuerenKlick.set('#svg_portal', {
        opacity: 1,
    })

    tuerenKlick.set('.türspalt', {
        opacity: 0,
    })


    tuerenKlick.to('#svg_türLinks', {
        duration: 1.5,
        x: "-100%",
    })

    tuerenKlick.to('#svg_türRechts', {
            duration: 1.5,
            x: "89%",
        },
        '<'
    )

    tuerenKlick.to('html', {
        delay: 2,
        visibility: "hidden",
        backgroundColor: "black",
        onComplete: setTimeout(function () {
            window.location.href = "../T3/view.html";
        }, 1000)
    })
}


function test() {
    console.log("test");
    setTimeout(function () {
        window.location.href = "../T3/view.html";
    }, 1000);
}
