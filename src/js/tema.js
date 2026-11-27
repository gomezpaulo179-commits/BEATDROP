/* ============================================================
   BEATDROP — Tema claro / oscuro
   Se ejecuta en <head> para aplicar el tema antes de pintar la
   página y evitar un parpadeo. El botón (si existe) lo cambia.
   ============================================================ */
(function () {
  "use strict";

  const raiz = document.documentElement;
  const CLAVE = "theme";

  function leerTema() {
    try {
      return localStorage.getItem(CLAVE) || "dark";
    } catch (error) {
      return "dark"; // almacenamiento bloqueado: se usa el oscuro
    }
  }

  function guardarTema(tema) {
    try {
      localStorage.setItem(CLAVE, tema);
    } catch (error) {
      // Sin persistencia: el cambio dura solo esta visita
    }
  }

  function aplicarTema(tema) {
    raiz.setAttribute("data-bs-theme", tema);
  }

  aplicarTema(leerTema());

  document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("boton-tema");
    if (!boton) return;

    const actualizarTexto = () => {
      const esOscuro = raiz.getAttribute("data-bs-theme") === "dark";
      boton.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
    };

    actualizarTexto();

    boton.addEventListener("click", () => {
      const nuevo = raiz.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      aplicarTema(nuevo);
      guardarTema(nuevo);
      actualizarTexto();
    });
  });
})();
