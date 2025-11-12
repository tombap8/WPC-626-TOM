// 게시판 연습 JS - js9-3.board_test.js
/************************************************ 
  [ 게시판 구현 순서정리 ]
   -> CRUD 기능 구현 순서
    C : Create  -> 데이터 입력 및 저장
    R : Read    -> 데이터 읽어오기 및 출력
    U : Update  -> 데이터 수정하기
    D : Delete  -> 데이터 삭제하기
  ________________________________________

  1. 입력폼 만들기 (HTML)
  2. 입력폼 요소 선택하기 (DOM)
  3. 입력버튼 클릭시 이벤트 설정하기 (EVENT)
  4. 입력값 유효성 검사하기 (JS)
  5. 로컬스토리지에 데이터 저장하기 (JS-LOCALSTORAGE)
  6. 로컬스토리지에 저장된 데이터 읽어오기 (JS-LOCALSTORAGE)
  7. 읽어온 데이터를 화면에 출력하기 (JS-DOM)
  8. 수정 및 삭제버튼 만들기 (HTML, JS-DOM)
  9. 수정 및 삭제버튼 기능구현하기 (JS-LOCALSTORAGE, JS-DOM, EVENT)
************************************************/

// [1] 대상 선정 /////////////////
// (1) 제목입력창
const tit = document.querySelector("#tit");
// (2) 내용입력창
const cont = document.querySelector("#cont");
// (3) 입력버튼
const sbtn = document.querySelector("#sbtn");

// [2] 이벤트 함수 만들기 /////////////////
sbtn.addEventListener("click", () => {
  // (1) 제목, 내용 빈값 체크
  if (tit.value.trim() == "" || cont.value.trim() == "") {
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
  let nowLocal = localStorage.getItem("my-board");
  console.log("지금로컬쓰있나?", nowLocal);

  // 로컬스토리지에 저장하는 배열
  let myArr;

  // 만약 로컬쓰가 없으면 null값이 나옴!
  // 따라서 if문에서 false처리됨!
  if (nowLocal) {
    // 값이 있을경우임!
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
        idx: 1,
        tit: "내가 왕이 될 상인가?",
        cont: "아니라고하면 넌 어떻게 될까?",
      },
    ];
  } ///// else /////

  // (3) 방금 입력된 값을 추가!
  myArr.push({
    idx: myArr.length > 0 ? Math.max(...myArr.map((v) => v.idx)) + 1 : 1,
    tit: tit.value,
    cont: cont.value,
  });
  // 배열의 idx값 중 최대값을 찾아 +1하여 idx값을 만들어준다!
  // 최대값은 Math.max()로 알아냄.
  // (...배열변수) -> 배열값만 읽어오기
  // myArr.map(v=>v.idx) -> 배열값중 idx값만으로 새배열생성!
  // 3항 연산자의 논리는?
  // myArr.length > 0 ? Math.max(...myArr.map(v=>v.idx)) + 1 : 1
  // -> myArr.length가 0보다 크면, myArr의 idx값 중 최대값을 찾아 +1한 값을 사용하고,
  //    그렇지 않으면 1을 사용하겠다는 의미이다.

  console.log(myArr);

  // (4) 로컬스토리지에 이 값을 저장하기
  // 주의사항: 반드시 로컬스토리지는 문자형 값만 받는다!
  // 배열이나 객체를 문자화 하는 방법은?
  // -> JSON.stringify(배열/객체)
  localStorage.setItem("my-board", JSON.stringify(myArr));

  // (5) 화면출력!
  showBoard(myArr);

  // (6) 초기화!
  tit.value = "";
  cont.value = "";
}); //////////// click 이벤트함수 //////////

// 출력할 박스는?
const boardBox = document.querySelector(".board");

// 만약 로컬쓰가 있다면 화면출력하기!
// 화면출력 함수 ///////////////
const showBoard = (myFriend) => {
  // myFriend : 배열 객체 데이터

  // (1) 테이블 형식으로 출력하기
  boardBox.innerHTML = `
    <table>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>삭제</th>
        </tr>
        <!-- 데이터에 따른 반복바인딩 -->
        ${
          myFriend.length === 0
            ? `
            <tr>
                <td colspan="4">데이터가 없습니다</td>
            </tr>
            `
            : myFriend
                .map(
                  (v, i) => `
            <tr>
                <td>${v.idx}</td>
                <td>${v.tit}</td>
                <td>${v.cont}</td>
                <td>
                    <button class="del-btn" data-seq="${i}">×</button>
                </td>
            </tr>
        `
                )
                .join("")
        }
    </table>
    `;

  // (2) 삭제버튼 기능구현
  document.querySelectorAll(".del-btn").forEach((el) => {
    // 버튼 클릭 설정하기
    el.addEventListener("click", () => {
      console.log("삭제항목:", el.getAttribute("data-seq"), el.dataset.seq);

      // 현재 배열 데이터 값을 변경하여
      // 다시 반영하도록 showBoard()함수를 호출한다!
      // data-seq는 배열순번을 가지고 있으므로
      // 배열.splice(지울순번,개수)를 사용할 수 있다!
      if (confirm("정말 삭제할까요?")) {
        myFriend.splice(el.dataset.seq, 1);
        showBoard(myFriend);
        // 실제 로컬스에 반영하기
        localStorage.setItem("my-board", JSON.stringify(myFriend));
      } //////// if /////////////
      // confirm() : 사용자가 확인을 누르면 true, 취소를 누르면 false를 반환한다.
    }); /////// click ///////
    // data-이름 -> 이런 형식으로 된 속성은
    // 데이터를 담기위한 속성이고 특별히 취급하여
    // dataset을 통해 접근할 수 있다!
    // data- 뒤에 있는 이름이 dataset.이름
    // 으로 호출할 수 있다!
    // 물론 getAttribute(속성명)으로 부를 수 있지만
    // 길어서 불편하다!
  }); ////////// forEach /////////////
}; //////////// showBoard //////////////

// 만약 로컬쓰가 있으면 게시판 출력하기! 최초호출!
const checkLocals = localStorage.getItem("my-board");
// 조건: checkLocals가 존재하고 비어있지 않을 경우
if (checkLocals && checkLocals !== "[]") {
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
            <th>삭제</th>
        </tr>
        <tr>
            <td colspan="4">데이터가 없습니다</td>
        </tr>
    </table>
    `;
}
