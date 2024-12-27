// Дані про товари
const products = [
    {
        name: "Сукня",
        model: "020",
        fabric: "турецька",
        colors: ["чорний", "молоко", "шоколад"],
        sizes: ["42/44", "46/48", "50/52"],
        price: 700,
        image: "images/1.jfif"
    },
    {
        name: "Блуза",
        style: "ретро",
        features: "короткий топ із довгими рукавами",
        sizes: ["42/44", "46/48"],
        price: 456,
        image: "images/2.png"
    },
    {
        name: "Светр",
        material: "в’язаний трикотаж",
        elasticity: "висока",
        sizes: ["46/48", "50/52"],
        price: 318,
        image: "images/3.png"
    },
    {
        name: "Куртка",
        material: "пуховик",
        elasticity: "висока",
        sizes: ["46/48", "50/52"],
        price: 1300,
        image: "images/foto1.jpg"
    },
    {
        name: "Куртка",
        material: "джинсова",
        elasticity: "висока",
        sizes: ["46/48", "50/52"],
        price: 1500,
        image: "images/foto2.jpg"
    },
    {
        name: "Базовий подовжений тренч, плащ під пояс",
        material: "тренч, плащ",
        elasticity: "висока",
        sizes: ["46/48", "50/52"],
        price: 1200,
        image: "images/foto3.jpg"
    },
    {
        name: "Плащ",
        material: "пороховик",
        elasticity: "висока",
        sizes: ["42/44", "50/52"],
        price: 600,
        image: "images/foto4.png"
    },
    {
        name: "Замшеві черевики",
        material: "Fashion",
        elasticity: "висока",
        sizes: ["36/38", "40/41"],
        price: 1800,
        image: "images/images.webp"
    },
    {
        name: "Зимовий жіночий великий шарф",
        material: "Бахрома",
        elasticity: "висока",
        sizes: ["46/48", "50/52"],
        price: 699,
        image: "images/foto5.webp"
    },
];

// Масив для кошика
let cart = [];

// Функція для відображення товарів
function renderProducts(productArray) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Очищуємо список перед новим виведенням
    productArray.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onclick="openModal('${product.image}')">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">
                            Ціна: <strong>${product.price} ₴</strong><br>
                            Розміри доступні: ${product.sizes ? product.sizes.join(', ') : 'Невідомо'}
                        </p>
                        <button class="btn btn-primary" onclick="addToCart(${product.price}, '${product.name}', '${product.image}')">Купити</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Функція для додавання товару до кошика
function addToCart(price, name, image) {
    const product = { price, name, image };
    cart.push(product);
    updateCart();
}

// Функція для видалення товару з кошика
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Функція для оновлення відображення кошика
function updateCart() {
    const cartList = document.getElementById("cartList");
    const cartCount = document.getElementById("cartCount");
    cartList.innerHTML = ""; // Очищуємо кошик перед оновленням
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price} ₴</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Видалити</button>
            </div>
        `;
        cartList.innerHTML += cartItem;
    });

    cartCount.innerHTML = `Товари в кошику: ${cart.length}`;
    document.getElementById("totalPrice").innerHTML = `Загальна вартість: ${totalPrice} ₴`;
}

// Функція для відкриття модального вікна з фотографією
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = imageSrc;

    // Блокуємо прокручування сторінки
    document.body.classList.add("modal-open");
}

// Функція для закриття модального вікна
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";

    // Відновлюємо прокручування сторінки
    document.body.classList.remove("modal-open");
}


// Ініціалізація списку товарів
renderProducts(products);

// Фільтрація товарів
document.getElementById("priceFilter").addEventListener("input", function () {
    const maxPrice = this.value;
    document.getElementById("priceValue").textContent = `${maxPrice} ₴`; // Update displayed price
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    renderProducts(filteredProducts);
});

document.getElementById("sizeFilter").addEventListener("change", function () {
    const selectedSize = this.value;
    const filteredProducts = selectedSize === "all" ? products : products.filter(product => product.sizes && product.sizes.includes(selectedSize));
    renderProducts(filteredProducts);
});

// Додаємо обробник події для кнопки "Оформити замовлення"
let successMessage = document.querySelector(".success-message");
let message = document.querySelector('.message');
let check = document.querySelector('.checkmark');
successMessage.style.display = 'none';

// Add event listener for the "Checkout" button
document.getElementById("checkoutBtn").addEventListener("click", () => {
    // Check if the cart is empty
    if (cart.length === 0) {
        // If the cart is empty, show the empty cart message
        message.innerHTML = "Ваш кошик порожній! Будь ласка, виберіть товари з каталогу.";
        successMessage.style.background = 'red';  // Optional, change background to red for error
        successMessage.style.display = "flex";  // Show the error message
        check.innerHTML = '&#10006;';
        // Hide the message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
        return;  // Stop further execution if the cart is empty
    }
    
    // Clear the cart after successful order
    cart = [];
    updateCart();
    
    // Show success message
    message.innerHTML = "Ваше замовлення оформлено успішно! Дякуємо за покупку.";
    check.innerHTML = '&#10003;';
    successMessage.style.background = 'green';  // Optional, change background to green for success
    successMessage.style.display = "flex";  // Show the success message

    // Hide the success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
});

