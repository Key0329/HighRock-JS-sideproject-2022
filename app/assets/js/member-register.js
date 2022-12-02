/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

// 註冊
function signUp() {
  const memberRegisterBtn = document.querySelector('.member-register-btn');

  if (memberRegisterBtn) {
    memberRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();

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
      };

      const hasInput = registerData.email
        && registerData.password
        && registerData.name
        && registerData.contactNumber;

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
                window.location.replace('/member-login.html');
              }, '3000');
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            registerPanel.innerHTML = error.response.data || error;
          });
      }
    });
  }
}

function init() {
  signUp();
}

init();
