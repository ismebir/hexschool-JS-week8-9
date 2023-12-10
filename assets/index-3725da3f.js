import"./style-f9251cf3.js";const d="https://livejs-api.hexschool.io",l="yal56";let v=`${d}/api/livejs/v1/customer/${l}/products`,s=`${d}/api/livejs/v1/customer/${l}/carts`,y=`${d}/api/livejs/v1/customer/${l}/orders`,S=`${d}/api/livejs/v1/admin/${l}/orders`,n=[],u={data:{}},c=[],r={data:{user:{}}},i=[],A=[];const p=document.querySelector(".productWrap");document.querySelectorAll(".productCard");const q=document.querySelector(".productSelect");document.querySelector(".addCardBtn");document.querySelector(".discardAllBtn");document.querySelector(".discardBtn>a");const f=document.querySelector(".shoppingCart-table"),b=document.querySelector("#customerName"),C=document.querySelector("#customerPhone"),E=document.querySelector("#customerEmail"),B=document.querySelector("#customerAddress"),T=document.querySelector("#tradeWay"),D=document.querySelector(".orderInfo-btn"),x=document.querySelector(".orderInfo-form");function m(t){let e="";t.forEach(function(o){e+=`<li class="productCard" data-category="${o.category}"}>
        <h4 class="productType">新品</h4>
        <img src="${o.images}" alt="">
        <a href="#" class="addCardBtn" data-id="${o.id}">加入購物車</a>
        <h3>${o.title}</h3>
        <del class="originPrice">NT$${o.origin_price}</del>
        <p class="nowPrice">NT$${o.price}</p>
        </li>`}),p.innerHTML=e}function P(){axios.get(v).then(function(t){console.log(t),n=t.data.products,m(n)}).catch(function(t){console.log(t)})}P();q.addEventListener("change",function(t){let e=[];t.target.value==="全部"&&(e=n),n.forEach(function(o){t.target.value===o.category&&e.push(o)}),m(e)});p.addEventListener("click",function(t){let e={};if(t.target.getAttribute("class")==="addCardBtn"&&t.target.getAttribute("class")==="addCardBtn"){t.preventDefault(),u.data.productId=t.target.getAttribute("data-id");let o=t.target.getAttribute("data-id");e[o]===void 0?e[o]=1:e[o]++,u.data.quantity=e[o],I()}});function I(){axios.post(s,u).then(function(t){console.log(t),h()}).catch(function(t){console.log(t)})}function h(){axios.get(s).then(function(t){console.log(t),c=t.data.carts,c.forEach(function(e){e.total=t.data.total,e.finalTotal=t.data.finalTotal}),console.log(c),$(c)}).catch(function(t){console.log(t)})}function $(t){let e="",o="",g="";t.forEach(function(a,O){o+=`
    <tr>
      <td>
        <div class="cardItem-title">
          <img src=${a.product.images} alt="">
          <p>${a.product.title}</p>
        </div>
      </td>
      <td>NT$12,000</td>
      <td>${a.quantity}</td>
      <td>NT$${a.product.price}</td>
      <td class="discardBtn">
          <a href="#" class="material-icons" id=${a.id}>
        clear
          </a>
      </td>
    </tr>`,g=`
    <tr>
      <td>
         <a href="#" class="discardAllBtn">刪除所有品項</a>
      </td>
      <td></td>
      <td></td>
      <td>
         <p>總金額</p>
      </td>
      <td>NT$${a.finalTotal}</td>
    </tr>`}),e=`
    <tr>
      <th width="40%">品項</th>
      <th width="15%">單價</th>
      <th width="15%">數量</th>
      <th width="15%">金額</th>
      <th width="15%"></th>
    </tr>
    ${o}
    ${g}`,f.innerHTML=e}function L(t){let e=`${s}/${t}`;axios.delete(e).then(function(o){h()}).catch(function(o){console.log(o)})}function N(){axios.delete(s).then(function(t){console.log(t),h()}).catch(function(t){console.log(t)})}f.addEventListener("click",function(t){let e="";if(t.target.hasAttribute("id"))t.target.hasAttribute("id")&&(t.preventDefault(),e=t.target.getAttribute("id"),console.log(e),console.log("點擊單筆刪除按鈕"),L(e));else return});f.addEventListener("click",function(t){t.target.getAttribute("class")==="discardAllBtn"&&t.target.getAttribute("class")==="discardAllBtn"&&(t.preventDefault(),console.log("點擊整筆刪除按鈕"),N())});function j(){axios.post(y,r).then(function(t){x.reset(),$([]),console.log("已成功上傳訂單資料")}).catch(function(t){console.log(t)})}function w(){axios.get(S,{headers:{Authorization:"8hHEOPMhYBSV8evxiZV7y9boM1e2"}}).then(function(t){i=t.data.orders,console.log(i),console.log("已成功取得訂單資料"),i.forEach(function(e){A.push(e.products)})}).catch(function(t){console.log(t)})}D.addEventListener("click",function(t){t.preventDefault(),r.data.user.name=b.value,r.data.user.tel=C.value,r.data.user.email=E.value,r.data.user.address=B.value,r.data.user.payment=T.value,console.log(r),j(),w()});
