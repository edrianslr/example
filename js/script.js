const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', () =>{
        nav.classList.remove('active');
    })
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}

//cart//

let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Stephen Curry 1',
        tag:'curry1',
        price:80,
        inCart:0
    },
    {
        name:'Stephen Curry 2',
        tag:'curry2 (2)',
        price:90,
        inCart: 0
    },
    {
        name:'Stephen Curry 5',
        tag:'curry5',
        price: 250,
        inCart: 0
    },
    {
        name: 'Stephen Curry 4',
        tag: 'curry4',
        price: 120,
        inCart: 0
    },
    {
        name: 'Kevin Durant 10',
        tag: 'kd10',
        price: 300,
        inCart: 0
    },
    {
        name: 'Kevin Durant 11',
        tag: 'kd11',
        price: 90,
        inCart: 0
    },
    {
        name: 'Kevin Durant 6',
        tag: 'kd6',
        price: 90,
        inCart: 0
    },
    {
        name: 'Kevin Durant 9',
        tag: 'kd9',
        price: 90,
        inCart: 0
    },
    {
        name: 'Kobe Bryant 10',
        tag: 'kobe_10',
        price: 190,
        inCart: 0
    },
    {
        name: 'Kobe Bryant 11',
        tag: 'kobe_11',
        price: 170,
        inCart: 0
    },
    {
        name: 'Kobe Bryant 5',
        tag: 'kobe5',
        price: 200,
        inCart: 0
    },
    {
        name: 'Kobe Bryant 9',
        tag: 'kobe__violet',
        price: 230,
        inCart: 0
    },
    {
        name: 'Lebron James 9',
        tag: 'lebron9',
        price: 290,
        inCart: 0
    },
    {
        name: 'Lebron James 10',
        tag: 'lebron10',
        price: 250,
        inCart: 0
    },
    {
        name: 'Lebron James 15',
        tag: 'lebron15',
        price: 260,
        inCart: 0
    },
    {
        name: 'Lebron James 17',
        tag: 'lebron17',
        price: 290,
        inCart: 0
    }

];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])

    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('#cart-btn span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart-btn span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart-btn span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems= localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product){
    // console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

    function displayCart(){
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".products");
        let cartCost = localStorage.getItem('totalCost');

        console.log(cartItems);
        if(cartItems && productContainer ){
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML +=  `
                <div class="product">
                <a href="#"><i class="fa-solid fa-circle-xmark"></i></a>
                <img src="./images/${item.tag}.png">
                <span>${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
                <div class="quantity">
                <a href="#"><i class="fa-solid fa-caret-left"></i></a>
                <span> ${item.inCart} </span>
                <a href="#"<i class="fa-solid fa-caret-right"></i></a>
                </div>
                <div class="total">
                $${item.inCart * item.price},00
                </div>
                `;
            });

            productContainer.innerHTML += `
               <div class="cartTotalContainer">
               <h4 class="cartTotalTitle">
               Cart Total</h4>
               <h4 class="cartTotal">
               $${cartCost}</h4>
            
            `;
        }
    }

onLoadCartNumbers();
displayCart();





