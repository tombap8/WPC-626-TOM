// 자동 스크롤 JS - auto_scroll.js /////////

// 1. 사용할 이벤트 : wheel
// -> scroll 이벤트는 스크롤바기 움직일때 발생
// -> wheel 이벤트는 마우스 휠이 움직일때 발생

// 2. 이벤트 대상 : window

// 3. body에 overflow:hidden 셋팅
document.body.style.overflow = 'hidden';

// 4. html에 scroll-behavior:smooth 셋팅
document.documentElement.style.scrollBehavior = 'smooth';

// 5. 새로고침시 스크롤위치 맨위로 이동하기
setTimeout(()=>{window.scrollTo(0,0);},400);

// 6. 전역 페이지번호
let pgNo = 0;

// 7. 이동단위 -> 윈도우 높이값
let winH = window.innerHeight;

// 8. 휠 이벤트를 window에 적용하여 기본 휠작동 막기
// -> 그래야 우리가 원하는 자동 스크롤 기능을 구현할 수 있다
window.addEventListener('wheel',(e)=>{ // e - 이벤트 전달변수
    // 기본 기능 막기
    e.preventDefault();
    // -> window / document / body 에서 기본기능막기를 할때
    // passive 모드값을 false로 설정해야 에러가 발생하지 않음
    console.log('휠~~~~!');
},{passive:false}); //////////// wheel 이벤트 //////////////
// addEventListener(이벤트명,함수,{passive:false});