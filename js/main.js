//              Variables y Constantes

// Constantes
const product1 = new Product('Botas', 40, 1, 'chipikids/calzado/botas-lluvia.jpg');
const product2 = new Product('Sombrero', 2300, 2, 'imagenes/imagen1.jpeg');
const product3 = new Product('Zapatos', 7800, 3, 'imagenes/imagen2.jpeg');
const product4 = new Product('Remera Blanca', 1000, 4, 'imagenes/imagen3.jpeg');
const product5 = new Product('Calcetines', 500, 5, 'imagenes/imagen4.jpeg');
const product6 = new Product('Short', 2400, 6, 'imagenes/imagen5.jpeg');
const product7 = new Product('Musculosa', 1500, 7, 'imagenes/imagen6.jpeg');
const product8 = new Product('Camisa', 6000, 8, 'chipikids/franela/IMG-20210512-WA0003');
const items = document.getElementById('producto')
const vaciarCarritoId = document.getElementById('vaciarCarrito')
const itemsCarrito = document.getElementById('producto-carrito')
const cardCarrito = document.getElementById('template-card-carrito').content
const cardItems = document.getElementById('template-card-items').content
const templateCarritoFooter = document.getElementById('template-carrito-footer').content
const botonesOrdenar = document.getElementById('botonOrdenar')
const fragment = document.createDocumentFragment()
const cantidadCarritoIcono = document.getElementById('cantidadCarrito')
const navbar = document.getElementById('navbar')
const buscar = document.getElementById('buscar')
const buscarBtn = document.getElementById('buscarBtn')




//Variables
//Variables de Storage
//localStorage
let carritoString = localStorage.getItem('carrito')
let carritoJSON = JSON.parse(carritoString)

let counter = 0;
let cards;
let item /*=  [product1, product2, product3, product4, product5, product6, product7, product8] */ ;

//Variables carrito
let carrito = {
    ...carritoJSON
};

let counterCarrito = 0;
let productoAgregadoCarrito = '';
let totalCarrito = 0;
let acumulador;

const fetchData = async () => {
    const res = await fetch('api.json');
    const data = await res.json()
    pintarCards(data)
    item = [...data]
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    /*     pintarCards(item) */
    checkLocalStorage()
    vaciarCarritoBtn(localStorage)
    pintarCarrito(carrito)
    fadein()
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




//Tarjetas de productos. Por cada production en el array item se crea una tarjeta
const pintarCards = cards => {
    items.innerHTML = ''
    cards.forEach(producto => {
        cardItems.querySelector('#card-title1').textContent = producto.itemName
        cardItems.querySelector('h5').textContent = producto.itemPrice
        cardItems.querySelector('img').setAttribute('src', producto.img)
        cardItems.querySelector('.btn-dark').dataset.id = producto.id
        cardItems.querySelector('#card-title1').href = "https://patrick101995.github.io/chipichikids/itemsIndividual/itemsIndividual.html"
        const clone = cardItems.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

/* document.getElementById('producto').innerHTML = cardItems; */


//Event listeners

// Listener JQuery

 $("#mayor").click(function (e) {
    console.log('jquery')
    botonOrdenarMayor(item, e)
})

//Event listeners para el boton de comprar

navbar.addEventListener('click', e => {
    console.log(e.target.textContent)
    setSpa(e)
})


items.addEventListener('click', e => {
    console.log(e.target)
    itemsIndividual(e)
    addCarrito(e)
    candidadCarritoIcono(e)
})

items.addEventListener('oncontextmenu', e => {
    itemsIndividual(e)
})

itemsCarrito.addEventListener('click', e => {
    cantidadCarrito(e)
    candidadCarritoIcono(e)

})

vaciarCarritoId.addEventListener('click', e => {
    vaciarCarrito(e)
    candidadCarritoIcono(e)
})

botonesOrdenar.addEventListener('click', e => {
    if (e.target.classList.contains('menor')) {
        console.log(e.target.classList.contains('menor'))
        botonOrdenarMenor(item, e)
    }
/*     if(e.target.classList.contains('mayor')){
            botonOrdenarMayor (item, e)
        } */
    if (e.target.classList.contains('nombre')) {
        botonOrdenarNombre(item, e)
    }
})

buscarBtn.addEventListener('click', buscador)
buscar.addEventListener('keyup', buscador)

//Event listeners para html individual de los items
function itemsIndividual(e) {
    if (e.target.classList.contains('card-title')) {
        let aux = e.target.parentElement.parentElement.parentElement
        setHtmlIndividual(aux)
    }
    e.stopPropagation()
}




// Accionar funcion con event listener del Carrito


function addCarrito(e) {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
        vaciarCarritoBtn(e)
    }
    e.stopPropagation()
}

//Crear objeto del carrito

const setCarrito = objeto => {
    const productoCarrito = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        itemName: objeto.querySelector('a').textContent,
        itemPrice: objeto.querySelector('h5').textContent,
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
    itemsCarrito.innerHTML = ''
    Object.values(carrito).forEach(productoCarrito => {
        cardCarrito.querySelector('h6').textContent = productoCarrito.id
        cardCarrito.querySelector('h4, a').textContent = productoCarrito.itemName
        cardCarrito.querySelectorAll('h5')[1].textContent = parseInt(productoCarrito.cantidad) * parseInt(productoCarrito.itemPrice)
        cardCarrito.querySelectorAll('h6')[2].textContent = productoCarrito.cantidad
        cardCarrito.querySelector('.btn-outline-info').dataset.id = productoCarrito.id
        cardCarrito.querySelector('.btn-outline-danger').dataset.id = productoCarrito.id
        const clone = cardCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCarrito.appendChild(fragment)

}

const pintarFooterCarrito = () => {
    templateCarritoFooter.querySelector('.btn-danger')
    const clone = templateCarritoFooter.cloneNode(true)
    fragment.appendChild(clone)
    itemsCarrito.appendChild(fragment)
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

// JQUERY
function fadein() {
    $('.fadeIn').hide(0).delay(0).fadeIn(1000)
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

//Carrito nav-bar

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




//Crear HTML para los items
let htmlIndividual = {}

const setHtmlIndividual = objeto => {
    htmlIndividual = {}
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        itemName: objeto.querySelector('#card-title1').textContent,
        itemPrice: objeto.querySelector('h5').textContent,
        image: objeto.querySelector('img').getAttribute("src")
    }
    htmlIndividual = {
        ...producto
    }
    let htmlIndividualstring = JSON.stringify(htmlIndividual)
    sessionStorage.setItem('htmlIndividual', htmlIndividualstring)
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
    }
}

//Botones para ordenar los productos
let itemArr = []

function botonOrdenarMenor(Arr, e) {
    itemArr = [...Arr]

    itemArr.sort(function (a, b) {
        if (a.itemPrice > b.itemPrice) {
            pintarCards(item)
            return 1;

        }
        if (a.itemPrice < b.itemPrice) {
            pintarCards(item)
            return -1;
        } else {
            pintarCards(item)
            return 0;
        }
    })
    item = [...itemArr]
    pintarCards(item)
}

function botonOrdenarMayor(Arr) {
    itemArr = [...Arr]

    itemArr.sort(function (a, b) {
        if (a.itemPrice < b.itemPrice) {
            pintarCards(item)
            return 1;

        }
        if (a.itemPrice > b.itemPrice) {
            pintarCards(item)
            return -1;
        } else {
            pintarCards(item)
            return 0;
        }
    })
    item = [...itemArr]
    pintarCards(item)
}

function botonOrdenarNombre(Arr, e) {
    itemArr = [...Arr]
    itemArr.sort(function (a, b) {
        if (a.itemName > b.itemName) {
            pintarCards(item)
            return 1;

        }
        if (a.itemName < b.itemName) {
            pintarCards(item)
            return -1;
        } else {
            pintarCards(item)
            return 0;
        }
    })
    item = [...itemArr]
    pintarCards(item)
}

//Fin Botones para ordenar

//Buscador

function buscador (){
    console.log(buscar.value)
    let newCards = []
    Object.values(item).forEach(producto =>{
        let nombre = producto.itemName.toLowerCase();
            if(nombre.indexOf(buscar.value) !== -1){
                const objeto ={
                    id: producto.id,
                    itemName: producto.itemName,
                    itemPrice: producto.itemPrice,
                    img: producto.img
                    }
                    newCards.push(objeto)
            }       
        pintarCards(newCards)
    })
}

// Fin Buscador



//Construct

function Product(itemName, itemPrice, id, img) {
    this.itemName = itemName;
    this.itemPrice = parseFloat(itemPrice);
    this.id = id;
    this.img = img;

    //suma iva
    this.sumaIva = function () {
        let iva = this.price * 0.21;
        this.price += iva;
        alert(this.price)
    }
}