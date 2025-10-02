// 03.스크롤액션예비편 JS /////////////

// 테스트 목표는?
// 각 위치로 부터 스크롤되어 올라오는 비행기 박스의
// 보이는 화면 Top 위치로부터의 거리를 px로 화면출력하고
// 스크롤 이벤트와 함께 위치값을 구하는 코드를 연습한다!

// [ 위치값 화면에 찍기 구현코드 ] ////
// 대상 : .track aside
const bangi = document.querySelectorAll('.track aside');
console.log('뱅기:',bangi);


// [ 스크롤 이벤트 구현코드 ]
// 이벤트 대상: window
// 이벤트 종류: scroll 이벤트
window.addEventListener('scroll',()=>{

    console.log('스크롤중~~~!');

}); //////////// scroll 이벤트 //////////// 