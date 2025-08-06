// ---------------------------------Carrousel---------------------------------------------------------
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

// ------------------------------------------------------------------------------------------------------------

// ---------------------------------Información---------------------------------------------------------------
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let bubbles = [];

function createBubble() {
    const radius = Math.random() * 8 + 4;
    bubbles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + radius,
    radius,
    baseRadius: radius,
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.2,
    angle: Math.random() * Math.PI * 2,
    pulse: Math.random() * 0.05 + 0.01
});
}

function drawBubbles(mouseX, mouseY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble, index) => {
    const dx = mouseX - bubble.x;
    const dy = mouseY - bubble.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    bubble.angle += bubble.pulse;
    const pulseRadius = bubble.baseRadius + Math.sin(bubble.angle) * 1.5;
    const finalRadius = distance < 50 ? pulseRadius * 1.8 : pulseRadius;

    bubble.x += Math.sin(bubble.angle) * 0.3;

    const depthFactor = 1 - bubble.y / canvas.height;
    const adjustedRadius = finalRadius * (0.7 + depthFactor * 0.3);
    const adjustedOpacity = bubble.opacity * (0.5 + depthFactor * 0.5);

    const gradient = ctx.createRadialGradient(
        bubble.x - adjustedRadius * 0.3, bubble.y - adjustedRadius * 0.3, adjustedRadius * 0.1,
        bubble.x, bubble.y, adjustedRadius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${adjustedOpacity})`);
    gradient.addColorStop(0.7, `rgba(173, 216, 230, ${adjustedOpacity * 0.6})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, adjustedRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    bubble.y -= bubble.speed;
    if (bubble.y + adjustedRadius < 0) bubbles.splice(index, 1);
});
}

let mouseX = -100;
let mouseY = -100;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = -100;
    mouseY = -100;
});

function animate() {
    drawBubbles(mouseX, mouseY);
    requestAnimationFrame(animate);
}

setInterval(createBubble, 400);
animate();

window.addEventListener('scroll', () => {
    const section = document.getElementById('apnea-info');
    const scrollY = window.scrollY;
    const maxScroll = section.offsetHeight;
    const percent = Math.min(scrollY / maxScroll, 1);
    const startColor = [0, 31, 63];
    const endColor = [0, 116, 217];
    const blendedColor = startColor.map((start, i) =>
    Math.round(start + (endColor[i] - start) * percent)
);

section.style.background = `rgb(${blendedColor.join(',')})`;
});

// ------------------------------------------------------------------------------------------