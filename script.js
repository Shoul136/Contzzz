// tags
const content_products = document.querySelector('#content_products')
const content_movement = document.querySelector('#content-movement');

let products = [
    {
        id: 1,
        descripcion: "Salsa P",
        peso: 18.18,
        unidad: "Kg Caja"
    },
    {
        id: 2,
        descripcion: "Salsa Verder R",
        peso: 3,
        unidad: "Kg Bolsa"
    },
    {
        id: 3,
        descripcion: "Alitas",
        peso: 2,
        unidad: "Kg Bolsa"
    },
    {
        id: 4,
        descripcion: "Boneless Bufalo",
        peso: 2,
        unidad: "Kg Bolsa"
    },
    {
        id: 5,
        descripcion: "Boneless Natural",
        peso: 2,
        unidad: "Kg Bolsa"
    },
    {
        id: 6,
        descripcion: "Chicharron R.",
        peso: 1,
        unidad: "Kg Bolsa"
    },
    {
        id: 7,
        descripcion: "Chorizo.",
        peso: 2.27,
        unidad: "Kg Bolsa"
    },
    {
        id: 8,
        descripcion: "Jamon",
        peso: 1.36,
        unidad: "Kg Bolsa"
    },
    {
        id: 9,
        descripcion: "Peperonni",
        peso: 11.34,
        unidad: "Kg Caja"
    },
    {
        id: 10,
        descripcion: "Salchicha ITA.",
        peso: 2.26,
        unidad: "Kg Bolsa"
    },
    {
        id: 11,
        descripcion: "Tocino",
        peso: 2.5,
        unidad: "Kg Bolsa"
    },
    {
        id: 12,
        descripcion: "Papas Gajo",
        peso: 2.27,
        unidad: "Kg Bolsa"
    },
    {
        id: 13,
        descripcion: "Muncher",
        peso: 1.36,
        unidad: "Kg Bolsa"
    },
    {
        id: 14,
        descripcion: "Queso",
        peso: 13.61,
        unidad: "Kg Caja"
    },
    {
        id: 15,
        descripcion: "Queso Orilla",
        peso: 6.80,
        unidad: "Kg Caja"
    }
]

let movement = []

console.log(products)

// add all products.
function onLoadData() {
    products.map(product => {
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
                <input class="input-info" type="number" value="0" id="cantidad-${product.id}">
                <input class="input-info" type="number" value="0" id="peso-final-${product.id}">
                    <div class="update">
                        <button class="btn-update" data-update="${product.id}" id="editar-${product.id}">Update</button>
                    </div>
        `;
        content_products.appendChild(add_product)
    })
}


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
    console.log(cantidad)
    if(cantidad > 0)
    {
        const productoSeleccionado = products.find(product => product.id === parseInt(productId));
        if (productoSeleccionado) {
            peso = cantidad * productoSeleccionado.peso;
            peso = peso.toFixed(2);
            console.log(productoSeleccionado); 
            console.log(`Cantidad: ${cantidad}`);
            console.log(`Peso: ${productoSeleccionado.peso}`);
            console.log(`Peso Total: ${peso}`);
            elementCantidad.value = cantidad;
            elementPeso.value = peso;
        } else {
            console.log('Producto no encontrado');
        }
    }
    else{
        elementCantidad.value = 0;
        elementPeso.value = 0;
    }
}

const edit_weight = (event) => { 
    load_movement();   
    const currentlyElement = event.target;
    const productId = currentlyElement.dataset.update;  // Accede al atributo data-id
    const currentProduct = products.find(product => product.id === parseInt(productId))
    const currentWeight = document.querySelector(`#peso-final-${productId}`).value
    document.querySelector('#pd-id').textContent = currentProduct.id;
    document.querySelector('#pd-description').textContent = currentProduct.descripcion;
    document.querySelector('#pd-cantidad').textContent = currentWeight;
    sum_weights();
    modal.style.display = "block";
    console.log(productId)
}

const load_movement = () => {
    content_movement.innerHTML = ``;
}

const new_weight = (event) => {
    const id = parseInt(document.querySelector('#pd-id').textContent);
    const product = products.find(product => product.id === id);
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
                        <input type="number" class="pd-peso" value="0" />
                    </div>
                    <div class="c-options">
                       
                    </div>
    `;
    const nw_movement = 
    {
        id: movement != [] ? movement.length + 1 : 0,        
    }
    content_movement.appendChild(new_movement)
    console.log(id)
}

const sum_weights = () => {
    const weights = document.querySelectorAll('.pd-peso');
    let sum = 0;
    console.log(weights)
    weights.forEach(weight => {sum = sum +  parseFloat(weight.textContent)})
    sum = sum.toFixed(2);
    console.log(sum)
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
});

// Función para cerrar el modal cuando se hace clic en el botón "Cerrar Modal"
closeModalBtn.addEventListener('click', function() {
    modal.style.display = "none";
});



// Cerrar el modal si el usuario hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});



onLoadData();

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

document.querySelector('.btn-new-update').addEventListener('click', (event) => new_weight(event));