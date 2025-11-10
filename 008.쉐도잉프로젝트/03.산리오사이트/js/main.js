// 산리오 사이트 메인 JS - main.js

import myFn from "./my_function.js";

// 캐릭터 데이터 가져오기 ////
import catData from './cat_data.json' with{type:'json'};
// console.log(catData);

// GNB용 데이터 배열
const gnbData = ["company","character","place","recruit"];

// 1. GNB메뉴 데이터 바인딩하기 ////
myFn
  .qs(".gnb").innerHTML = `
    <ul>
      ${gnbData.map(v=>`
        <li>
          <a href="#">${v}</a>
        </li>
      `).join('')}
    </ul>
  `;