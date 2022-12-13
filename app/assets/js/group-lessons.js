/* eslint-disable no-plusplus */
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector('.days');
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    '一月課表',
    '二月課表',
    '三月課表',
    '四月課表',
    '五月課表',
    '六月課表',
    '七月課表',
    '八月課表',
    '九月課表',
    '十月課表',
    '十一月課表',
    '十二月課表',
  ];

  // 本月
  const currentMonth = document.querySelector('.current-month');
  if (currentMonth) {
    currentMonth.innerHTML = months[date.getMonth()];
  }

  let days = '';

  // 上個月日期
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date" data-month=${date.getMonth()} data-date=${
      prevLastDay - x + 1
    }>${prevLastDay - x + 1}</div>`;
  }

  // 本月日期
  for (let i = 1; i <= lastDate; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `
      <div class="today h-100" data-month=${date.getMonth() + 1} data-date=${i}>
      <p class="calendar-today rounded-3 bg-primary p-1">${i}</p>
      </div>
      `;
    } else if (
      (i === 5 || i === 12 || i === 19 || i === 26)
      && date.getMonth() === new Date().getMonth()
    ) {
      days += `
      <div class="today flex-column border-1 border-primary-lightest" data-month=${
  date.getMonth() + 1
} data-date=${i}>
            <p class="align-self-start mb-1">${i}</p>
            <div class="d-flex flex-column align-items-center w-100">
            <p class="text-center bg-yellow-c1 mb-1 p-1 rounded-1">頂繩攀登 LV2</p>
            <button type="button" class="btn btn-outline-gray-c1 w-50 fs-5 p-1">預約</button>
            </div>
            </div>
      `;
    } else if (
      (i === 2 || i === 9 || i === 16 || i === 23 || i === 30)
      && date.getMonth() === new Date().getMonth()
    ) {
      days += `
      <div class="today flex-column border-1 border-primary-lightest" data-month=${
  date.getMonth() + 1
} data-date=${i}>
      <p class="align-self-start mb-1">${i}</p>
      <div class="d-flex flex-column align-items-center w-100">
      <p class="text-center bg-blue-c1 mb-1 p-1 rounded-1">抱石 LV1</p>
      <button type="button" class="btn btn-outline-gray-c1 w-50 fs-5 p-1">預約</button>
      </div>
      </div>
      `;
    } else {
      days += `<div data-month=${date.getMonth() + 1} data-date=${i}>${i}</div>`;
    }
  }

  // 下個月日期
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date" data-month=${date.getMonth() + 2} data-date=${j}>${j}</div>`;
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
    renderCalendar();
  });
}

// 切換下個月
const nextMonth = document.querySelector('.next');
if (nextMonth) {
  nextMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

renderCalendar();
