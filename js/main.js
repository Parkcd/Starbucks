const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () { // .throttle 자체는 lodash 라이브러리 에서 제공하는 기능이어서 저대로 써줘야함
  console.log(window.scrollY); 
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간 , 옵션);
    gsap.to(badgeEl, .6 , {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기!
    gsap.to(toTopEl, .2 , { // 요소안에 '#to-top' 처럼 직접 선택자 작성해줘도 되지만 비효율적이라 위에 const toTopEl = document.querySelector('#to-top'); 코드 작성해서 일괄적으로 관리
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6 , {
      opacity: 1,
      display: 'block'
    });

    //버튼 숨기기!
    gsap.to(toTopEl, .2 , {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간) <-- 사용법


toTopEl.addEventListener('click', function () {
  gsap.to(window, .7 , {
    scrollTo: 0 // 여기에있는 scrollTo 옵션을 쓰기위해서 gsap의 scrollTo 플러그인을 가져와서 연결해준거임
  })
})

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl , index) {
  // gsap.to(요소, 지속시간 , 옵션);
  gsap.to(fadeEl, 1 , {
    delay: (index + 1) * .7, // 0.7 , 1.4 , 2.1 , 2.8 초뒤에 index fade-in 별 순차적으로 애니매이션 출력
    opacity: 1
  });
});

// new Swiper(선택자,옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true // 반복재생 여부
});

new Swiper('.promotion .swiper-container' , {
  // direction: 'horizontal', direction 기본값이 horizontal 이라 안써줘도 OK
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  // autoplay: {    // autoplay를 객체데이터로 만들어주면 추가적인 옵션 부여 가능
  //   delay: 5000 // 5초에 한번씩 이미지 슬라이드
  // }
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container' , {
  // direction: 'horizontal'  direction은 기본값이 horizontal 이라 입력안해줘도 괜찮음
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, // 한 화면에 몇개의 슬라이드를 보여줄거냐 지정해주는 옵션
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
  
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click',function () {
  isHidePromotion = !isHidePromotion // !가 변수앞에 붙으면 반대 해당값 반환 하는의미
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector , delay , size) {
  // gsap.to(요소 , 시간 , 옵션);
  gsap.to(selector , random(1.5 , 2.5) , {
    y: size,
    repeat: -1, // 반복요소인데 -1하면 무한반복
    yoyo: true, // yoyo는 한번 재생된 애니메이션을 다시 뒤로 돌려서 재생시키는 역할
    ease: "power1.inOut", 
    delay: random(0, delay)
  });
}

floatingObject('.floating1', 1 , 15);
floatingObject('.floating2', .5 , 15);
floatingObject('.floating3', 1.5 , 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8
    })
      .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});


