// ==========================================
// CONFIGURACIÓN GLOBAL Y CONSTANTES
// Sistema de gestión del sitio web COOINDEGABO
// ==========================================

// Configuración principal del sistema
const CONFIG = {
  SLIDER_INTERVAL: 5000, // Intervalo del slider: 5 segundos entre slides
  // Para cambiar la velocidad del slider, modifica este valor (en milisegundos)
}

// ==========================================
// VARIABLES GLOBALES
// ==========================================

let sliderInterval = null // Almacena el intervalo del slider
let currentSlide = 0 // Índice del slide actual (empieza en 0)

// ==========================================
// FUNCIONES UTILITARIAS
// Funciones de ayuda general
// ==========================================

/**
 * Registra mensajes en consola con timestamp
 * Útil para debugging y seguimiento de eventos
 * @param {string} message - Mensaje a registrar
 * @param {string} type - Tipo: 'log', 'error', 'warn'
 */
function logWithTimestamp(message, type = "log") {
  const timestamp = new Date().toLocaleTimeString("es-CO")
  const fullMessage = `[${timestamp}] COOINDEGABO: ${message}`

  switch (type) {
    case "error":
      console.error(fullMessage)
      break
    case "warn":
      console.warn(fullMessage)
      break
    default:
      console.log(fullMessage)
  }
}

// ==========================================
// FUNCIONES DEL SLIDER PROMOCIONAL
// Gestiona el carrusel de imágenes principal
// ==========================================

/**
 * Inicializa el slider promocional con todos sus controles
 * Se ejecuta automáticamente al cargar la página
 */
function initSlider() {
  const sliderWrapper = document.getElementById("slider-wrapper")
  const sliderPrev = document.getElementById("slider-prev")
  const sliderNext = document.getElementById("slider-next")

  // Verificar que existan los elementos necesarios
  if (!sliderWrapper) {
    logWithTimestamp("Slider wrapper no encontrado", "warn")
    return
  }

  logWithTimestamp("Inicializando slider promocional")

  const slides = document.querySelectorAll(".slide") // Obtener todos los slides
  const indicators = document.querySelectorAll(".indicator") // Obtener indicadores

  if (slides.length === 0) {
    logWithTimestamp("No se encontraron slides", "warn")
    return
  }

  /**
   * Muestra un slide específico
   * @param {number} index - Índice del slide a mostrar (0-5)
   */
  function showSlide(index) {
    // Validar índice (circular: si pasa del último, vuelve al primero)
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0

    currentSlide = index

    // Calcular posición de transformación
    // Cada slide ocupa 16.666% (100% / 6 slides)
    const translateX = -index * (100 / slides.length)
    sliderWrapper.style.transform = `translateX(${translateX}%)`

    // Actualizar clases activas de slides
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    // Actualizar indicadores activos
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index)
    })

    logWithTimestamp(`Mostrando slide ${index + 1} de ${slides.length}`)
  }

  /**
   * Avanza al siguiente slide
   */
  function nextSlide() {
    showSlide(currentSlide + 1)
  }

  /**
   * Retrocede al slide anterior
   */
  function prevSlide() {
    showSlide(currentSlide - 1)
  }

  // Configurar eventos de las flechas de navegación
  sliderPrev?.addEventListener("click", () => {
    logWithTimestamp("Click en flecha anterior")
    prevSlide()
    resetSliderInterval() // Reiniciar el auto-avance
  })

  sliderNext?.addEventListener("click", () => {
    logWithTimestamp("Click en flecha siguiente")
    nextSlide()
    resetSliderInterval()
  })

  // Configurar eventos de los indicadores (puntos)
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      logWithTimestamp(`Click en indicador ${index + 1}`)
      showSlide(index)
      resetSliderInterval()
    })
  })

  /**
   * Reinicia el intervalo automático del slider
   * Útil después de interacciones manuales
   */
  function resetSliderInterval() {
    if (sliderInterval) {
      clearInterval(sliderInterval)
    }
    sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL)
    logWithTimestamp("Intervalo del slider reiniciado")
  }

  // Pausar slider al pasar el mouse
  const sliderContainer = document.querySelector(".slider-container")
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      if (sliderInterval) {
        clearInterval(sliderInterval)
        logWithTimestamp("Slider pausado por hover")
      }
    })

    sliderContainer.addEventListener("mouseleave", () => {
      resetSliderInterval()
      logWithTimestamp("Slider reanudado")
    })
  }

  // Iniciar: mostrar primer slide y comenzar auto-avance
  showSlide(0)
  resetSliderInterval()

  logWithTimestamp("Slider inicializado correctamente")
}

// ==========================================
// FUNCIONES DEL MENÚ MÓVIL (HAMBURGUESA)
// Controla la apertura y cierre del menú en móviles
// ==========================================

/**
 * Inicializa el menú hamburguesa responsivo
 * ESTA FUNCIÓN ES CRÍTICA PARA EL FUNCIONAMIENTO DEL MENÚ MÓVIL
 */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-mobile-toggle")
  const navegacionPrincipal = document.getElementById("navegacion-principal")

  if (!menuToggle || !navegacionPrincipal) {
    logWithTimestamp("Elementos de menú móvil no encontrados", "warn")
    console.log("[v0] menuToggle:", menuToggle)
    console.log("[v0] navegacionPrincipal:", navegacionPrincipal)
    return
  }

  logWithTimestamp("Inicializando menú móvil")
  console.log("[v0] Menú móvil encontrado, agregando event listeners")

  menuToggle.addEventListener("click", (e) => {
    console.log("[v0] Click en menú hamburguesa detectado")
    e.stopPropagation()
    e.preventDefault()

    const isActive = menuToggle.classList.toggle("active")
    navegacionPrincipal.classList.toggle("active")

    console.log("[v0] Menú estado:", isActive ? "abierto" : "cerrado")
    console.log("[v0] Clases menuToggle:", menuToggle.className)
    console.log("[v0] Clases navegacion:", navegacionPrincipal.className)

    logWithTimestamp(`Menú móvil ${isActive ? "abierto" : "cerrado"}`)
  })

  const dropdownToggles = document.querySelectorAll(".nav-link.dropdown-toggle")
  console.log("[v0] Dropdowns encontrados:", dropdownToggles.length)

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        console.log("[v0] Click en dropdown en móvil")
        e.preventDefault()
        e.stopPropagation()

        const parent = toggle.closest(".nav-item")
        const wasActive = parent.classList.contains("dropdown-active")

        console.log("[v0] Parent encontrado:", parent)
        console.log("[v0] Was active:", wasActive)

        /*
        document.querySelectorAll(".nav-item.dropdown").forEach((dropdown) => {
          if (dropdown !== parent) {
            dropdown.classList.remove("dropdown-active")
            console.log("[v0] Cerrando otro dropdown")
          }
        })
        */

        // Toggle del dropdown actual
        parent.classList.toggle("dropdown-active")

        console.log("[v0] Dropdown estado después de toggle:", parent.classList.contains("dropdown-active"))
        console.log("[v0] Clases del parent:", parent.className)

        logWithTimestamp(`Dropdown ${!wasActive ? "abierto" : "cerrado"} en móvil`)
      }
      // En escritorio, permitir hover CSS, no hacer nada
    })
  })

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navegacion-container")) {
      menuToggle.classList.remove("active")
      navegacionPrincipal.classList.remove("active")

      if (window.innerWidth <= 768) {
        document.querySelectorAll(".nav-item.dropdown").forEach((dropdown) => {
          dropdown.classList.remove("dropdown-active")
        })
      }
    }
  })

  // Cerrar menú al redimensionar a escritorio
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        menuToggle.classList.remove("active")
        navegacionPrincipal.classList.remove("active")

        document.querySelectorAll(".nav-item.dropdown").forEach((dropdown) => {
          dropdown.classList.remove("dropdown-active")
        })

        logWithTimestamp("Menú móvil cerrado al pasar a escritorio")
      }
    }, 250)
  })

  logWithTimestamp("Menú móvil inicializado correctamente")
}

// ==========================================
// FUNCIONES DE ANIMACIÓN AL SCROLL
// Anima elementos cuando entran en el viewport
// ==========================================

/**
 * Configura el observador de intersección para animaciones
 */
function initScrollAnimations() {
  // Configuración del observador
  const observerOptions = {
    threshold: 0.1, // Se activa cuando el 10% es visible
    rootMargin: "0px 0px -50px 0px",
  }

  // Crear observador
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible")
        // Opcional: dejar de observar después de animar
        // observer.unobserve(entry.target);
      }
    })
  }, observerOptions)

  // Observar todos los elementos con clase scroll-animate
  const animatedElements = document.querySelectorAll(".scroll-animate")
  animatedElements.forEach((el) => observer.observe(el))

  logWithTimestamp(`Observando ${animatedElements.length} elementos para animación`)
}

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// Función principal que se ejecuta al cargar la página
// ==========================================

/**
 * Inicializa todos los módulos del sitio web
 */
function initializeApp() {
  logWithTimestamp("=== INICIANDO SITIO WEB COOINDEGABO ===")

  try {
    // 1. Inicializar slider promocional
    initSlider()

    // 2. Inicializar menú móvil
    initMobileMenu()

    // 3. Inicializar animaciones de scroll
    initScrollAnimations()

    logWithTimestamp("=== SITIO WEB INICIALIZADO CORRECTAMENTE ===")
  } catch (error) {
    logWithTimestamp(`Error durante la inicialización: ${error.message}`, "error")
  }
}

// ==========================================
// INICIO AUTOMÁTICO
// Ejecuta la inicialización cuando el DOM está listo
// ==========================================

// Detectar si el DOM ya está cargado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}

// Mensaje de confirmación de carga
logWithTimestamp("Script de COOINDEGABO cargado exitosamente")

// ==========================================
// NOTAS PARA MANTENIMIENTO
// ==========================================

/*
 * CÓMO MODIFICAR EL COMPORTAMIENTO:
 *
 * 1. Para cambiar la velocidad del slider:
 *    - Modifica CONFIG.SLIDER_INTERVAL (en milisegundos)
 *    - Ejemplo: 3000 = 3 segundos
 *
 * 2. Para agregar nuevas funcionalidades:
 *    - Crea una nueva función init[NombreFuncionalidad]()
 *    - Llámala desde initializeApp()
 *
 * 3. Para debugging:
 *    - Usa logWithTimestamp() para registrar eventos
 *    - Abre la consola del navegador (F12)
 *
 * 4. Para el menú móvil:
 *    - El breakpoint es 768px (definido en CSS)
 *    - Puedes ajustarlo en los media queries de styles.css
 */

