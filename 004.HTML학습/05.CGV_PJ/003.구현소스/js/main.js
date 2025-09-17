// CGV PJ 추가기능 JS - main.js

// 로딩확인
console.log("나야나 로딩!");

// 영화 유튜브 아이디 정보객체 //////
const 유튜브 = {
    "어쩔수가없다":"ckHwZNuV-wQ",
    "귀멸의 칼날: 무한성편":"zN8K_uE1LYg",
    "얼굴":"dM0quIEmrYA",
    "모노노케 히메":"nV-9eWqKT2k",
    "F1 더 무비":"6a_X77HO4Vk",
    "보스":"OKVsQ686GVw",
};

// 1. 대상 선정
// 1-1. 포스터 링크 이미지 a요소 -> 이벤트 대상
const 링크 = document.querySelectorAll('.poster-menu-box li a');
// 1-2. 영화상영 아이프레임 -> 변경대상
const 아이프레임 = document.querySelector('.screen iframe');

// 2. 이벤트 대상에 클릭이벤트 적용하기 ////
// forEach()메서드 내부함수에 첫번째 전달값으로
// 순회하는 요소나 값 하나하나가 순서대로 전달됨!
링크.forEach((요소)=>{
    요소.onclick = () => {

        // 3. 클릭된 a요소 자식중 h2요소의 글자읽기
        let 영화명 = 요소.querySelector('h2').innerText;
        console.log("클릭된 영화명:", 영화명);

        // 4. 아이프레임 소스 변경하기
        아이프레임.src = `https://www.youtube.com/embed/${유튜브[영화명]}?autoplay=1`;
    };
});


// 원래는 a요소에 직접 이벤트 속성에 코딩해서 테스트했었음!
/* 
    
    onclick="
    // ckHwZNuV-wQ
    document.querySelector('.screen iframe')
    .src = `https://www.youtube.com/embed/ckHwZNuV-wQ?autoplay=1`;
    "
    

    onclick="
    // ckHwZNuV-wQ
    document.querySelector('.screen iframe')
    .src = `https://www.youtube.com/embed/zN8K_uE1LYg?autoplay=1`;
    "
                

*/
