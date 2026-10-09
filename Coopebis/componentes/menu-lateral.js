/* ============================================================
    JAVASCRIPT PARA MENU LATERAL MOVIL
    ============================================================
    
    DESCRIPCION:
    Este archivo controla la funcionalidad del menu lateral:
    - Abrir/cerrar el menu al hacer clic en el hamburguesa
    - Abrir/cerrar submenus tipo acordeon
    - Cerrar el menu al hacer clic en el overlay
    - Cerrar el menu al presionar la tecla Escape
    
    COMO USAR:
    1. Vincula este archivo al final de tu HTML:
       <script src="componentes/menu-lateral.js"></script>
    2. Asegurate de tener el HTML del menu lateral en tu pagina
    3. Asegurate de que el boton hamburguesa tenga la clase .menu-mobile-toggle
       o el ID #menu-mobile-toggle
    
============================================================ */

// ============================================================
// INICIALIZACION
// ============================================================
// Espera a que el DOM este completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initMenuLateral();
});

// ============================================================
// FUNCION PRINCIPAL DE INICIALIZACION
// ============================================================
function initMenuLateral() {
    
    // ========================================
    // OBTENER ELEMENTOS DEL DOM
    // ========================================
    
    // Boton hamburguesa (busca por clase o por ID)
    const menuToggle = document.querySelector('.menu-mobile-toggle') || 
                       document.getElementById('menu-mobile-toggle');
    
    // Menu lateral
    const menuLateral = document.getElementById('menu-lateral');
    
    // Overlay (fondo oscuro)
    const menuOverlay = document.getElementById('menu-overlay');
    
    // Boton cerrar (X)
    const btnCerrarMenu = document.getElementById('btn-cerrar-menu');
    
    
    // ========================================
    // VERIFICAR QUE EXISTAN LOS ELEMENTOS
    // ========================================
    if (!menuToggle || !menuLateral) {
        // Si no existen los elementos, no hacer nada
        // Esto evita errores en paginas que no usan el menu lateral
        return;
    }
    
    
    // ========================================
    // FUNCION: ABRIR MENU
    // ========================================
    function abrirMenu() {
        menuLateral.classList.add('activo');
        if (menuOverlay) {
            menuOverlay.classList.add('activo');
        }
        // Prevenir scroll del body cuando el menu esta abierto
        document.body.style.overflow = 'hidden';
    }
    
    
    // ========================================
    // FUNCION: CERRAR MENU
    // ========================================
    function cerrarMenu() {
        menuLateral.classList.remove('activo');
        if (menuOverlay) {
            menuOverlay.classList.remove('activo');
        }
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
    
    
    // ========================================
    // FUNCION: TOGGLE MENU (ABRIR/CERRAR)
    // ========================================
    function toggleMenu() {
        if (menuLateral.classList.contains('activo')) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    }
    
    
    // ========================================
    // EVENTOS
    // ========================================
    
    // Clic en boton hamburguesa -> Abrir/cerrar menu
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Clic en boton cerrar (X) -> Cerrar menu
    if (btnCerrarMenu) {
        btnCerrarMenu.addEventListener('click', cerrarMenu);
    }
    
    // Clic en overlay -> Cerrar menu
    if (menuOverlay) {
        menuOverlay.addEventListener('click', cerrarMenu);
    }
    
    // Tecla Escape -> Cerrar menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuLateral.classList.contains('activo')) {
            cerrarMenu();
        }
    });
    
    
    // ========================================
    // SUBMENUS (ACORDEON)
    // ========================================
    
    // Obtener todos los items que tienen submenu
    const itemsConSubmenu = menuLateral.querySelectorAll('.tiene-submenu');
    
    itemsConSubmenu.forEach(function(item) {
        // Obtener el enlace principal del item
        const enlace = item.querySelector('.nav-lateral-link');
        
        if (enlace) {
            enlace.addEventListener('click', function(e) {
                // Solo actuar si tiene el atributo data-submenu
                if (enlace.getAttribute('data-submenu') === 'true') {
                    e.preventDefault();
                    
                    // Toggle de la clase 'submenu-activo'
                    item.classList.toggle('submenu-activo');
                    
                    // ========================================
                    // OPCION: CERRAR OTROS SUBMENUS AL ABRIR UNO
                    // Descomenta el siguiente codigo si quieres que
                    // solo un submenu este abierto a la vez:
                    // ========================================
                    /*
                    itemsConSubmenu.forEach(function(otroItem) {
                        if (otroItem !== item) {
                            otroItem.classList.remove('submenu-activo');
                        }
                    });
                    */
                }
            });
        }
    });
    
    
    // ========================================
    // CERRAR MENU AL HACER CLIC EN UN ENLACE
    // ========================================
    // Opcional: cerrar el menu cuando se hace clic en un enlace
    // que no tiene submenu
    
    const enlacesSinSubmenu = menuLateral.querySelectorAll('.nav-lateral-link:not([data-submenu="true"])');
    const enlacesSubmenu = menuLateral.querySelectorAll('.submenu-lateral-link');
    
    // Cerrar menu al hacer clic en enlaces sin submenu
    enlacesSinSubmenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            // Pequeno retraso para permitir la navegacion
            setTimeout(cerrarMenu, 100);
        });
    });
    
    // Cerrar menu al hacer clic en enlaces de submenu
    enlacesSubmenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            setTimeout(cerrarMenu, 100);
        });
    });
}


// ============================================================
// FUNCIONES UTILES ADICIONALES
// ============================================================

// Funcion para abrir el menu programaticamente
// Uso: abrirMenuLateral();
function abrirMenuLateral() {
    const menuLateral = document.getElementById('menu-lateral');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuLateral) {
        menuLateral.classList.add('activo');
    }
    if (menuOverlay) {
        menuOverlay.classList.add('activo');
    }
    document.body.style.overflow = 'hidden';
}

// Funcion para cerrar el menu programaticamente
// Uso: cerrarMenuLateral();
function cerrarMenuLateral() {
    const menuLateral = document.getElementById('menu-lateral');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuLateral) {
        menuLateral.classList.remove('activo');
    }
    if (menuOverlay) {
        menuOverlay.classList.remove('activo');
    }
    document.body.style.overflow = '';
}
