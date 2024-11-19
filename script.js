const body = document.querySelector('body');
const bannerContenedor = document.getElementById('banner-contenedor');
const modeSwitch = document.querySelector(".toggle-switch");
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle');

let currentIndex = 0;
let images = [];
let carouselInterval;

// ==================== CONFIGURACIÓN DE IMÁGENES ====================
const bannerImages = {
    light: ['img/blanco1.webp', 'img/blanco2.webp', 'img/blanco3.webp'], // Modo claro
    dark: ['img/oscuro1.webp', 'img/oscuro2.webp', 'img/oscuro3.webp']  // Modo oscuro
};

// ==================== DETECTAR DISPOSITIVO ====================
function isMobile() {
    return window.innerWidth <= 768; // Detecta si el ancho de la pantalla es de un dispositivo móvil
}

// ==================== FUNCIONES PARA EL BANNER ====================
// Carga las imágenes dependiendo del dispositivo (PC o móvil) y modo (claro/oscuro)
function loadBannerImages() {
    const mode = body.classList.contains("dark") ? 'dark' : 'light'; // Detecta el modo actual
    bannerContenedor.innerHTML = ''; // Limpia el contenedor antes de agregar imágenes

    // Carga las imágenes correspondientes al modo
    images = bannerImages[mode].map(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('banner-imagen'); // Aplica estilos desde el CSS
        bannerContenedor.appendChild(img);
        return img;
    });

    currentIndex = 0;
    if (images.length > 0) {
        images[0].classList.add('active'); // Activa la primera imagen
    }
}
// Inicia el carrusel
function startCarousel() {
    stopCarousel(); // Detenemos cualquier carrusel activo antes de iniciar uno nuevo
    carouselInterval = setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 2500); // Cambia cada 2.5 segundos
}

// Detiene el carrusel
function stopCarousel() {
    clearInterval(carouselInterval);
}

// ==================== FUNCIONES EXISTENTES ====================
// Cambiar entre modo claro y oscuro
function toggleDarkMode() {
    body.classList.toggle("dark");
    loadBannerImages();  // Recarga las imágenes del banner al cambiar de modo
    startCarousel();     // Reinicia el carrusel
}

// ==================== EVENTOS ====================
// Cambiar entre modo claro y oscuro con Control + M
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        toggleDarkMode();
    }
});

// Detectar redimensionamiento de pantalla
window.addEventListener('resize', () => {
    loadBannerImages(); // Recarga las imágenes adaptadas al nuevo tamaño
    startCarousel();    // Reinicia el carrusel
});

// Detectar pérdida de conexión a Internet y mostrar error 404
window.addEventListener('offline', function() {
    // Redirigir a la página 404 cuando se pierde la conexión
    window.location.href = '404.html';
});

// Detectar reconexión a Internet y redirigir a la interfaz de pedidos sin recargar
window.addEventListener('online', function() {
    // Redirigir a la interfaz de pedidos al reconectarse
    window.location.href = 'index.html'; // Cambia esta ruta a la URL que deseas en caso de reconexión
});

// Evento para el botón de la barra lateral
toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Cambiar entre modo claro y oscuro al hacer clic en el interruptor
modeSwitch.addEventListener("click", () => {
    toggleDarkMode(); // Llama a la función que cambia los modos
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
        console.log('Service Worker registrado con éxito.');
    }).catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
    });
}

// ==================== INICIALIZACIÓN ====================
// Inicializa el banner y el carrusel al cargar la página
loadBannerImages(); // Carga las imágenes iniciales del banner
startCarousel();    // Inicia el carrusel del banner
