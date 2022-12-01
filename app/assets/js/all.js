/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// feature gsap typing
// 1
gsap.to('.typing-feature-title-1', {
  text: '多樣攀岩體驗', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-feature-title-1',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

// 2
gsap.to('.typing-feature-title-2', {
  text: '完善優質場地', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-feature-title-2',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

// 3
gsap.to('.typing-feature-title-3', {
  text: '常設團體課程', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-feature-title-3',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

// 4
gsap.to('.typing-feature-title-4', {
  text: '完整經驗師資', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-feature-title-4',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

gsap.to(
  '.cursor',
  {
    duration: 1.5,
    scrollTrigger: {
      trigger: '.cursor',
      toggleActions: 'play pause resume reset', // 見備註
    },
    opacity: 0,
  },
  '<',
);

gsap.from('.typing-feature-content', {
  duration: 1,
  scrollTrigger: {
    trigger: '.typing-feature-title-4',
    toggleActions: 'play pause resume reset', // 見備註
  },
  delay: 0.5,
  opacity: 0,
  y: 50,
});

// feature gsap typing

// 1
gsap.to('.typing-location-title-1', {
  text: 'HighRock 大安館', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-location-title-1',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

// 2
gsap.to('.typing-location-title-2', {
  text: 'HighRock 新莊館', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing-location-title-1',
    toggleActions: 'play pause resume reset', // 見備註
  },
});

gsap.to(
  '.cursor-2',
  {
    duration: 1.5,
    scrollTrigger: {
      trigger: '.cursor-2',
      toggleActions: 'play pause resume reset', // 見備註
    },
    opacity: 0,
  },
  '<',
);

gsap.from('.typing-location-content', {
  duration: 1,
  scrollTrigger: {
    trigger: '.typing-location-title-1',
    toggleActions: 'play pause resume reset', // 見備註
  },
  delay: 0.5,
  opacity: 0,
  y: 50,
});

// rock moving
gsap.from('.bg-rock-lg-1', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.bg-rock-lg-1',
  },
  y: 300,
});

gsap.from('.bg-rock-lg-2', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.bg-rock-lg-2',
    start: 'top 60%',
  },
  x: -200,
});

gsap.from('.bg-rock-lg-3', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.bg-rock-lg-3',
    start: 'top 80%',
  },
  x: 300,
});

gsap.from('.bg-rock-lg-4', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.bg-rock-lg-4',
  },
  y: 200,
});

gsap.from('.bg-rock-lg-5', {
  duration: 2,
  scrollTrigger: {
    trigger: '.bg-rock-lg-5',
  },
  x: 500,
  rotation: 360,
});

gsap.from('.bg-rock-lg-6', {
  duration: 2,
  scrollTrigger: {
    trigger: '.bg-rock-lg-6',
  },
  x: -200,
  y: 200,
  rotation: 180,
});

gsap.from('.bg-rock-lg-7', {
  duration: 2,
  scrollTrigger: {
    trigger: '.bg-rock-lg-7',
  },
  x: 100,
  y: -200,
  rotation: 180,
});

const rockTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.bg-rock-lg-8',
    start: 'top 70%',
  },
});

rockTimeline
  .to('.bg-rock-lg-8', {
    duration: 3,
    x: -900,
    y: 500,
    rotation: 180,
  })
  .to('.bg-rock-lg-8', {
    duration: 3,
    x: -1150,
    y: 0,
    rotation: 360,
  });

gsap.to('.bg-rock-lg-9', {
  duration: 2,
  scrollTrigger: {
    trigger: '.bg-rock-lg-9',
    start: 'top 70%',
  },
  y: 600,
  rotation: 180,
});

gsap.to('.bg-rock-lg-10', {
  duration: 2,
  scrollTrigger: {
    trigger: '.bg-rock-lg-10',
  },
  y: -600,
  rotation: 180,
});

gsap.from('.index-calendar-right', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.index-calendar-right',
    toggleActions: 'play pause resume reset', // 見備註
  },
  x: 100,
  opacity: 0,
});

gsap.from('.index-calendar-left', {
  duration: 1.5,
  scrollTrigger: {
    trigger: '.index-calendar-left',
    toggleActions: 'play pause resume reset', // 見備註
  },
  x: -100,
  opacity: 0,
});
