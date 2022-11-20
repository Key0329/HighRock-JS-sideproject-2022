/* eslint-disable no-undef */

const id = localStorage.getItem('userId');

function renderMemberCourse(arr) {
  const memberCourseDetail = document.querySelector('.member-course-detail');

  let str = '';

  arr.forEach((item) => {
    const { batch } = item;

    str += `
    <li class="mb-4">
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
    </li>
    `;
  });

  if (memberCourseDetail) {
    memberCourseDetail.innerHTML = str;
  }
}

axios
  .get(`${Url}/users/${id}/registeredStudents?_expand=batch`)
  .then((res) => {
    const { data } = res;
    renderMemberCourse(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
