/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.to('.typing1', {
  text: '這裡是第一段', // text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 1.5,
  scrollTrigger: {
    trigger: '.typing1',
    toggleActions: 'play pause resume reset', // 見備註
  },
});
