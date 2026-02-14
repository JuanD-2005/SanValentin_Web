/* --- CONFIGURACIÓN --- */
const targetDate = new Date(2026, 1, 14, 14, 0, 0).getTime(); 

/* --- 1. ABRIR CARTA --- */
function openLetter() {
    const flap = document.getElementById('flap');
    const seal = document.getElementById('seal');
    const letter = document.getElementById('letter');
    const intro = document.getElementById('intro-screen');
    const main = document.getElementById('main-content');
    
    flap.classList.add('open');
    seal.style.opacity = '0';
    
    const music = document.getElementById('bgMusic');
    if(music) {
        music.volume = 0.5;
        music.play().catch(e => console.log("Click necesario para audio"));
    }

    letter.style.transform = 'translateY(-60px) scale(1.1)';

    setTimeout(() => {
        intro.style.transform = 'translateY(-100vh)';
        main.style.display = 'block';
        setTimeout(() => main.style.opacity = '1', 50);
    }, 1000);
}

/* --- 2. BOTÓN "NO" ESCURRIDIZO --- */
const btnNo = document.getElementById('btnNo');
let isMoving = false; // Para saber si ya empezó a moverse

function moveBtn() {
    // Si es la primera vez, cambiamos a fixed para sacarlo del flujo
    if (!isMoving) {
        btnNo.style.position = 'fixed';
        isMoving = true;
    }

    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    
    const frases = ["No...", "¿Segura?", "Piénsalo bien", "Ups, se movió", "Intenta de nuevo"];
    btnNo.innerText = frases[Math.floor(Math.random() * frases.length)];
}

btnNo.addEventListener('mouseover', moveBtn);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveBtn();
});

/* --- 3. ACEPTAR Y BLOQUEO DE ATRÁS --- */
function sayYes() {
    confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 }, 
        colors: ['#d90429', '#ffccd5'] 
    });
    
    // Cambiar visualmente
    document.getElementById('question-view').style.display = 'none';
    document.getElementById('section-confirm').style.display = 'flex';

    // --- MAGIA PARA BLOQUEAR EL BOTÓN ATRÁS ---
    // 1. Empujamos un estado nuevo al historial
    history.pushState({ page: 'confirm' }, "Confirmado", "#love");
    
    // 2. Si intenta ir atrás, volvemos a empujar el estado para que se quede ahí
    window.onpopstate = function(event) {
        history.pushState({ page: 'confirm' }, "Confirmado", "#love");
        alert("¡Ya dijiste que sí! No hay vuelta atrás ❤️");
    };
}

/* --- 4. CUENTA ATRÁS --- */
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff < 0) {
        clearInterval(timer);

        // Elementos de la interfaz
        const contador = document.getElementById("countdown");
        const link = document.getElementById("gameLink");

        // Actualizar texto
        contador.innerText = "¡YA DISPONIBLE!";
        contador.style.animation = "pulse 1s infinite"; // Efecto latido

        // Activar botón de descarga
        link.classList.add("ready");
        link.innerHTML = "DESCARGAR NUESTRA HISTORIA 🎮";

        // --- AQUÍ ESTÁ LA MAGIA ---
        // Como el archivo está en la misma carpeta, solo ponemos su nombre
        link.href = "Historia_De_Amor.exe";

        // Forzamos que el navegador lo descargue en lugar de intentar abrirlo
        link.setAttribute("download", "Historia_De_Amor.exe");

    } else {
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText = `${h}h ${m}m ${s}s`;
    }
}, 1000);