/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userID', user.id);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userNumber', user.contactNumber);
}

function renderNavMenu() {}

function login() {
  const memberLoginBtn = document.querySelector('.member-login-btn');

  if (memberLoginBtn) {
    memberLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const memberLoginEmail = document.querySelector('#member-login-email');
      const memberLoginPwd = document.querySelector('#member-login-password');
      const LoginPanel = document.querySelector('.login-panel');
      const navMenuLogin = document.querySelector('.nav-menu-login');
      const navMenuMember = document.querySelector('.nav-menu-member');

      const loginData = {
        email: memberLoginEmail.value.trim(),
        password: memberLoginPwd.value.trim(),
      };

      const hasInput = loginData.email && loginData.password;

      if (hasInput) {
        axios
          .post(`${Url}/login`, loginData)
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res);
            if (res.status === 200) {
              const str = '<h1 class="text-gray-c1 fw-bold mb-8">登入成功</h1><p>即將返回首頁</p>';
              LoginPanel.innerHTML = str;
              saveUserToLocal(res.data);
              setTimeout(() => {
                window.location.replace('/index.html');
              }, '3000');
              navMenuLogin.classList.add('d-none');
              navMenuMember.classList.remove('d-none');
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
            LoginPanel.innerHTML = error.response.data || error;
          });
      } else {
        alert('還有空欄位未填');
      }
    });
  }
}

function expandMemberNavMenu() {
  const navMenuMemberBtn = document.querySelector('.nav-menu-member-btn');

  if (navMenuMemberBtn) {
    navMenuMemberBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const navMenuMemberBtnExpand = document.querySelector('.nav-menu-member-btn-expand');
      const navMenuMemberPanel = document.querySelector('.nav-menu-member-panel');

      if (
        navMenuMemberBtnExpand.classList.contains('active')
        && navMenuMemberPanel.classList.contains('active')
      ) {
        navMenuMemberBtnExpand.classList.remove('active');
        navMenuMemberPanel.classList.remove('active');
      } else {
        navMenuMemberBtnExpand.classList.add('active');
        navMenuMemberPanel.classList.add('active');
      }
    });
  }
}

login();
expandMemberNavMenu();
