/* ============================================================
   BEATDROP — Sonido de entrada
   Suena una vez por visita al abrir la web. Los navegadores
   bloquean el audio hasta que el usuario interactúa, así que si
   el autoplay falla, suena con el primer clic o tecla.
   ============================================================ */
(function () {
  "use strict";

  const CLAVE = "intro-sonada";
  const sonido = new Audio("media/audio/intro-beatdrop-1s.mp3");
  sonido.volume = 0.6;

  function yaSono() {
    try {
      return sessionStorage.getItem(CLAVE) === "si";
    } catch (error) {
      return false;
    }
  }

  function marcarSonado() {
    try {
      sessionStorage.setItem(CLAVE, "si");
    } catch (error) {
      // Sin almacenamiento: no pasa nada
    }
  }

  function reproducir() {
    return sonido.play().then(marcarSonado);
  }

  function alPrimerGesto() {
    reproducir().catch(() => {});
    document.removeEventListener("click", alPrimerGesto);
    document.removeEventListener("keydown", alPrimerGesto);
  }

  if (yaSono()) return;

  window.addEventListener("load", () => {
    reproducir().catch(() => {
      // Autoplay bloqueado: esperamos al primer clic o tecla
      document.addEventListener("click", alPrimerGesto);
      document.addEventListener("keydown", alPrimerGesto);
    });
  });
})();
