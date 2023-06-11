(function () {
    console.log(0);
  
    const response = fetch("http://localhost:5000/api/products/");
    response.then((data) => {
      data.json().then((d) => {
        let list = "";
        d.data.forEach(obj => {
            const cartItem = new CartLine(obj);
            console.log(cartItem);
        });
        document.getElementById("products").innerHTML = list;
      });
    });
  
    console.log(1);
})();

/*
let count = 10;

function subtractQuantity() {
    if (count > 0){
        count--;
        localStorage.setItem("quantity", count);
    }
};
function addQuantity() {
    count++;
    localStorage.setItem("quantity", count);
};

*/

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
}
  


/*obj.quantity = 0;
list =
list +
`
<tr id="cartLine">
    <td class="align-middle">
        <img src="${obj.image}" alt="" style="width: 50px" />
        ${obj.name}
    </td>
    <td class="align-middle">$${obj.price}</td>
    <td class="align-middle">
        <div
            class="input-group quantity mx-auto"
            style="width: 100px"
        >
            <div class="input-group-btn">
                <button
                    type="button"
                    class="decBtn btn btn-sm btn-primary btn-minus" onclick="subtractQuantity()"
                >
                    <i class="fa fa-minus"></i>
                </button>
            </div>
            <input
            type="text" id="val"
            class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
            value=${localStorage.getItem("quantity", count)} readonly
            />
            <div class="input-group-btn">
                <button
                    type="button"
                    class="incBtn btn btn-sm btn-primary btn-plus" onclick="addQuantity()"
                >
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle">$${obj.price * localStorage.getItem("quantity", count)}</td>
    <td class="align-middle">
        <button class="btn btn-sm btn-danger" type="button" onclick"removeCartLine()">
            <i class="fa fa-times"></i>
        </button>
    </td>
</tr>
`*/
