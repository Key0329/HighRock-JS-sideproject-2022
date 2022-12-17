/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
// const Url = 'https://highrock-server-render.onrender.com';

const date = new Date();

// 渲染預約課程
function renderLesson(data) {
  data.forEach((item) => {
    const lessonDataArr = item.lessonDate;

    lessonDataArr.forEach((i) => {
      const lessonDateArrDetail = i.split('-');
      const lessonDateObj = {
        year: lessonDateArrDetail[0],
        month: lessonDateArrDetail[1],
        date: lessonDateArrDetail[2],
      };

      // const lessons = document.querySelector(
      //   "div[data-year='2022'][data-month='12'][data-date='15']",
      // );
      const lessons = document.querySelector(
        `div[data-year=${CSS.escape(lessonDateObj.year)}][data-month=${CSS.escape(
          lessonDateObj.month,
        )}][data-date=${CSS.escape(lessonDateObj.date)}]`,
      );

      if (lessons) {
        lessons.innerHTML = `
          <p class="align-self-start mb-1">${lessonDateObj.date}</p>
          <div class="d-flex flex-column align-items-center w-100">
          <p class="text-center bg-${item.color} mb-1 p-1 rounded-1">${item.name}</p>
          <button type="button" data-id=${item.id} data-bs-toggle="modal" data-bs-target="#reserveModal" class="group-lesson-reserve-btn btn btn-outline-gray-c1 w-50 fs-5 p-1">預約</button>
          </div>
          `;
      }
    });
  });

  // eslint-disable-next-line no-use-before-define
  takeDataToReserveForm();
}

// 渲染月曆
const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector('.days');
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    '大安館 一月課表',
    '大安館 二月課表',
    '大安館 三月課表',
    '大安館 四月課表',
    '大安館 五月課表',
    '大安館 六月課表',
    '大安館 七月課表',
    '大安館 八月課表',
    '大安館 九月課表',
    '大安館 十月課表',
    '大安館 十一月課表',
    '大安館 十二月課表',
  ];

  // 本月
  const currentMonth = document.querySelector('.current-month');
  if (currentMonth) {
    currentMonth.innerHTML = months[date.getMonth()];
  }

  let days = '';

  // 上個月日期
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date" data-year=${date.getFullYear()} data-month=${date.getMonth()} data-date=${
      prevLastDay - x + 1
    }>${prevLastDay - x + 1}</div>`;
  }

  // 本月日期
  for (let i = 1; i <= lastDate; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `
      <div class="today flex-column border-1 border-primary-lightest" h-100" data-year=${date.getFullYear()} data-month=${
  date.getMonth() + 1
} data-date=${i}>
      <p class="calendar-today rounded-3 bg-primary p-1">${i}</p>
      </div>
      `;
    } else {
      days += `<div class="flex-column border-1 border-primary-lightest" data-year=${date.getFullYear()} data-month=${
        date.getMonth() + 1
      } data-date=${i}>${i}</div>`;
    }
  }

  // 下個月日期
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date" data-year=${date.getFullYear()} data-month=${
      date.getMonth() + 2
    } data-date=${j}>${j}</div>`;
  }

  if (monthDays) {
    monthDays.innerHTML = days;
  }
};

// 切換上個月
const prevMonth = document.querySelector('.prev');
if (prevMonth) {
  prevMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    // eslint-disable-next-line no-use-before-define
    groupLessonInit();
  });
}

// 切換下個月
const nextMonth = document.querySelector('.next');
if (nextMonth) {
  nextMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    // eslint-disable-next-line no-use-before-define
    groupLessonInit();
  });
}
const groupLessonName = document.querySelector('#group-lesson-name');
const groupLessonTime = document.querySelector('#group-lesson-time');
const groupLessonBranch = document.querySelector('#group-lesson-branch');
const groupLessonDate = document.querySelector('#group-lesson-date');
const groupLessonId = document.querySelector('.group-lesson-id');
const userId = localStorage.getItem('userId');

// 帶入課程資訊到預約表單
function takeDataToReserveForm() {
  const groupLessonReserveBtn = document.querySelectorAll('.group-lesson-reserve-btn');

  groupLessonReserveBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const targetId = e.target.dataset.id;
      const targetName = e.target.previousElementSibling.textContent;
      const targetTime = '19:00 ~ 20:00';
      const targetBranch = 'HighRock 攀岩館 大安館';
      const targetDate = `${date.getFullYear()} 年 ${
        e.target.parentNode.parentNode.dataset.month
      } 月 ${e.target.parentNode.parentNode.dataset.date} 日`;

      groupLessonId.textContent = targetId;
      groupLessonName.value = targetName;
      groupLessonTime.value = targetTime;
      groupLessonBranch.value = targetBranch;
      groupLessonDate.value = targetDate;
    });
  });
}

// 傳送團體課程預約資訊到資料庫
function postReservation() {
  const groupLessonReservationConfirmBtn = document.querySelector(
    '.group-lesson-reservation-confirm-btn',
  );

  if (groupLessonReservationConfirmBtn) {
    groupLessonReservationConfirmBtn.addEventListener('click', () => {
      const lessonId = groupLessonId.textContent;
      const name = groupLessonName.value;
      const time = groupLessonTime.value;
      const branch = groupLessonBranch.value;
      const lessonDate = groupLessonDate.value;

      const data = {
        userId,
        lessonId,
        name,
        time,
        branch,
        date: lessonDate,
      };

      axios
        .get(`${Url}/users/${userId}/groupLessonStudents`)
        .then((res) => {
          const userData = res.data;

          let hadReserved = false;

          userData.forEach((i) => {
            if (i.date === lessonDate) {
              hadReserved = true;
            }
          });

          if (hadReserved) {
            Swal.fire({
              icon: 'warning',
              title: '已預約該課程',
              showConfirmButton: false,
              timer: 1500,
            });

            return;
          }

          axios
            .post(`${Url}/groupLessonStudents`, data)
            .then(() => {
              const reserveModal = document.getElementById('reserveModal');
              $(reserveModal).modal('hide');

              Swal.fire({
                icon: 'success',
                title: '預約成功',
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });

          // eslint-disable-next-line consistent-return
          // return axios.post('http://localhost:3000/groupLessonStudents', data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      // .then(() => {
      //   const reserveModal = document.getElementById('reserveModal');
      //   $(reserveModal).modal('hide');

      //   Swal.fire({
      //     icon: 'success',
      //     title: '預約成功',
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // })
      // .catch((error) => {
      //   // eslint-disable-next-line no-console
      //   console.log(error);
      // });

      // axios
      //   .post('http://localhost:3000/groupLessonStudents', data)
      //   .then((res) => {
      //     console.log(res.data);

      //     const reserveModal = document.getElementById('reserveModal');
      //     $(reserveModal).modal('hide');

      //     Swal.fire({
      //       icon: 'success',
      //       title: '預約成功',
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line no-console
      //     console.log(error);
      //   });
    });
  }
}

function getLessonData() {
  axios
    .get(`${Url}/lessons`)
    .then((res) => {
      const { data } = res;
      // console.log(data);
      renderLesson(data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 團體課程初始化
function groupLessonInit() {
  renderCalendar();
  getLessonData();
  postReservation();
}

groupLessonInit();
