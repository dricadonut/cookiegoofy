const products=[
{id:"001",name:"Weird Behaviour Tee",price:32,cat:"T-Shirts",badge:"NEW",art:"WEIRD<br>BEHAVIOUR",desc:"A clean, slightly strange everyday tee. Designed to look considered without taking itself too seriously."},
{id:"002",name:"Stay Weird Tee",price:32,cat:"T-Shirts",badge:"CORE",art:"STAY<br>WEIRD",desc:"The unofficial Cookie Goofy uniform. Minimal from a distance, odd up close."},
{id:"003",name:"Cookie Club Sweatshirt",price:54,cat:"Sweatshirts",badge:"NEW",art:"COOKIE<br>CLUB",desc:"Soft, relaxed and built for members of the club who prefer their basics with personality."},
{id:"004",name:"Goofy Internet Hoodie",price:69,cat:"Hoodies",badge:"LIMITED",art:"GOOFY<br>.EXE",desc:"A deliberately nostalgic hoodie for the part of the internet that never learned to behave."}
];

let cart=JSON.parse(localStorage.getItem("cg-cart")||"[]");
let selectedSize="M";
const $=s=>document.querySelector(s);
const money=n=>new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR"}).format(n);
const go=u=>{location.hash=u.replace("#","");window.scrollTo(0,0)};
const garment=p=>`<div class="garment"><span>${p.art}</span></div>`;
function productCard(p){return `<article class="product-card" data-name="${p.name.toLowerCase()}" onclick="go('#/product/${p.id}')"><div class="product-image"><b class="tag">${p.badge}</b>${garment(p)}<i class="cookie-dot dot-a"></i></div><div class="product-meta"><div><span>${p.name}</span><strong>${money(p.price)}</strong></div><small>${p.cat} / MADE TO ORDER</small></div></article>`}
function grid(a){return `<div class="product-grid">${a.map(productCard).join("")}</div>`}

function home(){return `
<section class="hero">
<div class="hero-copy"><div class="hero-top"><span>COOKIE GOOFY / 001</span><span>EST. 2026 / EUROPE</span></div>
<div class="hero-title"><p class="section-kicker">INDEPENDENT CLOTHING FOR UNUSUAL PEOPLE</p><h1>STAY<br><em>WEIRD.</em><br>EAT<br>COOKIES.</h1></div>
<div class="hero-bottom"><p>We make clothes for people who think ordinary is a little overrated. Weirdly premium. Deliberately different.</p><a class="arrow-link" href="#/shop">SHOP THE DROP <span>↗</span></a></div></div>
<div class="hero-visual"><div class="photo-frame"><div class="photo-label">YOUR<br>EDITORIAL<br>IMAGE</div></div><i class="cookie-dot dot-a"></i><i class="cookie-dot dot-b"></i><div class="mini-cookies"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
</section>
<div class="intro-strip"><strong>QUE RAIO É ISTO?</strong><span>GOOD QUESTION. SCROLL DOWN. <b>✦</b> YOU MIGHT FIND SOMETHING YOU WANT.</span></div>

<section class="products-section"><div class="section-title"><div><p class="section-kicker">01 / THE DROP</p><h2>GOOFY <i>things.</i></h2></div><a class="view-all" href="#/shop">VIEW ALL ↗</a></div>${grid(products)}</section>

<section class="manifesto"><div class="manifesto-copy"><div><p class="section-kicker">02 / THE COOKIE GOOFY RULE</p><h2>BUY LESS.<br><em>LIKE IT</em><br>MORE.</h2></div><p>We don't believe fashion has to be disposable to be fun. Our pieces are made to order, so we can focus on the thing that matters: making something you'd actually want to keep wearing.</p></div><div class="manifesto-art"><div class="big-type">WEIRD<br>IS GOOD.</div><i class="cookie-dot dot-a"></i></div></section>

<section class="process"><div class="process-grid"><div><p class="section-kicker">03 / WHY WE MAKE IT THIS WAY</p><h2>MADE<br><em>AFTER</em><br>YOU.</h2></div><div class="process-copy">No giant piles of unsold clothes. No pretending the weird stuff isn't weird. Your order starts the production process. That means a slower, more considered way to make clothes — and a shop that can keep experimenting.</div></div>
<div class="steps"><div class="step"><span class="step-num">01</span><div><h3>YOU FIND SOMETHING GOOD.</h3><p>Pick your piece, choose your size and add it to your bag.</p></div><b>SHOP</b></div><div class="step"><span class="step-num">02</span><div><h3>WE MAKE IT.</h3><p>Your chosen garment is produced as part of our print-on-demand workflow.</p></div><b>MADE TO ORDER</b></div><div class="step"><span class="step-num">03</span><div><h3>IT LEAVES THE GOOFY FACTORY.</h3><p>The finished piece is packed and sent to your door.</p></div><b>DELIVERED</b></div></div></section>

<section class="editorial"><div class="editorial-copy"><p class="section-kicker">04 / THE POINT OF VIEW</p><h2>Fashion should be a little ridiculous.</h2><p>Not loud for the sake of being loud. Not serious for the sake of looking expensive. Just memorable enough that someone asks where you got it.</p><a class="arrow-link" href="#/about">MEET COOKIE GOOFY ↗</a></div><div class="editorial-photo"><div>YOUR<br>EDITORIAL<br>PHOTO</div></div></section>

<section class="products-section"><div class="section-title"><div><p class="section-kicker">05 / THE ONES PEOPLE NOTICE</p><h2>FAVOURITES.</h2></div><a class="view-all" href="#/shop">SHOP ALL ↗</a></div>${grid(products.slice(0,3))}</section>

<section class="club"><div><p class="section-kicker">06 / THE NEWSLETTER</p><h2>COOFY<br><em>CLUB.</em></h2></div><div class="club-copy"><p>Drop alerts. Behind-the-scenes nonsense. New pieces before everyone else sees them. No daily inbox torture.</p><form class="club-form" onsubmit="joinClub(event)"><input id="clubEmail" type="email" required placeholder="YOUR EMAIL ADDRESS"><button>JOIN ↗</button></form><div class="club-msg" id="clubMsg"></div></div></section>

<section class="journal"><div class="section-title"><div><p class="section-kicker">07 / FROM THE JOURNAL</p><h2>GOOFY <i>notes.</i></h2></div><a class="view-all" href="#/journal">READ JOURNAL ↗</a></div><div class="journal-grid"><article class="journal-card"><small>01 / PROCESS</small><h3>Why made-to-order feels better.</h3><a href="#/journal">READ →</a></article><article class="journal-card"><small>02 / STYLE</small><h3>The art of looking expensive and slightly unhinged.</h3><a href="#/journal">READ →</a></article><article class="journal-card"><small>03 / CULTURE</small><h3>Things that make the internet worth staying on.</h3><a href="#/journal">READ →</a></article></div></section>`}

function shopPage(cat="All"){
let cats=["All","T-Shirts","Hoodies","Sweatshirts"], list=cat==="All"?products:products.filter(p=>p.cat===cat);
return `<section class="page"><div class="page-head"><p class="section-kicker">SHOP / 00${list.length}</p><h1>THE<br>SHOP.</h1><p>Strange little garments for people with excellent taste and questionable internet habits. Everything is made to order.</p></div><div class="shop-toolbar"><div class="filters">${cats.map(c=>`<button class="filter ${c===cat?"active":""}" onclick="go('#/shop?cat=${encodeURIComponent(c)}')">${c.toUpperCase()}</button>`).join("")}</div><span class="section-kicker">${list.length} PIECES</span></div>${grid(list)}</section>`}

function productPage(p){
return `<section class="product-page"><div class="product-layout"><div class="gallery"><div class="wide">YOUR PRODUCT HERO PHOTO</div><div>PRODUCT PHOTO / FRONT</div><div>PRODUCT PHOTO / DETAIL</div><div>PRODUCT PHOTO / BACK</div><div>PRODUCT PHOTO / LIFESTYLE</div></div><div class="detail"><p class="section-kicker">${p.cat} / ${p.badge}</p><h1>${p.name}</h1><div class="detail-price">${money(p.price)}</div><p class="detail-description">${p.desc}</p><div class="label">SELECT SIZE</div><div class="sizes">${["XS","S","M","L","XL","2XL"].map(s=>`<button class="size ${s===selectedSize?"selected":""}" onclick="selectSize('${s}')">${s}</button>`).join("")}</div><button class="black-button" onclick="addToCart('${p.id}')">ADD TO BAG <span>+</span></button><button class="wish" onclick="toast('SAVED TO YOUR WISHLIST')">♡ SAVE FOR LATER</button><div class="accordion"><button onclick="toggleAcc(this)">DETAILS <span>+</span></button><div class="acc-text open">Designed for an editorial silhouette with everyday wearability. Product photography can be added here when your final campaign images are ready.</div><button onclick="toggleAcc(this)">MADE TO ORDER <span>+</span></button><div class="acc-text">Your piece is produced after the order is placed. This helps avoid unnecessary inventory and lets Cookie Goofy keep small drops alive.</div><button onclick="toggleAcc(this)">SHIPPING & RETURNS <span>+</span></button><div class="acc-text">Shipping details, estimated delivery windows and your returns policy can be placed here before launch.</div></div></div></div></section>`}

function infoPage(title,kicker,lead,body){return `<section class="page"><div class="page-head"><p class="section-kicker">${kicker}</p><h1>${title}</h1><p>${lead}</p></div><div class="prose">${body}</div></section>`}

function router(){
let raw=location.hash.slice(1)||"/", [path,query]=raw.split("?"), params=new URLSearchParams(query||"");
let out="";
if(path==="/") out=home();
else if(path==="/shop"||path==="/new") out=shopPage(path==="/new"?"All":(params.get("cat")||"All"));
else if(path.startsWith("/product/")){let p=products.find(x=>x.id===path.split("/")[2]);out=p?productPage(p):notFound()}
else if(path==="/about") out=infoPage("ABOUT COOKIE GOOFY","ABOUT / 01","A small independent clothing project built around one simple idea: clothes can be premium, playful and a little bit strange at the same time.",`<h2>WEIRDLY PREMIUM.</h2><p>Cookie Goofy is a visual-first clothing label for people who don't need everything to match. The identity borrows from Y2K internet culture, fashion editorials and the beautiful chaos of the web.</p><h2>NO CHARACTER. JUST CHARACTER.</h2><p>The cookie is our little icon. The clothes do the talking. We want every drop to feel like you found something you weren't supposed to find.</p><h2>SMALL DROPS, BIG PERSONALITY.</h2><p>Products are made to order through a print-on-demand model, allowing us to test unusual ideas without producing mountains of stock.</p>`);
else if(path==="/materials") out=infoPage("MATERIALS","MATERIALS / 02","Better choices start with knowing what is actually in the garment.",`<h2>THE SHORT VERSION</h2><p>We prioritise garments with high cotton content and responsible sourcing options available through our production partners. Exact fibre composition and certifications will be shown on every product page once each product is connected to its final Printify blank.</p><h2>MADE TO ORDER</h2><p>We don't manufacture a huge pile of clothing in advance. Orders trigger production, which helps us avoid unnecessary stock.</p><h2>TRANSPARENCY</h2><p>As the collection grows, this page will list the exact blanks, materials, certifications and production regions for each piece.</p>`);
else if(path==="/journal") out=infoPage("JOURNAL","JOURNAL / 03","Notes on clothes, internet culture, design and the things we find funny.",`<h2>WHY MADE-TO-ORDER FEELS BETTER</h2><p>There is something satisfying about a garment beginning its journey because somebody actually wanted it. That's the model we are building around.</p><h2>THE ART OF LOOKING EXPENSIVE AND SLIGHTLY UNHINGED</h2><p>Good typography, a strong silhouette, restraint in the right places and one detail that makes somebody look twice.</p><h2>THINGS THAT MAKE THE INTERNET WORTH STAYING ON</h2><p>Old forums. Strange websites. Pixel icons. Fashion archives. Tiny communities. The internet is weird; Cookie Goofy is happier for it.</p>`);
else if(path==="/faq") out=infoPage("FAQ","HELP / 04","The questions you were probably going to ask.",`<h2>IS COOKIE GOOFY PRINT-ON-DEMAND?</h2><p>Yes. Products are designed by Cookie Goofy and fulfilled through a print-on-demand production workflow.</p><h2>HOW LONG DOES AN ORDER TAKE?</h2><p>Final production and shipping estimates will be displayed here once the store is connected to the live fulfilment setup.</p><h2>CAN I RETURN SOMETHING?</h2><p>Your final returns policy will be published here before payments are enabled.</p>`);
else if(path==="/shipping") out=infoPage("SHIPPING","HELP / 05","Delivery information for your future favourite garment.",`<h2>MADE TO ORDER FIRST</h2><p>Each piece enters production after purchase. This means fulfilment is different from a conventional warehouse store.</p><h2>DELIVERY</h2><p>Shipping prices and estimated delivery windows will be connected to the final Printify configuration before launch.</p>`);
else if(path==="/returns") out=infoPage("RETURNS","HELP / 06","Clear policies, no tiny-print gymnastics.",`<h2>THE POLICY</h2><p>This placeholder will be replaced with the final legally appropriate returns policy before checkout is enabled.</p>`);
else if(path==="/size-guide") out=infoPage("SIZE GUIDE","HELP / 07","Find your fit before you commit.",`<h2>MEASURE, DON'T GUESS</h2><p>Final size charts will be added per garment because blanks can vary between products. The product page will show the relevant measurements before purchase.</p>`);
else if(path==="/contact") out=infoPage("SAY HI","CONTACT / 08","Questions, collaborations, wholesale enquiries or just want to tell us something weird?",`<h2>CONTACT</h2><p>Email us at <a href="mailto:contacto@cookiegoofy.store">contacto@cookiegoofy.store</a>.</p>`);
else if(path==="/privacy") out=infoPage("PRIVACY","LEGAL / 09","A simple placeholder for the final privacy policy.",`<p>Before launch, this page should contain the complete privacy notice applicable to Cookie Goofy, including data collected through checkout, newsletter subscriptions and analytics.</p>`);
else if(path==="/cookies") out=infoPage("COOKIES","LEGAL / 10","A simple placeholder for the final cookie notice.",`<p>Before launch, this page should explain which cookies and similar technologies the site uses and how visitors can manage consent.</p>`);
else if(path==="/terms") out=infoPage("TERMS","LEGAL / 11","A simple placeholder for the final terms and conditions.",`<p>Before launch, this page should contain the final terms covering purchases, prices, delivery, returns, intellectual property and site usage.</p>`);
else out=notFound();
$("#app").innerHTML=out; window.scrollTo(0,0); bindHover();
}
function notFound(){return `<div class="not-found"><p class="section-kicker">404 / WRONG COOKIE</p><h1>OOF.</h1><p>That page wandered off.</p><a class="arrow-link" href="#/">GO HOME ↗</a></div>`}
function selectSize(s){selectedSize=s;router()}
function addToCart(id){let p=products.find(x=>x.id===id);cart.push({id,size:selectedSize});saveCart();openCart();toast("ADDED TO YOUR BAG")}
function saveCart(){localStorage.setItem("cg-cart",JSON.stringify(cart));updateCart()}
function updateCart(){
$("#bagCount").textContent=cart.length;
if(!cart.length){$("#cartItems").innerHTML=`<div class="empty"><img src="assets/cookie-goofy-logo.png"><p>YOUR BAG IS WEIRDLY EMPTY.</p><a class="arrow-link" href="#/shop">FIND SOMETHING ↗</a></div>`;$("#cartTotal").textContent=money(0);return}
let total=0;
$("#cartItems").innerHTML=cart.map((x,i)=>{let p=products.find(q=>q.id===x.id);total+=p.price;return `<div class="bag-item"><div class="bag-photo">${garment(p)}</div><div><strong>${p.name}</strong><small>SIZE ${x.size}<br>${money(p.price)}</small><button onclick="removeItem(${i})">REMOVE</button></div><span>1×</span></div>`}).join("");
$("#cartTotal").textContent=money(total)
}
function removeItem(i){cart.splice(i,1);saveCart()}
function openCart(){$("#cart").classList.add("open");$("#shade").classList.add("open")}
function closeCart(){$("#cart").classList.remove("open");$("#shade").classList.remove("open")}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2200)}
function toggleAcc(btn){let n=btn.nextElementSibling;n.classList.toggle("open");btn.querySelector("span").textContent=n.classList.contains("open")?"−":"+"}
function joinClub(e){e.preventDefault();$("#clubMsg").textContent="YOU'RE IN. WELCOME TO THE COOFY CLUB."}
function bindHover(){document.querySelectorAll("a,button,.product-card").forEach(el=>{el.addEventListener("mouseenter",()=>$("#cursor")?.classList.add("big"));el.addEventListener("mouseleave",()=>$("#cursor")?.classList.remove("big"))})}

window.addEventListener("hashchange",router);
window.addEventListener("load",()=>{setTimeout(()=>$("#loader").classList.add("done"),500);router();updateCart()});
$("#bagBtn").onclick=openCart;$("#cartClose").onclick=closeCart;$("#continueBtn").onclick=closeCart;$("#shade").onclick=closeCart;
$("#checkoutBtn").onclick=()=>toast("CHECKOUT COMING IN PHASE 2 — PAYMENT + PRINTIFY");
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("cg-theme",document.body.classList.contains("dark")?"dark":"light")};
if(localStorage.getItem("cg-theme")==="dark")document.body.classList.add("dark");
$("#menuBtn").onclick=()=>$("#mobileMenu").classList.add("open");$("#mobileClose").onclick=()=>$("#mobileMenu").classList.remove("open");
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));
$("#searchBtn").onclick=()=>{ $("#searchPanel").classList.add("open");setTimeout(()=>$("#searchInput").focus(),100)};
$("#searchClose").onclick=()=>$("#searchPanel").classList.remove("open");
$("#searchInput").addEventListener("input",e=>{let q=e.target.value.toLowerCase().trim();let a=products.filter(p=>(p.name+" "+p.cat+" "+p.art.replace("<br>"," ")).toLowerCase().includes(q));$("#searchResults").innerHTML=q?a.map(p=>`<a class="search-result" href="#/product/${p.id}"><span>${p.name}</span><span>${money(p.price)} ↗</span></a>`).join(""):""});
document.addEventListener("mousemove",e=>{let c=$("#cursor");if(c)c.style.transform=`translate(${e.clientX+10}px,${e.clientY+10}px)`});
