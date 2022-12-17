/* eslint-disable no-undef */
// const Url = 'https://high-rock-server.vercel.app';
// const Url = 'https://highrock-server-render.onrender.com';

// 註冊
function signUp() {
  const memberRegisterEmail = document.querySelector('#member-register-email');
  const memberRegisterPwd = document.querySelector('#member-register-password');
  const memberRegisterName = document.querySelector('#member-register-name');
  const memberRegisterNumber = document.querySelector('#member-register-number');
  const registerPanel = document.querySelector('.register-panel');

  const registerData = {
    email: memberRegisterEmail.value.trim(),
    password: memberRegisterPwd.value.trim(),
    name: memberRegisterName.value.trim(),
    contactNumber: memberRegisterNumber.value.trim(),
    role: 'user',
    photo:
      'https://github.com/Key0329/HighRock-JS-sideproject-2022/blob/main/app/assets/images/Icon/climber.png?raw=true',
  };
  // eslint-disable-next-line max-len
  const hasInput = registerData.email && registerData.password && registerData.name && registerData.contactNumber;

  if (hasInput) {
    axios
      .post(`${Url}/register`, registerData)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);

        if (res.status === 201) {
          const str = '<h1 class="text-gray-c1 fw-bold mb-8">註冊成功</h1><p>正在返回登入頁</p>';
          registerPanel.innerHTML = str;
          setTimeout(() => {
            window.location.replace('./member-login.html');
          }, '3000');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error.response.data === 'Email already exists') {
          registerPanel.innerHTML = '帳號已註冊';
        } else {
          registerPanel.innerHTML = error.response.data || error;
        }
        setTimeout(() => {
          window.location.replace('./member-login.html');
        }, '3000');
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: '還有空欄位未填',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

// 驗證註冊表單
function memberSignUpFormValidate() {
  const memberRegisterForm = document.querySelector('.member-register-form');

  if (memberRegisterForm) {
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
      password: {
        presence: {
          message: '必填',
        },
        length: {
          minimum: 5, // 長度大於 ５
          maximum: 12, // 長度小於 12
          message: '^密碼長度需大於 5 小於 12',
        },
      },
    };

    const formInputs = document.querySelectorAll(
      'input[name=email],input[name=tel],input[name=username],input[name=password]',
    );

    formInputs.forEach((item) => {
      item.previousElementSibling.textContent = '(必填)';
      item.addEventListener('change', () => {
        // 預設為空值
        item.previousElementSibling.textContent = '';

        // 驗證回傳的內容
        const errors = validate(memberRegisterForm, constraints);

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

// 滑鼠點擊
function mousesSignUp() {
  const memberRegisterBtn = document.querySelector('.member-register-btn');

  if (memberRegisterBtn) {
    memberRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signUp();
    });
  }
}

// Enter確認
function keyboardSignUp() {
  const registerPanel = document.querySelector('.register-panel');

  if (registerPanel) {
    registerPanel.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.key === 'Enter') {
        signUp();
      }
    });
  }
}

function memberRegisterInit() {
  mousesSignUp();
  keyboardSignUp();
  memberSignUpFormValidate();
}

memberRegisterInit();
