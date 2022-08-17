import { renderTemplate, request } from './helpers.js';

function detailProduct(product) {
  let imgs = '';
  for (let img of product.imgs) {
    imgs += `<div class="detail-slide-img"><img class="img-fluid" src="${img}" alt=""></div>`;
  }
  const template = `
    
      <div class="container"> 
        <div class="row gx-5">
          <div class="col-lg-1 col-md-12">
            <div class="detail-slide-container">
            <div class="detail-slide">
                 <span class="detail-slide-btn"><i class="bi bi-arrow-up"></i></span>
                 ${imgs}
                 <span class="detail-slide-btn"><i class="bi bi-arrow-down"></i></span
                </div>
              </div>
                </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="detail-img"> <img class="img-fluid" src="${product.thumbnail}" alt=""></div>
          </div>
          <div class="col-lg-5 col-md-12">
            <div class="detail-info"> 
                  <h2 class="text-uppercase">Chi tiết sản phẩm</h2><img src="../../assets/titleleft-dark.png" alt="Rượu vang champange">
              <p class="detail-price">${product.price}</p>
              <hr class="detail-divider">
              <div class="detail-review"> 
                <div class="detail-review-star"> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div>
                <p class="detail-review-num">${product.reviews} Review(S)</p>
                <p class="detail-review-add">Add Your Review</p>
              </div>
              <hr class="detail-divider">
            </div>
            <p class="detail-title">Kích thước</p>
                <select class="select">
                  <option class="select-item" value="To">To</option>
                  <option class="select-item" value="Nhỏ">Nhỏ</option>
                </select>
            <p class="detail-title">Số lượng 
              </p><div class="detail-quantity"> 
                    <form class="quantity-box" onclick="return false;;">
                      <button class="quantity-btn">−</button>
                      <input class="quantity-input" type="number" name="qty" min="1" max="10" step="1" value="1">
                      <button class="quantity-btn">+</button>
                    </form>
                    <button class="btn detail-quantity-add">Add to cart</button>
              </div>
            <p></p>
                <div class="detail-icon">
                  <div class="detail-icon-box"> <i class="bi bi-suit-heart-fill"></i><span>Yêu thích</span></div>
                  <div class="detail-icon-box"> <i class="bi bi-bar-chart-fill"></i><span>So sánh</span></div>
                  <div class="detail-icon-box"> <i class="bi bi-envelope-fill"></i><span>Email</span></div>
                </div>
            <p class="detail-title">Mô tả</p>
            <p>${product.description}</p>
          </div>
        </div>
      </div>
   
  `;
  renderTemplate('.detail', template);
}

request(`products/${window.location.hash.slice(1)}`).then((res) => {
  console.log(res);
  detailProduct(res);
});
