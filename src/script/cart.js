import { cart, toast } from './helpers.js';
import { PREFIX } from './constant.js';

const cartList = cart.get();

let bodyTemplate = '';
function renderProducts(products) {
  if (!products.length) {
    bodyTemplate = `<tr><td colspan="6"><p class="cart-notify">Không có sản phẩm nào</p></td></tr>`;
  } else {
    for (let item of products) {
      bodyTemplate += rowRender(item);
    }
  }
  document.querySelector('.cart-body').innerHTML = bodyTemplate;
}
function rowRender(product) {
  const template = `
    <tr id=${product.id}> 
      <td><img class="img-fluid cart-img" src="${product.img}" alt="alt"></td>
      <td>${product.name}</td>
      <td class="cart-bold">${product.price}</td>
      <td>${product.num}</td>
      <td class="cart-bold">${product.price * product.num}</td>
      <td class="cart-btn-del ${PREFIX}cart-btn"><span class="bi bi-trash"></span></td>
    </tr>
  
  `;
  return template;
}

renderProducts(cartList);

document.querySelector('.js-cart-btn')?.addEventListener('click', function () {
  this.parentElement.remove();
  cart.remove(this.parentElement.id);
});

document
  .querySelector('.js-cart-btn-checkout')
  ?.addEventListener('click', () => {
    if (!cart.get().length)
      toast('red', 'Không có sản phẩm không thể thành toán');
    else {
      window.location.href =
        'http://localhost:3000/pages/checkout/checkout.html';
    }
  });

document
  .querySelector('.js-cart-btn-del')
  ?.addEventListener('click', function () {
    cart.set([]);
    renderProducts([]);
  });
