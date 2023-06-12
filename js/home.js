const cartValue=document.getElementById('cartValue');
if(localStorage.getItem('cart')){
  cartValue.innerHTML=JSON.parse(localStorage.getItem('cart')).length;
}
(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/categories/");
  response.then((data) => {
    data.json().then((d) => {
      let list = "";
      d.data.forEach((element) => {
        list =
          list +
          `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link">${element.name}</a>`;
      });
      document.getElementById("categories-menu").innerHTML = list;
   
    });
  });

  console.log(1);
})();


(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/categories/");
  response.then((data) => {
    data.json().then((d) => {
      let list = "";
      d.data.sort((p1, p2) => (p1.productCount < p2.productCount) ? 1 : (p1.productCount > p2.productCount) ? -1 : 0);
      d.data.splice(4, d.data.length);
      d.data.forEach(obj => {
        let item = new Product(obj);
        list += item.getHTML();
      });
      document.getElementById("myDiv").innerHTML = list;
    });
  });
})();


(function () {
  fetch("http://localhost:5000/api/products/getFeatured")
  .then(response => response.json())
  .then(result => {
    let list ='';
    
    result.data.slice(0,8).forEach((item)=>{
      let element=new Product(item);
      list+=element.getHomeHTML();
      document.getElementById('products').innerHTML=list;
      document.querySelectorAll(".cart").forEach((element)=>{
        element.addEventListener("click", e=>{
          
          let productId=e.target.getAttribute("data-id");
          let productData = result.data.filter(product=> product._id == productId);
          let data ={id:productData[0]._id,name:productData[0].name,image:productData[0].image,price:productData[0].price-productData[0].price*productData[0].discount,quantity:1};
          
          
          if(localStorage.getItem('cart')){
            
            let oldData=JSON.parse(localStorage.getItem("cart"))
            oldData.push(data);
            localStorage.setItem("cart",JSON.stringify(oldData));
            cartValue.innerHTML=JSON.parse(localStorage.getItem('cart')).length;
          }else{
            cartValue.innerHTML=1
            localStorage.setItem('cart',"[]")
            let oldData=JSON.parse(localStorage.getItem("cart"))
            oldData.push(data)
            localStorage.setItem("cart",JSON.stringify(oldData));
            cartValue.innerHTML=JSON.parse(localStorage.getItem('cart')).length;
            
          }
        })
      })
    
    })
  })
  .catch(error => console.log('error', error));
})();



(function () {
  fetch("http://localhost:5000/api/products/getRecent")
  .then(response => response.json())
  .then(result => {
    let list ='';
    result.data.forEach((item)=>{
      let element=new Product(item);
      list+=element.getHomeHTML();
      document.getElementById('recent').innerHTML=list;
      document.querySelectorAll(".cart").forEach((element)=>{
        element.addEventListener("click", e=>{
          
          let productId=e.target.getAttribute("data-id");
          let productData = result.data.filter(product=> product._id == productId);
          let data ={id:productData[0]._id,name:productData[0].name,image:productData[0].image,price:productData[0].price-productData[0].price*productData[0].discount,quantity:1};
          
          
          if(localStorage.getItem('cart')){
            let oldData=JSON.parse(localStorage.getItem("cart"))
            oldData.push(data);
            localStorage.setItem("cart",JSON.stringify(oldData));
            cartValue.innerHTML=JSON.parse(localStorage.getItem('cart')).length;
          }else{
            
            localStorage.setItem('cart',"[]")
            let oldData=JSON.parse(localStorage.getItem("cart"))
            oldData.push(data)
            localStorage.setItem("cart",JSON.stringify(oldData));
            cartValue.innerHTML=JSON.parse(localStorage.getItem('cart')).length;
          }
        })
      })
     // console.log(JSON.parse(localStorage.getItem("allProducts")))
    })
  })
  .catch(error => console.log('error', error));
})();

function addToCart(id){
cartArray=[];
let products = JSON.parse(localStorage.getItem("allProducts"));
for(let i=0;i<products.length;i++){
 // console.log(products[i]["_id"])
  if(products[i]["_id"]==id){
    cartArray.push(products[i]);
    console.log(cartArray)
  }
}
}


class Product {
  constructor(obj) {
    this.id = obj._id;
    this.name = obj.name;
    this.image=obj.image;
    this.price = obj.price;
    this.discount = obj.discount;
    this.rating = obj.rating;
    this.rating_count = obj.rating_count;
    this.product_count = obj.productCount;
  }

  getPriceAfterDiscount() {
    return this.price - this.price * this.discount;
  }



  getRatingHTML() {
    if(this.rating==4.5){
      return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star-half-alt text-primary mr-1"></small>
    <small>${this.rating_count}</small>
  </div>`;
  }else if(this.rating==4){
    return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="far fa-star text-primary mr-1"></small>
    <small>${this.rating_count}</small>
  </div>`;
  }else if(this.rating==3.5){
    return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star-half-alt text-primary mr-1"></small>
    <small class="far fa-star text-primary mr-1"></small>
    <small>${this.rating_count}</small>
  </div>`;
  }
  }

  getHomeHTML() {
    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${this.image}" alt="">
        <div class="product-action">
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)" >
          <i  data-id="${this.id}" class="fa fa-shopping-cart cart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="far fa-heart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-sync-alt"></i></a>
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-search"></i></a>
        </div>
      </div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href="">${this.name}</a>
        <div class="d-flex align-items-center justify-content-center mt-2">
          <h5>$${this.getPriceAfterDiscount()}</h5>
          <h6 class="text-muted ml-2"><del>$${this.price}</del></h6>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-1">
          ${this.getRatingHTML()}
        </div>
      </div>
    </div>
  </div>`;
  }

  getHTML() {
    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="">
            <div class="cat-item d-flex align-items-center mb-4">
                <div class="overflow-hidden" style="width: 100px; height: 100px" id>
                    <img class="img-fluid" src="${this.image}" alt="" />
                </div>
                <div class="flex-fill pl-3">
                    <h6>${this.name}</h6>
                    <small class="text-body">${this.product_count}</small>
                </div>
            </div>
        </a>
    </div>
    `;
  }
}




class CartLine {
  product;
  quantity;
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.getPriceAfterDiscount() * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  getHTML() {
    return `<div>Hello</div>`
  }
}

class Cart {
  cartlines;
  constructor(productsArray) {
    this.cartlines = [];
    //loop to add products into cartlines array
  }

  remove(productId) {}

  getTotal() {}

  getSubTotal() {}
}





//Cart
//CartLine
//Product
//Category
