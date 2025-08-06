


//carrusel
// Obtener elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
  const carrusel = document.querySelector('.carousel');
  const diapositivas = document.querySelectorAll('.slide');
  let indiceActual = 0;

  function actualizarCarrusel() {
    const desplazamiento = -indiceActual * 100;
    carrusel.style.transform = `translateX(${desplazamiento}%)`;
  }

  setInterval(() => {
    indiceActual = (indiceActual + 1) % diapositivas.length;
    actualizarCarrusel();
  }, 5000);

  actualizarCarrusel();
});
