/* eslint-disable no-undef */
const Url = 'https://highrock-server-render.onrender.com';
// const Url = 'http://localhost:3000';

// ---------------------- 後台-活動課程管理 ----------------------

// 渲染活動課程梯次
function renderAdminBatches(arr) {
  // 活動課程梯次
  const adminBatchTable = document.querySelector('.admin-batch-table');

  let str = '';

  arr.forEach((item) => {
    let isOpenedColor = '';
    if (item.isOpened === '已開課') {
      isOpenedColor = 'text-success';
    } else {
      isOpenedColor = 'text-danger';
    }

    str += `
    <tr data-id="${item.batchId}">
      <th class="text-center" scope="row">Batch ${item.batchId}</th>
      <td>${item.name}</td>
      <td>${item.branch}</td>
      <td>${item.coach}</td>
      <td>${item.content}</td>
      <td><a href="#" class="registered-student-btn d-inline-block d-flex align-items-center hover-orange">${item.nowSignUp} / ${item.maximumSignUp} 位  <span class="material-symbols-outlined vertical-middle ms-1">
      add_circle
      </span></a></td>
      <td class="${isOpenedColor}">${item.isOpened}</td>
    </tr>
    `;
  });

  if (adminBatchTable) {
    adminBatchTable.innerHTML = str;
  }
}

// 渲染已報名學生
function renderAdminStudents(arr) {
  // 活動課程已報名學生資訊
  const adminRegisteredTable = document.querySelector('.admin-registered-table');

  let regiStr = '';

  arr.forEach((item) => {
    let isMember = '';

    if (item.userId) {
      isMember = '一般會員';
    }

    regiStr += `
    <tr>
      <th scope="row">${item.name}</th>
      <td>${item.email}</td>
      <td>${item.contactNumber}</td>
      <td>${isMember}</td>
      <td>Batch ${item.batchId}</td>
    </tr>
    `;
  });

  if (adminRegisteredTable) {
    adminRegisteredTable.innerHTML = regiStr;
  }
}

// 觀看該課程已報名學生資訊
function showRegisterStudent(arr) {
  const adminCourseForm = document.querySelector('.admin-course-form');
  if (adminCourseForm) {
    adminCourseForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.nodeName === 'A' || e.target.closest('a')) {
        const adminCourse = document.querySelector('.admin-course');
        const adminBatch = document.querySelector('.admin-batches');

        adminCourse.classList.add('d-none');
        adminBatch.classList.remove('d-none');
      }

      const targetId = e.target.closest('tr').dataset.id;
      const newData = [];

      arr.forEach((item) => {
        if (targetId === item.batchId) {
          newData.push(item);
        }
      });

      renderAdminStudents(newData);
    });
  }
}

// 返回上頁
function prevPage() {
  const adminBatchesPanel = document.querySelector('.admin-batches-panel');
  if (adminBatchesPanel) {
    adminBatchesPanel.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A' || e.target.closest('a')) {
        const adminCourse = document.querySelector('.admin-course');
        const adminBatch = document.querySelector('.admin-batches');

        adminCourse.classList.remove('d-none');
        adminBatch.classList.add('d-none');
      }
    });
  }
}

// 活動報名學生關鍵字搜尋
function memberBatchSearch(arr) {
  const adminCourseBatchFilter = document.querySelector('#admin-course-batch-search');

  if (adminCourseBatchFilter) {
    adminCourseBatchFilter.addEventListener('input', () => {
      const keyword = adminCourseBatchFilter.value.trim().toLowerCase();
      let targetProduct = [];

      targetProduct = arr.filter((item) => {
        const title = item.name.toLowerCase();
        const branch = item.branch.toLowerCase();
        const coach = item.coach.toLowerCase();
        const content = item.content.toLowerCase();
        return (
          title.match(keyword)
          || branch.match(keyword)
          || coach.match(keyword)
          || content.match(keyword)
        );
      });

      setTimeout(() => {
        renderAdminBatches(targetProduct);
      }, 1000);
    });
  }
}

// 活動報名學生關鍵字搜尋
function memberRegisteredSearch(arr) {
  const adminCourseRegisteredFilter = document.querySelector('#admin-course-registered-filter');

  if (adminCourseRegisteredFilter) {
    adminCourseRegisteredFilter.addEventListener('input', () => {
      const keyword = adminCourseRegisteredFilter.value.trim().toLowerCase();
      let targetProduct = [];

      targetProduct = arr.filter((item) => {
        const title = item.name.toLowerCase();
        const mail = item.email.toLowerCase();
        const tel = item.contactNumber.toLowerCase();
        return title.match(keyword) || mail.match(keyword) || tel.match(keyword);
      });

      setTimeout(() => {
        renderAdminStudents(targetProduct);
      }, 1000);
    });
  }
}

axios
  .get(`${Url}/batches`)
  .then((res) => {
    const { data } = res;
    renderAdminBatches(data);
    memberBatchSearch(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

axios
  .get(`${Url}/students`)
  .then((res) => {
    const { data } = res;
    renderAdminStudents(data);
    showRegisterStudent(data);
    memberRegisteredSearch(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

prevPage();
