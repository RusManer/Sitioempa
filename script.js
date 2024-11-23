const body = document.querySelector('body');
const bannerContenedor = document.getElementById('banner-contenedor');
const modeSwitch = document.querySelector(".toggle-switch");
const toggleButton = document.querySelector('.toggle');
const pedidosLink = document.getElementById('pedidosLink');
let currentIndex = 0;
let images = [];
let carouselInterval;

// ==================== CONFIGURACIÓN DE IMÁGENES ====================
const bannerImages = {
    pc: { // Imágenes para PC
        light: ['img/blanco1.webp', 'img/blanco2.webp', 'img/blanco3.webp'],
        dark: ['img/oscuro1.webp', 'img/oscuro2.webp', 'img/oscuro3.webp']
    },
    mobile: { // Imágenes para móviles
        light: ['img/mobil1.webp', 'img/mobil2.webp', 'img/mobil3.webp'],
        dark: ['img/mobile1.webp', 'img/mobile2.webp', 'img/mobile3.webp']
    }
};

// ==================== DETECTAR DISPOSITIVO ====================
function isMobile() {
    return window.innerWidth <= 768; // Detecta si el ancho de la pantalla es de un dispositivo móvil
}

// ==================== FUNCIONES PARA EL BANNER ====================
// Carga las imágenes dependiendo del dispositivo (PC o móvil) y modo (claro/oscuro)
function loadBannerImages() {
    const mode = body.classList.contains("dark") ? 'dark' : 'light'; // Detecta el modo actual
    const deviceType = isMobile() ? 'mobile' : 'pc'; // Selecciona el conjunto de imágenes según el dispositivo
    bannerContenedor.innerHTML = ''; // Limpia el contenedor antes de agregar imágenes

    // Carga las imágenes correspondientes al dispositivo y modo
    images = bannerImages[deviceType][mode].map(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('banner-imagen');
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

// ==================== DETECCIÓN DE ERROR 404 ====================
// Detectar pérdida de conexión a Internet y redirigir a la página de error
window.addEventListener('offline', function () {
    // Redirigir a una página personalizada de error 404
    window.location.href = '404.html';
});

// Detectar reconexión a Internet y redirigir a la página principal
window.addEventListener('online', function () {
    // Redirigir al inicio o a una página específica
    window.location.href = 'index.html';
});

// ==================== COMANDOS ====================
// Comando para alternar modo claro/oscuro con Ctrl + M
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        toggleDarkMode();
    }
});

// Comando para redirigir a la página de pedidos con Ctrl + P
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        if (pedidosLink) {
            window.location.href = pedidosLink.href;
        }
    }
});

// ==================== EVENTOS ====================
// Detectar redimensionamiento de pantalla
window.addEventListener('resize', () => {
    loadBannerImages(); // Recarga las imágenes adaptadas al nuevo tamaño
    startCarousel();    // Reinicia el carrusel
});

// Manejo de barra lateral
toggleButton.addEventListener("click", () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle("close");
});

// Cambiar entre modo claro y oscuro al hacer clic en el interruptor
modeSwitch.addEventListener("click", () => {
    toggleDarkMode(); // Llama a la función que cambia los modos
});

// ==================== REGISTRO DE SERVICE WORKER ====================
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
