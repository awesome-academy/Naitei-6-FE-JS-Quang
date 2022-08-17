import { renderTemplate, request } from './helpers.js';

const NUM_PER_PAGE = 10;
let activePagination = 1;
let gridType = true;

if (window.location.href.includes('list-grid')) gridType = false;

function resetCSS(classItem, classRemove) {
  document.querySelectorAll(`.${classItem}`).forEach((item) => {
    item.classList.remove(classRemove);
  });
}

function setPagination(num, active) {
  const pagination = [...Array(num)]
    .map((_, index) => {
      const pageNum = index + 1;
      const isActive = pageNum === active;
      return `<li data-page="${pageNum}" class="pagination-list-item ${
        isActive ? 'pagination-list-item--active' : ''
      }">${pageNum}</li>`;
    })
    .join('');
  const template = `<ul class="pagination-list">${pagination}</ul>`;

  renderTemplate('.pagination-list-group', template, 'beforeend');
}
function categoryFilter(listCategory) {
  let title = '',
    finalList = '';

  for (let category of listCategory) {
    title = `<h3 class="product-sidebar-title">${category.title || ''}</h3>`;
    let list = '';
    for (let item of category.list) {
      list += `<li class="product-sidebar-item" data-value="${item}"><a href="#${item}">${item}</a></li>`;
    }
    finalList = `<ul class="product-sidebar-list">${list}</ul>`;
    const template = `${title}${finalList}`;
    renderTemplate('.product-sidebar-list-group', template);
  }
  return;
}

function tagFilter(tags, tagActive) {
  let tagItem = '';
  let template = '';
  for (let tag of tags) {
    tagItem += `<li data-value="${tag}" class="tag-item ${
      tagActive == tag ? 'tag-item--active' : ''
    }">${tag}</li>`;
  }
  template = `<ul class="tag-list">${tagItem}</ul>`;
  renderTemplate('.product-sidebar-tags', template);
}

function filterAction(products, attr, className, activeClassName) {
  document.querySelectorAll(`.${className}`).forEach((item) => {
    item.addEventListener('click', () => {
      const currentProducts = products.filter((prod) => {
        return prod[attr] == item.dataset.value;
      });
      resetCSS(className, activeClassName);

      item.classList.add(activeClassName);

      productsRender(currentProducts);
      setPagination(currentProducts.length / NUM_PER_PAGE, 1);
    });
  });
}

function productItem(product) {
  let template = `<div class="product-card" id="${product.id}">
      <div class="product-img">
        <img src="${product.thumbnail}" alt="" />
      </div>
      <div class="product-quick">
        <div class="product-quick-box">
          <i class="bi bi-suit-heart-fill"></i><span>Yêu thích </span>
        </div>
        <div class="product-quick-box">
          <i class="bi bi-bar-chart-fill"></i><span>So sánh </span>
        </div>
			</div>
			<div class="product-info">
				<h3 class="product-name">${product.name}</h3>
				<div class="product-price">
					<span class="product-price-main">${product.price}</span>
				</div>
				<button class="btn product-btn">ADD TO CART</button>
			</div>
    </div>`;
  if (!gridType) {
    template = `<div class="product-list-card" id="${product.id}">
   <div class="col-lg-4">
      <div class="product-list-img">
         <img class="img-fluid" src="${product.thumbnail}" alt="" />
      </div>
           </div>
      <div class="col-lg-8">
         <div class="product-list-info">
            <div class="product-list-name">${product.name}</div>
            <div class="product-list-price">${product.price}</div>
            <div class="product-list-desc">${product.description}</div>
            <div class="product-list-group">
               <button class="btn product-list-btn">Add to cart</button>
               <div class="detail-icon">
                  <div class="detail-icon-box"> <i class="bi bi-suit-heart-fill"></i><span>Yêu thích</span></div>
                  <div class="detail-icon-box"> <i class="bi bi-bar-chart-fill"></i><span>So sánh</span></div>
               </div>
            </div>
         </div>
      </div>
 
   </div>
</div>`;
  }
  return template;
}

function paginationAction(products) {
  document.querySelectorAll('.pagination-list-item').forEach((pageItem) => {
    pageItem.addEventListener('click', (e) => {
      e.preventDefault();
      let currentPage = pageItem.dataset.page;
      resetCSS('pagination-list-item', 'pagination-list-item--active');
      pageItem.classList.add('pagination-list-item--active');
      productsRender(
        products.slice(
          (currentPage - 1) * NUM_PER_PAGE,
          currentPage * NUM_PER_PAGE > products.length
            ? products.length
            : currentPage * NUM_PER_PAGE
        )
      );
    });
  });
}

function productsRender(products) {
  let template = '';
  for (let product of products) {
    template += productItem(product, gridType);
  }
  if (window.location.href.includes('list-grid')) {
    renderTemplate('.product-list', template);
  } else renderTemplate('.grid-product', template);
  return;
}

request('tags')
  .then((res) => {
    tagFilter(res, 'Cao cấp');
  })
  .catch((err) => console.log(err));
request('category')
  .then((res) => {
    categoryFilter(res);
  })
  .catch((err) => console.log(err));

request('products')
  .then((res) => {
    filterAction(
      res,
      'type',
      'product-sidebar-item',
      'product-sidebar-item--active'
    );
    filterAction(res, 'tag', 'tag-item', 'tag-item--active');

    setPagination(
      Math.floor(res.length / NUM_PER_PAGE),
      activePagination,
      'beforeend'
    );

    paginationAction(res);
    productsRender(res.slice(0, NUM_PER_PAGE));
    document.querySelectorAll('.product-card').forEach((item) => {
      console.log(item);
      item.addEventListener('click', () => {
        window.location.hash = item.id;
        window.location.pathname = `/pages/detail/detail.html`;
      });
    });
  })
  .catch((err) => console.log(err));
