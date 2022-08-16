/* eslint-disable no-undef */
import { cart, toast } from './helpers.js';
import { PREFIX } from './constant.js';
const cartList = cart.get();
let amount = 0;
let bodyTemplate = '';

function rowRender(product) {
  const template = `
    <tr id=${product.id}> 
      <td><img class="img-fluid cart-img" src="${product.img}" alt="alt"></td>
      <td>${product.name}</td>
      <td class="cart-bold">${product.price}</td>
      <td>${product.num}</td>
      <td class="cart-bold">${product.price * product.num}</td>
    </tr>
  `;
  amount += product.price * product.num;
  return template;
}

function amountRender(amount) {
  return `<div class="cart-footer">
            <span>Tổng tiền thanh toán</span>
            <span>${amount}</span>
          </div>`;
}

function tableProductsRender() {
  console.log(cartList);
  for (let item of cartList) {
    bodyTemplate += rowRender(item);
  }
  document
    .querySelectorAll('.cart-body')
    .forEach((body) => (body.innerHTML = bodyTemplate));
  document.querySelector('.cart-checkout').innerHTML = amountRender(amount);
}

const obj = {};
function resetInputValue() {
  document.querySelectorAll('.form-input').forEach((input) => {
    input.value = '';
  });
}

function checkInput() {
  let check = true;
  document.querySelectorAll(`.checkout .form-input`).forEach((input) => {
    if (!input.value.length) {
      check = false;
    }
  });
  return check;
}
function saveInput() {
  document.querySelectorAll('.checkout .form-input').forEach((input) => {
    obj[input.id] = input.value;
  });
}

function activeForm(value) {
  document.querySelectorAll('fieldset').forEach((fieldset) => {
    if (fieldset.dataset.value != value) {
      if (value == '3') {
        renderCheckout();
      }
      fieldset.classList.add('form-hidden');
    } else fieldset.classList.remove('form-hidden');
  });
}

function renderCheckout() {
  Object.keys(obj).forEach((key) => {
    document.querySelector(`.confirm #${key}`).value = obj[key];
  });
}

function setCurrentProgressValue(value) {
  document.querySelectorAll('.form-progress li').forEach((item) => {
    if (item.dataset.value == value) {
      item.classList.add('form-progress-active');
    } else item.classList.remove('form-progress-active');

    activeForm(value);
  });
}

function progressAction() {
  document.querySelectorAll(`.${PREFIX}form-btn-prev`).forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      setCurrentProgressValue(+item.dataset.value - 1);
    })
  );
  document.querySelectorAll(`.${PREFIX}form-btn-next`).forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();

      if (item.dataset.value == '2') {
        if (!checkInput()) toast('red', 'Thông tin không được trống');
        else {
          saveInput();
          setCurrentProgressValue(+item.dataset.value + 1);
        }
      } else {
        saveInput();
        setCurrentProgressValue(+item.dataset.value + 1);
      }
    })
  );
}

tableProductsRender();
document
  .querySelector(`.${PREFIX}form-btn-checkout`)
  .addEventListener('click', function (e) {
    e.preventDefault();
    cart.set([]);
    if (document.querySelectorAll('.cart-body'))
      document.querySelectorAll('.cart-body').forEach((body) => body.remove());
    document.querySelector('.cart-checkout').innerHTML = amountRender(0);

    toast('green', 'Thanh toán thành công');
    resetInputValue();
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/pages/thank-you/main.html';
    }, 5000);
  });

setCurrentProgressValue(1);
progressAction();
