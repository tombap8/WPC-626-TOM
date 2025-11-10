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
   // (2) 로컬스토리지에 배열값이 없으면 새로만들고
   // 있으면 기존값에 데이터를 추가한다!
   let nowLocal = localStorage.getItem('my-board');
   console.log('지금로컬쓰있나?',nowLocal);

   // 로컬스토리지에 저장하는 배열
   let myArr;

   // 만약 로컬쓰가 없으면 null값이 나옴!
   // 따라서 if문에서 false처리됨!
   if(nowLocal){ // 값이 있을경우임!
    // 문자 형식의 로컬스토리지를 배열로 바꾸기
    // 문자형식의 배열을 다시 원래 배열객체로 변경하는 방법은?
    // -> JSON.parse(문자형배열)
    myArr = JSON.parse(nowLocal);
    console.log(myArr);
   } //// if /////
   else {
    // 로컬스토리지에 배열값이 없음!
    // 기본배열 객체 새로만들기 - 기본값 하나를 넣어 놓는다!
    myArr = [
        {
            idx : 1,
            tit : "내가 왕이 될 상인가?",
            cont : "아니라고하면 넌 어떻게 될까?"
        }
    ];
   } ///// else /////


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

   // (5) 화면출력!
   showBoard(myArr);

}); //////////// click 이벤트함수 //////////

// 출력할 박스는?
const boardBox = document.querySelector(".board");

// 만약 로컬쓰가 있다면 화면출력하기!
// 화면출력 함수 ///////////////
const showBoard = (myFriend) => {
    // myFriend : 배열 객체 데이터
    boardBox.innerHTML = `
    <table>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
        </tr>
        <!-- 데이터에 따른 반복바인딩 -->
        ${myFriend
          .map(
            (v, i) => `
            <tr>
                <td>${v.idx}</td>
                <td>${v.tit}</td>
                <td>${v.cont}</td>
            </tr>
        `
          )
          .join("")}
    </table>
    `;
}; //////////// showBoard //////////////

// 만약 로컬쓰가 있으면 게시판 출력하기! 최초호출!
const checkLocals = localStorage.getItem("my-board");
if (checkLocals) {
  showBoard(JSON.parse(checkLocals));
} ///// if ///////////////
// 만약 로컬쓰가 없으면 없음표시 게시판출력
else {
  boardBox.innerHTML = `
    <table>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
        </tr>
        <tr>
            <td colspan="3">데이터가 없습니다</td>
        </tr>
    </table>
    `;
}