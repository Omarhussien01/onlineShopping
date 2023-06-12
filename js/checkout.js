class Cart {
    cartlines;
    constructor(productsArray) {
        this.cartlines = [];
      //loop to add products into cartlines array
      JSON.parse(localStorage.getItem('cart')).forEach(obj => {
        this.cartlines.push(obj);
    });
    }
  
    getProductList() {

        return `<div class="d-flex justify-content-between">
        <p>${this.cartlines[0].name} x (${this.cartlines[0].quantity})</p>
        <p>$${this.cartlines[0].price*this.cartlines[0].quantity}</p>
        </div>`
    }
}

let list = "";
let count = 0;
let subTotal = 0;
let checkbox = document.getElementsByName("payment");
let tax = 0;
let customerCart = new Cart(JSON.parse(localStorage.getItem('cart')));

for ( let i = 0; i < checkbox.length; i++ ) {

    checkbox[i].addEventListener('change', () => {
   
        if(checkbox[i].id === 'paypal'){
            tax = 10;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }else if(checkbox[i].id === 'directcheck'){
            tax = 15;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }else if(checkbox[i].id === 'banktransfer'){
            tax = 5;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }
    })

}

for (let i = 0; i < customerCart.cartlines.length; i++) {

    subTotal += customerCart.cartlines[i].price*customerCart.cartlines[i].quantity;

}

for (let i = 0; i < customerCart.cartlines.length; i++) {

    list += customerCart.getProductList();
    customerCart.cartlines.reverse();
    customerCart.cartlines.pop();
   
}

list += customerCart.getProductList();

document.getElementById("productList").innerHTML = list;
document.getElementById("subtotal").innerHTML = `$${subTotal.toFixed(2)}`;

/*function placeOrder() {
    const response = fetch("http://localhost:5000/api/categories/", {
        method: 'POST',
        body: JSON.stringify({id: '200'}),
        token: JSON.parse(localStorage.getItem('token'))
    });
    response.then((data) => {
        if(data.ok){
            return  data.json()
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
        renderRespone(jsonResponse);
    });
}*/
console.log(JSON.stringify(localStorage.getItem('token')));
console.log(localStorage.getItem('token'));
function placeOrder() {
    var myHeaders = new Headers();
myHeaders.append("x-access-token", JSON.stringify(localStorage.getItem('token')));
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "shipping_info": {
    "first_name": "Ramy",
    "last_name": "Ibrahim",
    "email": "ramymibrahim@yahoo.com",
    "mobile_number": "01092812848",
    "address1": "20 M A",
    "address2": "",
    "country": "Egypt",
    "city": "Cairo",
    "state": "Zamalek",
    "zip_code": "11211"
  },
  "sub_total_price": 100,
  "shipping": 10,
  "total_price": 110,
  "user_id": "6346ac23bb862e01fe4b6535",
  "order_date": "2022-01-01T00:00:00.000Z",
  "order_details": [
    {
      "product_id": "6346c15ea060efd7cae40589",
      "price": 25,
      "qty": 2
    },
    {
      "product_id": "6346c186a060efd7cae4058b",
      "price": 25,
      "qty": 2
    }
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/api/orders/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}