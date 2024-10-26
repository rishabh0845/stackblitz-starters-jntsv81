const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('static'));
const port = 3000;


let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];


function addItemToCart(cart, productId, name, price, quantity) {
for (let i = 0; i < cart.length; i++) {
 if (cart[i].productId === productId) {
  cart[i].quantity += quantity;
 return cart;
}}
cart.push({ productId, name, price, quantity });
return cart;
}
app.get('/cart/add', (req, res) => {
let name = req.query.name;
 let price = parseFloat(req.query.price);
let productId = parseInt(req.query.productId);
 let quantity = parseInt(req.query.quantity);
let result = addItemToCart(cart, productId, name, price, quantity);
  res.json({cartItems: result });
});



function editQuantityOfItem(cart, productId, quantity){
  for (let i = 0; i < cart.length; i++) { 
  if (cart[i].productId === productId) {
    cart[i].quantity = quantity; 
}
} return cart;
}
 app.get('/cart/edit', (req, res) => {
 let productId = parseInt(req.query.productId);
  let quantity = req.query.quantity;
 let result = editQuantityOfItem(cart, productId, quantity)
  res.json({cartItems: result});
});



function deleteAnItemFromCart(cart, productId) {
  return cart.filter(product => product.productId !== productId)
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
let result = deleteAnItemFromCart(cart, productId);
 res.json({cartItems: result});
});


app.get('/cart', (req, res) => {
  res.json(cart);
})


function totalQuantityOfItems(cart){
let result = 0;
  for(let i = 0; i <  cart.length; i++){
 result += cart[i].quantity;
}
  return result  ;
}
app.get('/cart/total-quantity', (req, res) => {
let result = totalQuantityOfItems(cart);
res.json({totalQuantity:  result });
});


function totalPriceOfItems(cart){
  let result = 0;
    for(let i = 0; i <  cart.length; i++){
   result += cart[i].price * cart[i].quantity;
  }
    return result  ;
  }
  app.get('/cart/total-price', (req, res) => {
  let result = totalPriceOfItems(cart);
  res.json({totalPrice: result });
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
