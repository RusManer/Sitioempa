const body = document.querySelector('body');
const bannerContenedor = document.getElementById('banner-contenedor');
const modeSwitch = document.querySelector(".toggle-switch");
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle');

const bannerImages = {
    light: ['img/blanco1.webp', 'img/blanco2.webp', 'img/blanco3.webp'],
    dark: ['img/oscuro1.webp', 'img/oscuro2.webp', 'img/oscuro3.webp']
};

let currentIndex = 0;
let images = [];
let carouselInterval;

// Función para cargar las imágenes en el carrusel
function loadBannerImages() {
    const mode = body.classList.contains("dark") ? 'dark' : 'light';
    bannerContenedor.innerHTML = '';

    images = bannerImages[mode].map(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('banner-imagen');
        bannerContenedor.appendChild(img);
        return img;
    });

    currentIndex = 0;
    images[0].classList.add('active');
}

// Función para iniciar el carrusel
function startCarousel() {
    stopCarousel(); // Detener cualquier intervalo existente antes de iniciar uno nuevo
    carouselInterval = setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 2500); // Cambia cada 2.5 segundos
}

// Función para detener el carrusel
function stopCarousel() {
    clearInterval(carouselInterval);
}

// Función para cambiar entre modos claro y oscuro
function toggleDarkMode() {
    body.classList.toggle("dark");
    loadBannerImages();  // Cargar las imágenes correspondientes al modo
    startCarousel();      // Reiniciar el carrusel
}

// Cambiar entre modo claro y oscuro con el switch
modeSwitch.addEventListener("click", toggleDarkMode);

// Evento para cambiar modo con Control + M
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        toggleDarkMode();
    }
});

// Evento para redirigir a la página de pedidos con Control + P
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        window.location.href = pedidosLink.href;
    }
});

// Inicializar el carrusel
loadBannerImages();
startCarousel();

// Evento para el botón de la barra lateral
toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("close");
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
        console.log('Service Worker registrado con éxito.');
    }).catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
    });
}
