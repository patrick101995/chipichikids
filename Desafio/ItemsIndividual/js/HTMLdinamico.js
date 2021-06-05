//Variables y constantes
//Constantes
const fragment = document.createDocumentFragment()
const item = document.getElementById('item')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-card-carrito').content
const itemCarrito = document.getElementById('item-carrito')

//Variables

//Varibles de Storage
//SessionStorage
let storageString = sessionStorage.getItem('htmlIndividual')
let storageJSON = JSON.parse(storageString)
//localStorage
let carritoString = localStorage.getItem('carrito')
let carritoJSON = JSON.parse(carritoString)

console.log(carritoJSON)

itemCarrito.addEventListener('click', e =>{
    cantidadCarrito(e)
}) 




document.addEventListener('DOMContentLoaded', () => {
    pintarItemHTMLInvividual ()
    pintarCarrito ()
    })



    const pintarItemHTMLInvividual = () => {
        templateCard.querySelector('.card-title').textContent = storageJSON.itemName
        templateCard.querySelector('h4').textContent = storageJSON.itemPrice
        templateCard.querySelector('.img-fluid').setAttribute('src', storageJSON.image) 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        item.appendChild(fragment)
    }

    const pintarCarrito = object => {
        itemCarrito.innerHTML = ''
        Object.values(carritoJSON).forEach(producto => {
            templateCarrito.querySelector('h6').textContent = producto.id
            templateCarrito.querySelector('.card-title').textContent = producto.itemName
            templateCarrito.querySelectorAll('h5')[1].textContent = parseInt(producto.cantidad) * parseInt(producto.itemPrice)
            templateCarrito.querySelectorAll('h6')[2].textContent = producto.cantidad
            templateCarrito.querySelector('.btn-outline-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-outline-danger').dataset.id = producto.id
            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        });
        itemCarrito.appendChild(fragment)
    }


    function cantidadCarrito (e){
        if(e.target.classList.contains('btn-outline-info')){
            const producto = carritoJSON[e.target.dataset.id]
            producto.cantidad = carritoJSON[e.target.dataset.id].cantidad + 1
            carritoJSON[e.target.dataset.id] = {...producto}
            let carritoString = JSON.stringify(carritoJSON)
            localStorage.setItem('carrito', carritoString)
        }
        if(e.target.classList.contains('btn-outline-danger')){
            const producto = carritoJSON[e.target.dataset.id]
            producto.cantidad = carritoJSON[e.target.dataset.id].cantidad - 1
            carritoJSON[e.target.dataset.id] = {...producto}
            let carritoString = JSON.stringify(carritoJSON)
            localStorage.setItem('carrito', carritoString)
            if(producto.cantidad === 0){
                delete carritoJSON[e.target.dataset.id]
                localStorage.removeItem('carrito')
            }
        }
        pintarCarrito(carritoJSON)
    }
