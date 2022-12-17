/* eslint-disable no-useless-return */
/* eslint-disable no-undef */
// const Url = 'https://high-rock-server.vercel.app';
// const Url = 'https://highrock-server-render.onrender.com';

const id = localStorage.getItem('userId');

// 渲染會員資訊
function renderMemberInfo(obj) {
  const memberEmail = document.querySelector('#member-email');
  const memberTel = document.querySelector('#member-tel');
  const memberName = document.querySelector('#member-name');
  const memberAccount = document.querySelector('#member-account');
  const memberPwd = document.querySelector('#member-pwd');

  if (memberEmail || memberTel || memberName || memberAccount || memberPwd) {
    memberEmail.value = obj.email;
    memberTel.value = obj.contactNumber;
    memberName.value = obj.name;
    memberAccount.value = obj.email;
    memberPwd.value = obj.password;
  }
}

// 編輯會員資訊
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
        // 取消後回復欄位內容
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

        // 清空錯誤訊息
        const formInputs = document.querySelectorAll(
          'input[name=email],input[name=tel],input[name=username]',
        );
        formInputs.forEach((item) => {
          item.nextElementSibling.textContent = '';
        });

        // disable 欄位
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

        // 判斷是否有空欄位
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

// 驗證會員資訊表單
function memberInfoFormValidate() {
  const memberInfoForm = document.querySelector('.member-info-form');

  if (memberInfoForm) {
    const constraints = {
      username: {
        presence: {
          message: '必填',
        },
      },
      email: {
        presence: {
          message: '必填',
        }, // Email 是必填欄位
        email: true, // 需要符合 email 格式
      },
      tel: {
        presence: {
          message: '必填',
        },
        length: {
          minimum: 8, // 長度要超過 8
          message: '至少 8 個數字',
        },
      },
      // password: {
      //   presence: {
      //     message: '是必填的欄位',
      //   },
      //   length: {
      //     minimum: 5, // 長度大於 ５
      //     maximum: 12, // 長度小於 12
      //     message: '^密碼長度需大於 5 小於 12',
      //   },
      // },
    };

    const formInputs = document.querySelectorAll(
      'input[name=email],input[name=tel],input[name=username]',
    );

    formInputs.forEach((item) => {
      item.addEventListener('change', () => {
        // 預設為空值
        item.nextElementSibling.textContent = '';

        // 驗證回傳的內容
        const errors = validate(memberInfoForm, constraints);

        // 呈現在畫面上
        if (errors) {
          Object.keys(errors).forEach((keys) => {
            document.querySelector(`.${keys}`).textContent = errors[keys];
          });
        }
      });
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
  memberInfoFormValidate();
}
