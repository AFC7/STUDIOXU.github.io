// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // ======== INICIALIZACIÓN DE ANIMACIONES AL SCROLL ========
    AOS.init({
        duration: 1000, // Duración de la animación en milisegundos
        once: true,     // La animación solo ocurre una vez
    });

    // ======== MENÚ MÓVIL (HAMBURGUESA) ========
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('abierto');
            menuToggle.classList.toggle('abierto');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('abierto')) {
                    navMenu.classList.remove('abierto');
                    menuToggle.classList.remove('abierto');
                }
            });
        });
    }
});

// ======== GALERÍA Y LIGHTBOX ========
const galleryItems = document.querySelectorAll('.galeria-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex;

// Verifica que todos los elementos necesarios existan
if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
    
    // 1. Añade un "escuchador" de clics a cada imagen de la galería
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'flex'; // Muestra el lightbox
            lightboxImg.src = this.src;      // Pone la imagen grande
            currentIndex = index;            // Guarda la posición de la imagen actual
        });
    });

    // 2. Añade la función al botón de cerrar
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none'; // Oculta el lightbox
    });

    // 3. Añade la función a la flecha "anterior"
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
        lightboxImg.src = galleryItems[currentIndex].src;
    });

    // 4. Añade la función a la flecha "siguiente"
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
        lightboxImg.src = galleryItems[currentIndex].src;
    });
}

// ======== LÓGICA DEL MODAL DE PROMOCIÓN ========
window.addEventListener('load', function() {
    const promoModal = document.getElementById('promo-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Revisa si el modal ya se mostró en esta sesión
    if (!sessionStorage.getItem('promoModalShown')) {
        // Si no se ha mostrado, muéstralo después de 2 segundos
        setTimeout(function() {
            promoModal.classList.add('visible');
            // Guarda un registro de que ya se mostró
            sessionStorage.setItem('promoModalShown', 'true');
        }, 2000);
    }

    // Función para cerrar el modal
    function closeModal() {
        promoModal.classList.remove('visible');
    }

    // Cierra el modal al hacer clic en el botón 'X'
    closeModalBtn.addEventListener('click', closeModal);

    // Cierra el modal al hacer clic en el fondo oscuro
    promoModal.addEventListener('click', function(event) {
        if (event.target === promoModal) {
            closeModal();
        }
    });
});
