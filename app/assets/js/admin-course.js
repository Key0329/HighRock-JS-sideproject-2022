/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

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
      <th class="text-center" scope="row">${item.batchId}</th>
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

    if (item.isUser === true) {
      isMember = '會員';
    } else {
      isMember = '非會員';
    }

    regiStr += `
    <tr>
      <th scope="row">${item.name}</th>
      <td>${item.email}</td>
      <td>${item.contactNumber}</td>
      <td>${isMember}</td>
      <td>${item.batchId}</td>
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

axios
  .get(`${Url}/batches`)
  .then((res) => {
    const { data } = res;
    renderAdminBatches(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

axios
  .get(`${Url}/registeredStudent`)
  .then((res) => {
    const { data } = res;
    renderAdminStudents(data);
    showRegisterStudent(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

prevPage();
