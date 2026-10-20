(() => {
const catalog={
 bananas:{name:"Bananas",price:1.25,unit:"Per bunch"},
 apples:{name:"Apples",price:2.10,unit:"Pack of 4"},
 oranges:{name:"Oranges",price:1.80,unit:"Pack of 4"},
 strawberries:{name:"Strawberries",price:2.75,unit:"Punnet"},
 grapes:{name:"Grapes",price:2.40,unit:"Punnet"}
};
const state={basket:{},filter:"all",query:"",sort:"featured",toastTimer:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const cards=$$(".product"), cart=$("#cart"), backdrop=$("#backdrop"), items=$("#cart-items"), toast=$("#toast");
const money=n=>new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(n);
const quantity=()=>Object.values(state.basket).reduce((a,b)=>a+b,0);
const subtotal=()=>Object.entries(state.basket).reduce((sum,[id,n])=>sum+catalog[id].price*n,0);
function say(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>toast.classList.remove("show"),2300)}
function add(id){if(!catalog[id])return;state.basket[id]=(state.basket[id]||0)+1;renderCart();say(catalog[id].name+" added to your basket")}
function change(id,delta){if(!state.basket[id])return;state.basket[id]+=delta;if(state.basket[id]<=0)delete state.basket[id];renderCart()}
function renderCart(){
 const n=quantity();$("#count").textContent=n;$("#item-count").textContent="("+n+")";$("#total").textContent=money(subtotal());$("#open-cart").setAttribute("aria-label",`Open basket, ${n} items`);$("#checkout").disabled=!n;
 if(!n){items.innerHTML='<div class="cart-empty"><span>♧</span><h3>Your basket is empty</h3><p>Add a few favourites to see them here.</p></div>';return}
 items.replaceChildren();
 Object.entries(state.basket).forEach(([id,num])=>{
  const p=catalog[id], row=document.createElement("div");row.className="line-item";
  const info=document.createElement("div"), title=document.createElement("h3"), desc=document.createElement("p"), qty=document.createElement("div");
  title.textContent=p.name;desc.textContent=`${p.unit} · ${money(p.price)} each`;qty.className="quantity";
  const minus=document.createElement("button");minus.type="button";minus.textContent="−";minus.setAttribute("aria-label","Remove one "+p.name);minus.onclick=()=>change(id,-1);
  const count=document.createElement("span");count.textContent=num;
  const plus=document.createElement("button");plus.type="button";plus.textContent="+";plus.setAttribute("aria-label","Add one "+p.name);plus.onclick=()=>change(id,1);
  qty.append(minus,count,plus);info.append(title,desc,qty);
  const price=document.createElement("b");price.className="line-price";price.textContent=money(p.price*num);row.append(info,price);items.append(row);
 });
}
function apply(){
 const query=state.query.trim().toLowerCase();
 const sorted=[...cards].sort((a,b)=>state.sort==="name"?a.dataset.name.localeCompare(b.dataset.name):state.sort==="low"?+a.dataset.price- +b.dataset.price:state.sort==="high"?+b.dataset.price- +a.dataset.price:cards.indexOf(a)-cards.indexOf(b));
 sorted.forEach(card=>{const matchCategory=state.filter==="all"||card.dataset.category===state.filter;const matchQuery=!query||card.dataset.name.toLowerCase().includes(query)||card.textContent.toLowerCase().includes(query);card.hidden=!(matchCategory&&matchQuery);$("#products").insertBefore(card,$("#empty"))});
 const visible=sorted.filter(c=>!c.hidden).length;$("#results").textContent=`Showing ${visible} ${visible===1?"fruit favourite":"fruit favourites"}`;$("#empty").hidden=visible!==0;
}
$$("[data-add]").forEach(btn=>btn.addEventListener("click",()=>add(btn.dataset.add)));
$$("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{state.filter=btn.dataset.filter;$$("[data-filter]").forEach(b=>{b.classList.toggle("selected",b===btn);b.setAttribute("aria-pressed",String(b===btn))});apply()}));
$("#search").addEventListener("input",e=>{state.query=e.target.value;apply()});
$("#sort").addEventListener("change",e=>{state.sort=e.target.value;apply()});
$("#clear").addEventListener("click",()=>{state.filter="all";state.query="";state.sort="featured";$("#search").value="";$("#sort").value="featured";$$("[data-filter]").forEach(b=>{const yes=b.dataset.filter==="all";b.classList.toggle("selected",yes);b.setAttribute("aria-pressed",String(yes))});apply()});
function openCart() {cart.classList.add("open");cart.setAttribute("aria-hidden","false");backdrop.hidden=false;document.body.classList.add("lock");$("#close-cart").focus()}
function closeCart(){cart.classList.remove("open");cart.setAttribute("aria-hidden","true");backdrop.hidden=true;document.body.classList.remove("lock");$("#open-cart").focus()}
$("#open-cart").addEventListener("click",openCart);$("#close-cart").addEventListener("click",closeCart);backdrop.addEventListener("click",closeCart);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&cart.classList.contains("open"))closeCart()});
$("#checkout").addEventListener("click",()=>say("Demo only: no order has been placed."));
$("#newsletter").addEventListener("submit",e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;$("#form-message").textContent="Thanks! This demo form is not connected to a mailing list.";say("Demo form submitted — no email was stored.");e.currentTarget.reset()});
$("#menu").addEventListener("click",()=>{const b=$("#menu"),nav=$("#mobile-nav"),open=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!open));b.textContent=open?"☰":"×";nav.hidden=open});
$$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mobile-nav").hidden=true;$("#menu").setAttribute("aria-expanded","false");$("#menu").textContent="☰"}));
$("#year").textContent=new Date().getFullYear();renderCart();apply();
})();