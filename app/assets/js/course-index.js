/* eslint-disable no-undef */

const Url = 'http://localhost:3000';
let toggleList = 'introduction';

// ---------------------- 報名課程 彈跳視窗 ----------------------

// model 關閉
function registerModelClose() {
  const registerModel = document.querySelector('.register-model');
  const registerModelNonMember = document.querySelector('.register-model-nonMember');

  registerModel.classList.remove('register-model--active');
  registerModelNonMember.classList.remove('register-model--active');
}

// model 控制
function registerModelControl() {
  const registerModel = document.querySelector('.register-model');
  const registerModelOpenBtn = document.querySelector('.register-btn');

  // 開啟彈跳視窗
  if (registerModelOpenBtn) {
    registerModelOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      registerModel.classList.add('register-model--active');
    });
  }

  // 點擊視窗外關閉
  registerModel.addEventListener('click', (event) => {
    if (event.target.getAttribute('class') === 'register-model register-model--active') {
      registerModelClose();
    }
  });

  // 鍵盤按 ESC 可關閉彈跳視窗
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      registerModelClose();
    }
  });
}

// 非會員報名彈跳視窗;
function registerModelNonMemberFormCheck(arr) {
  const registerModelBtnNonMember = document.querySelector('.register-model-btn-nonMember');
  const registerModelNonMember = document.querySelector('.register-model-nonMember');

  if (registerModelBtnNonMember) {
    registerModelBtnNonMember.addEventListener('click', (e) => {
      e.preventDefault();

      const courseName = document.querySelector('.course-name');
      const courseBranch = document.querySelector('#course-branch');
      const courseBatch = document.querySelector('#course-batch');
      const nonMemberPrice = document.querySelector('.course-nonmember-price');
      const courseNonMemberBatchId = document.querySelector('#course-nonMember-id');
      const courseNonMemberName = document.querySelector('#course-nonMember-name');
      const courseNonMemberPrice = document.querySelector('#course-nonMember-price');
      const courseNonMemberBranch = document.querySelector('#course-nonMember-branch');
      const courseNonMemberBatch = document.querySelector('#course-nonMember-batch');
      let registerBatchId = '';

      arr.forEach((item) => {
        if (
          item.branch === courseBranch.value
          && item.content === courseBatch.value
          && item.name === courseName.textContent.trim()
        ) {
          registerBatchId = item.batchId;
        }
      });

      // 帶資料到確認頁面
      courseNonMemberBatchId.value = registerBatchId;
      courseNonMemberName.value = courseName.textContent.trim();
      courseNonMemberPrice.value = nonMemberPrice.textContent.trim();
      courseNonMemberBranch.value = courseBranch.value.trim();
      courseNonMemberBatch.value = courseBatch.value.trim();

      // 關閉前一個視窗
      registerModelClose();

      // 打開下個頁面
      registerModelNonMember.classList.add('register-model--active');

      // 點擊視窗外關閉
      registerModelNonMember.addEventListener('click', (event) => {
        if (
          event.target.getAttribute('class') === 'register-model-nonMember register-model--active'
        ) {
          registerModelClose();
        }
      });
    });
  }
}

// 更新後台資料並重新渲染
async function updateDataAndRerender() {
  try {
    const registerNonMemberId = document.querySelector('#course-nonMember-id');
    const registerNonMemberName = document.querySelector('#register-nonMember-name');
    const registerNonMemberEmail = document.querySelector('#register-nonMember-email');
    const registerNonMemberPhoneNum = document.querySelector('#register-nonMember-phoneNum');

    const idValue = registerNonMemberId.value;

    const registeredStudentInfo = {
      isUser: false,
      batchId: idValue,
      name: registerNonMemberName.value,
      email: registerNonMemberEmail.value,
      contactNumber: registerNonMemberPhoneNum.value,
    };

    // 傳送報名資訊到資料庫;
    const res = await axios.post(`${Url}/registeredStudent`, registeredStudentInfo);
    const courseNowSignUp = document.querySelector('.course-nowSignUp');
    const courseBranch = document.querySelector('#course-branch');
    const courseBatch = document.querySelector('#course-batch');
    courseNowSignUp.innerHTML = '';
    courseBranch.value = '- 請選擇分館 -';
    courseBatch.value = '- 請選擇梯次 -';

    // 取得最新學生人數
    const res2 = await axios.get(`${Url}/batches/${idValue}/registeredStudent`);
    const registerNum = res2.data.length;
    const obj = {
      nowSignUp: registerNum,
    };

    // 更新資料庫最新報名人數
    const res3 = await axios.patch(`${Url}/batches/${idValue}`, obj);

    // 重新渲染梯次表單
    const res4 = await axios.get(`${Url}/batches`);
    const newData = res4.data;
    // eslint-disable-next-line no-use-before-define
    batchesChange(newData);

    return {
      res,
      res3,
    };
  } catch (error) {
    return error;
  }
}

// 非會員 form 表單確認或取消
function nonMemberFormConfirmOrCancel() {
  const registerModelNonMemberForm = document.querySelector('.register-model-nonMember-form');

  if (registerModelNonMemberForm) {
    registerModelNonMemberForm.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.type === 'submit') {
        updateDataAndRerender().then((res, res3) => {
          // eslint-disable-next-line no-console
          console.log(res, res3);
        });

        // sweet alert
        Swal.fire({
          icon: 'success',
          title: '報名成功<br />請前往填寫的信箱收取報名資訊',
          showConfirmButton: false,
          timer: 3000,
        });

        // 關閉視窗
        registerModelClose();
      } else if (e.target.nodeName === 'A') {
        registerModelClose();
      }
    });
  }
}

// ---------------------- 報名課程頁面 ----------------------

// 渲染 course register panel
function renderCourseRegisterPanel(arr) {
  const registerPanel = document.querySelector('.register-panel');

  let str = '';
  const batchStr = `<option class="letter-12" value="- 請選擇梯次 -" selected disabled>
  - 請選擇梯次 -
</option>`;
  let branchStr = `<option class="letter-12" value="- 請選擇分館 -" selected disabled>
  - 請選擇分館 -
</option>`;

  arr.forEach((item) => {
    const branchArr = item.branches;

    // 場館
    branchArr.forEach((i) => {
      branchStr += `
      <option value="${i}">${i}</option>
      `;
    });

    str = `
    <div class="container">
      <div class="row row-cols-1 row-cols-lg-2 g-lg-8">
        <div class="col d-none d-lg-block">
          <img class="w-100" src="${item.image}" alt="${item.name}" />
        </div>
        <div class="col">
          <h1 class="course-name" text-center text-lg-start fw-bold fs-1 display-size-lg-5 my-4 my-lg-10">
            ${item.name}
          </h1>
          <div class="d-flex flex-column flex-lg-row align-items-center mb-4 mb-lg-10">
            <del class="course-nonmember-price fs-lg-1 me-lg-4">NT$ ${item.price}</del>
            <p class="course-member-price fs-lg-1 text-danger">NT$ ${item.userPrice}</p>
          </div>
          <form>
            <div class="d-flex flex-column mb-6">
              <label for="course-branch" class="letter-12">請選擇分館</label>
              <select class="w-100 w-lg-50 mt-2 py-1 ps-2" name="course-branch" id="course-branch">
                ${branchStr}
              </select>
            </div>
            <div class="register-batch d-flex flex-column mb-10 mb-lg-16">
              <label for="course-batch" class="letter-12">請選擇梯次</label>
              <select class="w-100 w-lg-75 my-2 py-1 ps-2" name="course-batch" id="course-batch">
                ${batchStr}
              </select>
              <p class="course-nowSignUp"></p>
            </div>
            <input
              type="submit"
              value="報名本梯次課程"
              class="register-btn btn btn-primary w-100 w-lg-auto rounded-3 px-8"
            />
          </form>
        </div>
      </div>
      <img
        class="register-course-text position-absolute d-none d-lg-block"
        src="${item.courseNameEn}"
      />
    </div>
    `;
  });
  registerPanel.innerHTML = str;
}

// 渲染 course info
function renderCourseContent(arr) {
  const registerInfoContent = document.querySelector('.register-info-content');

  let courseInfoStr = '';

  arr.forEach((item) => {
    const introductionStr = `<p>${item.introduction}</p>`;
    const contentStr = `<p>${item.content}</p>`;
    const informationStr = `
    <ol>
      <li class="mb-4">
        課程天數：${item.information.time} ( 週間班上課時間為 19:00～22:00 、週末班上課時間為上午
        09:00～12:00 )
      </li>
      <li class="mb-4">課程地點：${item.information.location}</li>
      <li class="mb-4">參與人數：${item.information.studentLimitNumber}</li>
      <li class="mb-4">課程優惠：${item.information.discount}</li>
    </ol>
    `;

    const cancellationPolicyStr = `
    <p>${item.cancellationPolicy.company}</p>
    <p class="mb-4">${item.cancellationPolicy.student.title}</p>
    <ul class="list-unstyled">
      <li>${item.cancellationPolicy.student.contents[0]}</li>
      <li>${item.cancellationPolicy.student.contents[1]}</li>
      <li>${item.cancellationPolicy.student.contents[2]}</li>
    </ul>
    `;

    if (toggleList === 'introduction') {
      courseInfoStr = introductionStr;
    } else if (toggleList === 'content') {
      courseInfoStr = contentStr;
    } else if (toggleList === 'information') {
      courseInfoStr = informationStr;
    } else if (toggleList === 'cancellationPolicy') {
      courseInfoStr = cancellationPolicyStr;
    }
  });

  registerInfoContent.innerHTML = courseInfoStr;
}

// 渲染 other courses
function renderOtherCourse(arr) {
  const otherCourses = document.querySelector('.other-courses');

  let str = '';

  arr.forEach((item) => {
    str += `
          <li class="col mb-6 mb-lg-0">
            <img class="mb-4" src="${item.image}" alt="${item.name}" />
            <h3 class="text-center text-lg-start mb-2">${item.name}</h3>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <p class="me-2">NT$ ${item.price}</p>
              <p class="mb-8">尚有名額</p>
            </div>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <a href="#" class="btn btn-primary rounded-3 px-8 py-2" data-courseId="${item.courseId}"
                >查看詳情</a
              >
            </div>
          </li>
        `;
  });
  otherCourses.innerHTML = str;
}

// tab 切換
function registerTabToggle(arr) {
  const registerTab = document.querySelector('.register-tabs');
  const registerTabList = document.querySelectorAll('.register-tabs li');

  registerTab.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
      return;
    }

    toggleList = e.target.dataset.courseinfotitle;

    registerTabList.forEach((item) => {
      item.classList.remove('register-tab-active');
    });
    e.target.closest('li').classList.add('register-tab-active');
    renderCourseContent(arr);
  });
}

// 更改梯次
function batchesChange(array) {
  const registerPanel = document.querySelector('.register-panel');

  if (registerPanel) {
    registerPanel.addEventListener('change', (e) => {
      const courseName = document.querySelector('.course-name');
      const courseBranch = document.querySelector('#course-branch');
      const courseBatch = document.querySelector('#course-batch');
      const courseNowSignUp = document.querySelector('.course-nowSignUp');
      let batchRestSignUp = '';

      // 根據館別更改梯次
      if (e.target.id === 'course-branch') {
        let batchStr = `<option class="letter-12" value="- 請選擇梯次 -" selected disabled>
      - 請選擇梯次 -
    </option>`;

        array.forEach((item) => {
          if (item.branch === courseBranch.value && item.name === courseName.textContent.trim()) {
            batchStr += `<option value="${item.content}">${item.content}</option>`;
          }
          courseBatch.innerHTML = batchStr;
          courseNowSignUp.innerHTML = '';
        });
      }
      // 判斷梯次後顯示可報名人數;
      if (e.target.id === 'course-batch') {
        array.forEach((item) => {
          if (
            courseBranch.value === item.branch
            && courseBatch.value === item.content
            && courseName.textContent.trim() === item.name
          ) {
            batchRestSignUp = item.maximumSignUp - item.nowSignUp;
          }
        });
        courseNowSignUp.innerHTML = `※ 還有 ${batchRestSignUp} 位名額`;
      }
    });
  }
}

// 點擊相關課程並渲染
function checkOtherCourses(arr) {
  const otherCourses = document.querySelector('.other-courses');

  if (otherCourses) {
    otherCourses.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.nodeName === 'A') {
        window.scrollTo(0, 0);

        const nowData = [];
        const othersData = [];

        arr.forEach((item) => {
          // console.log(item.courseId);
          if (e.target.dataset.courseid === item.courseId) {
            nowData.push(item);
          } else {
            othersData.push(item);
          }
        });
        renderCourseRegisterPanel(nowData);
        renderCourseContent(nowData);
        registerTabToggle(nowData);
        renderOtherCourse(othersData);
        registerModelControl();
      }
    });
  }
}

// 開啟報名頁面、根據所選課程初始渲染
function courseRegisterOpen(arr) {
  const coursesList = document.querySelector('.courses-list');
  const courseRegister = document.querySelector('.course-register');

  if (coursesList) {
    coursesList.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.nodeName === 'A') {
        courseRegister.classList.remove('d-none');
        coursesList.classList.add('d-none');
        window.scrollTo(0, 0);

        const nowData = [];
        const othersData = [];

        arr.forEach((item) => {
          // console.log(item.courseId);
          if (e.target.dataset.courseid === item.courseId) {
            nowData.push(item);
          } else {
            othersData.push(item);
          }
        });
        renderCourseRegisterPanel(nowData);
        renderCourseContent(nowData);
        registerTabToggle(nowData);
        renderOtherCourse(othersData);
        registerModelControl();
      }
    });
  }
}

// course index 頁面渲染
function courseIndexRender() {
  axios
    .get(`${Url}/courses`)
    .then((res) => {
      const { data } = res;
      courseRegisterOpen(data);
      checkOtherCourses(data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 檢查報名表格、更新報名人數
function checkNonMemberFormANdUpdateNowSignUp() {
  axios
    .get(`${Url}/batches`)
    .then((res) => {
      const batchesData = res.data;
      registerModelNonMemberFormCheck(batchesData);
      batchesChange(batchesData);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

courseIndexRender();
checkNonMemberFormANdUpdateNowSignUp();
nonMemberFormConfirmOrCancel();
