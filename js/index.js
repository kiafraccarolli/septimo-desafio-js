class producto {
  constructor(id, nombre, precio, cantidad, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = img;
  }
}
let productos = [];
productos.push(
  new producto("1", "Jabón exfoliante", 550, 1, `./img/jabon-exfoliante.png`),
);
productos.push(
  new producto(
    "2",
    "Aceite de cutículas",
    400,
    1,
    `./img/aceite-cuticulas.png`,
  ),
);
productos.push(
  new producto("3", "Rimmel extra volumen", 799, 1, `./img/rimel-volumen.png`),
);
productos.push(
  new producto("4", "Bálsamo labial", 1200, 1, `./img/balsamo-labial.png`),
);

const contenedorProductos = document.getElementById("contenedorProductos");

const botonVaciar = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log(carrito)
})
 */
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito(carrito);
});

botonVaciar.addEventListener("click", () => {
  localStorage.clear();
  carrito.length = 0;
  actualizarCarrito(carrito);
});

/* const agregarAlCarrito = (prodId) => {
  let productoComprado = carrito.find(item => item.id === prodId);
  productoComprado === undefined ? carrito.push({ ...prodId, cantidad: 1 }): productoComprado.precio = productoComprado.precio + prodId.precio
  productoComprado.cantidad++;
  actualizarCarrito();
}  */
const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);
  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push(item);
    //console.log(carrito);
  }
  actualizarCarrito(carrito);
};

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add(
    "estilosProducto",
    "card",
    "col-lg-4",
    "col-md-12",
    "mx-5",
    "align-items-center",
  );
  div.innerHTML = `
    <img class="card-img-top, imagen" src="${producto.imagen}" alt="Card image cap">
    <div class="card-body">
          <h5 class="card-title"> ${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <a href="#" class="btn" id="agregar ${producto.id}">Añadir al carrito</a>
        </div>
    `;
  contenedorProductos.appendChild(div);

  const boton = document.getElementById(`agregar ${producto.id}`);

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

const contenedorCarrito = document.getElementById(`carrito-contenedor`);

const actualizarCarrito = (carrito) => {
  contenedorCarrito.innerHTML = " ";

  // const eliminarDelCarrito = (prodId) => {
  //   const item = carrito.find((prod) => prod.id === prodId);
  //   const indice = carrito.indexOf(item);
  //   carrito.splice(indice, 1);
  //   actualizarCarrito();
  // };

  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoElegido";
    div.setAttribute("id", prod.id);
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>Precio: $${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>  
    <button id="${prod.id}" class="borrarUno" ><img src="./img/eliminar.png" alt=""></button>`;

    contenedorCarrito.appendChild(div);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    let tacho = document.getElementById(prod.id);

    tacho.addEventListener("click", () => {
      const newCarrito = carrito.filter(
        (productos) => productos.id !== tacho.id,
      );
      actualizarCarrito(newCarrito);
    });
  });

  const precioTotal = document.getElementById("precioTotal");
  precioTotal.innerText = carrito.reduce(
    (i, prod) => i + prod.precio * prod.cantidad,
    0,
  );
};
