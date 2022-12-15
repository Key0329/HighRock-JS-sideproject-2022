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
      <th class="bg-${item.color}" scope="row">${item.groupLessonId}</th>
      <td>${item.name}</td>
      <td>${dateStr}</td>
      <td>
        <button type="button" class="admin-add-lesson-btn btn btn-${item.color}" data-bs-toggle="modal"
        data-bs-target="#addGroupLessonDate" data-id=${item.id}>新增上課日</button>
      </td>
      <td>${item.branch}</td>
      <td>${item.coach}</td>
      <td>
      <a class="deleteGroupLessonBtn" href="#" data-id=${item.id}>
      <span class="material-symbols-outlined">
      delete</span>
      </a>
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

          document.body.style.overflow = 'auto';
          addGroupLessonDateModal.classList.remove('show');
          addGroupLessonDateModal.setAttribute('style', 'display: none;');
          addGroupLessonDateModal.setAttribute('aria-hidden', 'true');
          addGroupLessonDateModal.removeAttribute('aria-modal');
          addGroupLessonDateModal.removeAttribute('role');
          if (modalBackDrop) {
            modalBackDrop.remove();
          }

          Swal.fire({
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 1500,
          });

          // eslint-disable-next-line no-use-before-define
          getAdminGroupLessonData();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  }
}

// 新增團體課程類別
function addGroupLessonType() {
  const adminGroupLessonCreateName = document.querySelector('#admin-group-lesson-create-name');
  const adminGroupLessonCreateId = document.querySelector('#admin-group-lesson-create-id');
  const adminGroupLessonCreateBranch = document.querySelector('#admin-group-lesson-create-branch');
  const adminGroupLessonCreateCoach = document.querySelector('.admin-group-lesson-create-coach');
  const adminGroupLessonCreateSelect = document.querySelector('.admin-group-lesson-create-select');

  const createNewGroupLessonBtn = document.querySelector('.create-new-group-lesson-btn');
  if (createNewGroupLessonBtn) {
    createNewGroupLessonBtn.addEventListener('click', () => {
      const data = {
        name: adminGroupLessonCreateName.value,
        groupLessonId: adminGroupLessonCreateId.value,
        branch: adminGroupLessonCreateBranch.value,
        coach: adminGroupLessonCreateCoach.value,
        color: adminGroupLessonCreateSelect.value,
        lessonDate: [],
      };

      if (
        adminGroupLessonCreateName.value === ''
        || adminGroupLessonCreateId.value === ''
        || adminGroupLessonCreateBranch.value === ''
        || adminGroupLessonCreateCoach.value === '選擇教練'
        || adminGroupLessonCreateSelect.value === '選擇主題顏色'
      ) {
        Swal.fire({
          icon: 'warning',
          title: '有空欄位未填',
          showConfirmButton: false,
          timer: 1500,
        });
        // eslint-disable-next-line no-useless-return
        return;
      }

      axios
        .post('http://localhost:3000/lessons', data)
        .then(() => {
          const createGroupLesson = document.getElementById('createGroupLesson');
          const modalBackDrop = document.querySelector('.modal-backdrop');

          document.body.style.overflow = 'auto';
          createGroupLesson.classList.remove('show');
          createGroupLesson.setAttribute('style', 'display: none;');
          createGroupLesson.setAttribute('aria-hidden', 'true');
          createGroupLesson.removeAttribute('aria-modal');
          createGroupLesson.removeAttribute('role');

          if (modalBackDrop) {
            modalBackDrop.remove();
          }

          Swal.fire({
            icon: 'success',
            title: '開設成功',
            showConfirmButton: false,
            timer: 1500,
          });

          // eslint-disable-next-line no-use-before-define
          getAdminGroupLessonData();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  }
}

// 刪除團體課程類別
function deleteGroupLessonType() {
  const deleteGroupLessonBtn = document.querySelectorAll('.deleteGroupLessonBtn');
  deleteGroupLessonBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const { id } = e.target.closest('a').dataset;

      Swal.fire({
        title: '確定要刪除此課程類別嗎?',
        text: '刪除後將無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:3000/lessons/${id}`)
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              adminGroupLessonInit();

              Swal.fire('已刪除！', '該類別已刪除', 'success');
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        }
      });
    });
  });
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
      deleteGroupLessonType();
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

// select color
const adminGroupLessonCreateSelect = document.querySelector('.admin-group-lesson-create-select');
let previousValue = '';

if (adminGroupLessonCreateSelect) {
  adminGroupLessonCreateSelect.addEventListener('change', (e) => {
    adminGroupLessonCreateSelect.classList.remove(`bg-${previousValue}`);
    adminGroupLessonCreateSelect.classList.add(`bg-${e.target.value}`);
    previousValue = e.target.value;
  });
}

// 後臺團體課程管理頁面初始化
function adminGroupLessonInit() {
  getAdminGroupLessonData();
  addGroupLessonType();
}

adminGroupLessonInit();
