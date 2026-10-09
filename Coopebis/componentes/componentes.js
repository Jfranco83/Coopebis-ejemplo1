/* ============================================================
    JAVASCRIPT PARA CARGAR COMPONENTES REUTILIZABLES
    ============================================================
    
    DESCRIPCION:
    Este archivo carga automaticamente los componentes HTML 
    (header, footer, menu lateral, asistente virtual, boton pagos)
    en cualquier pagina que lo incluya.
    
    COMO USAR:
    1. Crea contenedores en tu HTML con los IDs correspondientes
    2. Vincula este archivo al final de tu HTML
    
    CONTENEDORES NECESARIOS:
    - <div id="header-container"></div>     -> Carga header.html
    - <div id="footer-container"></div>     -> Carga footer.html
    - <div id="menu-lateral-container"></div> -> Carga menu-lateral.html
    - <div id="asistente-container"></div>  -> Carga asistente-virtual.html
    - <div id="boton-pagos-container"></div> -> Carga boton-pagos.html
    
    IMPORTANTE:
    - Este script debe cargarse ANTES de menu-lateral.js
    - Los componentes se cargan usando fetch(), requiere servidor web
    - No funciona abriendo archivos con file:// directamente
    
    PARA DESARROLLO LOCAL:
    Usa Live Server de VS Code u otro servidor local
    
============================================================ */


// ============================================================
// CONFIGURACION DE COMPONENTES
// ============================================================
// Define que componentes cargar y donde insertarlos
// MODIFICAR: Agrega o quita componentes segun necesites

const COMPONENTES = [
    {
        id: 'header-container',           // ID del contenedor en el HTML
        archivo: 'componentes/header.html', // Ruta del archivo del componente
        nombre: 'Header'                   // Nombre para mensajes de error
    },
    {
        id: 'footer-container',
        archivo: 'componentes/footer.html',
        nombre: 'Footer'
    },
    {
        id: 'menu-lateral-container',
        archivo: 'componentes/menu-lateral.html',
        nombre: 'Menu Lateral'
    },
    {
        id: 'asistente-container',
        archivo: 'componentes/asistente-virtual.html',
        nombre: 'Asistente Virtual'
    },
    {
        id: 'boton-pagos-container',
        archivo: 'componentes/boton-pagos.html',
        nombre: 'Boton Pagos'
    }
];


// ============================================================
// FUNCION PARA CARGAR UN COMPONENTE
// ============================================================
/**
 * Carga un componente HTML y lo inserta en un contenedor
 * @param {string} containerId - ID del contenedor donde insertar
 * @param {string} componentPath - Ruta del archivo HTML del componente
 * @param {string} componentName - Nombre del componente para mensajes
 * @returns {Promise} - Promesa que se resuelve cuando el componente se carga
 */
async function cargarComponente(containerId, componentPath, componentName) {
    const container = document.getElementById(containerId);
    
    // Si el contenedor no existe, no hacer nada
    // Esto permite que las paginas solo carguen los componentes que necesitan
    if (!container) {
        return;
    }
    
    try {
        // Hacer peticion fetch al archivo del componente
        const response = await fetch(componentPath);
        
        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Obtener el contenido HTML
        const html = await response.text();
        
        // Insertar el HTML en el contenedor
        container.innerHTML = html;
        
    } catch (error) {
        // Mostrar error en consola si falla la carga
        console.error(`Error cargando componente ${componentName}:`, error);
        
        // Mostrar mensaje de error en el contenedor (opcional)
        container.innerHTML = `
            <div style="padding: 20px; background: #fee; color: #c00; border: 1px solid #c00; margin: 10px;">
                <strong>Error:</strong> No se pudo cargar el componente "${componentName}".
                <br><small>Asegurate de estar usando un servidor web local.</small>
            </div>
        `;
    }
}


// ============================================================
// FUNCION PARA CARGAR TODOS LOS COMPONENTES
// ============================================================
/**
 * Carga todos los componentes definidos en COMPONENTES
 * Se ejecuta automaticamente cuando el DOM esta listo
 */
async function cargarTodosLosComponentes() {
    // Crear array de promesas para cargar todos los componentes
    const promesas = COMPONENTES.map(comp => 
        cargarComponente(comp.id, comp.archivo, comp.nombre)
    );
    
    // Esperar a que todos los componentes se carguen
    await Promise.all(promesas);
    
    // Inicializar el menu lateral DESPUES de que se carguen los componentes
    // Esto es importante porque menu-lateral.js necesita los elementos del DOM
    const initMenuLateral = window.initMenuLateral; // Declare the variable here
    if (typeof initMenuLateral === 'function') {
        initMenuLateral();
    }
    
    // Disparar evento personalizado para indicar que los componentes estan listos
    // Esto permite que otros scripts sepan cuando pueden interactuar con los componentes
    document.dispatchEvent(new CustomEvent('componentesCargados'));
}


// ============================================================
// INICIALIZACION
// ============================================================
// Cargar componentes cuando el DOM este listo
document.addEventListener('DOMContentLoaded', cargarTodosLosComponentes);


// ============================================================
// FUNCIONES UTILES ADICIONALES
// ============================================================

/**
 * Funcion para cargar un componente especifico manualmente
 * Uso: cargarComponenteManual('mi-contenedor', 'ruta/componente.html', 'Mi Componente');
 */
function cargarComponenteManual(containerId, componentPath, componentName) {
    return cargarComponente(containerId, componentPath, componentName || 'Componente');
}

/**
 * Funcion para recargar todos los componentes
 * Util si necesitas actualizar los componentes sin recargar la pagina
 * Uso: recargarComponentes();
 */
function recargarComponentes() {
    cargarTodosLosComponentes();
}
