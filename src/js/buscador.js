/* ============================================================
   BEATDROP — Buscador
   Evita que el formulario de búsqueda recargue la página.
   ============================================================ */
(function () {
  "use strict";

  const formulario = document.getElementById("formulario-busqueda");
  formulario.addEventListener("submit", (e) => e.preventDefault());
})();
