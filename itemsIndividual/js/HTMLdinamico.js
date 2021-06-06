//Variables y constantes
//Constantes
const fragment = document.createDocumentFragment()
const item = document.getElementById('item')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-card-carrito').content
const imagenCarrito = document.getElementById('imagen-carrito')
const navbar = document.getElementById('navbar')
const cantidadCarritoIcono = document.getElementById('cantidadCarrito')
const itemCarrito = document.getElementById('producto-carrito')
const vaciarCarritoId = document.getElementById('vaciarCarrito')

//Variables

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
    /*     pintarCards(item) */
    pintarItemHTMLInvividual()
    checkLocalStorage()
    vaciarCarritoBtn(localStorage)
    pintarCarrito(carrito)
    candidadCarritoIcono()

})

//Check local storage
function checkLocalStorage() {
    if (localStorage.getItem('carrito')) {
        pintarCarrito(carrito)
    } else {
        localStorage.setItem('carrito', '{}')
    }
}

// Event listeners
itemCarrito.addEventListener('click', e => {
    cantidadCarrito(e)
    candidadCarritoIcono(e)
})


navbar.addEventListener('click', e => {
    setSpa(e)
})


item.addEventListener('click', e => {
    addCarrito(e)
    candidadCarritoIcono(e)
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



const pintarItemHTMLInvividual = () => {
    templateCard.querySelector('.card-title').textContent = storageJSON.itemName
    templateCard.querySelector('h4').textContent = storageJSON.itemPrice
    templateCard.querySelector('#imagen-carrito').setAttribute('src', storageJSON.image)
    templateCard.querySelector('.btn-dark').dataset.id = storageJSON.id
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
    item.appendChild(fragment)
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

// Set html para SPA

const setSpa = e => {
    let spa = e.target.textContent
    switch (spa) {
        case "Nosotros":
            sessionStorage.setItem('spa', 'nosotros')
            break;
        case "Contacto":
            sessionStorage.setItem('spa', 'contacto')
            break;
    }
}