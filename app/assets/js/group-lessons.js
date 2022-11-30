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

  const currentMonth = document.querySelector('.current-month');
  if (currentMonth) {
    currentMonth.innerHTML = months[date.getMonth()];
  }

  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today bg-yellow-c1">${i}</div>`;
    } else if (new Date().getDay() === 0) {
      days += `<div class="today bg-yellow-c1">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  if (monthDays) {
    monthDays.innerHTML = days;
  }
};

const prevMonth = document.querySelector('.prev');
if (prevMonth) {
  prevMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
}

const nextMonth = document.querySelector('.next');

if (nextMonth) {
  nextMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

renderCalendar();
