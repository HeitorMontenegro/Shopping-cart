let carts = document.querySelectorAll('.btn');

let productsList = [

    {
name: 'Pillows',
tag: 'pillows',
price: 10,
inCart: 0
    },

    {
name: 'Sofa',
tag: 'sofa',
price: 150,
inCart: 0
    },
        
    {
name: 'Wooden chair',
tag: 'woodenchair',
price: 80,
inCart: 0
    },

]










for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
         cartNumber(productsList[i]); 
         totalCost(productsList[i]);
    })
}



function onLoadCartNumbers (){
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers){
        document.querySelector('.navbarsquare span').textContent = productNumbers;

    }
}

function cartNumber (productsList) {

    let productNumbers = localStorage.getItem('cartNumber');

    productNumbers = parseInt(productNumbers)
   
    if( productNumbers ) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.navbarsquare span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.navbarsquare span').textContent = 1;
    }
    setItems(productsList);   
}
function setItems(productsList){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);






if (cartItems != null) {
    if (cartItems[productsList.tag] == undefined){
        cartItems = {
            ...cartItems, 
            [productsList.tag]: productsList
        }
    }

cartItems[productsList.tag].inCart += 1;
}
else {
    productsList.inCart = 1;
    cartItems = {
        [productsList.tag]: productsList
    }
}

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(productsList) { 

   let finalCost = localStorage.getItem('totalCost');
   

   if (finalCost != null){

finalCost = parseInt(finalCost);
localStorage.setItem('totalCost', finalCost + productsList.price);

   } else {
    localStorage.setItem('totalCost', productsList.price)
   }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-spot");
    let finalCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
productContainer.innerHTML += `

<div class="products-a1">
<span>${item.name}</span>
</div> 
<div class="product-price">$${item.price},00</div>
<div class="product-quantity">${item.inCart}</div>
<div class="product-total-price">$${item.price * item.inCart},00</div>
`
         });
         productContainer.innerHTML += `
<div class="great-total">
<h4 class="basket-total-title">BASKET TOTAL</h4>
<h4 class="basket-total">$${finalCost},00</h4>

</div>
`
    }
    }

    onLoadCartNumbers();
displayCart();
