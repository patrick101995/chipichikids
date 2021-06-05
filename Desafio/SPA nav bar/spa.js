const navbar = document.getElementById('navbar')


let page;
let template;


document.addEventListener('DOMContentLoaded', () => {
  page = sessionStorage.getItem('spa')
  setContenido(page)
  pintarContenido(template)
  console.log(page)
})

//Event listeners
navbar.addEventListener('click', e => {
  console.log(e.target.textContent)
  setSpa(e)
})



function setContenido(page) {
  console.log(page)
  template = ''
  switch (page) {
    case 'contacto':
      template = `<div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="well well-sm">
                        <form class="form-horizontal" method="post">
                            <fieldset>
                                <legend class="text-center header">Contact us</legend>
        
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="fname" name="name" type="text" placeholder="First Name" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="lname" name="name" type="text" placeholder="Last Name" class="form-control">
                                    </div>
                                </div>
        
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="email" name="email" type="text" placeholder="Email Address" class="form-control">
                                    </div>
                                </div>
        
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-phone-square bigicon"></i></span>
                                    <div class="col-md-8">
                                        <input id="phone" name="phone" type="text" placeholder="Phone" class="form-control">
                                    </div>
                                </div>
        
                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-pencil-square-o bigicon"></i></span>
                                    <div class="col-md-8">
                                        <textarea class="form-control" id="message" name="message" placeholder="Enter your massage for us here. We will get back to you within 2 business days." rows="7"></textarea>
                                    </div>
                                </div>
        
                                <div class="form-group">
                                    <div class="col-md-12 text-center">
                                        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
      break;
    default:
      template = 'Sitio en mantenimiento'
  }

}


const pintarContenido = template => {
  document.getElementById('contenido').innerHTML = template
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