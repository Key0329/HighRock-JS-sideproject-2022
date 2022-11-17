/* eslint-disable no-undef */

const Url = 'http://localhost:3000';

function renderAdminMember(arr) {
  const adminMemberTable = document.querySelector('.admin-member-table');

  let str = '';

  arr.forEach((item) => {
    // console.log(item);
    str = `
    <tr class="vertical-middle">
      <th scope="row">ABC120222</th>
      <td>
        <div class="admin-account-avatar me-2">
          <img
            class="rounded-circle"
            src="./assets/images/Avatar/Avatar-1.jpg"
            alt="avatar"
          />
        </div>
      </td>
      <td>麥杰倫</td>
      <td>0933-666-888</td>
      <td>likeclimbing@gmail.com</td>
      <td>2022-12-14 ～ 2023-6-13</td>
      <td class="text-success">未到期</td>
    </tr>
    `;
  });

  if (adminMemberTable) {
    adminMemberTable.innerHTML = str;
  }
}

axios
  .get(`${Url}/users`)
  .then((res) => {
    const { data } = res;
    renderAdminMember(data);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
