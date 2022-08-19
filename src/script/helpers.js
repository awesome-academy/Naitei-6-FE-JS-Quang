/* eslint-disable no-undef */
import { baseURL, cartKey } from './constant.js';

export const getLocalStorageByKey = (key, defaultValue = []) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

export const setLocalStorageByKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function renderTemplate(container, template, position) {
  const pos = position || 'afterBegin';
  document.querySelector(container).innerHTML = '';
  document.querySelector(container).insertAdjacentHTML(pos, template);
}
export function request(path, type, data) {
  const methodType = type || 'GET';
  return fetch(`${baseURL}${path}`, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then((res) => res.json());
}
export const cart = {
  set: function (products) {
    localStorage.setItem(cartKey, JSON.stringify(products));
  },
  get: function () {
    return getLocalStorageByKey(cartKey);
  },
  push: function (product) {
    const currentProducts = getLocalStorageByKey(cartKey);
    const index = currentProducts.findIndex((item) => item.id == product.id);
    if (index != -1) {
      currentProducts[index].num++;
    } else {
      product.num = 1;
      currentProducts.push(product);
    }
    localStorage.setItem(cartKey, JSON.stringify(currentProducts));
  },
  remove: function (id) {
    const currentProducts = getLocalStorageByKey(cartKey);
    const delProducts = currentProducts.filter((item) => item.id != id);
    localStorage.setItem(cartKey, JSON.stringify(delProducts));
  },
  removeAll: function () {
    localStorage.setItem(cartKey, JSON.stringify([]));
  }
};
export function toast(color, message) {
  setTimeout(() => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: color
      }
    }).showToast();
  }, 1000);
}
