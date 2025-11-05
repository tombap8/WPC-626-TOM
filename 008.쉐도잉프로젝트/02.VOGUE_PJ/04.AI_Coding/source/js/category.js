// 보그 코리아 Category 페이지 JS - category.js

$(document).ready(function() {
  console.log('Category 페이지 로드 완료');

  // ========== 탭 클릭 이벤트 ========== //
  $('.tab-btn').on('click', function() {
    const category = $(this).data('category');
    
    // 활성 탭 변경
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    
    // 카테고리에 따라 타이틀 변경
    updateCategoryTitle(category);
    
    // 컨텐츠 로드
    loadCategoryContent(category);
  });

  // ========== 페이지네이션 클릭 이벤트 ========== //
  $('.page-num').on('click', function() {
    if (!$(this).hasClass('active')) {
      $('.page-num').removeClass('active');
      $(this).addClass('active');
      
      // 페이지 번호에 따른 컨텐츠 로드
      const pageNum = $(this).text();
      console.log(`${pageNum} 페이지 로드`);
      
      // 페이지 상단으로 스크롤
      $('html, body').animate({
        scrollTop: $('.category-tabs').offset().top - 220
      }, 400);
    }
  });

  // 이전/다음 버튼
  $('.page-btn.prev').on('click', function() {
    const currentPage = $('.page-num.active');
    const prevPage = currentPage.prev('.page-num');
    if (prevPage.length) {
      currentPage.removeClass('active');
      prevPage.addClass('active');
      updatePaginationButtons();
    }
  });

  $('.page-btn.next').on('click', function() {
    const currentPage = $('.page-num.active');
    const nextPage = currentPage.next('.page-num');
    if (nextPage.length) {
      currentPage.removeClass('active');
      nextPage.addClass('active');
      updatePaginationButtons();
    }
  });

  // ========== 함수: 카테고리 타이틀 업데이트 ========== //
  function updateCategoryTitle(category) {
    const titles = {
      'all': {
        title: 'ALL STORIES',
        description: '보그 코리아의 모든 스토리를 만나보세요'
      },
      'fashion': {
        title: 'FASHION',
        description: '최신 패션 트렌드와 스타일을 만나보세요'
      },
      'beauty': {
        title: 'BEAUTY',
        description: '뷰티 트렌드와 스킨케어 정보를 확인하세요'
      },
      'living': {
        title: 'LIVING',
        description: '라이프스타일과 인테리어 아이디어를 찾아보세요'
      },
      'culture': {
        title: 'CULTURE',
        description: '예술과 문화의 다양한 이야기를 경험하세요'
      }
    };

    const categoryData = titles[category] || titles['all'];
    $('.category-title').text(categoryData.title);
    $('.category-description').text(categoryData.description);
  }

  // ========== 함수: 카테고리 컨텐츠 로드 ========== //
  function loadCategoryContent(category) {
    // 로딩 표시
    $('.content-container').html(`
      <div class="loading-message">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Loading...</p>
      </div>
    `);

    // 실제로는 여기서 AJAX로 데이터를 가져옴
    // 예시: 더미 데이터 표시
    setTimeout(() => {
      showDummyContent(category);
    }, 500);
  }

  // ========== 함수: 더미 컨텐츠 표시 (실제로는 AJAX 응답 데이터 사용) ========== //
  function showDummyContent(category) {
    const dummyArticles = [
      {
        category: 'Fashion',
        title: '2025 봄/여름 시즌 필수 아이템',
        date: '2025.11.05',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/11/style_69081e57c53fe-759x500.jpg'
      },
      {
        category: 'Beauty',
        title: '겨울철 피부 관리 루틴',
        date: '2025.11.04',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/10/style_68fa2d3a1dd57-759x500.jpg'
      },
      {
        category: 'Living',
        title: '모던 인테리어 트렌드',
        date: '2025.11.03',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/10/style_68ff1ba0d7506-500x500.jpg'
      },
      {
        category: 'Culture',
        title: '서울의 핫한 전시 리스트',
        date: '2025.11.02',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/10/style_6904633b03e5d-500x500.jpg'
      },
      {
        category: 'Fashion',
        title: '셀럽들의 공항 패션',
        date: '2025.11.01',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/11/style_6908374581e21-759x500.jpg'
      },
      {
        category: 'Beauty',
        title: '주목해야 할 신제품 소개',
        date: '2025.10.31',
        author: '에디터',
        image: 'https://img.vogue.co.kr/vogue/2025/10/style_69017c7650e4a-759x500.jpg'
      }
    ];

    let html = '';
    dummyArticles.forEach(article => {
      html += `
        <article class="article-card">
          <div class="article-card-image">
            <img src="${article.image}" alt="${article.title}">
          </div>
          <div class="article-card-category">${article.category}</div>
          <h3 class="article-card-title">${article.title}</h3>
          <div class="article-card-meta">${article.date} by ${article.author}</div>
        </article>
      `;
    });

    $('.content-container').html(html);
  }

  // ========== 함수: 페이지네이션 버튼 상태 업데이트 ========== //
  function updatePaginationButtons() {
    const currentPage = $('.page-num.active');
    const isFirst = currentPage.is(':first-child');
    const isLast = currentPage.nextAll('.page-num').length === 0;

    $('.page-btn.prev').prop('disabled', isFirst);
    $('.page-btn.next').prop('disabled', isLast);
  }

  // 초기 페이지네이션 상태 설정
  updatePaginationButtons();

  // 초기 컨텐츠 로드
  loadCategoryContent('all');
});
