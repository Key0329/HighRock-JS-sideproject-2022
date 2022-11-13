"use strict";

/* eslint-disable no-undef */
// ---------------------- 報名課程 彈跳視窗 ----------------------
var toggleList = 'introduction';
var otherCourses = document.querySelector('.other-courses');
var registerModelNonMemberForm = document.querySelector('.register-model-nonMember-form'); // model 關閉

function registerModelClose() {
  var registerModel = document.querySelector('.register-model');
  var registerModelNonMember = document.querySelector('.register-model-nonMember');
  registerModel.classList.remove('register-model--active');
  registerModelNonMember.classList.remove('register-model--active');
} // model 多數控制


function courseModelControl() {
  var registerModelBtnNonMember = document.querySelector('.register-model-btn-nonMember');
  var registerModel = document.querySelector('.register-model');
  var registerModelNonMember = document.querySelector('.register-model-nonMember'); // 打開彈跳視窗;

  function registerModelOpen() {
    var registerModelOpenBtn = document.querySelector('.register-btn');
    registerModelOpenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      registerModel.classList.add('register-model--active'); // 點擊視窗外關閉

      registerModel.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') === 'register-model register-model--active') {
          registerModelClose();
        }
      });
    });
  }

  registerModelOpen(); // 鍵盤按 ESC 關閉彈跳視窗

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      registerModelClose();
    }
  }); // 非會員報名彈跳視窗;

  function registerModelNonMemberFormCheck(arr) {
    registerModelBtnNonMember.addEventListener('click', function (e) {
      e.preventDefault();
      var courseName = document.querySelector('.course-name');
      var courseBranch = document.querySelector('#course-branch');
      var courseBatch = document.querySelector('#course-batch');
      var nonMemberPrice = document.querySelector('.course-nonmember-price');
      var courseNonMemberID = document.querySelector('#course-nonMember-id');
      var courseNonMemberName = document.querySelector('#course-nonMember-name');
      var courseNonMemberPrice = document.querySelector('#course-nonMember-price');
      var courseNonMemberBranch = document.querySelector('#course-nonMember-branch');
      var courseNonMemberBatch = document.querySelector('#course-nonMember-batch');
      var registerBatchId = '';
      arr.forEach(function (item) {
        if (item.branch === courseBranch.value && item.content === courseBatch.value && item.name === courseName.textContent.trim()) {
          registerBatchId = item.batchID;
        }
      }); // 帶資料到確認頁面

      courseNonMemberID.value = registerBatchId;
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

  axios.get('http://localhost:3000/batches').then(function (res) {
    var batchesData = res.data;
    registerModelNonMemberFormCheck(batchesData);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
} // 非會員 form 表單傳值給後台


if (registerModelNonMemberForm) {
  registerModelNonMemberForm.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.type === 'submit') {
      var registerNonMemberID = document.querySelector('#course-nonMember-id');
      var registerNonMemberName = document.querySelector('#register-nonMember-name');
      var registerNonMemberEmail = document.querySelector('#register-nonMember-email');
      var registerNonMemberPhoneNum = document.querySelector('#register-nonMember-phoneNum');
      var registeredStudentInfo = {
        isUser: false,
        batchId: '',
        name: '',
        email: '',
        contactNumber: ''
      };
      registeredStudentInfo.batchId = registerNonMemberID.value;
      registeredStudentInfo.name = registerNonMemberName.value;
      registeredStudentInfo.email = registerNonMemberEmail.value;
      registeredStudentInfo.contactNumber = registerNonMemberPhoneNum.value; // sweet alert

      Swal.fire({
        icon: 'success',
        title: '報名成功<br />請前往填寫的信箱收取報名資訊',
        showConfirmButton: false,
        timer: 3000
      });
      var idValue = registerNonMemberID.value; // 傳送報名資訊到資料庫

      axios.post('http://localhost:3000/registeredStudent', registeredStudentInfo).then(function (res) {
        // eslint-disable-next-line no-console
        console.log(res); // 取得最新學生人數

        axios.get("http://localhost:3000/registeredStudent?batchId=".concat(idValue)).then(function (re) {
          var registerNum = re.data.length;
          var obj = {
            nowSignUp: registerNum
          }; // 取得梯次 ID

          axios.get('http://localhost:3000/batches').then(function (response) {
            var data = response.data;
            var id = '';
            data.forEach(function (item) {
              if (idValue === item.batchID) {
                id = item.id;
              }
            }); // 更新資料庫最新報名人數

            axios.patch("http://localhost:3000/batches/".concat(id), obj).then(function (resp) {
              // eslint-disable-next-line no-console
              console.log(resp);
              var courseNowSignUp = document.querySelector('.course-nowSignUp');
              courseNowSignUp.innerHTML = ''; // 重新渲染梯次表單

              axios.get('http://localhost:3000/batches').then(function (respon) {
                var newData = respon.data; // eslint-disable-next-line no-use-before-define

                batchesChange(newData);
              })["catch"](function (error) {
                // eslint-disable-next-line no-console
                console.log(error);
              });
            })["catch"](function (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            });
          })["catch"](function (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        });
      })["catch"](function (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }); // 關閉視窗

      registerModelClose();
    } else if (e.target.nodeName === 'A') {
      registerModelClose();
    }
  });
} // ---------------------- 報名課程 ----------------------
// 更改梯次


function batchesChange(array) {
  var registerPanel = document.querySelector('.register-panel');
  registerPanel.addEventListener('change', function (e) {
    var courseName = document.querySelector('.course-name');
    var courseBranch = document.querySelector('#course-branch');
    var courseBatch = document.querySelector('#course-batch');
    var courseNowSignUp = document.querySelector('.course-nowSignUp');
    var batchRestSignUp = ''; // 根據館別更改梯次

    if (e.target.id === 'course-branch') {
      var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n    - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n  </option>";
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
} // 渲染 course register panel


function renderCourseRegisterPanel(arr) {
  var registerPanel = document.querySelector('.register-panel');
  var str = '';
  var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n</option>";
  var branchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u5206\u9928 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u5206\u9928 -\n</option>";
  axios.get('http://localhost:3000/batches').then(function (res) {
    var batchesData = res.data;
    batchesChange(batchesData);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
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
} // 點擊相關課程並渲染


function checkOtherCourses(arr) {
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
        courseModelControl();
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
        courseModelControl();
      }
    });
  }
} // course index 頁面渲染


function courseIndexRender() {
  axios.get('http://localhost:3000/courses').then(function (res) {
    var data = res.data;
    courseRegisterOpen(data);
    checkOtherCourses(data);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

courseIndexRender(); // ---------------------- 後台-活動課程管理 ----------------------

function renderAdminBatches(arr) {
  var adminBatchTable = document.querySelector('.admin-batch-table');
  var str = '';
  arr.forEach(function (item) {
    var isOpenedColor = '';

    if (item.isOpened === '已開課') {
      isOpenedColor = 'text-success';
    } else {
      isOpenedColor = 'text-danger';
    }

    str += "\n    <tr>\n      <th scope=\"row\">".concat(item.batchID, "</th>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.branch, "</td>\n      <td>").concat(item.coach, "</td>\n      <td>").concat(item.content, "</td>\n      <td><a href=\"#\" class=\"d-inline-block\">").concat(item.nowSignUp, " / ").concat(item.maximumSignUp, " \u4F4D</a></td>\n      <td class=\"").concat(isOpenedColor, "\">").concat(item.isOpened, "</td>\n    </tr>\n    ");
  });
  adminBatchTable.innerHTML = str;
}

axios.get('http://localhost:3000/batches').then(function (res) {
  var data = res.data;
  renderAdminBatches(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
//# sourceMappingURL=all.js.map
