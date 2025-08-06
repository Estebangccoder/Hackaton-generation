// ----------------tienda en linea----------------------------Estebangccoder
const cardsContainer = document.getElementById('cardsContainer');
const cards = Array.from(cardsContainer.children);
const cardsPorPagina = 3;
let paginaActual = 1;
const paginaTotal = Math.ceil(cards.length / cardsPorPagina);

function mostrarPagina(pagina) {
  // Validar página
  if(pagina < 1) pagina = 1;
  if(pagina > paginaTotal) pagina = paginaTotal;
  paginaActual = pagina;

  // Ocultar todas las cards
  cards.forEach(card => card.style.display = 'none');

  // Mostrar solo las cards de la página actual
  const start = (pagina - 1) * cardsPorPagina;
  const end = start + cardsPorPagina;
  cards.slice(start, end).forEach(card => card.style.display = 'block');
}

document.getElementById('prevBtn').addEventListener('click', () => {
  mostrarPagina(paginaActual - 1);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  mostrarPagina(paginaActual + 1);
});

// Inicializar mostrando la primera página
mostrarPagina(1);



// Obtener productos del JSON
const  productos = [
  {
    "code": 1001,
    "title": "Gara Modular",
    "brand": "Cressi",
    "price": 800000,
    "image": "./src/public/img/gara modular.webp"
  },
  {
    "code": 1002,
    "title": "Gara Modular Impulse",
    "brand": "Cressi",
    "price": 850000,
    "image": "./src/public/img/gara modular impulse.webp"
  },
  {
    "code": 1003,
    "title": "Aletas Fiberglass",
    "brand": "LeaderFins",
    "price": 1350000,
    "image": "./src/public/img/leaderfins1.webp"
  },
  {
    "code": 1004,
    "title": "Careta Superocchio",
    "brand": "Cressi",
    "price": 250000,
    "image": "./src/public/img/careta Superocchio.webp"
  },
  {
    "code": 1005,
    "title": "Careta Phantom",
    "brand": "LeaderFins",
    "price": 350000,
    "image": "./src/public/img/phantom.webp"
  },
  {
    "code": 1006,
    "title": "Snorkel Airflex",
    "brand": "Aqualung",
    "price": 90000,
    "image": "./src/public/img/aqualung-airflex.webp"
  }
]


function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.querySelectorAll(".agregar-carrito").forEach(boton => {
  boton.addEventListener("click", (e) => {
    e.preventDefault();

    const code = parseInt(boton.dataset.code);
    const producto = productos.find(p => p.code === code);

    if (!producto) return;

    let carrito = obtenerCarrito();
    const index = carrito.findIndex(p => p.code === code);

    if (index !== -1) {
      // Ya existe → aumentar cantidad
      carrito[index].quantity += 1;
    } else {
      // No existe → agregar con cantidad 1
      carrito.push({ ...producto, quantity: 1 });
    }

    guardarCarrito(carrito);
    // alert("Producto agregado al carrito.");
    Swal.fire({
        title: '¡Producto agregado!',
        text: `Has agregado: ${producto.title}`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
  });
});


// function mostrarResumenCarrito() {
//   const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//   if (carrito.length === 0) {
//     Swal.fire({
//       title: 'Carrito vacío',
//       text: 'Aún no has agregado productos.',
//       icon: 'warning',
//       confirmButtonText: 'Ok'
//     });
//     return;
//   }

//   const total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const cantidadProductos = carrito.reduce((sum, item) => sum + item.quantity, 0);

//   Swal.fire({
//     title: 'Resumen del carrito',
//     html: `
//       <p><strong>Productos:</strong> ${cantidadProductos}</p>
//       <p><strong>Total:</strong> $${total.toLocaleString("es-CO")}</p>
//     `,
//     icon: 'info',
//     confirmButtonText: 'Ver productos'
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  const btnVerCarrito = document.getElementById('btnVerCarrito');
  
  if (btnVerCarrito) {
    btnVerCarrito.addEventListener('click', mostrarResumenCarrito);
  }

function mostrarResumenCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    Swal.fire({
      title: 'Carrito vacío',
      text: 'Aún no has agregado productos.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
    return;
  }

  // Creamos el HTML dinámicamente usando el DOM
  const contenedor = document.createElement("div");

  let total = 0;

  carrito.forEach(item => {
    const itemDiv = document.createElement("div");
    const subtotal = item.price * item.quantity;
    total += subtotal;

    itemDiv.innerHTML = `
      <p><strong>${item.title}</strong> x${item.quantity} - $${subtotal.toLocaleString("es-CO")}</p>
    `;
    contenedor.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<hr><p><strong>Total:</strong> $${total.toLocaleString("es-CO")}</p>`;
  contenedor.appendChild(totalDiv);

  // Mostrar SweetAlert2 con contenido generado por el DOM
  Swal.fire({
    title: 'Resumen del carrito',
    html: contenedor,
    icon: 'info',
    confirmButtonText: 'Finalizar'
  });
}
});
// ----------------------------------------------------------------