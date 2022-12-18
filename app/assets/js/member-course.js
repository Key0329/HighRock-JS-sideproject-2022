/* eslint-disable no-undef */

// 渲染會員已報名課程
function renderMemberCourse(arr) {
  const memberCourseDetail = document.querySelector('.member-course-detail');

  let str = '';

  arr.forEach((item) => {
    const { batch } = item;

    str += `
    <li class="mb-4">
    <div class="row">
    <div class="col-11">
      <ul class="row row-cols-lg-2 px-6 py-8 bg-opacity-c1 list-unstyled">
        <li class="col mb-4">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程名稱：<span class="fs-5 fs-lg-4 fw-normal">${batch.name}</span>
          </p>
        </li>
        <li class="col mb-4">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程狀態：<span class="fs-5 fs-lg-4 fw-normal">${batch.isOpened}</span>
          </p>
        </li>
        <li class="col">
          <p class="fs-4 fs-lg-3 fw-bold">
            館別：<span class="fs-5 fs-lg-4 fw-normal">${batch.branch}</span>
          </p>
        </li>
        <li class="col">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程日期：<span class="fs-5 fw-normal"
              >${batch.content}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="col-1 d-flex align-items-center">
      <button type="button" class="cancel-course-btn btn btn-danger" data-batchid=${batch.id} data-id=${item.id}>取消報名</button>
    </div>
    </div>
      
    </li>
    `;
  });

  if (memberCourseDetail) {
    memberCourseDetail.innerHTML = str;
  }
}

// 渲染會員已預約團體課程
function renderMemberGroupLesson(arr) {
  const memberCourseGroupLessonDetail = document.querySelector(
    '.member-course-group-lesson-detail',
  );

  let str = '';

  arr.forEach((item) => {
    str += `
    <li class="mb-4">
    <div class="row">
    <div class="col-11">
      <ul class="row row-cols-lg-2 px-6 py-8 bg-opacity-c1 list-unstyled">
        <li class="col mb-4">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程名稱：<span class="fs-5 fs-lg-4 fw-normal">${item.name}</span>
          </p>
        </li>
        <li class="col mb-4">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程時間：<span class="fs-5 fs-lg-4 fw-normal">${item.time}</span>
          </p>
        </li>
        <li class="col">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程館別：<span class="fs-5 fs-lg-4 fw-normal">${item.branch}</span>
          </p>
        </li>
        <li class="col">
          <p class="fs-4 fs-lg-3 fw-bold">
            課程日期：<span class="fs-5 fw-normal"
              >${item.date}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="col-1 d-flex align-items-center">
      <button type="button" class="cancel-group-lesson-btn btn btn-danger" data-lessonid=${item.lesson.id} data-id=${item.id}>取消預約</button>
    </div>
    </div>
      
    </li>
    `;
  });

  if (memberCourseGroupLessonDetail) {
    memberCourseGroupLessonDetail.innerHTML = str;
  }
}

// 刪除已報名課程
function deleteCourse() {
  const cancelCourseBtns = document.querySelectorAll('.cancel-course-btn');
  cancelCourseBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      const deleteId = e.target.dataset.id;
      const batchId = e.target.dataset.batchid;

      Swal.fire({
        title: '確定刪除此課程?',
        text: '點擊確認後將為您取消該課程報名',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${Url}/students/${deleteId}`)
            .then(() => {})
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });

          axios
            .get(`${Url}/batches/${batchId}`)
            .then((res) => {
              const newSignUpNum = res.data.nowSignUp - 1;
              return axios.patch(`${Url}/batches/${batchId}`, {
                nowSignUp: newSignUpNum,
              });
            })
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              getCourseData();
            })

            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
          Swal.fire('已取消！', '您的課程已取消！', 'success');
        }
      });
    });
  });
}

// 刪除已預約團體課程
function deleteGroupLesson() {
  const cancelGroupLessonBtns = document.querySelectorAll('.cancel-group-lesson-btn');
  cancelGroupLessonBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      const deleteId = e.target.dataset.id;
      // const lessonId = e.target.dataset.lessonid;

      Swal.fire({
        title: '確定刪除此課程?',
        text: '點擊確認後將為您取消該課程報名',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${Url}/groupLessonStudents/${deleteId}`)
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              getGroupLessonData();
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });

          // axios
          //   .get(`${Url}/batches/${batchId}`)
          //   .then((res) => {
          //     const newSignUpNum = res.data.nowSignUp - 1;
          //     return axios.patch(`${Url}/batches/${batchId}`, {
          //       nowSignUp: newSignUpNum,
          //     });
          //   })
          //   .then(() => {
          //     // eslint-disable-next-line no-use-before-define
          //     getCourseData();
          //   })

          //   .catch((error) => {
          //     // eslint-disable-next-line no-console
          //     console.log(error);
          //   });
          Swal.fire('已取消！', '您的課程已取消！', 'success');
        }
      });
    });
  });
}

// 獲取報名課程資訊
function getCourseData() {
  const id = localStorage.getItem('userId');
  axios
    .get(`${Url}/users/${id}/students?_expand=batch`)
    .then((res) => {
      const { data } = res;
      renderMemberCourse(data);
      deleteCourse();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 獲取團體課程預約資訊
function getGroupLessonData() {
  const id = localStorage.getItem('userId');
  axios
    .get(`${Url}/users/${id}/groupLessonStudents?_expand=lesson`)
    .then((res) => {
      const { data } = res;

      renderMemberGroupLesson(data);
      deleteGroupLesson();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 會員課程頁面初始化
function memberCourseInit() {
  getCourseData();
  getGroupLessonData();
}

memberCourseInit();
