const PRODUCTS = {
  "1": {name:"Weird Behaviour Tee", price:32, category:"T-SHIRT / NEW", description:"A clean, slightly strange everyday tee. Designed to look considered without taking itself too seriously."},
  "2": {name:"Stay Weird Tee", price:32, category:"T-SHIRT / CORE", description:"The unofficial Cookie Goofy uniform. Minimal from a distance, odd up close."},
  "3": {name:"Cookie Club Sweatshirt", price:54, category:"SWEATSHIRT / NEW", description:"Soft, relaxed and built for members of the club who prefer their basics with personality."},
  "4": {name:"Goofy Internet Hoodie", price:69, category:"HOODIE / LIMITED", description:"A deliberately nostalgic hoodie for the part of the internet that never learned to behave."}
};

let cart = JSON.parse(localStorage.getItem("cookieGoofyCart") || "[]");
let activeProduct = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function euro(value) {
  return new Intl.NumberFormat("pt-PT", {style:"currency", currency:"EUR"}).format(value);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateCart() {
  $("#bagCount").textContent = cart.length;

  if (!cart.length) {
    $("#cartItems").innerHTML = `
      <div style="padding:70px 25px;text-align:center">
        <img src="assets/cookie-goofy-logo.png" alt="" style="width:55px">
        <p style="font:10px var(--mono);letter-spacing:.08em">YOUR BAG IS WEIRDLY EMPTY.</p>
      </div>`;
    $("#cartTotal").textContent = euro(0);
    return;
  }

  let total = 0;
  $("#cartItems").innerHTML = cart.map((item, index) => {
    const product = PRODUCTS[item.id];
    total += product.price;
    return `
      <div class="cart-item">
        <div class="cart-thumb"><div class="garment tee dark"><b>COOKIE<br>GOOFY</b></div></div>
        <div>
          <strong>${product.name}</strong>
          <small>SIZE ${item.size}<br>${euro(product.price)}</small>
          <button data-remove="${index}">REMOVE</button>
        </div>
        <span style="font:8px var(--mono)">1×</span>
      </div>`;
  }).join("");

  $("#cartTotal").textContent = euro(total);

  $$("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.remove), 1);
      saveCart();
    });
  });
}

function saveCart() {
  localStorage.setItem("cookieGoofyCart", JSON.stringify(cart));
  updateCart();
}

function openCart() {
  $("#cart").classList.add("open");
  $("#overlay").classList.add("open");
}

function closeCart() {
  $("#cart").classList.remove("open");
  $("#overlay").classList.remove("open");
}

function openProduct(id) {
  const product = PRODUCTS[id];
  if (!product) return;

  activeProduct = id;
  $("#modalCategory").textContent = product.category;
  $("#modalTitle").textContent = product.name;
  $("#modalPrice").textContent = euro(product.price);
  $("#modalDescription").textContent = product.description;

  $$(".sizes button").forEach(button => button.classList.toggle("selected", button.textContent === "M"));

  $("#productModal").classList.add("open");
  $("#productModal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProduct() {
  $("#productModal").classList.remove("open");
  $("#productModal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addActiveProduct() {
  if (!activeProduct) return;
  const size = $(".sizes button.selected")?.textContent || "M";
  cart.push({id: activeProduct, size});
  saveCart();
  closeProduct();
  openCart();
  showToast("ADDED TO YOUR BAG");
}

function setupProductLinks() {
  $$('a[href^="#product-"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openProduct(link.getAttribute("href").replace("#product-", ""));
    });
  });
}

function setupDetails() {
  const buttons = $$(".details-list button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.classList.toggle("open");
      button.querySelector("span").textContent = content.classList.contains("open") ? "−" : "+";
    });
  });
}

function setupSearch() {
  $("#searchToggle").addEventListener("click", () => {
    $("#searchPanel").classList.add("open");
    setTimeout(() => $("#searchInput").focus(), 120);
  });

  $("#searchClose").addEventListener("click", () => $("#searchPanel").classList.remove("open"));

  $("#searchInput").addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();
    const results = Object.entries(PRODUCTS).filter(([id, p]) =>
      `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query)
    );

    $("#searchResults").innerHTML = query ? results.map(([id, p]) =>
      `<a class="search-result" href="#product-${id}"><span>${p.name}</span><span>${euro(p.price)} ↗</span></a>`
    ).join("") : "";
    $$("#searchResults a").forEach(link => link.addEventListener("click", event => {
      event.preventDefault();
      $("#searchPanel").classList.remove("open");
      openProduct(link.getAttribute("href").replace("#product-", ""));
    }));
  });
}

function setupTheme() {
  const saved = localStorage.getItem("cookieGoofyTheme");
  if (saved === "dark") document.body.classList.add("dark");

  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("cookieGoofyTheme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

function setupMenu() {
  const toggle = $(".mobile-toggle");
  const nav = $(".mobile-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  $$(".mobile-nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
}

function setupClub() {
  $("#clubForm").addEventListener("submit", event => {
    event.preventDefault();
    $("#clubMessage").textContent = "YOU'RE IN. WELCOME TO THE COOFY CLUB.";
    event.target.reset();
  });
}

function setupCursor() {
  const cursor = $(".custom-cursor");
  if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("mousemove", event => {
    cursor.style.transform = `translate(${event.clientX + 10}px,${event.clientY + 10}px)`;
  });

  $$("a,button,.product-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  setupProductLinks();
  setupDetails();
  setupSearch();
  setupTheme();
  setupMenu();
  setupClub();
  setupCursor();

  $("#bagToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#continueShopping").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#modalClose").addEventListener("click", closeProduct);
  $("#modalAdd").addEventListener("click", addActiveProduct);

  $$(".sizes button").forEach(button => {
    button.addEventListener("click", () => {
      $$(".sizes button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  $("#checkout").addEventListener("click", () => {
    showToast("CHECKOUT WILL BE CONNECTED IN PHASE 2");
  });

  // The page is intentionally usable even if JavaScript is slow:
  // all core visual content is in index.html and CSS.
});
