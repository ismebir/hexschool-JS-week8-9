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
let categoryData = [];

// DOM
// 前台：
// product
// const productWrap = document.querySelector('.productWrap');
// const productCardAll = document.querySelectorAll('.productCard');
// const productSelect = document.querySelector('.productSelect');
// cart
// const addCardBtn = document.querySelector('.addCardBtn');
// const discardAllBtn = document.querySelector('.discardAllBtn');
// const discardBtn = document.querySelector('.discardBtn>a');
// const shoppingCartTable = document.querySelector('.shoppingCart-table');
// order
// const customerName = document.querySelector('#customerName');
// const customerPhone = document.querySelector('#customerPhone');
// const customerEmail = document.querySelector('#customerEmail');
// const customerAddress = document.querySelector('#customerAddress');
// const tradeWay = document.querySelector('#tradeWay');
// const orderInfoBtn = document.querySelector('.orderInfo-btn');
// const orderInfoForm = document.querySelector('.orderInfo-form');

// 後台：
const orderPageTable = document.querySelector('.orderPage-table');
const orderPageList = document.querySelector('.orderPage-list');
const chartChangeBtn = document.querySelector('.chartChange-Btn');
// 要放在 chartChangeBtn 後面
let dataType = chartChangeBtn.getAttribute('data-type');

// renderOrder() -> 渲染訂單頁面
function renderOrder(data) {
    let str = '';
    let orderStr = '';

    data.forEach(function (item) {
        let productsAry = item.products;
        let titleStr = '';
        productsAry.forEach(function (i) {
            titleStr += `${i.title}<br>`;
        });

        orderStr += `
        <tbody>
          <tr>
            <td>${item.createdAt}</td>
            <td>
              <p>${item.user.name}</p>
              <p>${item.user.tel}</p>
            </td>
            <td>${item.user.address}</td>
            <td>${item.user.email}</td>
            <td>
              <p>${titleStr}</p>
            </td>
            <td>2021/03/08</td>
            <td class="orderStatus">
              <a href="#">未處理</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn" value="刪除" id=${item.id}>
            </td>
          </tr>
        </tbody>`;
    });

    str = `
  <thead>
    <tr>
      <th>訂單編號</th>
      <th>聯絡人</th>
      <th>聯絡地址</th>
      <th>電子郵件</th>
      <th>訂單品項</th>
      <th>訂單日期</th>
      <th>訂單狀態</th>
      <th>操作</th>
    </tr>
  </thead>
  ${orderStr}`;

    orderPageTable.innerHTML = str;
};

// renderChart(property)
function renderChart(property) {
    // orderProductsData -> 抓入每筆 orderData 的 products
    let orderProductsData = [];
    orderData.forEach(function (item) {
        orderProductsData.push(item.products);
    });
    console.log(orderProductsData);

    // 轉換資料型態，變成 chart 所需的 pieData
    let obj = {};
    let pieData = [];

    orderProductsData.forEach(function (item) {
        item.forEach(function (i) {
            if (obj[i[property]] === undefined) {
                obj[i[property]] = 1;
            } else if (obj[i[property]] !== 0) {
                obj[i[property]] += 1;
            };
        })
    })

    let keys = Object.keys(obj);
    keys.forEach(function (i, index) {
        let data = [];
        data[0] = i;
        data[1] = obj[i];
        pieData[index] = data;
    });

    // 處理 pieData 順序、分出其他資料
    pieData.sort((a, b) => b[1] - a[1]);

    if (pieData.length > 3) {
        let threeDatas = pieData.slice(0, 3); // 前面三組陣列資料
        let overThree = pieData.slice(3); // 後面陣列資料

        // 計算其他資料的數量
        let total = 0;
        overThree.forEach(function (i) {
            total += i[1];
        })

        let otherDatas = [];
        otherDatas = ['其他', total];
        threeDatas.push(otherDatas);

        // 重新賦值 pieData
        pieData = threeDatas;
    }

    // 處理 chart 的 color
    let colorsData = {};
    for (let i = 0; i < pieData.length; i++) {
        if (i === 0) {
            colorsData[pieData[i][0]] = '#DACBFF';
        } else if (i === 1) {
            colorsData[pieData[i][0]] = '#9D7FEA';
        } else if (i === 2) {
            colorsData[pieData[i][0]] = '#5434A7';
        } else if (i === 3) {
            colorsData[pieData[i][0]] = '#301E5F';
        }
    }

    // c3 chart
    let chart = c3.generate({
        data: {
            bindto: '#chart',
            columns: pieData,
            type: 'pie',
            empty: {
                label: {
                    text: "No Data"
                }
            },
            order: 'asc',
            colors: colorsData,
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
    });

}

// initOrderPage() -> 渲染訂單資料 & 圓餅圖
function initOrderPage() {
    axios.get(adminOrderUrl, {
        headers: {
            'Authorization': '8hHEOPMhYBSV8evxiZV7y9boM1e2',
        }
    })
        .then(function (response) {
            // console.log(response);
            orderData = response.data.orders;
            console.log(orderData);
            console.log('已成功取得訂單資料完成續染');
            renderOrder(orderData);
            renderChart(dataType);
        })
        .catch(function (error) {
            console.log(error);
        })
}

// chartChangeBtn 監聽 -> 點擊不同類型的圓餅圖資料
chartChangeBtn.addEventListener('click', function (e) {
    const sectionTitle = document.querySelector('.section-title');
    if (e.target.getAttribute('data-type') === 'category') {
        e.preventDefault();
        chartChangeBtn.setAttribute('data-type', 'title');
        chartChangeBtn.setAttribute('value', '全產品類別營收比重');
        sectionTitle.textContent = "全品項營收比重";
        // 重新賦值 dataType
        dataType = 'title';
    } else if (e.target.getAttribute('data-type') === 'title') {
        e.preventDefault();
        chartChangeBtn.setAttribute('data-type', 'category');
        chartChangeBtn.setAttribute('value', '全品項營收比重');
        sectionTitle.textContent = "全產品類別營收比重";
        // 重新賦值 dataType
        dataType = 'category';
    }
    renderChart(dataType);
})

initOrderPage();

// 刪除訂單
// deleteOrder(id) -> 刪除單筆訂單
function deleteOrder(id) {
    let adminDeleteUrl = `${adminOrderUrl}/${id}`;
    axios.delete(adminDeleteUrl, {
        headers: {
            'Authorization': '8hHEOPMhYBSV8evxiZV7y9boM1e2',
        }
    })
        .then(function (response) {
            console.log(response);
            initOrderPage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

// deleteOrderAll() -> 刪除整筆訂單
function deleteOrderAll() {
    axios.delete(adminOrderUrl, {
        headers: {
            'Authorization': '8hHEOPMhYBSV8evxiZV7y9boM1e2',
        }
    })
        .then(function (response) {
            console.log(response);
            initOrderPage();
        })
        .catch(function (error) {
            console.log(error);
        })
}

// 刪除按鈕監聽 -> 刪除整筆訂單
orderPageList.addEventListener('click', function (e) {
    if (e.target.getAttribute('class') !== 'discardAllBtn') {
        return;
    } else if (e.target.getAttribute('class') === 'discardAllBtn') {
        e.preventDefault();
        deleteOrderAll();
        console.log('已成功刪除整筆訂單！');
    }
})

// 刪除按鈕監聽 -> 刪除單筆訂單
orderPageList.addEventListener('click', function (e) {
    if (e.target.getAttribute('class') !== 'delSingleOrder-Btn') {
        return;
    } else if (e.target.getAttribute('class') === 'delSingleOrder-Btn') {
        e.preventDefault();
        let orderId = e.target.getAttribute('id');
        deleteOrder(orderId);
        console.log('已成功刪除該筆訂單！');
    }
})

