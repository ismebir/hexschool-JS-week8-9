import"./style-f9251cf3.js";const A="https://livejs-api.hexschool.io",v="yal56";let u=`${A}/api/livejs/v1/admin/${v}/orders`,s=[];const E=document.querySelector(".orderPage-table"),p=document.querySelector(".orderPage-list"),i=document.querySelector(".chartChange-Btn");let d=i.getAttribute("data-type");function D(t){let n="",l="";t.forEach(function(o){let f=o.products,a="";f.forEach(function(e){a+=`${e.title}<br>`}),l+=`
        <tbody>
          <tr>
            <td>${o.createdAt}</td>
            <td>
              <p>${o.user.name}</p>
              <p>${o.user.tel}</p>
            </td>
            <td>${o.user.address}</td>
            <td>${o.user.email}</td>
            <td>
              <p>${a}</p>
            </td>
            <td>2021/03/08</td>
            <td class="orderStatus">
              <a href="#">未處理</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn" value="刪除" id=${o.id}>
            </td>
          </tr>
        </tbody>`}),n=`
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
  ${l}`,E.innerHTML=n}function b(t){let n=[];s.forEach(function(e){n.push(e.products)}),console.log(n);let l={},o=[];if(n.forEach(function(e){e.forEach(function(r){l[r[t]]===void 0?l[r[t]]=1:l[r[t]]!==0&&(l[r[t]]+=1)})}),Object.keys(l).forEach(function(e,r){let c=[];c[0]=e,c[1]=l[e],o[r]=c}),o.sort((e,r)=>r[1]-e[1]),o.length>3){let e=o.slice(0,3),r=o.slice(3),c=0;r.forEach(function(y){c+=y[1]});let g=[];g=["其他",c],e.push(g),o=e}let a={};for(let e=0;e<o.length;e++)e===0?a[o[e][0]]="#DACBFF":e===1?a[o[e][0]]="#9D7FEA":e===2?a[o[e][0]]="#5434A7":e===3&&(a[o[e][0]]="#301E5F");c3.generate({data:{bindto:"#chart",columns:o,type:"pie",empty:{label:{text:"No Data"}},order:"asc",colors:a,onclick:function(e,r){console.log("onclick",e,r)},onmouseover:function(e,r){console.log("onmouseover",e,r)},onmouseout:function(e,r){console.log("onmouseout",e,r)}}})}function h(){axios.get(u,{headers:{Authorization:"8hHEOPMhYBSV8evxiZV7y9boM1e2"}}).then(function(t){s=t.data.orders,console.log(s),console.log("已成功取得訂單資料完成續染"),D(s),b(d)}).catch(function(t){console.log(t)})}i.addEventListener("click",function(t){const n=document.querySelector(".section-title");t.target.getAttribute("data-type")==="category"?(t.preventDefault(),i.setAttribute("data-type","title"),i.setAttribute("value","全產品類別營收比重"),n.textContent="全品項營收比重",d="title"):t.target.getAttribute("data-type")==="title"&&(t.preventDefault(),i.setAttribute("data-type","category"),i.setAttribute("value","全品項營收比重"),n.textContent="全產品類別營收比重",d="category"),b(d)});h();function S(t){let n=`${u}/${t}`;axios.delete(n,{headers:{Authorization:"8hHEOPMhYBSV8evxiZV7y9boM1e2"}}).then(function(l){console.log(l),h()}).catch(function(l){console.log(l)})}function $(){axios.delete(u,{headers:{Authorization:"8hHEOPMhYBSV8evxiZV7y9boM1e2"}}).then(function(t){console.log(t),h()}).catch(function(t){console.log(t)})}p.addEventListener("click",function(t){t.target.getAttribute("class")==="discardAllBtn"&&t.target.getAttribute("class")==="discardAllBtn"&&(t.preventDefault(),$(),console.log("已成功刪除整筆訂單！"))});p.addEventListener("click",function(t){if(t.target.getAttribute("class")==="delSingleOrder-Btn"&&t.target.getAttribute("class")==="delSingleOrder-Btn"){t.preventDefault();let n=t.target.getAttribute("id");S(n),console.log("已成功刪除該筆訂單！")}});
