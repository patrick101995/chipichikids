let page;
let template;
const itemCarrito = document.getElementById('producto-carrito')
const templateCarrito = document.getElementById('template-card-carrito').content
const fragment = document.createDocumentFragment()
const cantidadCarritoIcono = document.getElementById('cantidadCarrito')
const vaciarCarritoId = document.getElementById('vaciarCarrito')


//Varibles de Storage
//SessionStorage
let storageString = sessionStorage.getItem('htmlIndividual')
let storageJSON = JSON.parse(storageString)
//localStorage
let carritoString = localStorage.getItem('carrito')
let carritoJSON = JSON.parse(carritoString)

let carrito = {
  ...carritoJSON
};


document.addEventListener('DOMContentLoaded', () => {
  page = sessionStorage.getItem('spa')
  setContenido(page)
  pintarContenido(template)
  checkLocalStorage()
  vaciarCarritoBtn(localStorage)
  pintarCarrito(carrito)
  candidadCarritoIcono()
  setVariables()
})

function setVariables() {
  const navbar = document.getElementById('navbar');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const correo = document.getElementById('correo');
  const telefono = document.getElementById('telefono');
  const templateContacto = document.getElementById('templateContacto')
  const error = document.getElementById('error')
  const templateNosotros = document.getElementById('templateNosotros')
  const templateServicios = document.getElementById('templateServicios')
  const exitoso = document.getElementById('exitoso')
}

//Check local storage
function checkLocalStorage() {
  if (localStorage.getItem('carrito')) {
    pintarCarrito(carrito)
  } else {
    localStorage.setItem('carrito', '{}')
  }
}



//Event listeners
navbar.addEventListener('click', e => {
  setSpa(e)
})

itemCarrito.addEventListener('click', e => {
  cantidadCarrito(e)
  candidadCarritoIcono(e)
})


navbar.addEventListener('click', e => {
  setSpa(e)
})

vaciarCarritoId.addEventListener('click', e => {
  vaciarCarrito(e)
  candidadCarritoIcono(e)
})



function vaciarCarritoBtn() {
  if (localStorage.getItem('carrito') == '{}') {
    document.getElementById('vaciarCarrito').classList.add('d-none')
  } else {
    document.getElementById('vaciarCarrito').classList.remove('d-none')
  }
}


function setContenido(page) {
  template = ''
  switch (page) {
    case 'contacto':
      template = templateContacto.innerHTML
      break;
    case 'nosotros':
      template = templateNosotros.innerHTML
      break;
    case 'servicios':
      template = templateServicios.innerHTML
      break;
    default:
      template = 'Sitio en mantenimiento'
  }

}


const pintarContenido = template => {
  document.getElementById('contenido').innerHTML = template
}

//Formulario de contacto

function enviarFormulario() {

  error.style.color = 'red';

  let mensajesError = [];

  if (nombre.value == '') {
    mensajesError.push('Ingresa tu Nombre');
  }

  if (apellido.value === '') {
    mensajesError.push('Ingresa tu Apellido');
  }

  if (correo.value === '' & telefono.value === '') {
    mensajesError.push('Debes ingresar al menos un metodo de contacto')
  }

  if (mensajesError.length === 0) {
    error.style.color = 'green';
    mensajesError.push('Formulario enviado con exito')
  }
  error.innerHTML = mensajesError.join(', ')
  return false
}






//Crear HTML para nav Bar SPA

const setSpa = e => {
  let spa = e.target.textContent
  switch (spa) {
    case "Nosotros":
      sessionStorage.setItem('spa', 'nosotros')
      break;
    case "Contacto":
      sessionStorage.setItem('spa', 'contacto')
      break;
    case "Servicios":
      sessionStorage.setItem('spa', 'servicios')
      break;
  }
}











//Funciones para el carrito

const setCarrito = objeto => {
  const productoCarrito = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    itemName: objeto.querySelector('.card-title').textContent,
    itemPrice: objeto.querySelector('h4').textContent,
    cantidad: 1
  }
  if (carrito.hasOwnProperty(productoCarrito.id)) {
    productoCarrito.cantidad = carrito[productoCarrito.id].cantidad + 1;
  }
  carrito[productoCarrito.id] = {
    ...productoCarrito
  }
  let carritoString = JSON.stringify(carrito)
  localStorage.setItem('carrito', carritoString)
  pintarCarrito(carrito)
}



//Pintar carrito en el HTML

const pintarCarrito = () => {
  itemCarrito.innerHTML = ''
  Object.values(carrito).forEach(productoCarrito => {
    templateCarrito.querySelector('h6').textContent = productoCarrito.id
    templateCarrito.querySelector('h4, a').textContent = productoCarrito.itemName
    templateCarrito.querySelectorAll('h5')[1].textContent = parseInt(productoCarrito.cantidad) * parseInt(productoCarrito.itemPrice)
    templateCarrito.querySelectorAll('h6')[2].textContent = productoCarrito.cantidad
    templateCarrito.querySelector('.btn-outline-info').dataset.id = productoCarrito.id
    templateCarrito.querySelector('.btn-outline-danger').dataset.id = productoCarrito.id
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  itemCarrito.appendChild(fragment)

}

const pintarFooterCarrito = () => {
  templateCarritoFooter.querySelector('.btn-danger')
  const clone = templateCarritoFooter.cloneNode(true)
  fragment.appendChild(clone)
  itemCarrito.appendChild(fragment)
}

//Cambiar cantidad de productos en el carrito

function cantidadCarrito(e) {
  if (e.target.classList.contains('btn-outline-info')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
    carrito[e.target.dataset.id] = {
      ...producto
    }
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem('carrito', carritoString)
  } else if (e.target.classList.contains('btn-outline-danger')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad = carrito[e.target.dataset.id].cantidad - 1
    carrito[e.target.dataset.id] = {
      ...producto
    }
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem('carrito', carritoString)
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id]
      carritoString = JSON.stringify(carrito)
      localStorage.setItem('carrito', carritoString)
    }
  }
  e.stopPropagation()
  pintarCarrito()
  vaciarCarritoBtn()
}

function vaciarCarritoBtn() {
  if (localStorage.getItem('carrito') == '{}') {
    document.getElementById('vaciarCarrito').classList.add('d-none')
  } else {
    document.getElementById('vaciarCarrito').classList.remove('d-none')
  }
}

function vaciarCarrito(e) {
  if (e.target.classList.contains('btn-danger')) {
    carrito = {}
    carritoString = JSON.stringify(carrito)
    localStorage.setItem('carrito', carritoString)
  }
  e.stopPropagation()
  pintarCarrito()
  vaciarCarritoBtn()
}

//      Cantidad de items icono carrito

function candidadCarritoIcono() {
  let contador
  let cantidad = 0
  let i = 0;
  Object.values(carrito).forEach(producto => {
    contador = producto.cantidad
    cantidad = cantidad + contador
  })
  cantidadCarritoIcono.querySelector('span').textContent = cantidad
}

function addCarrito(e) {
  if (e.target.classList.contains('btn-dark')) {
    setCarrito(e.target.parentElement)
    vaciarCarritoBtn(e)
  }
  e.stopPropagation()
}

// Fin funciones para el carrito