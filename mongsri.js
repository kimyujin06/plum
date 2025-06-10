console.clear(); // Start with a clean console on refesh

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

const slider = document.querySelector(".slider");
const items = gsap.utils.toArray(".item");
const offset = 30;


function moveCard() {
  const lastItem = slider.querySelector(".item:last-child");

  if (slider && lastItem) {
    lastItem.style.display = "none";

    const newItem = document.createElement("div");
    newItem.className = lastItem.className;

    const img = lastItem.querySelector("img");
    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      newItem.appendChild(newImg);
    }

    slider.insertBefore(newItem, slider.firstChild);
  }
}

document.body.addEventListener("click", (e) => {
  const state = Flip.getState(".item");

  moveCard();

  Flip.from(state, {
    targets: ".item",
    ease: "sine.inOut",
    absolute: false,
    onEnter: (elements) => {
      return gsap.from(elements, {
        yPercent: 20,
        opacity: 0,
        ease: "sine.out"
      });
    },
    onLeave: (elements) => {
      return gsap.to(elements, {
        yPercent: 20,
        xPercent: 0,
        opacity: 0,
        ease: "sine.out",
        onComplete() {
          elements.forEach(el => el.remove());
        }
      });
    }
  });
});

const textElements = gsap.utils.toArray('#inc01 .b_txt');
textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 40%',
      end: 'center 35%',
      scrub: 1,
    },
  });
});

gsap.utils.toArray(".item").forEach((item) => {
let color = item.getAttribute("data-bgcolor");

ScrollTrigger.create({
    trigger: item,
    start: "top 50%",
    end: "bottom 50%",

    onEnter: () => gsap.to("body", {
        backgroundColor: color,
        duration: 1.4,
    }),
    onEnterBack: () => gsap.to("body", {
        backgroundColor: color,
        duration: 1.4,
    }),
});
});

document.querySelectorAll(".sample").forEach((sample, index) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sample,
      start: "0 60%",
      end: "101% bottom",
      scrub: 4,
      markers: false,
    }
  });

  const words = sample.querySelectorAll(".txt");

  words.forEach((word) => {
    tl.fromTo(word,
      { width: '0%', opacity: 0 },
      { width: 'auto', opacity: 1, duration: 1.2, ease: 'power2.out' }
    );
  });
});

// 감성 팝업 기능
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-btn");
const modalBg = document.querySelector(".modal-bg");

// 이미지 클릭 시 팝업 열기
document.querySelectorAll(".img_box img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;

    // 애니메이션 적용
    requestAnimationFrame(() => {
      modalImg.style.opacity = "1";
      modalImg.style.transform = "scale(1)";
    });
  });
});

// 닫기 버튼 또는 배경 누르면 팝업 닫기
const closeModal = () => {
  gsap.to(modalImg, {
    duration: 0.4,
    opacity: 0,
    scale: 0.9,
    ease: "power2.inOut",
    onComplete: () => {
      modal.style.display = "none";
      // 초기화(다음 열 때 대비)
      modalImg.style.opacity = "1";
      modalImg.style.transform = "scale(1)";
    }
  });
};

closeBtn.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);
