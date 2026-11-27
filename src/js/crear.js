/* ============================================================
   BEATDROP — Crear
   Muestra el nombre del archivo elegido (por clic o arrastrando)
   y solo acepta archivos de audio.
   ============================================================ */
(function () {
  "use strict";

  const CLASE_ARRASTRANDO = "subida--arrastrando";

  function configurarZona(zonaId, inputId, textoId) {
    const zona = document.getElementById(zonaId);
    const input = document.getElementById(inputId);
    const texto = document.getElementById(textoId);

    function mostrarArchivo(archivo) {
      if (!archivo) return;
      if (!archivo.type.startsWith("audio/")) {
        texto.textContent = "Selecciona un archivo de audio";
        return;
      }
      texto.textContent = archivo.name;
    }

    input.addEventListener("change", () => {
      mostrarArchivo(input.files[0]);
    });

    zona.addEventListener("dragover", (e) => {
      e.preventDefault();
      zona.classList.add(CLASE_ARRASTRANDO);
    });

    zona.addEventListener("dragleave", () => {
      zona.classList.remove(CLASE_ARRASTRANDO);
    });

    zona.addEventListener("drop", (e) => {
      e.preventDefault();
      zona.classList.remove(CLASE_ARRASTRANDO);
      const archivos = e.dataTransfer.files;
      if (archivos.length > 0) {
        input.files = archivos;
        mostrarArchivo(archivos[0]);
      }
    });
  }

  configurarZona("zona-musica", "input-musica", "texto-musica");
  configurarZona("zona-podcast", "input-podcast", "texto-podcast");
})();
