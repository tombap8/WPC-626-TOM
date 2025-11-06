// 보그 코리아 Category 페이지 JS - category.js

// [1] 외부 데이터 가져오기 ////
// (1) LNB 메뉴 데이터 불러오기
import { gnbMenu } from "../data/gnb_data.js";

// (2) 컨텐츠 아티클 데이터 불러오기 ////
import articleData from "../data/vogue_articles.json" with { type: "json" };

// [2] 파라미터 키값 읽기 /////////
let pm = location.search.split("=")[1];
console.log('파라미터:', pm);

// [3] 데이터 매칭하기 //////////

// (1) LNB 메뉴 매칭하기 : 객체키명이 대문자임!
const lnbData = gnbMenu[pm.toUpperCase()];

// (2) 컨텐츠 아티클 매칭하기

// 제이슨확인 //
console.log("매칭데이터:", lnbData);
