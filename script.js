/* --- CONFIGURACIÓN --- */
// FECHA DEL JUEGO: AÑO, MES (0=Ene, 1=Feb), DÍA, HORA (0-23)
const targetDate = new Date(2026, 1, 14, 16, 0, 0).getTime(); 


/* --- 1. ABRIR CARTA --- */
function openLetter() {
    const flap = document.getElementById('flap');
    const seal = document.getElementById('seal');
    const letter = document.getElementById('letter');
    const intro = document.getElementById('intro-screen');
    const main = document.getElementById('main-content');
    
    // Animación visual
    flap.classList.add('open');
    seal.style.opacity = '0';
    
    // Intentar Audio
    const music = document.getElementById('bgMusic');
    if(music) {
        music.volume = 0.5;
        music.play().catch(e => console.log("Click necesario para audio"));
    }

    // Carta sale
    letter.style.transform = 'translateY(-60px) scale(1.1)';

    // Cambio de pantalla
    setTimeout(() => {
        intro.style.transform = 'translateY(-100vh)';
        main.style.display = 'block';
        setTimeout(() => main.style.opacity = '1', 50);
    }, 1000);
}

/* --- 2. BOTÓN "NO" --- */
const btnNo = document.getElementById('btnNo');

function moveBtn() {
    btnNo.style.position = 'fixed';
    
    // Límites seguros
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 50;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    
    // Frases aleatorias (Opcional)
    const frases = ["No...", "Ups", "Muy lento", "¿Segura?", "Intenta otra vez"];
    btnNo.innerText = frases[Math.floor(Math.random() * frases.length)];
}

// Eventos
btnNo.addEventListener('mouseover', moveBtn);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveBtn();
});

/* --- 3. ACEPTAR --- */
function sayYes() {
    // Lluvia de confeti
    confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 }, 
        colors: ['#d90429', '#ffccd5'] 
    });
    
    // Cambiar a pantalla final
    document.getElementById('question-view').style.display = 'none';
    document.getElementById('section-confirm').style.display = 'flex';
}

/* --- 4. CUENTA ATRÁS --- */
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerText = "¡DISPONIBLE!";
        const link = document.getElementById("gameLink");
        link.classList.add("ready");
        link.innerHTML = "JUGAR AHORA 🎮";
        // IMPORTANTE: Pon aquí el link de tu juego cuando lo subas
        // link.href = "https://tu-link-de-descarga.com/juego.zip";
    } else {
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText = `${h}h ${m}m ${s}s`;
    }
}, 1000);