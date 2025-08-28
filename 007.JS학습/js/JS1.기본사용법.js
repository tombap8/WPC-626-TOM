// JS1.기본사용법 외부 JS파일 ///////

// 이 파일이 불러와졌는지 확인하기
console.log("나,외부JS야!");

// 돌아랏 함수 //////////////
function 돌아랏(순번, 배경색) {
  // 순번 - 순서번호받는 전달변수
  // 배경색 - 변경할 배경색값을 받는 전달변수
  // -> 함수호출시 이 순서대로 값을 보내주면 된다!

  // 1. 함수호출확인! //////
  console.log("돌아랏!함수닷!", 순번);

  // 2. 변경대상선정 : 클릭된 .원이야 요소
  var 도는놈 = document.getElementsByClassName("원이야").item(순번);

  console.log("대상은?", 도는놈);

  // 3. 클래스 넣기
  // JS의 클래스 제어 객체 : classList
  // 하위 메서드 중 클래스 넣기기능 : add(클래스명)
  도는놈.classList.add("돌아");

  // 4. 전체 배경색 변경하기
  // -> 전달변수로 배경색을 받아서 body에 넣음!
  document.body.style.backgroundColor = 배경색;
} //////////// 돌아랏 함수 ////////////

/******************************************** 
    함수명 : 멈춰랏
    기능 : '돌아'클래스 지우기
    사용메서드 : classList.remove(클래스명)
********************************************/
function 멈춰랏(나야나) {
  // 나야나 - this로 보낸요소받기

  // 1. 함수호출확인 및 전달변수확인
  console.log("당장멈춰!!!", 나야나);

  // 2. 변경대상은 this로 보낸요소를 받은 나야나!
  // 3. 클래스 제거하기 : classList.remove(클래스명)
  나야나.classList.remove("돌아");
} ///////////// 멈춰랏 함수 //////////////////
/////////////////////////////////////////////

/************************************************* 
    함수명 : 움직여랏
    기능 : 위치값 이동 및 트랜지션, 동영상태그넣기
    사용태그 : iframe - 동영상불러오는 태그
*************************************************/
function 움직여랏(나야나) {
  // 나야나 - 이벤트발생요소 전달변수

  // 1. 함수호출확인 및 전달변수값 확인! /////
  console.log("당장움직여!!!!", 나야나);

  // 2. CSS 속성값 변경하기 ////////////////
  나야나.style.right = "calc(100% - 200px)";
  나야나.style.top = "calc(100% - 200px)";
  나야나.style.transition = "right 2s,top 1s 2s";

  // 3. 내부에 html넣기 : 동영상 iframe /////////////
  나야나.innerHTML = `<iframe
        src='https://www.youtube.com/embed/MBdVXkSdhwU?autoplay=1&mute=1'  allow='autoplay'></iframe>`;

  // 4. 내부의 아이프레임 CSS넣기 ///////////
  // getElementsByTagName(태그명)
  // 가져와! get 요소들을! Elements 태그이름으로! By Tag Name
  // -> 태그요소도 여러개 사용하므로 순번선택필수! item(순번)
  나야나.getElementsByTagName("iframe").item(0).style.cssText = `
          position: absolute;
          border: none;
          width: 200px;
          height: 200px;
          border-radius: 50%;
        `;
} ///////////// 움직여랏 함수 //////////////////////
///////////////////////////////////////////////////
