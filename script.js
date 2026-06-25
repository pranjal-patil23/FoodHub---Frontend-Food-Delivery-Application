const foodItems = [
    {name:"Pizza", desc:"Cheesy delight with toppings", price:250, img:"https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Burger", desc:"Juicy burger with fresh veggies", price:150, img:"https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Biryani", desc:"Spicy chicken biryani", price:300, img:"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Paneer Tikka", desc:"Grilled paneer cubes", price:200, img:"https://images.openai.com/static-rsc-4/xkA7H2hiM5ikROAoJnOUUPLQ37wF6adI3T9l7d7O0It7qsD_6jMmnisbPsFU4N4TvFjQ5Fh8hWt4HPqynnWAbBdjKLCnkJocIQwMzQSgxPErObeU8RtqYCT5xbcud02kbMMtEUcSb3mfW9p_HA32g32iJcfTTd0nUDHEI5vNTL-wkWP7jAuEtD0e0z5mGTMA?purpose=fullsize"},
    {name:"Dosa", desc:"Crispy south Indian dosa", price:120, img:"https://images.openai.com/static-rsc-4/yeCWUcn7RpNKHa2ukFQLL_OPu62RfDwXGUSNI27KsK-T7MCg4B7IKy5Oe_K7KDIoKihU3JNmdU2pbbMWsKtTVc5mjojTLowZLyEk75naPKjVYvIbpXZ9RLW_F7XhUxIi-93jy4gwYrYjGru4OR_wFjf7A-3lSG6ebISlHVwMVH4BEpaO1ZMAP8xU97kbQi21?purpose=fullsize"},
    {name:"Ice Cream", desc:"Cold and sweet dessert", price:100, img:"https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=600"},
];

// ===== Display Food Items on Menu Page =====
const menuContainer = document.getElementById("menu-items");
function displayFood(items){
    if(!menuContainer) return;
    menuContainer.innerHTML = "";
    items.forEach((item,index)=>{
        const card = document.createElement("div");
        card.classList.add("food-card");
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        menuContainer.appendChild(card);
    });
}
displayFood(foodItems);

// ===== Search Filter =====
const searchInput = document.getElementById("search");
if(searchInput){
    searchInput.addEventListener("input", (e)=>{
        const filtered = foodItems.filter(item=> item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        displayFood(filtered);
    });
}

// ===== Cart Functions =====
function addToCart(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    let existing = cart.find(item => item.name === foodItems[index].name);
    if(existing){
        existing.qty += 1;
    } else {
        cart.push({...foodItems[index], qty:1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${foodItems[index].name} added to cart!`);
}

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElem = document.getElementById("cart-count");
    if(cartCountElem) cartCountElem.innerText = cart.reduce((sum,item)=>sum+item.qty,0);
}

// Call this on page load
updateCartCount();

// ===== Cart Page Functions =====
const cartItemsDiv = document.getElementById("cart-items");
if(cartItemsDiv){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart(){
        cartItemsDiv.innerHTML = "";
        if(cart.length === 0){
            cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
            document.getElementById("total").innerText = 0;
            return;
        }
        let total = 0;
        cart.forEach((item,index)=>{
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "space-between";
            div.style.margin = "15px 0";
            div.innerHTML = `
                <div style="display:flex; align-items:center;">
                    <img src="${item.img}" alt="${item.name}" style="width:80px; height:80px; border-radius:8px; margin-right:15px;">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>₹${item.price} x 
                        <input type="number" value="${item.qty}" min="1" onchange="changeQty(${index},this.value)"></p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="padding:5px 10px; background:#ff3f00;color:white;border:none;border-radius:5px;cursor:pointer;">Remove</button>
            `;
            cartItemsDiv.appendChild(div);
        });
        document.getElementById("total").innerText = total;
    }

    function removeFromCart(index){
        cart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    function changeQty(index,value){
        cart[index].qty = parseInt(value);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    document.getElementById("placeOrder").onclick = ()=>{
        if(cart.length === 0){ alert("Cart is empty!"); return; }
        alert("Order placed successfully!");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    };

    displayCart();
}

// ===== Login Page Functions =====
const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirmPassword").value;

        if(confirm && password !== confirm){
            alert("Passwords do not match!");
            return;
        }
        alert("Login/Signup successful!");
        window.location.href = "index.html"; // redirect after login
    });
}
