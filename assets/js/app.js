/* ============================================================
   DATA PRODUK (EDIT SESUKA ANDA)
============================================================ */
const products = [
    {
        id: 1,
        name: "Madu Murni Premium",
        price: 85000,
        img: "assets/img/madu-1.jpg",
        bestseller: true
    },
    {
        id: 2,
        name: "Madu Hitam Pahit",
        price: 95000,
        img: "assets/img/madu-2.jpg",
        bestseller: true
    },
    {
        id: 3,
        name: "Habbatussauda Oil",
        price: 65000,
        img: "assets/img/habbatussauda.jpg",
        bestseller: false
    },
    {
        id: 4,
        name: "Propolis Herbal",
        price: 120000,
        img: "assets/img/propolis.jpg",
        bestseller: true
    },
    {
        id: 5,
        name: "Vitamin C Herbal",
        price: 45000,
        img: "assets/img/vitamin-c.jpg",
        bestseller: false
    },
    {
        id: 6,
        name: "Jahe Merah Instan",
        price: 30000,
        img: "assets/img/jahemerah.jpg",
        bestseller: false
    }
];

/* ============================================================
   GENERATE CARD PRODUK
============================================================ */
const productList = document.getElementById("product-list");
const bestSellerList = document.getElementById("best-seller");

function renderProducts() {
    productList.innerHTML = "";
    bestSellerList.innerHTML = "";

    products.forEach(p => {
        const card = `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <div class="info">
                    <h3>${p.name}</h3>
                    <p class="price">Rp ${p.price.toLocaleString()}</p>
                    <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
                </div>
            </div>
        `;

        productList.innerHTML += card;

        if (p.bestseller) {
            bestSellerList.innerHTML += card;
        }
    });
}

renderProducts();

/* ============================================================
   CART SYSTEM
============================================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartUI();

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);

    if (exist) {
        exist.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (${item.qty})</span>
                <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
                <button class="remove-btn" onclick="removeItem(${item.id})">✕</button>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = "Rp " + total.toLocaleString();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

/* ============================================================
   WHATSAPP CHECKOUT
============================================================ */
function checkoutWA() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let text = "*HERBAPRIMA – Checkout Order*\n\n";
    cart.forEach(item => {
        text += `• ${item.name} x ${item.qty} = Rp ${(item.price * item.qty).toLocaleString()}\n`;
    });

    const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
    text += `\n*Total: Rp ${total.toLocaleString()}*\n\n`;
    text += "Nama: \nAlamat: \nMetode Pembayaran: \n";

    const encoded = encodeURIComponent(text);

    window.open(`https://wa.me/6281234567890?text=${encoded}`, "_blank");
}

/* ============================================================
   IMAGE SLIDER
============================================================ */
let currentSlide = 0;

function startSlider() {
    const slides = document.querySelector(".slides");
    const total = slides.children.length;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % total;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3500);
}

startSlider();
