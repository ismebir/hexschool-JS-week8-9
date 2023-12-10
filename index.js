// API
const _url = 'https://livejs-api.hexschool.io';
const api_path = 'yal56';
let productsUrl = `${_url}/api/livejs/v1/customer/${api_path}/products`;
let cartsUrl = `${_url}/api/livejs/v1/customer/${api_path}/carts`;
let orderUrl = `${_url}/api/livejs/v1/customer/${api_path}/orders`;
let adminOrderUrl = `${_url}/api/livejs/v1/admin/${api_path}/orders`;

// data
// 前台： 
// -> 產品
let productsData = [];
let postData = {
    "data": {
    }
};
// -> 購物車
let cartsData = [];
// -> 訂購資訊
let postOrderData = {
    "data": {
        "user": {
        }
    }
};

// 後台：
let orderData = [];
let orderProductsData = [];
let categoryData = [];

// DOM
// 前台：
// product
const productWrap = document.querySelector('.productWrap');
const productCardAll = document.querySelectorAll('.productCard');
const productSelect = document.querySelector('.productSelect');
// cart
const addCardBtn = document.querySelector('.addCardBtn');
const discardAllBtn = document.querySelector('.discardAllBtn');
const discardBtn = document.querySelector('.discardBtn>a');
const shoppingCartTable = document.querySelector('.shoppingCart-table');
// order
const customerName = document.querySelector('#customerName');
const customerPhone = document.querySelector('#customerPhone');
const customerEmail = document.querySelector('#customerEmail');
const customerAddress = document.querySelector('#customerAddress');
const tradeWay = document.querySelector('#tradeWay');
const orderInfoBtn = document.querySelector('.orderInfo-btn');
const orderInfoForm = document.querySelector('.orderInfo-form');

// 後台：
// const orderPageTable = document.querySelector('.orderPage-table');
// const orderPageList = document.querySelector('.orderPage-list');
// const chartStyle = document.querySelector('#chart');
// let dataType = chartChangeBtn.getAttribute('data-type');

// 產品頁面
// renderProduct(data) -> 渲染產品
function renderProduct(data) {
    let str = '';
    data.forEach(function (item) {
        // 選染 & 加入 data-category
        str += `<li class="productCard" data-category="${item.category}"}>
        <h4 class="productType">新品</h4>
        <img src="${item.images}" alt="">
        <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
        </li>`
    });
    productWrap.innerHTML = str;
}

// initProductPage() -> 取得產品資訊 & 渲染產品頁面
function initProductPage() {
    axios.get(productsUrl)
        .then(function (response) {
            console.log(response);
            productsData = response.data.products;
            renderProduct(productsData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

initProductPage();

// 篩選產品
// productSelect 監聽
productSelect.addEventListener('change', function (e) {
    let choseData = [];
    if (e.target.value === '全部') {
        choseData = productsData;
    }

    productsData.forEach(function (item) {
        if (e.target.value === item.category) {
            choseData.push(item);
        }
    })
    renderProduct(choseData);
});

// 加入購物車 
// productWrap 監聽
productWrap.addEventListener('click', function (e) {
    // 此次數量固定為 1
    let tempObj = {};
    if (e.target.getAttribute("class") !== "addCardBtn") {
        return;
    } else if (e.target.getAttribute("class") === "addCardBtn") {
        e.preventDefault();
        postData['data'].productId = e.target.getAttribute('data-id');

        // 抓取 post 資料
        let id = e.target.getAttribute('data-id');
        if (tempObj[id] === undefined) {
            tempObj[id] = 1;
        } else {
            tempObj[id]++;
        }
        postData['data'].quantity = tempObj[id];
        // 上傳購物車資料 & 渲染頁面
        postCart();
    };
})

// postCart() 
function postCart() {
    axios.post(cartsUrl, postData)
        .then(function (response) {
            console.log(response);
            initCartPage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

// initCartPage() -> 取得購物車資料 & 渲染購物車頁面
function initCartPage() {
    axios.get(cartsUrl)
        .then(function (response) {
            console.log(response);
            cartsData = response.data.carts;
            cartsData.forEach(function (item) {
                item['total'] = response.data.total;
                item['finalTotal'] = response.data.finalTotal;
            });
            console.log(cartsData);
            renderCarts(cartsData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// renderCarts() -> 渲染購物車資料 
function renderCarts(data) {
    let str = '';
    let cartsStr = '';
    let priceStr = '';

    data.forEach(function (item, index) {
        cartsStr += `
    <tr>
      <td>
        <div class="cardItem-title">
          <img src=${item.product.images} alt="">
          <p>${item.product.title}</p>
        </div>
      </td>
      <td>NT$12,000</td>
      <td>${item.quantity}</td>
      <td>NT$${item.product.price}</td>
      <td class="discardBtn">
          <a href="#" class="material-icons" id=${item.id}>
        clear
          </a>
      </td>
    </tr>`;

        priceStr = `
    <tr>
      <td>
         <a href="#" class="discardAllBtn">刪除所有品項</a>
      </td>
      <td></td>
      <td></td>
      <td>
         <p>總金額</p>
      </td>
      <td>NT$${item.finalTotal}</td>
    </tr>`;
    });

    str = `
    <tr>
      <th width="40%">品項</th>
      <th width="15%">單價</th>
      <th width="15%">數量</th>
      <th width="15%">金額</th>
      <th width="15%"></th>
    </tr>
    ${cartsStr}
    ${priceStr}`;

    shoppingCartTable.innerHTML = str;
}

// deleteCart(id) -> 刪除購物車單筆項目
function deleteCart(id) {
    let deleteUrl = `${cartsUrl}/${id}`;
    axios.delete(deleteUrl)
        .then(function (response) {
            initCartPage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

// deleteCartAll -> 刪除購物車
function deleteCartAll() {
    axios.delete(cartsUrl)
        .then(function (response) {
            console.log(response);
            initCartPage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

// 刪除購物車  
// shoppingCartTable 監聽 -> 刪除單筆
shoppingCartTable.addEventListener('click', function (e) {
    // 準備刪除的購物車 id
    let deleteId = '';
    if (!e.target.hasAttribute('id')) {
        return;
    } else if (e.target.hasAttribute('id')) {
        e.preventDefault();
        deleteId = e.target.getAttribute('id');
        console.log(deleteId);
        console.log('點擊單筆刪除按鈕');
        deleteCart(deleteId);
    };
});

// shoppingCartTable 監聽 -> 刪除整筆
shoppingCartTable.addEventListener('click', function (e) {
    if (e.target.getAttribute('class') !== 'discardAllBtn') {
        return;
    } else if (e.target.getAttribute('class') === 'discardAllBtn') {
        e.preventDefault();
        console.log('點擊整筆刪除按鈕');
        deleteCartAll();
    }
})


// 新增訂單
// postOrder() -> post 上傳訂單資訊
function postOrder() {
    axios.post(orderUrl, postOrderData)
        .then(function (response) {
            orderInfoForm.reset();
            // 清空購物車
            let data = [];
            renderCarts(data);
            console.log('已成功上傳訂單資料');
        })
        .catch(function (error) {
            console.log(error);
        })
}

// getOrder() -> get 取得訂單資訊
function getOrder() {
    axios.get(adminOrderUrl, {
        headers: {
            'Authorization': '8hHEOPMhYBSV8evxiZV7y9boM1e2',
        }
    })
        .then(function (response) {
            // console.log(response);
            orderData = response.data.orders;
            console.log(orderData);
            console.log('已成功取得訂單資料');

            // 抓入每筆 orderData 的 products
            orderData.forEach(function (item) {
                orderProductsData.push(item.products);
            });
            // console.log(orderProductsData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// orderInfoBtn 監聽 
orderInfoBtn.addEventListener('click', function (e) {
    e.preventDefault();
    postOrderData['data']['user'].name = customerName.value;
    postOrderData['data']['user'].tel = customerPhone.value;
    postOrderData['data']['user'].email = customerEmail.value;
    postOrderData['data']['user'].address = customerAddress.value;
    postOrderData['data']['user'].payment = tradeWay.value;
    console.log(postOrderData);
    postOrder();
    getOrder();
})

