// 게시판 연습 JS - js9-3.board_test.js

// [1] 대상 선정 /////////////////
// (1) 제목입력창
const tit = document.querySelector("#tit");
// (2) 내용입력창
const cont = document.querySelector("#cont");
// (3) 입력버튼
const sbtn = document.querySelector("#sbtn");

// [2] 이벤트 함수 만들기 /////////////////
sbtn.addEventListener('click',()=>{
    // (1) 제목, 내용 빈값 체크
    if(tit.value.trim() == "" || cont.value.trim() == ""){
        alert("제목, 내용를 입력해줘!");
        return;
    } /// if ///

    // 빈값이 아니면 이값을 로컬스토리지에 객체로 저장!
    // 형식:
    /*  아래의 객체형식을 배열로 저장할 것임!
        {
            idx : 0,
            tit : "제목",
            cont : "내용"
        }
    */
   // (2) 기본배열 객체 - 기본값 하나를 넣어 놓는다!
   const myArr = [
       {
           idx : 1,
           tit : "내가 왕이 될 상인가?",
           cont : "아니라고하면 넌 어떻게 될까?"
       }
   ];

   // (3) 방금 입력된 값을 추가!
   myArr.push({
       idx : myArr.length + 1,
       tit : tit.value,
       cont : cont.value
   });

   console.log(myArr);

   // (4) 로컬스토리지에 이 값을 저장하기
   // 주의사항: 반드시 로컬스토리지는 문자형 값만 받는다!
   // 배열이나 객체를 문자화 하는 방법은?
   // -> JSON.stringify(배열/객체)
   localStorage.setItem('my-board', JSON.stringify(myArr));

}); //////////// click 이벤트함수 //////////