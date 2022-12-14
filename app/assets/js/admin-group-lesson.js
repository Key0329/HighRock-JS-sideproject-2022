/* eslint-disable no-undef */

// 渲染後臺團體課程頁面表格
function renderAdminGroupLessonTable(arr) {
  const adminGroupLessonTable = document.querySelector('.admin-group-lesson-table');

  let str = '';

  arr.forEach((item) => {
    const dateArr = item.lessonDate;
    let dateStr = '';
    dateArr.forEach((i) => {
      dateStr += `${i} <br />`;
    });

    str += `
    <tr>
      <th scope="row">${item.groupLessonId}</th>
      <td>${item.name}</td>
      <td>${dateStr}</td>
      <td>${item.branch}</td>
      <td>${item.coach}</td>
      <td>
        <button type="button" class="admin-add-lesson-btn btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#addGroupLessonDate" data-id=${item.id}>新增上課日期</button>
      </td>
    </tr>
    `;
  });

  if (adminGroupLessonTable) {
    adminGroupLessonTable.innerHTML = str;
  }
}

const adminGroupLessonName = document.querySelector('#admin-group-lesson-name');
const adminGroupLessonId = document.querySelector('#admin-group-lesson-id');
const adminGroupLessonBranch = document.querySelector('#admin-group-lesson-branch');

// 將資料帶到新增上課日期表單
function takeDataToAddLessonForm() {
  const adminAddLessonBtn = document.querySelectorAll('.admin-add-lesson-btn');

  adminAddLessonBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const targetId = e.target.dataset.id;

      axios
        .get(`http://localhost:3000/lessons/${targetId}`)
        .then((res) => {
          const { data } = res;

          adminGroupLessonName.value = data.name;
          adminGroupLessonId.value = targetId;
          adminGroupLessonBranch.value = data.branch;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  });
}

// 新增團體課上課日期
function addNewGroupLessonDate() {
  const addNewGroupLessonBtn = document.querySelector('.add-new-group-lesson-btn');
  const adminGroupLessonDate = document.querySelector('.admin-group-lesson-date');

  if (addNewGroupLessonBtn) {
    addNewGroupLessonBtn.addEventListener('click', () => {
      const id = adminGroupLessonId.value;
      const newDate = adminGroupLessonDate.value;

      axios
        .get(`http://localhost:3000/lessons/${id}`)
        .then((res) => {
          const { data } = res;
          const dateArr = data.lessonDate;
          dateArr.push(newDate);
          const newDateData = {
            lessonDate: dateArr,
          };

          return axios.patch(`http://localhost:3000/lessons/${id}`, newDateData);
        })
        .then(() => {
          const addGroupLessonDateModal = document.getElementById('addGroupLessonDate');
          const modalBackDrop = document.querySelector('.modal-backdrop');

          addGroupLessonDateModal.classList.remove('show');
          addGroupLessonDateModal.setAttribute('style', 'display: none;');
          addGroupLessonDateModal.setAttribute('aria-hidden', 'true');
          addGroupLessonDateModal.removeAttribute('aria-modal');
          addGroupLessonDateModal.removeAttribute('role');
          modalBackDrop.remove();

          Swal.fire({
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  }
}

// 取得團體課程遠端資料
function getAdminGroupLessonData() {
  axios
    .get('http://localhost:3000/lessons')
    .then((res) => {
      const { data } = res;
      renderAdminGroupLessonTable(data);
      takeDataToAddLessonForm();
      addNewGroupLessonDate();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// datepicker
const datepicker = document.querySelector('#datepicker');
if (datepicker) {
  // eslint-disable-next-line no-unused-vars
  const $j = jQuery.noConflict();
  $(() => {
    $('#datepicker').datepicker({
      dateFormat: 'yy-m-d', // 修改顯示順序
    });
  });
}

// 後臺團體課程管理頁面初始化
function adminGroupLessonInit() {
  getAdminGroupLessonData();
}

adminGroupLessonInit();
