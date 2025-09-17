// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // ======== INICIALIZACIÓN DE ANIMACIONES AL SCROLL ========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, // Duración de la animación en milisegundos
            once: true,     // La animación solo ocurre una vez
        });
    }

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
    const galeriaGridItems = document.querySelectorAll('.galeria-item');

    if (filtroBotones.length > 0 && galeriaGridItems.length > 0) {
        filtroBotones.forEach(boton => {
            boton.addEventListener('click', () => {
                filtroBotones.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                const filtro = boton.getAttribute('data-filter');
                galeriaGridItems.forEach(item => {
                    const categoria = item.getAttribute('data-category');
                    if (filtro === 'all' || filtro === categoria) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ======== LÓGICA DEL MODAL DE PROMOCIÓN ========
    const promoModal = document.getElementById('promo-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (promoModal && closeModalBtn) {
        // Muestra el modal después de 2 segundos de cargar la página
        setTimeout(function() {
            promoModal.classList.add('visible');
        }, 2000);

        function closeModal() {
            promoModal.classList.remove('visible');
        }

        closeModalBtn.addEventListener('click', closeModal);
        promoModal.addEventListener('click', function(event) {
            if (event.target === promoModal) {
                closeModal();
            }
        });
    }
});
