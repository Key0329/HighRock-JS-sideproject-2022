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

// 刪除已報名課程
function deleteCourse() {
  const cancelCourseBtns = document.querySelectorAll('.cancel-course-btn');
  cancelCourseBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      const deleteId = e.target.dataset.id;
      const batchId = e.target.dataset.batchid;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
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
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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

// 會員課程頁面初始化
function memberCourseInit() {
  getCourseData();
}

memberCourseInit();
