//CODIGO PROYECTO FINAL.

//Objeto constructor de productos.
class Productos{
    constructor(id, nombre, precio, imagen, descripcion){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen,
        this.descripcion = descripcion
    }
}

//Productos.
const PRODUCTO1 = new Productos(1, 'MATE TORPEDO DE MADERA', 2000, '../assets/img/mate-1.jpg', "Su forma se asemeja a un torpedo, con un extremo más angosto que el otro. Esto facilita la preparación y el consumo de la yerba mate. La característica distintiva es su diseño, que ayuda a mantener la yerba mate en un lado, permitiendo que el agua se absorba gradualmente en una sola área.");
const PRODUCTO2 = new Productos(2, 'MATE DE METAL', 3000, '../assets/img/mate-2.jpg', "Mate de metal de medidas standar, compañero fiel para cualquier situacion ya sean viajas cortos, largos o una simple merienda en el hogar.");
const PRODUCTO3 = new Productos(3, 'MATE IMPERIAL DE CALABAZA', 1500, '../assets/img/mate-3.jpg', "El mate imperial suele ser más grande y cóncavo, lo que permite mayor capacidad para la yerba mate y el agua. Esto facilita compartirlo con un grupopersonas, ya que puede servir más porciones sin necesidad de recargar constantemente.");
const PRODUCTO4 = new Productos(4, 'MATE STANLEY VERDE DE METAL', 1000, '../assets/img/mate-4.jpg', "Mate de la marca Stanley hecho de metal, ideal para lucirse al lado de un bello termo de la misma marca y degustar de un rico mate.");
const PRODUCTO5 = new Productos(5, 'MATE TORPEDO PETIZO DE CALABAZA', 5000, '../assets/img/mate-5.jpg', "Igual que un torpedo standar, pero mas petiso. Ideal para aquellos que quieran de un mate tipo torpedo pero sin las maedidas del mismo, manteniendo sus ventajas.");
const PRODUCTO6 = new Productos(6, 'MATE CAMIONERO DE PLASTICO', 5500, '../assets/img/mate-6.jpg', "Igual que un mate camionero, con la diferencia que su material interiro es plastico y su estatura es menor a un camionero standar, lo que reduce su precio pero facilita su portabiolidad.");
const PRODUCTO7 = new Productos(7, 'MATE GAUCHO DE MADERA', 2500, '../assets/img/mate-7.jpg', "Mini mate del tipo que usan los gauchos de campo: pequeño, cortito, vintage, listo para ser usado por alguien que le gusten las cosas tipo antiguas.");
const PRODUCTO8 = new Productos(8, 'MATE CAMIONERO DE CALABAZA', 10000, '../assets/img/mate-8.jpg', "Se caracteriza por su tamaño grande y robusto, diseñado para satisfacer las necesidades de quienes pasan largas horas en la carretera. Estos mates suelen ser más resistentes y capaces de mantener la temperatura de la bebida durante más tiempo.");


//Array productos.
const ARRAYPROD = [PRODUCTO1, PRODUCTO2, PRODUCTO3, PRODUCTO4, PRODUCTO5, PRODUCTO6, PRODUCTO7, PRODUCTO8];

//Array carrito.
let carrito = obtenerCarrito() || [];

//Funcion que muestra los productos disponibles en la tienda en forma de "card".

function generarCards() {
    const SECCION_PRODUCTOS = document.getElementById('tiendaJS')

    ARRAYPROD.forEach(mate => {
        const CARD_PROD = document.createElement('div');
        CARD_PROD.classList.add('card');
        CARD_PROD.innerHTML = `
            <img class="cardImagen cardJS-${mate.id}" src="${mate.imagen}" alt="No hay imagen">
            <h3>${mate.nombre}</h3>
            <p>${mate.descripcion}</p>
            <p>Precio: $ ${mate.precio}</p>
            <button onclick="sumarCarrito(${mate.id})" class="boton-tienda">LO QUIERO</button>
        `;
        SECCION_PRODUCTOS.appendChild(CARD_PROD);
    })
}

//Funcion para sumar productos al carrito.

function sumarCarrito(idProd){
    //TOASTIFY.
    Toastify({
        text:'AGRGADO AL CARRITO',
        duration:'3000',
        position:'right',
        gravity:'top',
        style:{
            background:'rgb(164, 188, 146)'
        }
    
    }).showToast();
    
    carrito = obtenerCarrito() || [];//
    
    const PRODUCTO_SELECCIONADO = ARRAYPROD.find(producto => producto.id === idProd )
    
    if (PRODUCTO_SELECCIONADO) {
        carrito.push(PRODUCTO_SELECCIONADO);
        console.log(`${PRODUCTO_SELECCIONADO.nombre} agregado al carrito`);
        console.log('carrito actual', carrito);
        carritoLocalStorage(carrito);
        actualizarCarrito();
        totalCarrito();
    }
}


//Eliminar producto del carrito.

function eliminarProducto(index){
    Swal.fire({
        title:"DESEA ELIMINAR EL PRODUCTO DEL CARRITO?",
        icon:'question',
        confirmButtonText:'ELIMINAR',
        showCancelButton:true,
        cancelButtonText:"CANCELAR",
        background:"rgb(199, 233, 176)"
    }).then((result) =>{
        if(result.isConfirmed){
            carrito.splice(index, 1);
            carritoLocalStorage(carrito);
            actualizarCarrito();
            totalCarrito();
            Swal.fire({
                title:'PRODUCTO ELIMINADO',
                icon:'success',
                confirmButtonText:"OK",
                background:"rgb(199, 233, 176)"
            })
        }else{
            Swal.fire({
                title:"EL PRODUCTO NO SE ELIMINO",
                icon:'error',
                confirmButtonText:'OK',
                background:"rgb(199, 233, 176)"
            })
        }
    })

}

//Guardar carrito en Local Storage.

function carritoLocalStorage(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Llamar al carrito desde Local Storage.

function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : null;
}

//Funcion que actualiza el carrito y permite visualizarlo.

function actualizarCarrito() {
    const SECCION_CARRITO = document.getElementById('carrito');
    SECCION_CARRITO.innerHTML = '';
    carrito.forEach((mateAgregado, index) => {
        const CARD_CARRO = document.createElement('div')
        CARD_CARRO.classList.add('card');
        CARD_CARRO.innerHTML = `
            <img class="cardImagen" src="${mateAgregado.imagen}" alt="No hay imagen">
            <h3>${mateAgregado.nombre}</h3>
            <p> $ ${mateAgregado.precio}</p>    
            <button onclick="eliminarProducto(${index})" class="boton-tienda"> ELIMINAR</button>
            `;
        SECCION_CARRITO.appendChild(CARD_CARRO);
    })
}

//Total del carrito.

function totalCarrito() {
    const SECCION_TOTAL = document.getElementById('total');
    const TOTAL_PRECIO = carrito.reduce((acc, producto) => acc +producto.precio, 0);
    SECCION_TOTAL.innerText = `Total de su compra $ ${TOTAL_PRECIO}`;
}

generarCards();
actualizarCarrito();
totalCarrito();