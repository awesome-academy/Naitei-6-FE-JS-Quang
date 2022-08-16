import { cart } from './helpers.js';
import { PREFIX } from './constant.js';

const cartList = cart.get();

let bodyTemplate = '';

function rowRender(product) {
  const template = `
    <tr id=${product.id}> 
      <td><img class="img-fluid cart-img" src="${product.img}" alt="alt"></td>
      <td>${product.name}</td>
      <td class="cart-bold">${product.price}</td>
      <td>${product.num}</td>
      <td class="cart-bold">${product.price * product.num}</td>
      <td class="cart-btn ${PREFIX}cart-btn"><span class="bi bi-trash"></span></td>
    </tr>
  
  `;
  return template;
}

for (let item of cartList) {
  bodyTemplate += rowRender(item);
}
if (!cartList.length) {
  bodyTemplate = `<tr><td colspan="6"><p class="cart-notify">Không có sản phẩm nào</p></td></tr>`;
}

document.querySelector('.cart-body').innerHTML = bodyTemplate;
document.querySelector('.js-cart-btn').addEventListener('click', function () {
  this.parentElement.remove();
  cart.remove(this.parentElement.id);
});
document
  .querySelector('.js-cart-btn-del')
  .addEventListener('click', function () {
    document.querySelectorAll('.cart-body tr').forEach((item) => item.remove());
    cart.removeAll();
  });
