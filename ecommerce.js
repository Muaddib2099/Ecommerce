
let cartsym = document.querySelector('#cart')
let carttab =  document.querySelector('.cartTab')
let cartExit= document.querySelector('.btclose')
let checkout= document.querySelector('.btBuy')
let confirmation = document.querySelector('.ConfirmationTab')
let confirmationExit = document.querySelector('.summaryExitBt')

cartsym.onclick = () =>{
    carttab.classList.add('active');
};
cartExit.onclick=()=>{
    carttab.classList.remove('active');
};
confirmationExit.onclick=()=>{ 
    
    confirmation.classList.remove('active');
    alert("Purchase Confirmed.");
    var cartBox = document.getElementsByClassName('cartbox')[0];
        while(cartBox.hasChildNodes()){
            cartBox.removeChild(cartBox.firstChild);}
            
            totalUpdate();       
};
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}

function ready(){
    var clearCartbt = document.getElementsByClassName('removeItem')
    console.log(clearCartbt)
    for (var i =0; i<clearCartbt.length; i++){
        var bt = clearCartbt[i];
        bt.addEventListener('click',removeItems);
    } 
    
    var qtyInput = document.getElementsByClassName('itemQuantity')
    for (var i = 0 ; i <qtyInput.length; i++){
        var quanInput = qtyInput[i];
        quanInput.addEventListener('change', quantitychange);
    } 

    var cartAdd = document.getElementsByClassName('cartItem')
    for (var i  = 0; i<cartAdd.length; i++){
        var bt = cartAdd[i];
        bt.addEventListener('click', addtoCart);
    }
    document.getElementsByClassName('btBuy')[0].addEventListener('click',btBuyClick);
}
function quantitychange(event){
    var input = event.target;
    if(isNaN(input.value)|input.value <= 0 ){
        input.value = 1;
    }
    totalUpdate();

}
function addtoCart(event){
    var bt=event.target;
    var product = bt.parentElement;
    var productnm = product.getElementsByClassName('itemName')[0].innerText;    
    var productpr = product.getElementsByClassName('price')[0].innerText;
    var productpic = product.getElementsByClassName('prodpic')[0].src;
    addProducts(productnm,productpr,productpic);
    totalUpdate();
}
function addProducts(productnm,productpr,productpic){
    var cartAddbox = document.createElement('div')
    cartAddbox.classList.add('cartlist')
    var cartaddedItems = document.getElementsByClassName('cartbox')[0]
    var cartItemN = cartaddedItems.getElementsByClassName('descItem')
    for(var i = 0; i<cartItemN.length;i++){
        if(cartItemN[i].innerText==productnm){       
        return;
    }
    
}
var cartAddboxItems= `
                        <img src="${productpic}" alt="" class="cartImage">
                        <div class="descbox">
                        <div class="descItem">${productnm}</div>
                        <div class="cartPrice">${productpr}</div>
                        <input type="number" value="1" class="itemQuantity">
                        </div>
                        <i class='bx bx-trash-alt removeItem'></i>`;
cartAddbox.innerHTML= cartAddboxItems;
cartaddedItems.append(cartAddbox)
cartAddbox.getElementsByClassName('removeItem')[0].addEventListener('click',removeItems)
cartAddbox.getElementsByClassName('itemQuantity')[0].addEventListener('change',quantitychange)
}
function removeItems(event){
    var btclicked = event.target
    btclicked.parentElement.remove();
    totalUpdate();
}

function totalUpdate(){
    var cartBox = document.getElementsByClassName('cartbox')[0];
    var cartList = document.getElementsByClassName('cartlist');
    var total = 0;
    for (var i = 0; i<cartList.length;i++){
        var cart_list = cartList[i];
        var prices = cart_list.getElementsByClassName('cartPrice')[0];
        var qty = cart_list.getElementsByClassName('itemQuantity')[0];
        var quantity = qty.value;
        var price = parseFloat(prices.innerText.replace("PHP",""));
        total = total + (price * quantity);


    }
        total=Math.round(total);
        document.getElementsByClassName('totalPrice')[0].innerText= "PHP" + total;
    }

function btBuyClick(){
    checkout.onclick=()=>{
        confirmation.classList.add('active');
    };     
    totalUpdate();
    }
    
    