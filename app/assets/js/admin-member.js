/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

// 渲染後臺會員列表
function renderAdminMember(arr) {
  const adminMemberTable = document.querySelector('.admin-member-table');
  let str = '';
  let status = '';
  let statusColor = '';

  arr.forEach((item) => {
    if (item.isExpired === true) {
      status = '已到期';
      statusColor = 'text-danger';
    } else {
      status = '未到期';
      statusColor = 'text-success';
    }

    str += `
    <tr class="vertical-middle">
      <th scope="row">MEM ${item.id}</th>
      <td>
        <div class="admin-account-avatar me-2">
          <img
            class="rounded-circle"
            src="${item.photo}"
            alt="avatar"
          />
        </div>
      </td>
      <td>${item.name}</td>
      <td>${item.contactNumber}</td>
      <td>${item.email}</td>
      <td>${item.startDate} ～ ${item.expireDate}</td>
      <td class=${statusColor}>${status}</td>
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
