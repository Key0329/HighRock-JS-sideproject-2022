"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000'; // ---------------------- 後台-活動課程管理 ----------------------
// 渲染活動課程梯次

function renderAdminBatches(arr) {
  // 活動課程梯次
  var adminBatchTable = document.querySelector('.admin-batch-table');
  var str = '';
  arr.forEach(function (item) {
    var isOpenedColor = '';

    if (item.isOpened === '已開課') {
      isOpenedColor = 'text-success';
    } else {
      isOpenedColor = 'text-danger';
    }

    str += "\n    <tr data-id=\"".concat(item.batchId, "\">\n      <th class=\"text-center\" scope=\"row\">").concat(item.batchId, "</th>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.branch, "</td>\n      <td>").concat(item.coach, "</td>\n      <td>").concat(item.content, "</td>\n      <td><a href=\"#\" class=\"registered-student-btn d-inline-block d-flex align-items-center hover-orange\">").concat(item.nowSignUp, " / ").concat(item.maximumSignUp, " \u4F4D  <span class=\"material-symbols-outlined vertical-middle ms-1\">\n      add_circle\n      </span></a></td>\n      <td class=\"").concat(isOpenedColor, "\">").concat(item.isOpened, "</td>\n    </tr>\n    ");
  });

  if (adminBatchTable) {
    adminBatchTable.innerHTML = str;
  }
} // 渲染已報名學生


function renderAdminStudents(arr) {
  // 活動課程已報名學生資訊
  var adminRegisteredTable = document.querySelector('.admin-registered-table');
  var regiStr = '';
  arr.forEach(function (item) {
    var isMember = '';

    if (item.isUser === true) {
      isMember = '會員';
    } else {
      isMember = '非會員';
    }

    regiStr += "\n    <tr>\n      <th scope=\"row\">".concat(item.name, "</th>\n      <td>").concat(item.email, "</td>\n      <td>").concat(item.contactNumber, "</td>\n      <td>").concat(isMember, "</td>\n      <td>").concat(item.batchId, "</td>\n    </tr>\n    ");
  });

  if (adminRegisteredTable) {
    adminRegisteredTable.innerHTML = regiStr;
  }
} // 觀看該課程已報名學生資訊


function showRegisterStudent(arr) {
  var adminCourseForm = document.querySelector('.admin-course-form');

  if (adminCourseForm) {
    adminCourseForm.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.nodeName === 'A' || e.target.closest('a')) {
        var adminCourse = document.querySelector('.admin-course');
        var adminBatch = document.querySelector('.admin-batches');
        adminCourse.classList.add('d-none');
        adminBatch.classList.remove('d-none');
      }

      var targetId = e.target.closest('tr').dataset.id;
      var newData = [];
      arr.forEach(function (item) {
        if (targetId === item.batchId) {
          newData.push(item);
        }
      });
      renderAdminStudents(newData);
    });
  }
} // 返回上頁


function prevPage() {
  var adminBatchesPanel = document.querySelector('.admin-batches-panel');

  if (adminBatchesPanel) {
    adminBatchesPanel.addEventListener('click', function (e) {
      if (e.target.nodeName === 'A' || e.target.closest('a')) {
        var adminCourse = document.querySelector('.admin-course');
        var adminBatch = document.querySelector('.admin-batches');
        adminCourse.classList.remove('d-none');
        adminBatch.classList.add('d-none');
      }
    });
  }
}

axios.get("".concat(Url, "/batches")).then(function (res) {
  var data = res.data;
  renderAdminBatches(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
axios.get("".concat(Url, "/registeredStudent")).then(function (res) {
  var data = res.data;
  renderAdminStudents(data);
  showRegisterStudent(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
prevPage();
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';

function renderAdminMember(arr) {
  var adminMemberTable = document.querySelector('.admin-member-table');
  var str = '';
  arr.forEach(function (item) {
    console.log(item);
    str = "\n    <tr class=\"vertical-middle\">\n      <th scope=\"row\">ABC120222</th>\n      <td>\n        <div class=\"admin-account-avatar me-2\">\n          <img\n            class=\"rounded-circle\"\n            src=\"./assets/images/Avatar/Avatar-1.jpg\"\n            alt=\"avatar\"\n          />\n        </div>\n      </td>\n      <td>\u9EA5\u6770\u502B</td>\n      <td>0933-666-888</td>\n      <td>likeclimbing@gmail.com</td>\n      <td>2022-12-14 \uFF5E 2023-6-13</td>\n      <td class=\"text-success\">\u672A\u5230\u671F</td>\n    </tr>\n    ";
  });
  adminMemberTable.innerHTML = str;
}

axios.get("".concat(Url, "/users")).then(function (res) {
  var data = res.data;
  renderAdminMember(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
/* eslint-disable no-undef */
"use strict";
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';
var toggleList = 'introduction'; // ---------------------- 報名課程 彈跳視窗 ----------------------
// model 關閉

function registerModelClose() {
  var registerModel = document.querySelector('.register-model');
  var registerModelNonMember = document.querySelector('.register-model-nonMember');
  registerModel.classList.remove('register-model--active');
  registerModelNonMember.classList.remove('register-model--active');
} // model 控制


function registerModelControl() {
  var registerModel = document.querySelector('.register-model');
  var registerModelOpenBtn = document.querySelector('.register-btn'); // 開啟彈跳視窗

  registerModelOpenBtn.addEventListener('click', function (e) {
    e.preventDefault();
    registerModel.classList.add('register-model--active');
  }); // 點擊視窗外關閉

  registerModel.addEventListener('click', function (event) {
    if (event.target.getAttribute('class') === 'register-model register-model--active') {
      registerModelClose();
    }
  }); // 鍵盤按 ESC 可關閉彈跳視窗

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      registerModelClose();
    }
  });
} // 非會員報名彈跳視窗;


function registerModelNonMemberFormCheck(arr) {
  var registerModelBtnNonMember = document.querySelector('.register-model-btn-nonMember');
  var registerModelNonMember = document.querySelector('.register-model-nonMember');

  if (registerModelBtnNonMember) {
    registerModelBtnNonMember.addEventListener('click', function (e) {
      e.preventDefault();
      var courseName = document.querySelector('.course-name');
      var courseBranch = document.querySelector('#course-branch');
      var courseBatch = document.querySelector('#course-batch');
      var nonMemberPrice = document.querySelector('.course-nonmember-price');
      var courseNonMemberBatchId = document.querySelector('#course-nonMember-id');
      var courseNonMemberName = document.querySelector('#course-nonMember-name');
      var courseNonMemberPrice = document.querySelector('#course-nonMember-price');
      var courseNonMemberBranch = document.querySelector('#course-nonMember-branch');
      var courseNonMemberBatch = document.querySelector('#course-nonMember-batch');
      var registerBatchId = '';
      arr.forEach(function (item) {
        if (item.branch === courseBranch.value && item.content === courseBatch.value && item.name === courseName.textContent.trim()) {
          registerBatchId = item.batchId;
        }
      }); // 帶資料到確認頁面

      courseNonMemberBatchId.value = registerBatchId;
      courseNonMemberName.value = courseName.textContent.trim();
      courseNonMemberPrice.value = nonMemberPrice.textContent.trim();
      courseNonMemberBranch.value = courseBranch.value.trim();
      courseNonMemberBatch.value = courseBatch.value.trim(); // 關閉前一個視窗

      registerModelClose(); // 打開下個頁面

      registerModelNonMember.classList.add('register-model--active'); // 點擊視窗外關閉

      registerModelNonMember.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') === 'register-model-nonMember register-model--active') {
          registerModelClose();
        }
      });
    });
  }
} // 更新後台資料並重新渲染


function updateDataAndRerender() {
  var registerNonMemberId = document.querySelector('#course-nonMember-id');
  var registerNonMemberName = document.querySelector('#register-nonMember-name');
  var registerNonMemberEmail = document.querySelector('#register-nonMember-email');
  var registerNonMemberPhoneNum = document.querySelector('#register-nonMember-phoneNum');
  var idValue = registerNonMemberId.value;
  var registeredStudentInfo = {
    isUser: false,
    batchId: idValue,
    name: registerNonMemberName.value,
    email: registerNonMemberEmail.value,
    contactNumber: registerNonMemberPhoneNum.value
  }; // // 傳送報名資訊到資料庫;
  // axios
  //   .post(`${Url}/registeredStudent`, registeredStudentInfo)
  //   .then((res) => {
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //     const courseNowSignUp = document.querySelector('.course-nowSignUp');
  //     const courseBranch = document.querySelector('#course-branch');
  //     const courseBatch = document.querySelector('#course-batch');
  //     courseNowSignUp.innerHTML = '';
  //     courseBranch.value = '- 請選擇分館 -';
  //     courseBatch.value = '- 請選擇梯次 -';
  //     // 取得最新學生人數
  //     return axios.get(`${Url}/batches/${idValue}/registeredStudent`);
  //   })
  //   .then((res) => {
  //     const registerNum = res.data.length;
  //     const obj = {
  //       nowSignUp: registerNum,
  //     };
  //     // 更新資料庫最新報名人數
  //     return axios.patch(`${Url}/batches/${idValue}`, obj);
  //   })
  //   .then((res) => {
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //     // 重新渲染梯次表單
  //     return axios.get(`${Url}/batches`);
  //   })
  //   .then((res) => {
  //     const newData = res.data;
  //     // eslint-disable-next-line no-use-before-define
  //     batchesChange(newData);
  //   })
  //   .catch((error) => {
  //     // eslint-disable-next-line no-console
  //     console.log(error);
  //   });

  errorExample().then(function (res, res2, res3, res4) {
    console.log(res, res2, res3, res4);
  })["catch"](function (error) {
    console.log(error);
  });
}

function errorExample() {
  return _errorExample.apply(this, arguments);
} // 非會員 form 表單確認或取消


function _errorExample() {
  _errorExample = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, courseNowSignUp, courseBranch, courseBatch, res2, registerNum, obj, res3, res4, newData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.post("".concat(Url, "/registeredStudent"), registeredStudentInfo);

          case 3:
            res = _context.sent;
            console.log(res);
            courseNowSignUp = document.querySelector('.course-nowSignUp');
            courseBranch = document.querySelector('#course-branch');
            courseBatch = document.querySelector('#course-batch');
            courseNowSignUp.innerHTML = '';
            courseBranch.value = '- 請選擇分館 -';
            courseBatch.value = '- 請選擇梯次 -';
            _context.next = 13;
            return axios.get("".concat(Url, "/batches/").concat(idValue, "/registeredStudent"));

          case 13:
            res2 = _context.sent;
            registerNum = res2.data.length;
            obj = {
              nowSignUp: registerNum
            };
            _context.next = 18;
            return axios.patch("".concat(Url, "/batches/").concat(idValue), obj);

          case 18:
            res3 = _context.sent;
            console.log(res3);
            _context.next = 22;
            return axios.get("".concat(Url, "/batches"));

          case 22:
            res4 = _context.sent;
            newData = res4.data; // eslint-disable-next-line no-use-before-define

            batchesChange(newData);
            return _context.abrupt("return", (res, res2, res3, res4));

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));
  return _errorExample.apply(this, arguments);
}

function nonMemberFormConfirmOrCancel() {
  var registerModelNonMemberForm = document.querySelector('.register-model-nonMember-form');

  if (registerModelNonMemberForm) {
    registerModelNonMemberForm.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.type === 'submit') {
        updateDataAndRerender(); // sweet alert

        Swal.fire({
          icon: 'success',
          title: '報名成功<br />請前往填寫的信箱收取報名資訊',
          showConfirmButton: false,
          timer: 3000
        }); // 關閉視窗

        registerModelClose();
      } else if (e.target.nodeName === 'A') {
        registerModelClose();
      }
    });
  }
} // ---------------------- 報名課程頁面 ----------------------
// 渲染 course register panel


function renderCourseRegisterPanel(arr) {
  var registerPanel = document.querySelector('.register-panel');
  var str = '';
  var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n</option>";
  var branchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u5206\u9928 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u5206\u9928 -\n</option>";
  arr.forEach(function (item) {
    var branchArr = item.branches; // 場館

    branchArr.forEach(function (i) {
      branchStr += "\n      <option value=\"".concat(i, "\">").concat(i, "</option>\n      ");
    });
    str = "\n    <div class=\"container\">\n      <div class=\"row row-cols-1 row-cols-lg-2 g-lg-8\">\n        <div class=\"col d-none d-lg-block\">\n          <img class=\"w-100\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n        </div>\n        <div class=\"col\">\n          <h1 class=\"course-name\" text-center text-lg-start fw-bold fs-1 display-size-lg-5 my-4 my-lg-10\">\n            ").concat(item.name, "\n          </h1>\n          <div class=\"d-flex flex-column flex-lg-row align-items-center mb-4 mb-lg-10\">\n            <del class=\"course-nonmember-price fs-lg-1 me-lg-4\">NT$ ").concat(item.price, "</del>\n            <p class=\"course-member-price fs-lg-1 text-danger\">NT$ ").concat(item.userPrice, "</p>\n          </div>\n          <form>\n            <div class=\"d-flex flex-column mb-6\">\n              <label for=\"course-branch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u5206\u9928</label>\n              <select class=\"w-100 w-lg-50 mt-2 py-1 ps-2\" name=\"course-branch\" id=\"course-branch\">\n                ").concat(branchStr, "\n              </select>\n            </div>\n            <div class=\"register-batch d-flex flex-column mb-10 mb-lg-16\">\n              <label for=\"course-batch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u68AF\u6B21</label>\n              <select class=\"w-100 w-lg-75 my-2 py-1 ps-2\" name=\"course-batch\" id=\"course-batch\">\n                ").concat(batchStr, "\n              </select>\n              <p class=\"course-nowSignUp\"></p>\n            </div>\n            <input\n              type=\"submit\"\n              value=\"\u5831\u540D\u672C\u68AF\u6B21\u8AB2\u7A0B\"\n              class=\"register-btn btn btn-primary w-100 w-lg-auto rounded-3 px-8\"\n            />\n          </form>\n        </div>\n      </div>\n      <img\n        class=\"register-course-text position-absolute d-none d-lg-block\"\n        src=\"").concat(item.courseNameEn, "\"\n      />\n    </div>\n    ");
  });
  registerPanel.innerHTML = str;
} // 渲染 course info


function renderCourseContent(arr) {
  var registerInfoContent = document.querySelector('.register-info-content');
  var courseInfoStr = '';
  arr.forEach(function (item) {
    var introductionStr = "<p>".concat(item.introduction, "</p>");
    var contentStr = "<p>".concat(item.content, "</p>");
    var informationStr = "\n    <ol>\n      <li class=\"mb-4\">\n        \u8AB2\u7A0B\u5929\u6578\uFF1A".concat(item.information.time, " ( \u9031\u9593\u73ED\u4E0A\u8AB2\u6642\u9593\u70BA 19:00\uFF5E22:00 \u3001\u9031\u672B\u73ED\u4E0A\u8AB2\u6642\u9593\u70BA\u4E0A\u5348\n        09:00\uFF5E12:00 )\n      </li>\n      <li class=\"mb-4\">\u8AB2\u7A0B\u5730\u9EDE\uFF1A").concat(item.information.location, "</li>\n      <li class=\"mb-4\">\u53C3\u8207\u4EBA\u6578\uFF1A").concat(item.information.studentLimitNumber, "</li>\n      <li class=\"mb-4\">\u8AB2\u7A0B\u512A\u60E0\uFF1A").concat(item.information.discount, "</li>\n    </ol>\n    ");
    var cancellationPolicyStr = "\n    <p>".concat(item.cancellationPolicy.company, "</p>\n    <p class=\"mb-4\">").concat(item.cancellationPolicy.student.title, "</p>\n    <ul class=\"list-unstyled\">\n      <li>").concat(item.cancellationPolicy.student.contents[0], "</li>\n      <li>").concat(item.cancellationPolicy.student.contents[1], "</li>\n      <li>").concat(item.cancellationPolicy.student.contents[2], "</li>\n    </ul>\n    ");

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
} // 渲染 other courses


function renderOtherCourse(arr) {
  var otherCourses = document.querySelector('.other-courses');
  var str = '';
  arr.forEach(function (item) {
    str += "\n          <li class=\"col mb-6 mb-lg-0\">\n            <img class=\"mb-4\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n            <h3 class=\"text-center text-lg-start mb-2\">").concat(item.name, "</h3>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <p class=\"me-2\">NT$ ").concat(item.price, "</p>\n              <p class=\"mb-8\">\u5C1A\u6709\u540D\u984D</p>\n            </div>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <a href=\"#\" class=\"btn btn-primary rounded-3 px-8 py-2\" data-courseId=\"").concat(item.courseId, "\"\n                >\u67E5\u770B\u8A73\u60C5</a\n              >\n            </div>\n          </li>\n        ");
  });
  otherCourses.innerHTML = str;
} // tab 切換


function registerTabToggle(arr) {
  var registerTab = document.querySelector('.register-tabs');
  var registerTabList = document.querySelectorAll('.register-tabs li');
  registerTab.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.nodeName !== 'A') {
      return;
    }

    toggleList = e.target.dataset.courseinfotitle;
    registerTabList.forEach(function (item) {
      item.classList.remove('register-tab-active');
    });
    e.target.closest('li').classList.add('register-tab-active');
    renderCourseContent(arr);
  });
} // 更改梯次


function batchesChange(array) {
  var registerPanel = document.querySelector('.register-panel');

  if (registerPanel) {
    registerPanel.addEventListener('change', function (e) {
      var courseName = document.querySelector('.course-name');
      var courseBranch = document.querySelector('#course-branch');
      var courseBatch = document.querySelector('#course-batch');
      var courseNowSignUp = document.querySelector('.course-nowSignUp');
      var batchRestSignUp = ''; // 根據館別更改梯次

      if (e.target.id === 'course-branch') {
        var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n      - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n    </option>";
        array.forEach(function (item) {
          if (item.branch === courseBranch.value && item.name === courseName.textContent.trim()) {
            batchStr += "<option value=\"".concat(item.content, "\">").concat(item.content, "</option>");
          }

          courseBatch.innerHTML = batchStr;
          courseNowSignUp.innerHTML = '';
        });
      } // 判斷梯次後顯示可報名人數;


      if (e.target.id === 'course-batch') {
        array.forEach(function (item) {
          if (courseBranch.value === item.branch && courseBatch.value === item.content && courseName.textContent.trim() === item.name) {
            batchRestSignUp = item.maximumSignUp - item.nowSignUp;
          }
        });
        courseNowSignUp.innerHTML = "\u203B \u9084\u6709 ".concat(batchRestSignUp, " \u4F4D\u540D\u984D");
      }
    });
  }
} // 點擊相關課程並渲染


function checkOtherCourses(arr) {
  var otherCourses = document.querySelector('.other-courses');

  if (otherCourses) {
    otherCourses.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.nodeName === 'A') {
        window.scrollTo(0, 0);
        var nowData = [];
        var othersData = [];
        arr.forEach(function (item) {
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
} // 開啟報名頁面、根據所選課程初始渲染


function courseRegisterOpen(arr) {
  var coursesList = document.querySelector('.courses-list');
  var courseRegister = document.querySelector('.course-register');

  if (coursesList) {
    coursesList.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.nodeName === 'A') {
        courseRegister.classList.remove('d-none');
        coursesList.classList.add('d-none');
        window.scrollTo(0, 0);
        var nowData = [];
        var othersData = [];
        arr.forEach(function (item) {
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
} // course index 頁面渲染


function courseIndexRender() {
  axios.get("".concat(Url, "/courses")).then(function (res) {
    var data = res.data;
    courseRegisterOpen(data);
    checkOtherCourses(data);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
} // 檢查報名表格、更新報名人數


function checkNonMemberFormANdUpdateNowSignUp() {
  axios.get("".concat(Url, "/batches")).then(function (res) {
    var batchesData = res.data;
    registerModelNonMemberFormCheck(batchesData);
    batchesChange(batchesData);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

courseIndexRender();
checkNonMemberFormANdUpdateNowSignUp();
nonMemberFormConfirmOrCancel();
//# sourceMappingURL=all.js.map
