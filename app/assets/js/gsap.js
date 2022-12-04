/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger, TextPlugin);
// preloader
// const preLoader = document.querySelector('.preloader-img');

// gsap.from(preLoader, {
//   opacity: 0,
//   duration: 1,
// });

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

  gsap.to(bgRockLg8, {
    duration: 3,
    scrollTrigger: {
      trigger: bgRockLg8,
    },
    x: -400,
    y: 0,
    rotation: 180,
    ease: 'power3.out',
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
// ----------------------- member register -----------------------
// rock moving
const registerRock1 = document.querySelector('.register-rock-1');
const registerRock2 = document.querySelector('.register-rock-2');
const registerRock3 = document.querySelector('.register-rock-3');
const registerRock4 = document.querySelector('.register-rock-4');
const registerRock5 = document.querySelector('.register-rock-5');
const registerRock6 = document.querySelector('.register-rock-6');
const registerRock7 = document.querySelector('.register-rock-7');
const registerRock8 = document.querySelector('.register-rock-8');
const registerRock9 = document.querySelector('.register-rock-9');

if (
  registerRock1
  || registerRock2
  || registerRock3
  || registerRock4
  || registerRock5
  || registerRock6
  || registerRock7
  || registerRock8
  || registerRock9
) {
  gsap.from(registerRock1, {
    duration: 1,
    delay: 1,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock2, {
    duration: 1,
    delay: 2,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock3, {
    duration: 1,
    delay: 2.5,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock4, {
    duration: 1,
    delay: 3.5,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock5, {
    duration: 1,
    delay: 4,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock6, {
    duration: 1,
    delay: 5,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock7, {
    duration: 1,
    delay: 5.5,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock8, {
    duration: 1,
    delay: 6,
    opacity: 0,
    x: -200,
  });
  gsap.from(registerRock9, {
    duration: 1,
    delay: 7,
    opacity: 0,
    x: -200,
  });
}

// climber
const registerClimber1 = document.querySelector('.register-climber-1');
const registerClimber2 = document.querySelector('.register-climber-2');
const registerClimber3 = document.querySelector('.register-climber-3');
const registerClimber4 = document.querySelector('.register-climber-4');
const registerClimber5 = document.querySelector('.register-climber-5');

if (
  registerClimber1
  || registerClimber2
  || registerClimber3
  || registerClimber4
  || registerClimber5
) {
  gsap.from(registerClimber1, {
    duration: 1,
    delay: 4.5,
    opacity: 0,
    y: 50,
  });
  gsap.from(registerClimber2, {
    duration: 1,
    delay: 7.5,
    opacity: 0,
    y: -50,
  });
  gsap.from(registerClimber3, {
    duration: 1,
    delay: 6.5,
    opacity: 0,
    y: 50,
  });
  gsap.from(registerClimber4, {
    duration: 1,
    delay: 1.5,
    opacity: 0,
    y: 50,
  });
  gsap.from(registerClimber5, {
    duration: 1,
    delay: 3,
    opacity: 0,
    x: -50,
  });
}

// ----------------------- member login -----------------------

// rock moving
const loginRock1 = document.querySelector('.login-rock-1');
const loginRock2 = document.querySelector('.login-rock-2');
const loginRock3 = document.querySelector('.login-rock-3');
const loginRock4 = document.querySelector('.login-rock-4');
const loginRock5 = document.querySelector('.login-rock-5');
const loginRock6 = document.querySelector('.login-rock-6');
const loginRock7 = document.querySelector('.login-rock-7');
const loginRock8 = document.querySelector('.login-rock-8');
const loginRock9 = document.querySelector('.login-rock-9');
const loginRock10 = document.querySelector('.login-rock-10');
const loginRock11 = document.querySelector('.login-rock-11');
const loginRock12 = document.querySelector('.login-rock-12');
const loginRock13 = document.querySelector('.login-rock-13');
const loginRock14 = document.querySelector('.login-rock-14');
const loginRock15 = document.querySelector('.login-rock-15');

if (
  loginRock1
  || loginRock2
  || loginRock3
  || loginRock4
  || loginRock5
  || loginRock6
  || loginRock7
  || loginRock8
  || loginRock9
  || loginRock10
  || loginRock11
  || loginRock12
  || loginRock13
  || loginRock14
  || loginRock15
) {
  gsap.from(loginRock1, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: -200,
  });
  gsap.from(loginRock2, {
    duration: 1,
    opacity: 0,
    x: -200,
  });
  gsap.from(loginRock3, {
    duration: 1,
    opacity: 0,
    x: -200,
  });
  gsap.from(loginRock4, {
    duration: 1,
    opacity: 0,
    x: -200,
    y: 200,
  });
  gsap.from(loginRock5, {
    duration: 1,
    opacity: 0,
    x: -100,
    y: 200,
  });
  gsap.from(loginRock6, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: -100,
  });
  gsap.from(loginRock7, {
    duration: 1,
    opacity: 0,
    y: -200,
  });
  gsap.from(loginRock8, {
    duration: 1,
    opacity: 0,
    y: -200,
  });
  gsap.from(loginRock9, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: 100,
  });
  gsap.from(loginRock10, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: 200,
  });
  gsap.from(loginRock11, {
    duration: 1,
    opacity: 0,
    y: 200,
  });
  gsap.from(loginRock12, {
    duration: 1,
    opacity: 0,
    y: 200,
    x: 100,
  });
  gsap.from(loginRock13, {
    duration: 1,
    opacity: 0,
    y: 200,
    x: 200,
  });
  gsap.from(loginRock14, {
    duration: 1,
    opacity: 0,

    x: 200,
  });
  gsap.from(loginRock15, {
    duration: 1,
    opacity: 0,
    y: 100,
    x: 200,
  });
}

// climber
const loginClimber1 = document.querySelector('.login-climber-1');
const loginClimber2 = document.querySelector('.login-climber-2');
const loginClimber3 = document.querySelector('.login-climber-3');
const loginClimber4 = document.querySelector('.login-climber-4');
const loginClimber5 = document.querySelector('.login-climber-5');

if (loginClimber1 || loginClimber2 || loginClimber3 || loginClimber4 || loginClimber5) {
  gsap.from(loginClimber1, {
    duration: 1,
    opacity: 0,
    delay: 0.5,
    y: 50,
  });
  gsap.from(loginClimber2, {
    duration: 1,
    opacity: 0,
    delay: 1,
    y: -50,
  });
  gsap.from(loginClimber3, {
    duration: 1,
    opacity: 0,
    delay: 1.5,
    y: 50,
  });
  gsap.from(loginClimber4, {
    duration: 1,
    opacity: 0,
    delay: 2,
    y: -50,
  });
  gsap.from(loginClimber5, {
    duration: 1,
    opacity: 0,
    delay: 2.5,
    x: -50,
  });
}
