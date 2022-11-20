/* eslint-disable no-undef */
const Url = 'http://localhost:3000';
const id = localStorage.getItem('userId');

// 渲染會員資訊
function renderMemberInfo(obj) {
  const memberEmail = document.querySelector('#member-email');
  const memberTel = document.querySelector('#member-tel');
  const memberName = document.querySelector('#member-name');
  const memberAccount = document.querySelector('#member-account');
  const memberPwd = document.querySelector('#member-pwd');
  const memberDetail = document.querySelector('.member-detail');

  if (memberEmail || memberTel || memberName || memberAccount || memberPwd) {
    memberEmail.value = obj.email;
    memberTel.value = obj.contactNumber;
    memberName.value = obj.name;
    memberAccount.value = obj.email;
    memberPwd.value = obj.password;
  }

  let str = '';

  str = `
  <p class="fs-4 fs-lg-3 mb-2">會員編號：<span>MEM - ${obj.id} </span></p>
  <p class="fs-4 fs-lg-3 mb-2">會員資格：<span>免費會員</span></p>
  <p class="fs-4 fs-lg-3">VIP 起訖日：<span>無</span></p>
  `;

  if (memberDetail) {
    memberDetail.innerHTML = str;
  }
}

// 從遠端取得該會員資訊並渲染
function getUserData() {
  axios.get(`${Url}/users/${id}`).then((res) => {
    const { data } = res;
    renderMemberInfo(data);
  });
}

// 如果本地端有會員資訊才渲染
if (id) {
  getUserData();
}
