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
  productos.push(new producto("1", "Jabón exfoliante", 550, 170,`./img/jabon-exfoliante.png`));
  productos.push(new producto("2", "Aceite de cutículas", 400, 80,`./img/aceite-cuticulas.png`));
  productos.push(new producto("3", "Rimmel extra volumen", 799, 95,`./img/rimel-volumen.png`));
  productos.push(new producto("4", "Bálsamo labial", 1200, 53, `./img/balsamo-labial.png`));

  const contenedorProductos = document.getElementById("contenedorProductos");

  let carrito = [];

  productos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('estilosProducto', 'card', 'col-lg-4','col-md-12', 'mx-5', 'align-items-center' )
    div.innerHTML = `
    <img class="card-img-top, imagen" src="${producto.imagen}" alt="Card image cap">
    <div class="card-body d-flex flex-column justify-content-center align-items-center ">
          <h5 class="card-title"> ${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <a href="#" class="btn" id="agregar ${producto.id}">Añadir al carrito</a>
        </div>
    `
    contenedorProductos.appendChild(div)

  })

let bienvenida = document.getElementById("saludo");
let nombre = prompt("Hola! Cómo te llamas?");
function saludar (nombre){
  const titulo = document.createElement('h2')
  titulo.classList.add('d-flex', 'align-items-center', 'justify-content-center')
  titulo.innerHTML =` Bienvenido/a a la tienda, ${nombre}!`;
  bienvenida.appendChild(titulo)
}
saludar(nombre);