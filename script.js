let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a book to the cart with quantity check
function addToCart(book, button) {
    const existingItem = cart.find(item => item.title === book.title);

    if (existingItem) {
        if (existingItem.quantity < book.maxQuantity) {
            existingItem.quantity += 1;
        } else {
            button.disabled = true;
            button.nextElementSibling.classList.remove('d-none'); 
            setTimeout(() => {
                button.nextElementSibling.classList.add('d-none');
                button.disabled = false;
            }, 2000); 
            return alert(`${book.title} is now unavailable.`);
        }
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    saveCart();
    updateCartDisplay();
    alert(`${book.title} added to cart.`);
}

// Function to update the cart display and item counts
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCountDisplay = document.getElementById('cart-count');
    cartItemsList.innerHTML = '';  

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((book, index) => {
        totalPrice += book.price * book.quantity;
        totalItems += book.quantity;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${book.title} - Rs.${book.price} x 
            <input type="number" min="1" value="${book.quantity}" data-index="${index}" class="quantity-input me-2">
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        `;

        cartItemsList.appendChild(listItem);
    });

    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = totalPrice;
    cartCountDisplay.textContent = totalItems;
}

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event Listener for Add to Cart buttons with max quantity checks
document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function () {
        const book = {
            title: this.dataset.title,
            price: parseInt(this.dataset.price),
            maxQuantity: parseInt(this.dataset.max)
        };
        addToCart(book, this);
    });
});

// Event Listener for Quantity Input Change
document.getElementById('cartItemsList').addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value);

        if (newQuantity > 0 && newQuantity <= cart[index].maxQuantity) {
            cart[index].quantity = newQuantity;
            saveCart();
            updateCartDisplay();
        } else {
            alert(`Quantity should be between 1 and ${cart[index].maxQuantity}`);
            event.target.value = cart[index].quantity; // Reset to previous valid quantity
        }
    }
});

// Event Listener for Delete Button Click
document.getElementById('cartItemsList').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Remove the item from cart
        saveCart();
        updateCartDisplay();
    }
});

updateCartDisplay();
function updateCheckoutDisplay() {
    const checkoutTotalItems = document.getElementById('checkoutTotalItems');
    const checkoutTotalPrice = document.getElementById('checkoutTotalPrice');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(book => {
        totalItems += book.quantity;
        totalPrice += book.price * book.quantity;
    });

    checkoutTotalItems.textContent = totalItems;
    checkoutTotalPrice.textContent = totalPrice;
}

// Update the checkout section whenever the cart display is updated
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCountDisplay = document.getElementById('cart-count');
    cartItemsList.innerHTML = '';  

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((book, index) => {
        totalPrice += book.price * book.quantity;
        totalItems += book.quantity;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item justify-content-between align-items-center';
        listItem.innerHTML = `
            ${book.title} - Rs.${book.price} x 
            <input type="number" min="1" value="${book.quantity}" data-index="${index}" class="quantity-input me-2">
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        `;

        cartItemsList.appendChild(listItem);
    });

    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = totalPrice;
    cartCountDisplay.textContent = totalItems;

    // Update checkout display
    updateCheckoutDisplay();
}
document.getElementById('confirmCheckout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Purchase Confirmed! Thank you for shopping with us.");
        cart = []; 
        saveCart(); 
        updateCartDisplay(); 
    }
});

//loader 
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            document.getElementById("loader").style.display = "none";
            document.getElementById("content").style.display = "block";
        }, 2000);
    });
//Dashboard