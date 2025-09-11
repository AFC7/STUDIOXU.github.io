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

    // ======== GALERÍA Y LIGHTBOX ========
    const galleryItems = document.querySelectorAll('.galeria-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex;

    if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
                currentIndex = index;
            });
        });

        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
            lightboxImg.src = galleryItems[currentIndex].src;
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
            lightboxImg.src = galleryItems[currentIndex].src;
        });
    }

    // ======== LÓGICA DE FILTROS DE GALERÍA ========
    const filtroBotones = document.querySelectorAll('.filtro-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    if (filtroBotones.length > 0 && galeriaItems.length > 0) {
        filtroBotones.forEach(boton => {
            boton.addEventListener('click', () => {
                // Marca el botón activo
                filtroBotones.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');

                const filtro = boton.getAttribute('data-filter');

                // Muestra u oculta los items de la galería
                galeriaItems.forEach(item => {
                    const categoria = item.getAttribute('data-category');
                    
                    if (filtro === 'all' || filtro === categoria) {
                        item.style.display = 'block'; // Muestra el item
                    } else {
                        item.style.display = 'none'; // Oculta el item
                    }
                });
            });
        });
    }

}); // Fin de DOMContentLoaded

// ======== LÓGICA DEL MODAL DE PROMOCIÓN (APARECE SIEMPRE) ========
window.addEventListener('load', function() {
    const promoModal = document.getElementById('promo-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Verifica que el modal exista en la página antes de continuar
    if (promoModal && closeModalBtn) {
        // Muestra el modal siempre, después de 2 segundos
        setTimeout(function() {
            promoModal.classList.add('visible');
        }, 2000);

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
    }
});
