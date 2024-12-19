import generatePDF from './generatePDF.js';

// tags
const content_products = document.querySelector('#content_products')
const content_movement = document.querySelector('#content-movement');
const btn_reset = document.querySelector('#btn_reset')
const btn_dowload_pdf = document.querySelector('#btn_dowload_pdf')


let products = [
    {
        id: 1,
        descripcion: "Salsa P",
        peso: 18.18,
        unidad: "Kg Caja",
        cantidadActual: 0
    },
    {
        id: 2,
        descripcion: "Salsa individual",
        peso: 112,
        unidad: "Pizzas",
        cantidadActual: 0
    },
    {
        id: 3,
        descripcion: "Salsa Verder R",
        peso: 3,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 4,
        descripcion: "Alitas",
        peso: 2,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 5,
        descripcion: "Boneless Bufalo",
        peso: 2,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 6,
        descripcion: "Boneless Natural",
        peso: 2,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 7,
        descripcion: "Chicharron R.",
        peso: 1,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 8,
        descripcion: "Chorizo.",
        peso: 2.27,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 9,
        descripcion: "Jamon",
        peso: 1.36,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 10,
        descripcion: "Peperonni",
        peso: 11.34,
        unidad: "Kg Caja",
        cantidadActual: 0
    },
    {
        id: 11,
        descripcion: "Salchicha ITA.",
        peso: 2.26,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 12,
        descripcion: "Tocino",
        peso: 2.5,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 13,
        descripcion: "Spaguetti",
        peso: 5,
        unidad: "Tubo",
        cantidadActual: 0
    },
    {
        id: 14,
        descripcion: "Papas Gajo",
        peso: 2.27,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 15,
        descripcion: "Muncher",
        peso: 1.36,
        unidad: "Kg Bolsa",
        cantidadActual: 0
    },
    {
        id: 16,
        descripcion: "Queso",
        peso: 13.61,
        unidad: "Kg Caja",
        cantidadActual: 0
    },
    {
        id: 17,
        descripcion: "Queso Orilla",
        peso: 6.80,
        unidad: "Kg Caja",
        cantidadActual: 0
    },
    
    {
        id: 18,
        descripcion: "Harina",
        peso: 5,
        unidad: "Costales",
        cantidadActual: 0
    },
    {
        id: 19,
        descripcion: "Harina 5",
        peso: 10,
        unidad: "Bolitas",
        cantidadActual: 0
    },
    {
        id: 20,
        descripcion: "Harina 10",
        peso: 10,
        unidad: "Bolitas",
        cantidadActual: 0
    },
    {
        id: 21,
        descripcion: "Harina 17",
        peso: 10,
        unidad: "Bolitas",
        cantidadActual: 0
    },
    {
        id: 22,
        descripcion: "Harina 17 Mantq",
        peso: 10,
        unidad: "Bolitas",
        cantidadActual: 0
    },
    {
        id: 23,
        descripcion: "Cajas",
        peso: 100,
        unidad: "Cajas",
        cantidadActual: 0
    }
]

let movement = []

let LocalProducts = []
let LocalMovement = []

if (!localStorage.getItem('products') || !localStorage.getItem('movement')) {
    console.log('Cargando datos iniciales');
    load_data_local();
}
else{
    LocalProducts = JSON.parse(localStorage.getItem('products'))
    LocalMovement = JSON.parse(localStorage.getItem('movement'))
    console.log('no entro')
}

// add all products.
function onLoadData() {
    content_products.innerHTML = ''
    LocalProducts.map(product => {
        const add_product = document.createElement('article');
        add_product.classList.add('product');
        add_product.id = product.id;
        add_product.innerHTML = `
            <div class="icon">
                        <input type="checkbox" class="check-product">
                    </div>
                    <div class="description">
                        <h3>${product.descripcion}</h3>
                        <span>${product.peso} ${product.unidad}</span>                    
                    </div>
                    <div class="options">
                    <button class="btn-action fa-solid fa-plus btn_add" data-id="${product.id}"></button>
                    <button class="btn-action fa-solid fa-minus btn_minus" data-id="${product.id}"></button>
                <input class="input-cantidad input-info" type="number" data-cantidad="${product.id}" value="${product.cantidadActual}" id="cantidad-${product.id}">
                <input class="input-info" type="number" value="${product.cantidadActual * product.peso}" id="peso-final-${product.id}" disabled>
                    <div class="update">
                        <button class="btn-update" data-update="${product.id}" id="editar-${product.id}">Individuales</button>
                    </div>
        `;
        content_products.appendChild(add_product)
    })

            // Evento para el botón de "sumar" cantidad
        document.querySelectorAll(".btn_add").forEach(button => {
            button.addEventListener('click', (event) => add_count(event, "add")); // Pasa el 'event' y "add" a la función
        });

        // Evento para el botón de "restar" cantidad
        document.querySelectorAll(".btn_minus").forEach(button => {
            button.addEventListener('click', (event) => add_count(event, "minus")); // Pasa el 'event' y "minus" a la función
        });

        // Evento para el botón de "editar" peso
        document.querySelectorAll(".btn-update").forEach(button => {
            button.addEventListener('click', (event) => edit_weight(event)); // Pasa el 'event' y "minus" a la función
        });

        document.querySelectorAll(".check-product").forEach(checkbox => {
            checkbox.addEventListener('change', (event) => active_checkbox(event))
        })

        document.querySelectorAll(".input-cantidad").forEach(cantidadChange => {
            cantidadChange.addEventListener('change', (event) => change_count(event))
        })
}

function load_data_local(){
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('movement', JSON.stringify(movement))
        LocalProducts = JSON.parse(localStorage.getItem('products'))
        LocalMovement = JSON.parse(localStorage.getItem('movement'))
}

// Metodo para modificar el peso con las cantidades de los botones mas y menos
const add_count = (event, type) => {        
    let peso = 0;
    const currentlyElement = event.target;
    const productId = currentlyElement.dataset.id;  // Accede al atributo data-id
    const elementCantidad = document.querySelector(`#cantidad-${productId}`)
    const elementPeso = document.querySelector(`#peso-final-${productId}`);    
    let cantidad = parseInt(elementCantidad.value);
       if (type === "add") {
        cantidad += 1;
    } else if (type === "minus" && cantidad > 0) {
        cantidad -= 1;
    }
    const productoSeleccionado = LocalProducts.find(product => product.id === parseInt(productId));

    if(cantidad > 0)
    {
        if (productoSeleccionado) {
            peso = cantidad * productoSeleccionado.peso;
            peso = peso.toFixed(2);
            productoSeleccionado.cantidadActual = cantidad;
            elementCantidad.value = cantidad;
            elementPeso.value = peso;
        } else {
            console.log('Producto no encontrado');
        }
    }
    else{
        productoSeleccionado.cantidadActual = cantidad;
        elementCantidad.value = 0;
        elementPeso.value = 0;
    }
    actualizarLocalStorageProduct();
}

const actualizarLocalStorageProduct = () => {
    localStorage.setItem('products', JSON.stringify(LocalProducts))
}

const actualizarLocalStorageMovement = () => {
    localStorage.setItem('movement', JSON.stringify(LocalMovement))
}

const edit_weight = (event) => {      
    const currentlyElement = event.target;
    const productId = currentlyElement.dataset.update;  // Accede al atributo data-id
    const currentProduct = LocalProducts.find(product => product.id === parseInt(productId))
    const currentWeight = document.querySelector(`#peso-final-${productId}`).value
    document.querySelector('#pd-id').textContent = currentProduct.id;
    document.querySelector('#pd-description').textContent = currentProduct.descripcion;
    document.querySelector('#pd-cantidad').value = currentWeight;
    load_movement(productId, currentProduct);  
    sum_weights();
    modal.style.display = "block";
    // Esperar un pequeño tiempo antes de agregar la clase 'active' para permitir la animación
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('active');
    }, 10); // Ajusta este tiempo si es necesario
    console.log(productId)
}

const load_movement = (id, product) => {
    const allMovement = LocalMovement.filter(movement2 => movement2.fk_product === parseInt(id))
    console.log(allMovement, 'Local')
    content_movement.innerHTML = ``;
    allMovement.forEach(movement => {
        console.log(movement.weight, 'Movement')
        const new_movement = document.createElement('div');
        new_movement.classList.add('c-product');
        new_movement.innerHTML = `
                        <div class="c-id">
                            <h4 id="pd-id">${movement.fk_product}</h4>
                        </div>
                        <div class="c-description">
                            <h4 id="pd-description">${product.descripcion}</h4>
                        </div>
                        <div class="c-cantidad">
                            <input type="number" class="pd-peso" value="${parseFloat(movement.weight)}" onchange="sum_weights()" />
                        </div>
                        <div class="c-options">
                            <button class="btn-remove-movement fa-solid fa-minus" data-movement='${movement.id}'></button>
                        </div>
        `;
        content_movement.appendChild(new_movement)
    })
    loadEventRemove();
}

const new_weight = (event) => {
    const id = parseInt(document.querySelector('#pd-id').textContent);
    const maxId = LocalMovement.length > 0 
        ? Math.max(...LocalMovement.map(mov => mov.id)) 
        : 0;
    const id_movement = maxId + 1;
    const product = LocalProducts.find(product => product.id === id);
    const new_movement = document.createElement('div');
    new_movement.classList.add('c-product');
    new_movement.innerHTML = `
                    <div class="c-id">
                        <h4 id="pd-id">${product.id}</h4>
                    </div>
                    <div class="c-description">
                        <h4 id="pd-description">${product.descripcion}</h4>
                    </div>
                    <div class="c-cantidad">
                        <input type="number" class="pd-peso" value="0" data-weight='${id_movement}' onchange="sum_weights()"/>
                    </div>
                    <div class="c-options">
                        <button class="btn-remove-movement fa-solid fa-minus" data-movement='${id_movement}'></button>
                    </div>
    `;
    const nw_movement = {
        id: id_movement,
        fk_product: id,
        weight: 0,
        date: new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date()) // Formato 'DD/MM/YYYY'
    };
    LocalMovement.push(nw_movement)
    actualizarLocalStorageMovement()
    content_movement.appendChild(new_movement)
    console.log(id)
    loadEventRemove();
}


const remove_movement = (event) => {
    const currentMovement = event.target;
    const movementId = parseInt(currentMovement.dataset.movement);

    // Verificar que movementId es válido
    if (!movementId) {
        console.error("El ID del movimiento no es válido:", movementId);
        return;
    }

    // Buscar el movimiento
    const foundMovement = LocalMovement.find(movem => movem.id === movementId);

    // Validar si el movimiento existe antes de continuar
    if (!foundMovement) {
        console.warn(`Movimiento con ID ${movementId} no encontrado en el array.`);
        return;
    }

    // Buscar el producto asociado
    const currentProduct = LocalProducts.find(product => product.id === foundMovement.fk_product);
    if (!currentProduct) {
        console.warn(`Producto con ID ${foundMovement.fk_product} no encontrado.`);
        return;
    }

    // Remover el movimiento del array
    LocalMovement = LocalMovement.filter(movem => movem.id !== movementId);
    console.log(`Movimiento con ID ${movementId} eliminado.`);
    console.log('Movimientos restantes:', LocalMovement);
    actualizarLocalStorageMovement()
    load_movement(currentProduct.id, currentProduct);
    sum_weights();
};

const sum_weights = (event) => {
    const weights = document.querySelectorAll('.pd-peso');
    if(weights)
    {
        let sum = 0;
        //weights.forEach(weight => {sum = sum +  parseFloat(weight.value)})
        weights.forEach(weight => 
            {
                const currentlyMovement = parseInt(weight.dataset.weight);
                const movementToUpdate = LocalMovement.find(mov => mov.id === currentlyMovement);
                if (movementToUpdate) {
                    movementToUpdate.weight = parseFloat(weight.value);
                }
                sum = sum + parseFloat(weight.value)
            })
        sum = sum.toFixed(2);
        console.log(LocalMovement, 'Sumo')
        actualizarLocalStorageMovement();
        document.querySelector('#c-total').textContent = sum;
    }
}

const active_checkbox = (event) => {
    const product = event.target.closest('.product'); // Encuentra el producto padre del checkbox
    const icon = product.querySelector('.icon'); // Encuentra la clase "icon" dentro del producto

    if (event.target.checked) {
        icon.style.backgroundColor = 'var(--var-background-minus)'; // Cambia el fondo a verde

        // Verifica si ya existe el ícono para no duplicarlo
        if (!icon.querySelector('.fa-check')) {
            const check = document.createElement('i');
            check.classList.add('fa-solid', 'fa-check');
            icon.appendChild(check); // Agrega el ícono al elemento
        }
    } else {
        icon.style.backgroundColor = ''; // Restaura el fondo al valor original

        // Remueve el ícono si existe
        const check = icon.querySelector('.fa-check');
        if (check) {
            icon.removeChild(check);
        }
    }
};


const change_count = (event) => {
    const currentlyElement = event.target;
    const id = currentlyElement.dataset.cantidad;
    const cantidad = parseFloat(currentlyElement.value);
    const elementPeso = document.querySelector(`#peso-final-${id}`);    
    let peso = 0;

    if(cantidad > 0)
        {
            const productoSeleccionado = LocalProducts.find(producto => producto.id === parseInt(id))
            if (productoSeleccionado) {
                peso = cantidad * productoSeleccionado.peso;
                peso = peso.toFixed(2);  
                productoSeleccionado.cantidadActual = cantidad;          
                elementPeso.value = peso;
            } else {
                console.log('Producto no encontrado');
            }
        }
        else{
            productoSeleccionado.cantidadActual = cantidad;          
            elementPeso.value = 0;
        }
        actualizarLocalStorageProduct();
}




// Obtener el modal
const modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
const openModalBtn = document.getElementById("openModalBtn");

// Obtener el <span> que cierra el modal
const closeModalSpan = document.getElementsByClassName("close")[0];

// Obtener el botón que también cierra el modal
const closeModalBtn = document.getElementById("closeModalBtn");

// Función para cerrar el modal cuando se hace clic en el <span>
closeModalSpan.addEventListener('click', function() {
    modal.style.display = "none";
    modal.querySelector('.modal-content').classList.remove('active');

});

// Función para cerrar el modal cuando se hace clic en el botón "Cerrar Modal"
closeModalBtn.addEventListener('click', function() {
    modal.style.display = "none";
    modal.querySelector('.modal-content').classList.remove('active');
});

// Cerrar el modal si el usuario hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.querySelector('.modal-content').classList.remove('active');
    }
});

function resetData() {
    load_data_local();
    onLoadData();

    console.log('Entro a productos')
}

onLoadData();

function loadEventRemove(){
    document.querySelectorAll(".btn-remove-movement").forEach(btnRemoveMovement => {
        btnRemoveMovement.addEventListener('click', (event) => remove_movement(event))
    })
}

btn_reset.addEventListener('click', () => resetData())

btn_dowload_pdf.addEventListener('click', () => generatePDF(LocalProducts))

document.querySelector('.btn-new-update').addEventListener('click', (event) => new_weight(event));