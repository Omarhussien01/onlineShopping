class Product {
    constructor(obj) {
      this.id = obj._id;
      this.name = obj.name;
      this.image= obj.image;
      this.price = obj.price;
      this.discount = obj.discount;
      this.rating = obj.rating;
      this.rating_count = obj.rating_count;
      this.product_count = obj.productCount;
    }
} 

class CartLine extends Product {
    quantity;
    constructor(name, quantity = 1) {
        super(name);
        this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.price * this.quantity;
    }
  
    increment() {
      this.quantity++;
    }
  
    decrement() {
      if (this.quantity > 1) this.quantity--;
    }
  
    getHTML() {
      return `<tr id="cartLine">
      <td class="align-middle">
          <img src="${this.image}" alt="" style="width: 50px" />
          ${this.name}
      </td>
      <td class="align-middle">$${this.price}</td>
      <td class="align-middle">
          <div
              class="input-group quantity mx-auto"
              style="width: 100px"
          >
              <div class="input-group-btn">
                  <button
                      type="button" id="subtract"
                      class="decBtn btn btn-sm btn-primary btn-minus" 
                  >
                      <i class="fa fa-minus"></i>
                  </button>
              </div>
              <input
              type="text" 
              class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
              value=${this.quantity} readonly
              />
              <div class="input-group-btn">
                  <button
                      type="button" id="add"
                      class="incBtn btn btn-sm btn-primary btn-plus" 
                  >
                      <i class="fa fa-plus"></i>
                  </button>
              </div>
          </div>
      </td>
      <td class="align-middle">$${this.getTotalPrice()}</td>
      <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" onclick"removeCartLine()">
              <i class="fa fa-times"></i>
          </button>
      </td>
    </tr>`
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


JSON.parse(localStorage.getItem('cart')).forEach(obj => {
    // listing selected products
    const cartItem = new CartLine(obj);
    list += cartItem.getHTML();
    //console.log(cartItem);
    //console.log(obj.discount);
});
document.getElementById("products").innerHTML = list;


