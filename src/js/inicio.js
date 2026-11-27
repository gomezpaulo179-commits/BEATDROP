/* ============================================================
   BEATDROP — Inicio
   Al pulsar la tarjeta de Lil Sanz se abre un reproductor a
   pantalla completa (estilo "Reproduciendo" de Spotify) con
   play/pausa, barra de progreso, reiniciar y repetir.
   ============================================================ */
(function () {
  "use strict";

  const tarjetaVideo = document.getElementById("abrir-video");
  const dialogo = document.getElementById("dialogo-video");
  const video = document.getElementById("video-lilsanz");
  const botonPlay = document.getElementById("boton-play");
  const botonReiniciar = document.getElementById("boton-reiniciar");
  const botonRepetir = document.getElementById("boton-repetir");
  const barra = document.getElementById("barra-progreso");
  const tiempoActual = document.getElementById("tiempo-actual");
  const tiempoTotal = document.getElementById("tiempo-total");

  // 75 segundos -> "1:15"
  function formatear(segundos) {
    if (!isFinite(segundos)) return "0:00";
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return min + ":" + String(seg).padStart(2, "0");
  }

  function reproducir() {
    video.play().catch((error) => {
      console.error("No se pudo reproducir el vídeo:", error);
    });
  }

  function alternarPlay() {
    if (video.paused) reproducir();
    else video.pause();
  }

  // Cambia el icono play/pausa según el estado del vídeo
  function actualizarBoton() {
    const pausado = video.paused;
    botonPlay.classList.toggle("reproductor__play--pausado", pausado);
    botonPlay.setAttribute("aria-label", pausado ? "Reproducir" : "Pausar");
  }

  // Mueve la barra y el contador mientras avanza el vídeo
  function actualizarProgreso() {
    const porcentaje = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    barra.value = porcentaje;
    barra.style.setProperty("--progreso", porcentaje + "%");
    tiempoActual.textContent = formatear(video.currentTime);
  }

  /* ---------- Abrir / cerrar ---------- */

  tarjetaVideo.addEventListener("click", () => {
    dialogo.showModal();
    dialogo.focus(); // el foco va al reproductor, no al botón de cerrar
    reproducir();
  });

  dialogo.querySelector("[data-cerrar]").addEventListener("click", () => dialogo.close());

  // Se cierre como se cierre (botón o tecla Esc), paramos el vídeo
  dialogo.addEventListener("close", () => {
    video.pause();
    video.currentTime = 0;
  });

  /* ---------- Controles ---------- */

  botonPlay.addEventListener("click", alternarPlay);
  video.addEventListener("click", alternarPlay); // clic en el vídeo = play/pausa

  botonReiniciar.addEventListener("click", () => {
    video.currentTime = 0;
    reproducir();
  });

  botonRepetir.addEventListener("click", () => {
    video.loop = !video.loop;
    botonRepetir.setAttribute("aria-pressed", String(video.loop));
  });

  // Arrastrar la barra salta a ese punto del vídeo
  barra.addEventListener("input", () => {
    if (video.duration) video.currentTime = (barra.value / 100) * video.duration;
  });

  video.addEventListener("loadedmetadata", () => {
    tiempoTotal.textContent = formatear(video.duration);
  });
  video.addEventListener("timeupdate", actualizarProgreso);
  video.addEventListener("play", actualizarBoton);
  video.addEventListener("pause", actualizarBoton);
  video.addEventListener("ended", actualizarBoton);

  video.addEventListener("error", () => {
    console.error("Error al cargar el vídeo. Revisa la ruta de la carpeta media/video/.");
  }, true);
})();
