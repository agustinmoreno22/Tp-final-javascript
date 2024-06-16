document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const cartElement = document.getElementById('cart');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButton = document.querySelector('.close-button');
    const checkoutForm = document.getElementById('checkout-form');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const product = { id, name, price };
            addToCart(product);
            Swal.fire({
                icon: 'success',
                title: 'Agregado al carrito',
                text: `${name} se ha agregado al carrito.`,
                showConfirmButton: false,
                timer: 1500
            });
        });
    });

    cartButton.addEventListener('click', () => {
        cartElement.style.display = cartElement.style.display === 'none' || cartElement.style.display === '' ? 'block' : 'none';
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Carrito vacío',
                text: 'El carrito está vacío. Agrega productos antes de continuar.',
                confirmButtonText: 'OK'
            });
            return;
        }
        checkoutModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Guardar datos del usuario
        const userData = {
            name,
            email,
            phone,
            cart
        };

        console.log('Datos del usuario:', userData);
        
        Swal.fire({
            icon: 'success',
            title: 'Compra finalizada',
            text: `Gracias por su compra, ${name}!`,
            showConfirmButton: false,
            timer: 3000,
            willClose: () => {
                clearCart();
                checkoutModal.style.display = 'none';
            }
        });
    });

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: `${item.name} se ha eliminado del carrito.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            li.appendChild(removeButton);
            cartItems.appendChild(li);
            total += item.price;
        });
        cartCount.textContent = cart.length;
        cartTotal.textContent = total.toFixed(2);
    }

    function clearCart() {
        cart.length = 0;
        updateCart();
    }
});
