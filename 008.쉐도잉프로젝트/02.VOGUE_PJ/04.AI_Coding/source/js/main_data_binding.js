// 보그 메인 페이지 데이터 바인딩 JS - main_data_binding.js

// 제이슨 가져오기
// (1) 배너정보 제이슨
import bannerData from "../data/banner_data.json" with { type: "json" };

// (2) 보그사이트정보 제이슨
import siteData from "../data/vogue_korea_data.json" with { type: "json" };

console.log("제이슨확인:", siteData);

// [1] 배너파트 데이터 바인딩하기 //////////
// 대상: .hero-slider .swiper-wrapper
document.querySelector(".hero-slider .swiper-wrapper").innerHTML = bannerData
  .map(
    (v) =>
      `
    <div class="swiper-slide">
        <img
        class="hero-image"
        src="./images/main_banner/banner_0${v.idx}.jpg"
        alt="Hero"
        />
        <div class="hero-text">
        <p>${v.category} | ${v.date}</p>
        <h1>${v.title}</h1>
        </div>
    </div>
`
  )
  .join("");
