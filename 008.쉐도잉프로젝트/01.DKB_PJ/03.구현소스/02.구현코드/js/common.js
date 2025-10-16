// 도깨비 PJ 공통 JS - common.js /////////

// 같은 이름의 변수의 충돌을 막기위해 지역변수화를 해준다!
// 방법은 (()=>{나의코드})() 익명함수를 바로 실행하는 지역코드로 감싸준다!
// 나의코드는 지역화가 되고 익명함수는 바로 실행된다!
// -> (익명함수)() 이렇게 쓰면 익명함수가 바로 실행됨!

/// 지역화 코드 시작 //////////////
(()=>{
    // 1. 상단, 하단 공통 모듈 html넣기
    // (1) 대상 : #top-area, #bottom-area
    const $topArea = $("#top-area");
    const $bottomArea = $("#bottom-area");
    
    // (2) 대상에 load() 메서드로 html넣기
    $topArea.load("./inc/header.html");
    $bottomArea.load("./inc/footer.html");
    
})();
/// 지역화 코드 종료 //////////////
