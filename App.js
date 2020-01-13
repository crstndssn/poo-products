// Product constructor
class Product {
    constructor(name, price, year) {
        this.name = name
        this.price = price
        this.year = year
    }
}

// UI constructor
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list')
        const element = document.createElement('div')
        element.innerHTML = `
                <div class="card text-center mb-4">
                    <div class="card-body">
                        <strong>Product</strong>: ${product.name} -
                        <strong>Price</strong>: ${product.price} -
                        <strong>Year</strong>: ${product.year}
                        <a href="#" class="btn btn-danger" name="delete">Delete</a>
                    </div> 
                </div> 
        `;
        productList.appendChild(element);
    }
    resetForm() {
        document.getElementById('product-form').reset()
    }

    deleteProduct(element) {
        if (element.name === 'delete'){
            element.parentElement.parentElement.remove()
            this.showMessage('Producto eliminado satisfactoiamente', 'danger')
        }

    }

    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message))
        // Show in DOM
        const container = document.querySelector('.container')
        const app = document.querySelector('#App');
        //Insert message in the UI
        container.insertBefore(div, app)
        //Remove the message after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }
}

// DOM Events
document.getElementById('product-form').addEventListener('submit', function (e) {
        const name = document.getElementById('name').value
        const price = document.getElementById('price').value
        const year = document.getElementById('year').value

        // Create new Object Product
        const product = new Product(name, price, year);

        // Create a new UI
        const ui = new UI()

        // Input User validation
        if (name === '' || price === '' || year === '') {
            return ui.showMessage('insert data all fields', 'warning')
        }

        // Save product
        ui.addProduct(product)
        ui.showMessage('Prodduct Added Succesfully', 'success');
        ui.resetForm()

        e.preventDefault()
})

document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
    e.preventDefault()
})
