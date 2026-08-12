const products = [
  {id:1,name:"Goofy Classic Tee",price:29.90,badge:"NEW",tag:"STAY GOOFY"},
  {id:2,name:"Everyday Heavy Tee",price:34.90,badge:"ESSENTIAL",tag:"MAKE IT YOURS"},
  {id:3,name:"Cookie Club Sweatshirt",price:49.90,badge:"NEW",tag:"COOKIE CLUB"},
  {id:4,name:"Goofy Everyday Hoodie",price:64.90,badge:"LIMITED",tag:"NOT FOR EVERYONE"}
];

let cart = JSON.parse(localStorage.getItem("cookieGoofyCart") || "[]");

const money = n => new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR"}).format(n);

function renderProducts(){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(p => `
    <article class="product-card" onclick="addToCart(${p.id})" title="Demo: click to add">
      <div class="product-image">
        <span class="product-badge">${p.badge}</span>
        <div class="shirt"><span>${p.tag}</span></div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta"><span>Unisex · Made to order</span><span>${money(p.price)}</span></div>
      </div>
    </article>
  `).join("");
}

function save(){localStorage.setItem("cookieGoofyCart",JSON.stringify(cart));}
function addToCart(id){
  const product=products.find(p=>p.id===id);
  const existing=cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({...product,qty:1});
  save(); renderCart(); openCart();
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<p>Your bag is empty. Find something a little goofy.</p>';document.getElementById("cartTotal").textContent=money(0);return;}
  box.innerHTML=cart.map(x=>`
    <div class="cart-item">
      <div class="cart-item-art"><div class="mini-shirt"></div></div>
      <div class="cart-item-info"><strong>${x.name}</strong><p>Quantity: ${x.qty}<br>${money(x.price*x.qty)}</p><button class="remove" onclick="removeFromCart(${x.id})">Remove</button></div>
    </div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");}
document.getElementById("cartButton").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutButton").onclick=()=>{
  alert("Checkout is intentionally not simulated. Connect this button to your real Printify Pop-Up Store after creating it.");
};
document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("newsletterMessage").textContent="You're on the list. Welcome to the goofy side.";
  e.target.reset();
});
renderProducts();renderCart();
