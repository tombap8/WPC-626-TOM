// 로그인 세션 관리 함수
export default function loginSession() {
    // 1. 로그인 정보가 있는지 확인
    const loginfo = sessionStorage.getItem("loginfo");
    if (loginfo) {
        // 2. 로그인 정보가 있다면 파싱하여 사용
        const user = JSON.parse(loginfo);
        console.log("로그인 사용자 정보:", user);
    } //// if /////
    else {
        console.log("로그인 정보가 없습니다.");
    } //// else /////
}; ////////////// loginSession //////////////
