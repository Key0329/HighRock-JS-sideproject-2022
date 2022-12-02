/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger, TextPlugin);
// preloader
// const preLoader = document.querySelector('.preloader-img');

// gsap.fromTo(
//   preLoader,
//   0,
//   {
//     visibility: 'hidden',
//   },
//   {
//     visibility: 'visible',
//     repeat: -1,
//     yoyo: true,
//     repeatDelay: 0.3,
//   },
// );

// experience
const experienceImg = document.querySelector('.experience-img');

const expTL = gsap.timeline({
  scrollTrigger: {
    trigger: experienceImg,
    toggleActions: 'play pause resume reset',
    start: 'top 50%',
  },
});

const experienceImg1 = document.querySelector('.experience-img-1');
const experienceImg2 = document.querySelector('.experience-img-2');
const experienceImg3 = document.querySelector('.experience-img-3');
const experienceImg4 = document.querySelector('.experience-img-4');

if (experienceImg1 || experienceImg2 || experienceImg3 || experienceImg4) {
  expTL
    .to(experienceImg1, {
      duration: 1,
      rotateY: 360,
    })
    .to(
      experienceImg2,
      {
        duration: 1,
        rotateY: 360,
      },
      '>-0.5',
    )
    .to(
      experienceImg3,
      {
        duration: 1,
        rotateY: 360,
      },
      '>-0.5',
    )
    .to(
      experienceImg4,
      {
        duration: 1,
        rotateY: 360,
      },
      '>-0.5',
    );
}

// training gsap zoom in
const trainingBoulderingRight = document.querySelector('.training-bouldering-right');
const trainingBoulderingLeft = document.querySelector('.training-bouldering-left');
const trainingTopRopeRight = document.querySelector('.training-topRope-right');
const trainingTopRopeLeft = document.querySelector('.training-topRope-left');
const trainingLeadingRight = document.querySelector('.training-lead-right');
const trainingLeadingLeft = document.querySelector('.training-lead-left');

if (
  trainingBoulderingRight
  || trainingBoulderingLeft
  || trainingTopRopeRight
  || trainingTopRopeLeft
  || trainingLeadingRight
  || trainingLeadingLeft
) {
  gsap.from(trainingBoulderingRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingBoulderingRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: 100,
    opacity: 0,
  });

  gsap.from(trainingBoulderingLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingBoulderingLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: -100,
    opacity: 0,
  });

  gsap.from(trainingTopRopeRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingTopRopeRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: -100,
    opacity: 0,
  });

  gsap.from(trainingTopRopeLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingTopRopeLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: 100,
    opacity: 0,
  });

  gsap.from(trainingLeadingRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingLeadingRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: 100,
    opacity: 0,
  });

  gsap.from(trainingLeadingLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingLeadingLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%',
    },
    x: -100,
    opacity: 0,
  });
}

// feature gsap typing
const typingFeatureTitle1 = document.querySelector('.typing-feature-title-1');
const typingFeatureTitle2 = document.querySelector('.typing-feature-title-2');
const typingFeatureTitle3 = document.querySelector('.typing-feature-title-3');
const typingFeatureTitle4 = document.querySelector('.typing-feature-title-4');
const cursor = document.querySelectorAll('.cursor');
const typingFeatureContent = document.querySelectorAll('.typing-feature-content');

if (
  typingFeatureTitle1
  && typingFeatureTitle2
  && typingFeatureTitle3
  && typingFeatureTitle4
  && cursor
  && typingFeatureContent
) {
  // 1
  gsap.to(typingFeatureTitle1, {
    text: '多樣攀岩體驗',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  // 2
  gsap.to(typingFeatureTitle2, {
    text: '完善優質場地',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  // 3
  gsap.to(typingFeatureTitle3, {
    text: '常設團體課程',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  // 4
  gsap.to(typingFeatureTitle4, {
    text: '完整經驗師資',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  gsap.to(
    cursor,
    {
      duration: 1.5,
      scrollTrigger: {
        trigger: cursor,
        toggleActions: 'play pause resume reset',
      },
      opacity: 0,
    },
    '<',
  );

  gsap.from(typingFeatureContent, {
    duration: 1,
    scrollTrigger: {
      trigger: typingFeatureTitle4,
      toggleActions: 'play pause resume reset',
    },
    delay: 0.5,
    opacity: 0,
    y: 50,
  });
}

// location gsap typing
const typingLocationTitle1 = document.querySelector('.typing-location-title-1');
const typingLocationTitle2 = document.querySelector('.typing-location-title-2');
const cursor2 = document.querySelectorAll('.cursor-2');
const typingLocationContent = document.querySelectorAll('.typing-location-content');

if (typingLocationTitle1 && typingLocationTitle2 && cursor2 && typingLocationContent) {
  // 1
  gsap.to(typingLocationTitle1, {
    text: 'HighRock 大安館',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  // 2
  gsap.to(typingLocationTitle2, {
    text: 'HighRock 新莊館',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset',
    },
  });

  gsap.to(
    cursor2,
    {
      duration: 1.5,
      scrollTrigger: {
        trigger: cursor2,
        toggleActions: 'play pause resume reset',
      },
      opacity: 0,
    },
    '<',
  );

  gsap.from(typingLocationContent, {
    duration: 1,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset',
    },
    delay: 0.5,
    opacity: 0,
    y: 50,
  });
}

// rock moving
const bgRockLg1 = document.querySelector('.bg-rock-lg-1');
const bgRockLg2 = document.querySelector('.bg-rock-lg-2');
const bgRockLg3 = document.querySelector('.bg-rock-lg-3');
const bgRockLg4 = document.querySelector('.bg-rock-lg-4');
const bgRockLg5 = document.querySelector('.bg-rock-lg-5');
const bgRockLg6 = document.querySelector('.bg-rock-lg-6');
const bgRockLg7 = document.querySelector('.bg-rock-lg-7');
const bgRockLg8 = document.querySelector('.bg-rock-lg-8');
const bgRockLg9 = document.querySelector('.bg-rock-lg-9');
const bgRockLg10 = document.querySelector('.bg-rock-lg-10');

if (
  bgRockLg1
  || bgRockLg2
  || bgRockLg3
  || bgRockLg4
  || bgRockLg5
  || bgRockLg6
  || bgRockLg7
  || bgRockLg8
  || bgRockLg9
  || bgRockLg10
) {
  gsap.from(bgRockLg1, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg1,
    },
    y: 300,
  });

  gsap.from(bgRockLg2, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg2,
      start: 'top 60%',
    },
    x: -200,
  });

  gsap.from(bgRockLg3, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg3,
      start: 'top 80%',
    },
    x: 300,
  });

  gsap.from(bgRockLg4, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg4,
    },
    y: 200,
  });

  gsap.from(bgRockLg5, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg5,
    },
    x: 500,
    rotation: 360,
    ease: 'power3.out',
  });

  gsap.from(bgRockLg6, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg6,
    },
    x: -200,
    y: 200,
    rotation: 180,
  });

  gsap.from(bgRockLg7, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg7,
    },
    x: 100,
    y: -200,
    rotation: 180,
  });

  const rockTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: bgRockLg8,
      start: 'top 70%',
    },
  });

  rockTimeline
    .to(bgRockLg8, {
      duration: 3,
      x: -900,
      y: 500,
      rotation: 180,
    })
    .to(bgRockLg8, {
      duration: 3,
      x: -1150,
      y: 0,
      rotation: 360,
      ease: 'bounce.out',
    });

  gsap.to(bgRockLg9, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg9,
      start: 'top 65%',
    },
    y: 700,
    rotation: 180,
    ease: 'bounce.out',
  });

  gsap.to(bgRockLg10, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg10,
    },
    y: -600,
    rotation: 180,
  });
}

// calendar
const indexCalendarRight = document.querySelector('.index-calendar-right');
const indexCalendarLeft = document.querySelector('.index-calendar-left');

if (indexCalendarRight || indexCalendarLeft) {
  gsap.from(indexCalendarRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: indexCalendarRight,
      toggleActions: 'play pause resume reset',
      start: 'top 65%',
    },
    x: 100,
    opacity: 0,
  });

  gsap.from(indexCalendarLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: indexCalendarLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 65%',
    },
    x: -100,
    opacity: 0,
  });
}
