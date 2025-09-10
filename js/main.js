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