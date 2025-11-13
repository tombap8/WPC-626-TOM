// 보그 JS 매거진 상세페이지 JS - magazine_detail.js
// [ Post 방식으로 데이터 받기 ]
document.addEventListener("DOMContentLoaded", ()=>{
  // 1. FormData 객체 생성
  const formData = new FormData(document.forms[0]);
  // 2. .get("키") 메서드로 데이터 받기
  const productData = formData.get("product");
  console.log("상품데이터:", productData);
}); /////////////// 로딩구역 //////////////////
// [ Post 방식으로 데이터 받는 방법 ]
// 1) DOMContentLoaded 이벤트에서 실행
// 2) FormData 객체 생성
//    - new FormData(폼요소)
//    - document.forms[0] : 첫번째 폼요소 선택
// 3) .get("키") 메서드로 값 받기



// [ get방식으로 넘어온 상품 배열 순번 받기 ] ///
// const params = new URLSearchParams(location.search);
// const pid = params.get("pid");
// [  파라미터를 받는 방법 ]
// 1) location.search : ?pid=0 형태의 문자열 받기
// 2) URLSearchParams() 생성자함수에 전달하여 객체 생성
// 3) .get("파라미터명") 메서드로 값 받기 
// console.log('파라미터값:',pid);

const basePrice = 72000;

function updatePrice() {
  const qty = parseInt(document.getElementById("quantity").value);
  const total = basePrice * qty;
  const formatted = total.toLocaleString("ko-KR");

  document.getElementById("itemPrice").textContent = formatted;
  document.getElementById("totalPrice").textContent = formatted + "원";
  document.getElementById("finalPrice").textContent = formatted + "원";
}

function increaseQty() {
  const input = document.getElementById("quantity");
  const current = parseInt(input.value);
  if (current < 81) {
    input.value = current + 1;
    updatePrice();
  }
}

function decreaseQty() {
  const input = document.getElementById("quantity");
  const current = parseInt(input.value);
  if (current > 1) {
    input.value = current - 1;
    updatePrice();
  }
}
