// 자동 스크롤 JS - auto_scroll.js /////////

// 1. 사용할 이벤트 : wheel
// -> scroll 이벤트는 스크롤바기 움직일때 발생
// -> wheel 이벤트는 마우스 휠이 움직일때 발생

// 2. 이벤트 대상 : window

// 3. body에 overflow:hidden 셋팅
document.body.style.overflow = 'hidden';

// 4. html에 scroll-behavior:smooth 셋팅
document.documentElement.style.scrollBehavior = 'smooth';
// -> html 최상위 요소는 document.documentElement 로 선택함!

// 5. 새로고침시 스크롤위치 맨위로 이동하기
setTimeout(()=>{window.scrollTo(0,0);},400);

// 6. 전역 페이지번호
let pgNo = 0;

// 7. 이동단위 -> 윈도우 높이값
let winH = window.innerHeight;

// 8. 전체 .page인 페이지개수 구하기 - 페이지 증가 한계값으로 사용
const page = document.querySelectorAll('.page');
const pageCnt = page.length;

console.log('페이지개수:',pageCnt);

// 9. 메뉴 및 인디케이터 요소 li수집
const gnb = document.querySelectorAll('.gnb li');
const indic = document.querySelectorAll('.indic li');

// 10. 휠 이벤트를 window에 적용하여 기본 휠작동 막기
// -> 그래야 우리가 원하는 자동 스크롤 기능을 구현할 수 있다
window.addEventListener('wheel',(e)=>{ // e - 이벤트 전달변수
    // (1) 기본 기능 막기
    e.preventDefault();
    // -> window / document / body 에서 기본기능막기를 할때
    // passive 모드값을 false로 설정해야 에러가 발생하지 않음

    // (1.5) 광휠막기
    if(blockWheel()) return;
    
    // (2) 휠 방향 알아내기
    // 이벤트객체.wheelDelta
    let dir = e.wheelDelta;
    // 아래쪽은 음수, 윗쪽은 양수    
    
    // (3) 방향에 따른 페이지번호 증감
    if(dir < 0){ //  아랫방향 음수
        pgNo++; // 페이지번호 증가
        if(pgNo >= pageCnt) pgNo = pageCnt - 1; // 한계값 고정
    } /// if ///
    else if(dir > 0){ // 윗방향 양수
        pgNo--; // 페이지번호 감소
        if(pgNo < 0) pgNo = 0; // 한계값 고정
    } /// else if ///
    
    console.log('휠~~~~!',pgNo);
    
    // (4) 전체 포지션이동
    window.scrollTo(0,pgNo * winH);

    // (5) 메뉴 클래스 on 넣기
    for(let x of gnb) x.classList.remove('on');
    gnb[pgNo].classList.add('on');
    for(let y of indic) y.classList.remove('on');
    indic[pgNo].classList.add('on');

},{passive:false}); //////////// wheel 이벤트 //////////////
// addEventListener(이벤트명,함수,{passive:false});

/******************************** 
////////// 광휠금지함수 //////////
********************************/
// [1] 광휠금지상태변수 ///////////
let stopWheel = false;
// 값이 true일때 휠릭허용/ false면 불허용

// [2] 광휠금지해제시간 상수셋팅 //////
const TIME_GAP = 400;

// [3] 광휠금지함수 //////////////////
function blockWheel() {
  // 1. 광휠이면 true 를 리턴함!
  if (stopWheel) return true;

  // 2. 휠가능상태이면 전역변수 셋팅
  stopWheel = true;
  setTimeout(() => {
    stopWheel = false;
  }, TIME_GAP);

  // 3. 상태값 리턴 (휠가능상태 false)
  return false;
} ////// blockWheel 함수 ///////