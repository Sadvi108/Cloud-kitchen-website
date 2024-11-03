document.addEventListener('DOMContentLoaded', function() {
    // Show home section by default
    showSection('home');

    // Operations button functionality
    const operationsBtn = document.getElementById('operationsBtn');
    const operationsContent = document.getElementById('operationsContent');

    operationsBtn.addEventListener('click', function() {
        operationsContent.style.display = operationsContent.style.display === 'none' ? 'block' : 'none';
    });

    // Cart functionality
    const cartIcon = document.getElementById('cart-icon');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const confirmOrderBtn = document.getElementById('confirm-order');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
    let cart = [];

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
            updateCartDisplay();
            animateCart();
        });
    });

    // Cart icon click
    cartIcon.addEventListener('click', function() {
        showSection('cart');
    });

    // Confirm order
    confirmOrderBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            showSection('order-confirmation');
        } else {
            alert('Your cart is empty!');
        }
    });

    // Proceed to payment
    proceedToPaymentBtn.addEventListener('click', function() {
        showSection('payment-gateway');
    });

    // Payment buttons
    document.querySelectorAll('.payment-button').forEach(button => {
        button.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            if (method === 'card') {
                showSection('credit-card-form');
            } else {
                processPayment(method);
            }
        });
    });

    // Credit card form submission
    const cardPaymentForm = document.getElementById('card-payment-form');
    cardPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Here you would typically send this data to a secure payment processor
        // For this example, we'll just log it and show a success message
        console.log('Card payment submitted:', { cardNumber, cardName, expiryDate, cvv });
        alert('Card payment processed successfully!');
        cart = [];
        updateCartDisplay();
        showSection('home');
    });



    function addToCart(name, price) {
        cart.push({ name, price });
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - RM ${item.price.toFixed(2)}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = `Total: RM ${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
    }

    function animateCart() {
        cartIcon.classList.add('cart-animation');
        setTimeout(() => cartIcon.classList.remove('cart-animation'), 500);
    }

    function processPayment(method) {
        // In a real application, this would connect to a payment processing service
        alert(`Processing payment with ${method}. Thank you for your order!`);
        cart = [];
        updateCartDisplay();
        showSection('home');
    }
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

function toggleMenu() {
    const menuSection = document.getElementById('menu');
    menuSection.style.display = menuSection.style.display === 'none' ? 'block' : 'none';
}