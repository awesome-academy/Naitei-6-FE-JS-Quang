import { baseURL } from './constant.js';
export function renderTemplate(container, template, position) {
  const pos = position || 'afterBegin';
  document.querySelector(container).innerHTML = '';
  document.querySelector(container).insertAdjacentHTML(pos, template);
}
export function request(path, type, data) {
  let methodType = type || 'GET';
  return fetch(`${baseURL}${path}`, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then((res) => res.json());
}
