const counterNumber = document.getElementById("counterNumber");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");


// HEDEF TARİH VE SAAT
const targetDate = new Date("2026-08-31T20:00:00");

const finalImage = document.getElementById("finalImage");


// Sayaç bitiş işlemi sadece bir kez çalışsın
let countdownFinished = false;


// ======================================
// CANVAS BOYUTU
// ======================================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ======================================
// GERİ SAYIM
// ======================================

function updateCounter() {

    const now = new Date();

    const difference = targetDate - now;


    // Sayaç bittiyse
    if (difference <= 0) {

        counterNumber.textContent = "00:00:00:00";


        if (!countdownFinished) {

            countdownFinished = true;

            finishCountdown();
        }

        return;
    }


    // Gün
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    // Saat
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    // Dakika
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    // Saniye
    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    const formattedDays =
        String(days).padStart(2, "0");

    const formattedHours =
        String(hours).padStart(2, "0");

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(seconds).padStart(2, "0");


    counterNumber.textContent =
        `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;


    // Son 1 dakikaya girince bounce başlasın
    if (difference <= 60 * 1000) {

        counterNumber.classList.remove("bounce");

        void counterNumber.offsetWidth;

        counterNumber.classList.add("bounce");
    }
}


// ======================================
// SAYAÇ BİTİNCE
// ======================================

function finishCountdown() {

    startFireworks();


    // Havai fişek başladıktan kısa süre sonra rakamları kaybet
    setTimeout(() => {

        counterNumber.classList.add("finished");

    }, 250);
}


// ======================================
// HAVAİ FİŞEK PARÇACIKLARI
// ======================================

let particles = [];


// Tek bir patlama oluşturur
function createExplosion(x, y) {

    const particleCount = 100;


    for (let i = 0; i < particleCount; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 6 + 2;


        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,

            size: Math.random() * 3 + 1,

            hue: Math.random() * 100 + 240
        });
    }
}


// ======================================
// HAVAİ FİŞEK BAŞLAT
// ======================================

function startFireworks() {

    createExplosion(
        canvas.width * 0.25,
        canvas.height * 0.45
    );


    setTimeout(() => {

        createExplosion(
            canvas.width * 0.75,
            canvas.height * 0.40
        );

    }, 200);


    setTimeout(() => {

        createExplosion(
            canvas.width * 0.50,
            canvas.height * 0.55
        );

    }, 400);


    setTimeout(() => {

        createExplosion(
            canvas.width * 0.35,
            canvas.height * 0.30
        );

    }, 600);


    setTimeout(() => {

        createExplosion(
            canvas.width * 0.68,
            canvas.height * 0.28
        );

    }, 800);


    animateFireworks();

    

}


// ======================================
// HAVAİ FİŞEK ANİMASYONU
// ======================================

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;


        // Hafif yerçekimi
        particle.vy += 0.045;


        // Parçacık biraz yavaşlasın
        particle.vx *= 0.985;
        particle.vy *= 0.985;


        // Yavaşça kaybolsun
        particle.alpha -= 0.012;


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`;


        ctx.fill();
    });


    // Görünmez olan parçacıkları sil
    particles = particles.filter(
        particle => particle.alpha > 0
    );


    if (particles.length > 0) {

        requestAnimationFrame(
            animateFireworks
    );

    } else {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        changeToGreenBackground();
    }
}

function changeToGreenBackground() {

    document.body.classList.add("green-background");

}

function changeToGreenBackground() {

    document.body.classList.add("green-background");


    setTimeout(() => {

        finalImage.classList.add("show");

    }, 1000);

}


// ======================================
// BAŞLAT
// ======================================

updateCounter();

setInterval(updateCounter, 1000);