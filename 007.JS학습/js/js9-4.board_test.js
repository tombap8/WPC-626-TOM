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
// (4) 히든필드 : 수정할 데이터의 배열순번값
const hiddenSeq = document.querySelector("#hidden-seq");
// (5) 취소버튼
const cancelBtn = document.querySelector("#cancel-btn");

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
  // console.log("지금로컬쓰있나?", nowLocal);

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

  // (5) 첫페이지로 변경
  currentPage = 1;
  currentPaginationBlock = 1;

  // (6) 화면출력!
  showBoard(myArr);

  // (7) 초기화!
  tit.value = "";
  cont.value = "";
}); //////////// click 이벤트함수 //////////

// 출력할 박스는?
const boardBox = document.querySelector(".board");

// 입력/수정버튼 변경할 부모버튼박스
const btnBox = document.querySelector(".btn-box");

/******************************************* 
 [ 게시판에 페이징 기능 적용하기 ]
  - 페이징이란?
  여러 페이지에 걸쳐서 데이터를 나누어 보여주는 
  기능을 말한다.
  예를 들어, 게시판에 100개의 글이 있을 때, 
  한 페이지에 10개씩 보여주면
  총 10페이지가 필요하게 된다. 
  사용자는 페이지를 넘기면서
  모든 글을 볼 수 있게 된다.

  [ 페이징 처리 로직 구현하기 ]
   (1) 전체 페이지 수 계산하기
   -> Math.ceil(총데이터수 / 페이지당표시수)

   (2) 현재 페이지에 맞는 데이터만 추출하기
   -> myFriend.slice(시작인덱스, 끝인덱스) 
   -> 시작 인덱스 부터 끝인덱스 전까지 선택

   (3) 페이지네이션 UI 구성하기
   - 전체 페이지 수에 맞게 페이지 번호 버튼 생성
   - 현재 페이지에 맞는 버튼 강조 표시

   (4) 페이지네이션의 페이징 구현하기
   - 페이지네이션을 일정 개수만큼만 보이게함
   - 양쪽에 페이지네이션 이동 버튼을 생성하여
   페이지네이션 내에서 페이지네이션 블록을 이동함
   - 이때 필요한 것은 페이지네이션의 한계수와
   전체 페이지네이션 블록수와 현재블록번호가 필요함!

*******************************************/

// [ 페이징 관련 변수 셋팅하기 ] /////
// (1) 페이지당 표시할 데이터 수
const itemsPerPage = 3;

// (2) 현재 페이지 번호
let currentPage = 1;
// -> 전역변수로 페이징 번호 업데이트하여 리스트변경에 관여함!

// (3) 전체 페이지 수
let totalPages = 0;

// (4) 페이지네이션 한계수
const paginationLimit = 3;

// (5) 전체 페이지네이션 블록수
let totalPaginationBlocks = 0;

// (6) 현재 페이지네이션 블록 번호
let currentPaginationBlock = 1;

//////////////////////////////////////

// 만약 로컬쓰가 있다면 화면출력하기!
// 화면출력 함수 ///////////////
const showBoard = (myFriend) => {
  // myFriend : 배열 객체 데이터

  // (0) 배열값은 기본적으로 내림차순(최신글순)으로 출력
  myFriend.sort((a, b) => b.idx - a.idx);

  // (0.5) 페이징 처리 부분 ///////////////////
  // (0.5-1)전체 페이지 수 계산하기
  totalPages = Math.ceil(myFriend.length / itemsPerPage);
  console.log("전체 페이지 수:", totalPages);

  // (0.5-2)현재 페이지에 맞는 데이터만 추출하기 //////////////
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // startIndex - 시작인덱스, endIndex - 끝인덱스
  // currentPage - 현재페이지, itemsPerPage - 페이지당표시수
  const pagedData = myFriend.slice(startIndex, endIndex);
  // pagedData - 현재페이지 데이터
  // 1페이지: 0~2, 2페이지: 3~5, 3페이지: 6~8 ...
  // -> 주의! slice는 끝인덱스 전까지 추출함!
  console.log("현재 페이지 데이터:", pagedData);

  // (0.5-3) 전체 페이지네이션 블록수 계산하기 /////////////
  totalPaginationBlocks = Math.ceil(totalPages / paginationLimit);
  console.log("전체 페이지네이션 블록수:", totalPaginationBlocks);
  //////////////////////////////////////////////////////////

  // (1) 테이블 형식으로 출력하기
  boardBox.innerHTML = `
    <table>
      <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>삭제</th>
            <th>수정</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터에 따른 반복바인딩 -->
        ${
          myFriend.length === 0
            ? `
            <tr>
                <td colspan="5">데이터가 없습니다</td>
            </tr>
            `
            : pagedData
                .map(
                  (v, i) => `
            <tr>
                <td>${(i + 1)+((currentPage-1)*itemsPerPage)}</td>
                <td>${v.tit}</td>
                <td>${v.cont}</td>
                <td>
                    <button 
                      class="del-btn" 
                      data-idx="${v.idx}"
                    >×</button>
                </td>
                <td>
                    <button 
                      class="mod-btn" 
                      data-idx="${v.idx}"
                      style="background-color: silver;"
                    >✎</button>
                </td>
            </tr>
        `
                )
                .join("")
        }
        </tbody>
        <!-- 페이지네이션이 있는 테이블 하단영역 -->
        <tfoot>
          <tr>
            <td colspan="5">
              <!-- 페이지네이션 이전블록이동버튼 -->
              <button 
                class="page-block-btn" 
                data-page-block="${Number(currentPaginationBlock) - 1}" 
                ${
                  Number(currentPaginationBlock) === 1 ? 
                  "disabled" : ""
                }>◀</button>

              <!-- 페이지 번호 버튼 -->
              ${
                // Array.from()메서드로 숫자생성하기
                // 1부터 totalPages까지의 숫자 생성
                // 사용형식: v - 배열값, i - 배열순번
                // Array.from({length:숫자}, (v, i) => { return ... })
                // 페이지네이션 블록만큼만 보이게 하기 //////
                // 마지막 블록일 때는 남은 페이지 수만큼만 생성하기
                (() => {
                  // 현재 블록의 시작 페이지 번호
                  const blockStartPage = (currentPaginationBlock - 1) * paginationLimit + 1;
                  // 현재 블록의 끝 페이지 번호 (전체 페이지 수를 넘지 않도록)
                  const blockEndPage = Math.min(blockStartPage + paginationLimit - 1, totalPages);
                  // 현재 블록에 표시할 페이지 버튼 개수
                  const buttonsToShow = blockEndPage - blockStartPage + 1;
                  
                  return Array.from(
                    { length: buttonsToShow },
                    (_, i) => {
                      const pageNum = blockStartPage + i;
                      return `
                        <button 
                          class="page-btn" 
                          data-page="${pageNum}"
                          style="background-color: ${pageNum == currentPage ? "aqua" : "silver"};"
                        >
                          ${pageNum}
                        </button>
                      `;
                    }
                  ).join("");
                })()
              }
              <!-- 페이지네이션 다음블록이동버튼 -->
              <button 
                class="page-block-btn" 
                data-page-block="${Number(currentPaginationBlock) + 1}" 
                ${
                  Number(currentPaginationBlock) === totalPaginationBlocks ? "disabled" : ""
                }>▶</button>
            </td>
          </tr>
        </tfoot>
    </table>
    `;

  // (2) 삭제버튼 기능구현
  document.querySelectorAll(".del-btn").forEach((el) => {
    // 버튼 클릭 설정하기
    el.addEventListener("click", () => {
      console.log("삭제항목:", el.getAttribute("data-idx"), el.dataset.idx);

      // (2-1) 삭제할 항목의 idx값을 이용하여
      // 원본 배열에서 해당 항목의 인덱스(순번)를 찾는다!
      const delIdx = myFriend.findIndex(
        (item) => item.idx === parseInt(el.dataset.idx)
      );
      // findIndex() 메서드는 조건에 맞는 첫번째 요소의 인덱스를 반환한다!
      // 조건에 맞는 요소가 없으면 -1을 반환한다!
      console.log("삭제할 항목의 배열순번:", delIdx);

      // (2-2) 순번으로 배열값 삭제하기 //////
      // 현재 배열 데이터 값을 변경하여
      // 다시 반영하도록 showBoard()함수를 호출한다!
      // data-idx로 배열순번을 구한 delIdx로
      // splice()를 사용하여 삭제한다!
      // 배열.splice(지울순번,개수)를 사용할 수 있다!
      if (confirm("정말 삭제할까요?")) {
        // [1] 배열 원본에서 삭제하기
        myFriend.splice(delIdx, 1);
        // [2] 게시판 첫페이지로 변경하기
        currentPage = 1;
        currentPaginationBlock = 1;
        // [3] 게시판 다시 출력하기
        showBoard(myFriend);
        // [4] 실제 로컬스에 반영하기
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

  // (3) 수정버튼 기능구현 ///////////////
  document.querySelectorAll(".mod-btn").forEach((el, idx, coll) => {
    // el - 각각의 수정버튼, idx - 순번, coll - 전체버튼컬렉션
    // 버튼 클릭 설정하기
    el.addEventListener("click", () => {
      // [1] 클릭된 버튼 배경색 읽어오기
      let bgc = el.style.backgroundColor;

      // [2] 모든 수정버튼 배경색 초기화
      coll.forEach((btn) => (btn.style.backgroundColor = "silver"));

      // [3] 클릭된 버튼 표시색 변경하기 (silver <-> aqua)
      el.style.backgroundColor = bgc === "silver" ? "aqua" : "silver";

      // [4] 수정 반영버튼 보이기/숨기기
      bgc === "silver"
        ? btnBox.classList.add("on")
        : btnBox.classList.remove("on");

      // [5] 수정할 데이터의 원본에서의 순번 구하기
      const modIdx = myFriend.findIndex(
        (item) => item.idx === parseInt(el.dataset.idx)
      );
      console.log("수정할 항목의 배열순번:", modIdx);

      // [6] 수정할 데이터 입력창에 넣기
      tit.value = bgc === "silver" ? myFriend[modIdx].tit : "";
      cont.value = bgc === "silver" ? myFriend[modIdx].cont : "";

      // [7] 히든필드에 수정할 데이터의 배열순번값 넣기
      hiddenSeq.value = bgc === "silver" ? modIdx : "";

      console.log("수정항목:", modIdx, bgc);
    }); /////// click ///////
  }); ////////// forEach /////////////

  // (4) 페이지네이션 버튼 기능구현 ///////////////
  document.querySelectorAll(".page-btn").forEach((el) => {
    el.addEventListener("click", () => {
      console.log("페이지 이동:", el.dataset.page);
      // 페이지 이동 시 필요한 로직 추가
      // 예: 현재 페이지 번호를 업데이트하고 게시판을 다시 출력
      currentPage = el.dataset.page;
      showBoard(myFriend);
      // 취소버튼을 클릭이벤트 발생하여 초기화
      cancelBtn.click();
    }); /// click ///
  }); /// forEach ///

  // (5) 페이지네이션 블록 버튼 기능구현 /////
  document.querySelectorAll(".page-block-btn").forEach((el) => {
    el.addEventListener("click", () => {
      console.log("페이지 블록 이동:", el.dataset.pageBlock);
      // 페이지 블록 이동 시 필요한 로직 추가
      // 예: 현재 페이지 블록 번호를 업데이트하고 게시판을 다시 출력
      currentPaginationBlock = el.dataset.pageBlock;
      showBoard(myFriend);
      // 취소버튼을 클릭이벤트 발생하여 초기화
      cancelBtn.click();
      // 블록 이동후 그 블록의 첫페이지로 이동하기
      currentPage = (currentPaginationBlock - 1) * paginationLimit + 1;
      showBoard(myFriend);
    }); /// click ///
  }); /// forEach ///

}; //////////// showBoard //////////////

// [ 수정 / 취소 버튼 기능구현 ] /////////
// 대상 : 수정버튼 - .modify-btn
// 기능 : 수정할 데이터 항목을 선택하여 로컬스에 넣기
document.querySelector("#update-btn").addEventListener("click", () => {
  // [1] 로컬스의 데이터를 읽어온후 파싱하기
  let currData = JSON.parse(localStorage.getItem("my-board"));

  // [2] 제목, 내용 항목 빈값 유효성 검사실시
  if (!tit.value.trim()) {
    alert("제목을 입력하세요");
    tit.focus();
    return;
  }
  if (!cont.value.trim()) {
    alert("내용을 입력하세요");
    cont.focus();
    return;
  }

  // [3] 수정할 데이터 항목 찾기
  let targetData = currData[hiddenSeq.value];
  if (!targetData) {
    alert("수정할 데이터가 없습니다");
    return;
  }

  // [4] 수정할 데이터 항목 업데이트
  targetData.tit = tit.value;
  targetData.cont = cont.value;

  // [5] 로컬스에 수정된 데이터 반영하기
  localStorage.setItem("my-board", JSON.stringify(currData));

  // [6] 게시판 다시 출력하기
  showBoard(currData);

  // [7] 취소버튼을 클릭이벤트 발생하여 초기화
  cancelBtn.click();
}); ////////////// update /////////

// 대상 : 취소버튼 - .cancel-btn
// 기능 : 수정모드 취소 및 입력창 초기화
cancelBtn.addEventListener("click", () => {
  // [1] 수정모드 취소 및 입력창 초기화
  btnBox.classList.remove("on");
  tit.value = "";
  cont.value = "";
  // [2] 리스트의 수정버튼 배경색 모두 초기화
  document.querySelectorAll(".mod-btn").forEach((btn) => {
    btn.style.backgroundColor = "silver";
  });

  // [3] 히든필드 초기화
  hiddenSeq.value = "";
}); ///////// cancel /////////

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
            <th>수정</th>
        </tr>
        <tr>
            <td colspan="5">데이터가 없습니다</td>
        </tr>
    </table>
    `;
}
