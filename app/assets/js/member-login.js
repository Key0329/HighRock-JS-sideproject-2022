/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

// 將登入資訊存入 LocalStorage
function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userId', user.id);
}

// 將登入資訊從 LocalStorage 移除
function removeUserFromLocal() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userId');
}

// 未登入 nav menu 渲染
function renderVisitorNavMenu() {
  const navMenu = document.querySelector('.nav-menu');
  let str = '';

  str = `
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">場館資訊</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./courses-index.html">課程介紹</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">團體課程</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">會員方案</a></li>
  <li class="nav-menu-login"><a class="nav-menu-login-btn text-gray hover-decoBorder-bottom-gradient position-relative py-2 ms-8 pe-0" href="./member-login.html">登入</a></li>
  `;

  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 登入後 nav menu 渲染
function renderLoginRenderNavMenu() {
  const navMenu = document.querySelector('.nav-menu');
  let str = '';

  str = `
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">場館資訊</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./courses-index.html">課程介紹</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">團體課程</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">會員方案</a></li>
  <li class="nav-menu-member position-relative">
    <a class="nav-menu-member-btn position-relative text-gray d-flex align-items-center py-2 ms-8 pe-0" href="#">
      <img class="rounded-3" src="./assets/images/Avatar/anonymous.jpg" alt="anonymous">
      <span class="nav-menu-member-btn-expand  fs-3 material-symbols-outlined">
        expand_more
        </span>
    </a>
    <ul class="nav-menu-member-panel list-unstyled position-absolute">
      <li>
      <a class="text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2" href="./member-information.html">會員資料</a>
      </li>
      <li>
      <a class="text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2" href="./member-course.html">課程管理</a>
      </li>
      <li>
      <a class="nav-menu-logout-btn text-white position-relative hover-decoBorder-bottom-gradient py-1" href="#">登出</a>
      </li>
    </ul>
  </li>
  `;

  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 判斷登入狀態後渲染 nav menu
function renderNavMenu() {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    renderLoginRenderNavMenu();
  } else {
    renderVisitorNavMenu();
  }
}

// 登入
function login() {
  const memberLoginBtn = document.querySelector('.member-login-btn');

  if (memberLoginBtn) {
    memberLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const memberLoginEmail = document.querySelector('#member-login-email');
      const memberLoginPwd = document.querySelector('#member-login-password');
      const LoginPanel = document.querySelector('.login-panel');

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
              renderLoginRenderNavMenu();
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

// 會員下拉選單開合
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

// 登出
function logout() {
  const navMenuLogoutBtn = document.querySelector('.nav-menu-logout-btn');
  if (navMenuLogoutBtn) {
    navMenuLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeUserFromLocal();
      renderVisitorNavMenu();
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.replace('/member-login.html');
      }, '3000');
    });
  }
}

// 登入初始渲染
function loginInit() {
  renderNavMenu();
  login();
  expandMemberNavMenu();
  logout();
}

loginInit();
