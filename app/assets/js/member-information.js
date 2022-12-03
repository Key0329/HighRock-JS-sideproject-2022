/* eslint-disable no-useless-return */
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

function editMemberInfo() {
  const memberInfoPanel = document.querySelector('.member-info-panel');
  const memberInfoEdit = document.querySelector('.member-info-edit');
  const memberInfoConfirmArea = document.querySelector('.member-info-confirm-area');
  const memberInfo = document.querySelectorAll('.member-info');

  if (memberInfoPanel) {
    memberInfoPanel.addEventListener('click', (e) => {
      e.preventDefault();
      const targetClass = e.target.classList;

      if (e.target.nodeName !== 'A') {
        return;
      }
      if (targetClass.contains('member-info-edit')) {
        targetClass.add('d-none');
        memberInfoConfirmArea.classList.remove('d-none');
        memberInfo.forEach((item) => {
          item.removeAttribute('disabled');
        });
      } else if (targetClass.contains('member-info-cancel')) {
        if (
          memberInfo[0].value === ''
          || memberInfo[1].value === ''
          || memberInfo[2].value === ''
        ) {
          axios
            .get(`${Url}/users/${id}`)
            .then((res) => {
              memberInfo[0].value = res.data.email;
              memberInfo[1].value = res.data.contactNumber;
              memberInfo[2].value = res.data.name;
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        }

        memberInfoConfirmArea.classList.add('d-none');
        memberInfoEdit.classList.remove('d-none');
        memberInfo.forEach((item) => {
          item.setAttribute('disabled', '');
        });
      } else if (targetClass.contains('member-info-save')) {
        const obj = {};

        obj.email = memberInfo[0].value;
        obj.contactNumber = memberInfo[1].value;
        obj.name = memberInfo[2].value;

        if (obj.email === '' || obj.contactNumber === '' || obj.name === '') {
          Swal.fire({
            icon: 'warning',
            title: '還有空欄位未填',
            showConfirmButton: false,
            timer: 3000,
          });
          return;
        }

        memberInfoConfirmArea.classList.add('d-none');
        memberInfoEdit.classList.remove('d-none');
        memberInfo.forEach((item) => {
          item.setAttribute('disabled', '');
        });

        axios
          .patch(`${Url}/users/${id}`, obj)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: 'success',
                title: '編輯成功',
                showConfirmButton: false,
                timer: 3000,
              });
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    });
  }
}

// 從遠端取得該會員資訊並渲染
function getUserData() {
  axios
    .get(`${Url}/users/${id}`)
    .then((res) => {
      const { data } = res;
      renderMemberInfo(data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 如果本地端有會員資訊才渲染
if (id) {
  getUserData();
  editMemberInfo();
}
