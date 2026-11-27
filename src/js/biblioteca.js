/* ============================================================
   BEATDROP — Biblioteca
   Pestañas accesibles (teclado con flechas), cuadrícula de
   playlists y diálogo nativo <dialog> para crear una nueva.
   ============================================================ */
(function () {
  "use strict";

  const NUM_PORTADAS = 6; // debe coincidir con $portadas en Sass

  // Datos de ejemplo
  const playlists = ["Playlist 1", "Playlist 2", "Playlist 3", "Playlist 4", "Playlist 5", "Playlist 6"];

  const lista = document.getElementById("lista-playlists");
  const mensajeVacio = document.getElementById("mensaje-vacio");
  const panel = document.getElementById("panel-biblioteca");
  const pestanas = Array.from(document.querySelectorAll(".pestanas__pestana"));
  const dialogo = document.getElementById("dialogo-playlist");
  const botonAbrir = document.getElementById("abrir-dialogo");
  const formulario = document.getElementById("formulario-playlist");
  const campoNombre = document.getElementById("nombre-playlist");
  const botonCrear = document.getElementById("boton-crear");

  let categoriaActiva = "playlist";

  /* ---------- Render ---------- */

  function crearTarjeta(nombre, indice) {
    const elemento = document.createElement("li");
    elemento.className = "col";

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta playlist__tarjeta";

    const portada = document.createElement("div");
    portada.className = "playlist__portada playlist__portada--" + ((indice % NUM_PORTADAS) + 1);
    portada.textContent = nombre.toUpperCase();

    const titulo = document.createElement("h2");
    titulo.className = "playlist__titulo";
    titulo.textContent = nombre;

    tarjeta.append(portada, titulo);
    elemento.append(tarjeta);
    return elemento;
  }

  function renderizar() {
    const esPlaylist = categoriaActiva === "playlist";

    lista.replaceChildren();
    lista.hidden = !esPlaylist;
    mensajeVacio.hidden = esPlaylist;

    if (esPlaylist) {
      playlists.forEach((nombre, i) => lista.append(crearTarjeta(nombre, i)));
    } else {
      mensajeVacio.textContent = "Aquí aparecerán tus " + categoriaActiva + ".";
    }
  }

  /* ---------- Pestañas ---------- */

  function seleccionarPestana(pestana) {
    categoriaActiva = pestana.dataset.categoria;

    pestanas.forEach((p) => {
      const activa = p === pestana;
      p.setAttribute("aria-selected", String(activa));
      p.tabIndex = activa ? 0 : -1; // patrón de tabs: solo la activa entra con Tab
    });

    panel.setAttribute("aria-labelledby", pestana.id);
    renderizar();
  }

  pestanas.forEach((pestana, i) => {
    pestana.addEventListener("click", () => seleccionarPestana(pestana));

    pestana.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const paso = e.key === "ArrowRight" ? 1 : pestanas.length - 1;
      const siguiente = pestanas[(i + paso) % pestanas.length];
      siguiente.focus();
      seleccionarPestana(siguiente);
    });
  });

  /* ---------- Diálogo "Nueva playlist" ---------- */

  botonAbrir.addEventListener("click", () => {
    formulario.reset();
    botonCrear.disabled = true;
    dialogo.showModal();
  });

  dialogo.querySelector("[data-cerrar]").addEventListener("click", () => dialogo.close());

  // Cerrar al pulsar fuera del cuadro (sobre el fondo oscuro)
  dialogo.addEventListener("click", (e) => {
    const rect = dialogo.getBoundingClientRect();
    const fueraDelCuadro =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom;
    if (fueraDelCuadro) dialogo.close();
  });

  campoNombre.addEventListener("input", () => {
    botonCrear.disabled = campoNombre.value.trim() === "";
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = campoNombre.value.trim();
    if (!nombre) return;

    playlists.push(nombre);
    dialogo.close();
    seleccionarPestana(document.getElementById("tab-playlist"));
  });

  renderizar();
})();
