/* eslint-disable no-undef */
function renderAdminGroupLessonTable(arr) {
  const adminGroupLessonTable = document.querySelector('.admin-group-lesson-table');

  let str = '';

  arr.forEach((item) => {
    str += `
    <tr>
      <th scope="row">${item.groupLessonId}</th>
      <td>${item.name}</td>
      <td>${item.branch}</td>
      <td>${item.coach}</td>
      <td>
        <button type="button" class="btn btn-warning">新增團課日期</button>
      </td>
    </tr>
    `;
  });

  if (adminGroupLessonTable) {
    adminGroupLessonTable.innerHTML = str;
  }
}

function getAdminGroupLessonData() {
  axios
    .get('http://localhost:3000/lessons')
    .then((res) => {
      const { data } = res;
      renderAdminGroupLessonTable(data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

function adminGroupLessonInit() {
  getAdminGroupLessonData();
}

adminGroupLessonInit();
