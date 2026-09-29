const dishes = [
  {id:1,name:"Grilled Fish & Rice",category:"Fish",price:85,image:"assets/file_00000000969c8210afd7252b0475707c.png",description:"Grilled fish served with seasoned rice, fresh vegetables and avocado.",popular:true},
  {id:2,name:"Nshima & Chicken",category:"Nshima",price:65,image:"assets/file_000000006b1c820a80b952ad00bbcb8f.png",description:"Traditional nshima served with tender chicken and a tasty vegetable relish.",popular:true},
  {id:3,name:"Beef & Nshima",category:"Beef",price:70,image:"assets/file_0000000003c881f4be9b5f1772cff4ac.png",description:"Tender beef with nshima and a rich local relish."},
  {id:4,name:"Chicken Burger",category:"Burgers",price:55,image:"assets/chicken-burgers-index-667b185b5f528.jpg",description:"Juicy chicken burger with fresh vegetables and house sauce."},
  {id:5,name:"Family Fish Platter",category:"Fish",price:180,image:"assets/file_000000008504820a8f257ec6b4bc5ac8.png",description:"A generous platter for sharing with family or friends.",popular:true},
  {id:6,name:"Avocado Rice Bowl",category:"Vegetarian",price:50,image:"assets/avocado-and-salmon-rice-bowl-119734-1.jpg",description:"Seasoned rice, avocado, vegetables and fresh herbs."},
  {id:7,name:"Grilled Chicken",category:"Chicken",price:75,image:"assets/grilled-tandoori-chicken-12.jpg",description:"Flame-grilled chicken with a choice of side."},
  {id:8,name:"Fresh Juice",category:"Drinks",price:25,image:"assets/food-inspiration.jpg",description:"Freshly prepared seasonal fruit juice."}
,
  {id:9,name:"Beef Burger",category:"Burgers",price:60,image:"assets/food-inspiration.jpg",description:"Juicy beef burger with fresh vegetables and house sauce."},
  {id:10,name:"Fried Chicken",category:"Chicken",price:68,image:"assets/food-inspiration.jpg",description:"Crispy fried chicken served with your choice of side."},
  {id:11,name:"Grilled Beef",category:"Beef",price:80,image:"assets/200906-r-xl-grilled-porterhouse-steak-with-summer-vegetables-6425274599694ad1994dd44a070d5258.jpg",description:"Seasoned grilled beef with fresh vegetables."},
  {id:12,name:"Fish & Chips",category:"Fish",price:72,image:"assets/food-inspiration.jpg",description:"Crispy fish with golden chips and fresh salad."},
  {id:13,name:"Nshima & Fish",category:"Nshima",price:75,image:"assets/food-inspiration.jpg",description:"Traditional nshima with grilled fish and local relish."},
  {id:14,name:"Nshima & Beef",category:"Nshima",price:78,image:"assets/food-inspiration.jpg",description:"Traditional nshima with tender beef and relish."},
  {id:15,name:"Chicken & Rice",category:"Chicken",price:70,image:"assets/food-inspiration.jpg",description:"Seasoned rice with grilled chicken and vegetables."},
  {id:16,name:"Vegetable Platter",category:"Vegetarian",price:55,image:"assets/food-inspiration.jpg",description:"Fresh seasonal vegetables with rice and avocado."},
  {id:17,name:"Avocado Salad",category:"Vegetarian",price:45,image:"assets/food-inspiration.jpg",description:"Fresh avocado salad with vegetables and herbs."},
  {id:18,name:"Mango Juice",category:"Drinks",price:28,image:"assets/food-inspiration.jpg",description:"Refreshing mango juice prepared fresh."},
  {id:19,name:"Passion Juice",category:"Drinks",price:28,image:"assets/food-inspiration.jpg",description:"Fresh passion-fruit juice."},
  {id:20,name:"Family Chicken Platter",category:"Chicken",price:190,image:"assets/food-inspiration.jpg",description:"Large chicken platter designed for sharing.",popular:true},
  {id:21,name:"Family Beef Platter",category:"Beef",price:210,image:"assets/food-inspiration.jpg",description:"Large beef platter for family and friends.",popular:true},
  {id:22,name:"Rice & Beans",category:"Vegetarian",price:48,image:"assets/food-inspiration.jpg",description:"Seasoned rice with beans and fresh vegetables."},
  {id:23,name:"Loaded Chips",category:"Sides",price:40,image:"assets/food-inspiration.jpg",description:"Crispy chips with toppings and house sauce."},
  {id:24,name:"Fruit Platter",category:"Desserts",price:45,image:"assets/food-inspiration.jpg",description:"Fresh seasonal fruit selection."},
  {id:25,name:"Ice Cream",category:"Desserts",price:35,image:"assets/food-inspiration.jpg",description:"Creamy ice cream dessert."}
];

let currentDish = 0;
let selectedQty = 1;
let cart = JSON.parse(localStorage.getItem("restaurantCart") || "[]");
let activeCategory = "All";

const money = n => `ZMW ${Number(n).toFixed(2)}`;

function renderCategories(){
  const cats=["All",...new Set(dishes.map(d=>d.category))];
  document.getElementById("categories").innerHTML=cats.map(c=>`<button class="${c===activeCategory?'active':''}" onclick="filterCategory('${c}')">${c}</button>`).join("");
}
function filterCategory(category){
  activeCategory=category;
  renderCategories();
  renderOrbit();
}
function visibleDishes(){
  return activeCategory==="All"?dishes:dishes.filter(d=>d.category===activeCategory);
}
function renderOrbit(){
  const list = visibleDishes();
  const orbit = document.getElementById("foodOrbit");
  orbit.innerHTML = "";

  // The orbit automatically scales its radius and item size
  // so many meals can be added without changing the HTML.
  const count = list.length;
  const radiusX = Math.min(44, 24 + count * 1.25);
  const radiusY = Math.min(44, 24 + count * 1.25);

  list.forEach((dish, i) => {
    const el = document.createElement("div");
    el.className = "food-item";
    if (dishes.indexOf(dish) === currentDish) el.classList.add("selected");

    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    el.style.left = `calc(50% + ${Math.cos(angle) * radiusX}% - 46px)`;
    el.style.top = `calc(50% + ${Math.sin(angle) * radiusY}% - 46px)`;
    el.style.zIndex = String(20 + i);

    el.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" loading="lazy">
      <span class="orbit-label">${dish.name}</span>
    `;

    el.onclick = () => selectDish(dishes.indexOf(dish));
    orbit.appendChild(el);
  });
}

function selectDish(index){
  if(!dishes[index]) return;
  currentDish=index;
  selectedQty=1;
  const d=dishes[index];
  document.getElementById("bigDish").src=d.image;
  document.getElementById("bigDish").alt=d.name;
  document.getElementById("dishName").textContent=d.name;
  document.getElementById("dishDescription").textContent=d.description;
  document.getElementById("dishPrice").textContent=money(d.price);
  document.getElementById("dishCategory").textContent=d.category;
  document.getElementById("dishBadge").style.display=d.popular?"block":"none";
  document.getElementById("selectedQty").textContent=selectedQty;
  renderOrbit();
}
function changeSelectedQty(delta){
  selectedQty=Math.max(1,selectedQty+delta);
  document.getElementById("selectedQty").textContent=selectedQty;
}
function addSelectedToCart(){
  const d=dishes[currentDish];
  const existing=cart.find(x=>x.id===d.id);
  if(existing) existing.qty+=selectedQty; else cart.push({...d,qty:selectedQty});
  saveCart(); openCart();
}
function saveCart(){
  localStorage.setItem("restaurantCart",JSON.stringify(cart));
  updateCart();
}
function updateCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<p style="padding:25px;text-align:center;color:#777">Your cart is empty.</p>';}
  else box.innerHTML=cart.map(x=>`<div class="cart-item">
    <img src="${x.image}" alt="${x.name}">
    <div><h4>${x.name}</h4><small>${money(x.price)} × ${x.qty}</small><br>
    <button onclick="changeCartQty(${x.id},-1)">−</button>
    <button onclick="changeCartQty(${x.id},1)">+</button>
    <button onclick="removeCart(${x.id})">Remove</button></div>
    <strong>${money(x.price*x.qty)}</strong>
  </div>`).join("");
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const delivery=cart.length?25:0;
  document.getElementById("subtotal").textContent=money(subtotal);
  document.getElementById("deliveryFee").textContent=money(delivery);
  document.getElementById("cartTotal").textContent=money(subtotal+delivery);
  document.getElementById("checkoutTotal").textContent=money(subtotal+delivery);
}
function changeCartQty(id,delta){
  const x=cart.find(i=>i.id===id); if(!x)return;
  x.qty+=delta; if(x.qty<=0)cart=cart.filter(i=>i.id!==id); saveCart();
}
function removeCart(id){cart=cart.filter(i=>i.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartBackdrop").classList.add("open");updateCart()}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartBackdrop").classList.remove("open")}
function openCheckout(){
  if(!cart.length){alert("Add a meal to your cart first.");return}
  closeCart(); document.getElementById("checkoutModal").classList.add("open"); updateCart();
}
function closeCheckout(){document.getElementById("checkoutModal").classList.remove("open")}
function toggleAddress(){document.getElementById("addressField").style.display=document.getElementById("orderType").value==="delivery"?"block":"none"}
function placeOrder(e){
  e.preventDefault();
  const name=document.getElementById("customerName").value;
  const orderNo="ORD-"+Date.now().toString().slice(-6);
  const totalText=document.getElementById("cartTotal").textContent;
  const totalNumber=Number(totalText.replace(/[^0-9.]/g,""))||0;
  const orderData={orderNo,name,customerName:name,phone:document.getElementById("customerPhone").value,
    address:document.getElementById("customerAddress").value,orderType:document.getElementById("orderType").value,
    paymentMethod:document.getElementById("paymentMethod").value,items:cart,total:totalNumber,
    status:"Received",createdAt:new Date().toISOString()};
  localStorage.setItem("lastOrder",JSON.stringify(orderData));
  const savedOrders=JSON.parse(localStorage.getItem("restaurantOrders")||"[]");
  savedOrders.push(orderData);
  localStorage.setItem("restaurantOrders",JSON.stringify(savedOrders));
  cart=[];saveCart();closeCheckout();
  document.getElementById("trackingOrder").textContent=`Order ${orderNo} received`;
  document.getElementById("trackingModal").classList.add("open");
  // Replace this point with your real payment-provider API/backend integration.
}
function closeTracking(){document.getElementById("trackingModal").classList.remove("open")}
document.getElementById("year").textContent=new Date().getFullYear();
renderCategories();selectDish(0);updateCart();toggleAddress();
