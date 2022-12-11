/* eslint-disable no-undef */
// const Url = 'https://high-rock-server.vercel.app';
const Url = 'https://highrock-server-render.onrender.com';

// 將登入資訊存入 LocalStorage
function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userId', user.id);
  localStorage.setItem('role', user.role);
}

// 將登入資訊從 LocalStorage 移除
function removeUserFromLocal() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('role');
}

// 未登入 nav menu 渲染
function renderVisitorNavMenu() {
  const navMenu = document.querySelector('.nav-menu');
  let str = '';

  str = `
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./gym-info.html">場館資訊</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./courses-index.html">課程介紹</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./group-lessons.html">團體課程</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">商品專區</a></li>
  <li class="nav-menu-login"><a class="nav-menu-login-btn text-gray hover-decoBorder-bottom-gradient position-relative py-2 ms-8 pe-0" href="./member-login.html">登入</a></li>
  `;

  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 登入後 nav menu 渲染 (一般使用者)
function renderLoginRenderNavMenu() {
  const navMenu = document.querySelector('.nav-menu');
  let str = '';

  str = `
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./gym-info.html">場館資訊</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./courses-index.html">課程介紹</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./group-lessons.html">團體課程</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">商品專區</a></li>
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

// 登入後 nav menu 渲染 (最高權限)
function renderLoginNavMenuAAdmin() {
  const navMenu = document.querySelector('.nav-menu');
  let str = '';

  str = `
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./gym-info.html">場館資訊</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./courses-index.html">課程介紹</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="./group-lessons.html">團體課程</a></li>
  <li><a class="text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8" href="#">商品專區</a></li>
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
  <li><a class="btn btn-gray-c1 text-gray py-2 px-6 ms-8" href="./admin-course.html">後台</a></li>
  `;

  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 判斷登入狀態後渲染 nav menu
function renderNavMenu() {
  const savedRole = localStorage.getItem('role');
  if (savedRole === 'admin') {
    renderLoginNavMenuAAdmin();
  } else if (savedRole === 'user') {
    renderLoginRenderNavMenu();
  } else {
    renderVisitorNavMenu();
  }
}

// 登入記住帳號
function accountRemember() {
  const memberAccountRemember = document.querySelector('#member-account-remember');
  const memberLoginEmail = document.querySelector('#member-login-email');
  // memberAccountRemember.setAttribute('checked', 'checked');

  if (memberAccountRemember.checked === true) {
    localStorage.setItem('accountRemembered', memberLoginEmail.value);
  } else {
    localStorage.removeItem('accountRemembered');
  }
}

// 渲染登入記住帳號
function renderMemberLoginRemember() {
  const memberAccountRemember = document.querySelector('#member-account-remember');
  const memberLoginEmail = document.querySelector('#member-login-email');
  if (localStorage.getItem('accountRemembered')) {
    if (memberAccountRemember) {
      memberLoginEmail.value = localStorage.getItem('accountRemembered');
      memberAccountRemember.setAttribute('checked', 'checked');
    }
  }
}

// 登入
function login() {
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
          accountRemember();
          LoginPanel.innerHTML = str;
          saveUserToLocal(res.data);
          setTimeout(() => {
            window.location.replace('./index.html');
            // window.history.go(-1);
          }, '3000');
          renderLoginRenderNavMenu();
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error.response.data === 'Cannot find user') {
          LoginPanel.innerHTML = '找不到此帳號';
        } else {
          LoginPanel.innerHTML = error.response.data || error;
        }
        setTimeout(() => {
          window.location.replace('./member-login.html');
        }, '2000');
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

// 驗證登入表單
function memberLoginFormValidate() {
  const memberLoginForm = document.querySelector('.member-login-form');

  if (memberLoginForm) {
    const constraints = {
      email: {
        presence: {
          message: '必填',
        }, // Email 是必填欄位
        email: true, // 需要符合 email 格式
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

    const formInputs = document.querySelectorAll('input[name=email],input[name=password]');

    formInputs.forEach((item) => {
      item.addEventListener('change', () => {
        // 預設為空值
        item.previousElementSibling.textContent = '';
      });
    });

    // 驗證回傳的內容
    const errors = validate(memberLoginForm, constraints);

    // 呈現在畫面上
    if (errors) {
      Object.keys(errors).forEach((keys) => {
        document.querySelector(`.${keys}`).textContent = errors[keys];
      });
    }
  }
}

// 滑鼠登入
function mouseLogin() {
  const memberLoginBtn = document.querySelector('.member-login-btn');

  if (memberLoginBtn) {
    memberLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      memberLoginFormValidate();
      login();
    });
  }
}

// 鍵盤登入
function keyboardLogin() {
  const loginPanel = document.querySelector('.login-panel');

  if (loginPanel) {
    loginPanel.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.key === 'Enter') {
        memberLoginFormValidate();
        login();
      }
    });
  }
}

// 會員下拉選單開合
function expandMemberNavMenu() {
  const navMenuMemberBtn = document.querySelector('.nav-menu-member-btn');

  if (navMenuMemberBtn) {
    const navMenuMemberBtnExpand = document.querySelector('.nav-menu-member-btn-expand');
    const navMenuMemberPanel = document.querySelector('.nav-menu-member-panel');

    navMenuMemberBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // if (
      //   navMenuMemberBtnExpand.classList.contains('active')
      //   && navMenuMemberPanel.classList.contains('active')
      // ) {
      //   navMenuMemberBtnExpand.classList.remove('active');
      //   navMenuMemberPanel.classList.remove('active');
      // } else {
      navMenuMemberBtnExpand.classList.add('active');
      navMenuMemberPanel.classList.add('active');
      // }
    });

    // 點擊視窗外關閉
    document.addEventListener(
      'click',
      (e) => {
        // console.log(e.target);
        if (e.target !== navMenuMemberPanel && e.target !== navMenuMemberBtn) {
          navMenuMemberBtnExpand.classList.remove('active');
          navMenuMemberPanel.classList.remove('active');
        }
      },
      true,
    );
  }
}

// 前台登出
function frontLogout() {
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
        window.location.replace('./member-login.html');
      }, '3000');
    });
  }
}

// 後台登出
function adminLogout() {
  const adminLogoutBtn = document.querySelector('.admin-logout-btn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', (e) => {
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
        window.location.replace('./member-login.html');
      }, '3000');
    });
  }
}

// 登入初始渲染
function loginInit() {
  renderNavMenu();
  mouseLogin();
  keyboardLogin();
  expandMemberNavMenu();
  frontLogout();
  adminLogout();
  renderMemberLoginRemember();
}

loginInit();
