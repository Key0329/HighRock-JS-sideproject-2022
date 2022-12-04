"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';

// ---------------------- 後台-活動課程管理 ----------------------

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
    str += "\n    <tr data-id=\"".concat(item.batchId, "\">\n      <th class=\"text-center\" scope=\"row\">Batch ").concat(item.batchId, "</th>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.branch, "</td>\n      <td>").concat(item.coach, "</td>\n      <td>").concat(item.content, "</td>\n      <td><a href=\"#\" class=\"registered-student-btn d-inline-block d-flex align-items-center hover-orange\">").concat(item.nowSignUp, " / ").concat(item.maximumSignUp, " \u4F4D  <span class=\"material-symbols-outlined vertical-middle ms-1\">\n      add_circle\n      </span></a></td>\n      <td class=\"").concat(isOpenedColor, "\">").concat(item.isOpened, "</td>\n    </tr>\n    ");
  });
  if (adminBatchTable) {
    adminBatchTable.innerHTML = str;
  }
}

// 渲染已報名學生
function renderAdminStudents(arr) {
  // 活動課程已報名學生資訊
  var adminRegisteredTable = document.querySelector('.admin-registered-table');
  var regiStr = '';
  arr.forEach(function (item) {
    var isMember = '';
    if (item.userId) {
      isMember = '一般會員';
    }
    regiStr += "\n    <tr>\n      <th scope=\"row\">".concat(item.name, "</th>\n      <td>").concat(item.email, "</td>\n      <td>").concat(item.contactNumber, "</td>\n      <td>").concat(isMember, "</td>\n      <td>Batch ").concat(item.batchId, "</td>\n    </tr>\n    ");
  });
  if (adminRegisteredTable) {
    adminRegisteredTable.innerHTML = regiStr;
  }
}

// 觀看該課程已報名學生資訊
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
}

// 返回上頁
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

// 活動報名學生關鍵字搜尋
function memberBatchSearch(arr) {
  var adminCourseBatchFilter = document.querySelector('#admin-course-batch-search');
  if (adminCourseBatchFilter) {
    adminCourseBatchFilter.addEventListener('input', function () {
      var keyword = adminCourseBatchFilter.value.trim().toLowerCase();
      var targetProduct = [];
      targetProduct = arr.filter(function (item) {
        var title = item.name.toLowerCase();
        var branch = item.branch.toLowerCase();
        var coach = item.coach.toLowerCase();
        var content = item.content.toLowerCase();
        return title.match(keyword) || branch.match(keyword) || coach.match(keyword) || content.match(keyword);
      });
      setTimeout(function () {
        renderAdminBatches(targetProduct);
      }, 1000);
    });
  }
}

// 活動報名學生關鍵字搜尋
function memberRegisteredSearch(arr) {
  var adminCourseRegisteredFilter = document.querySelector('#admin-course-registered-filter');
  if (adminCourseRegisteredFilter) {
    adminCourseRegisteredFilter.addEventListener('input', function () {
      var keyword = adminCourseRegisteredFilter.value.trim().toLowerCase();
      var targetProduct = [];
      targetProduct = arr.filter(function (item) {
        var title = item.name.toLowerCase();
        var mail = item.email.toLowerCase();
        var tel = item.contactNumber.toLowerCase();
        return title.match(keyword) || mail.match(keyword) || tel.match(keyword);
      });
      setTimeout(function () {
        renderAdminStudents(targetProduct);
      }, 1000);
    });
  }
}
axios.get("".concat(Url, "/batches")).then(function (res) {
  var data = res.data;
  renderAdminBatches(data);
  memberBatchSearch(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
axios.get("".concat(Url, "/students")).then(function (res) {
  var data = res.data;
  renderAdminStudents(data);
  showRegisterStudent(data);
  memberRegisteredSearch(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
prevPage();
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';

// 渲染後臺會員列表
function renderAdminMember(arr) {
  var adminMemberTable = document.querySelector('.admin-member-table');
  var str = '';
  arr.forEach(function (item) {
    str += "\n    <tr class=\"vertical-middle\">\n      <th scope=\"row\">MEM ".concat(item.id, "</th>\n      <td>\n        <div class=\"admin-account-avatar me-2\">\n          <img\n            class=\"rounded-circle\"\n            src=\"").concat(item.photo, "\"\n            alt=\"avatar\"\n          />\n        </div>\n      </td>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.contactNumber, "</td>\n      <td>").concat(item.email, "</td>\n    </tr>\n    ");
  });
  if (adminMemberTable) {
    adminMemberTable.innerHTML = str;
  }
}

// 會員關鍵字搜尋
function memberNameSearch(arr) {
  var adminMemberFilter = document.querySelector('#admin-member-filter');
  if (adminMemberFilter) {
    adminMemberFilter.addEventListener('input', function () {
      var keyword = adminMemberFilter.value.trim().toLowerCase();
      var targetProduct = [];
      targetProduct = arr.filter(function (item) {
        var title = item.name.toLowerCase();
        var mail = item.email.toLowerCase();
        var tel = item.contactNumber.toLowerCase();
        return title.match(keyword) || mail.match(keyword) || tel.match(keyword);
      });
      setTimeout(function () {
        renderAdminMember(targetProduct);
      }, 1000);
    });
  }
}
axios.get("".concat(Url, "/users")).then(function (res) {
  var data = res.data;
  renderAdminMember(data);
  memberNameSearch(data);
})["catch"](function (error) {
  // eslint-disable-next-line no-console
  console.log(error);
});
"use strict";

// ---------------------- preloader ---------------------

window.onload = function () {
  var preLoader = document.querySelector('#preloader');
  if (preLoader) {
    preLoader.classList.add('loader-hide');
  }
};

// 增加千分位逗點
// eslint-disable-next-line no-unused-vars
function toThousands(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* eslint-disable no-undef */

var Url = 'http://localhost:3000';
var toggleList = 'information';

// ---------------------- 報名課程 彈跳視窗 ----------------------

// model 關閉
function registerModelClose() {
  var registerModel = document.querySelector('.register-model');
  var registerModelMember = document.querySelector('.register-model-member');
  registerModel.classList.remove('register-model--active');
  registerModelMember.classList.remove('register-model--active');
}

// 自動填入會員個人資訊
function userInfoToMemberFormCHeck(userObj) {
  var registerMemberName = document.querySelector('#register-member-name');
  var registerMemberEmail = document.querySelector('#register-member-email');
  var registerMemberPhoneNum = document.querySelector('#register-member-phoneNum');
  registerMemberName.value = userObj.name;
  registerMemberEmail.value = userObj.email;
  registerMemberPhoneNum.value = userObj.contactNumber;
}

// 帶入課程資訊到會員報名表單;
function courseInfoToMemberFormCheck(arr) {
  var registerModelMember = document.querySelector('.register-model-member');
  var courseName = document.querySelector('.course-name');
  var courseBranch = document.querySelector('#course-branch');
  var courseBatch = document.querySelector('#course-batch');
  var memberPrice = document.querySelector('.course-member-price');
  var courseMemberBatchId = document.querySelector('#course-member-id');
  var courseMemberName = document.querySelector('#course-member-name');
  var courseMemberPrice = document.querySelector('#course-member-price');
  var courseMemberBranch = document.querySelector('#course-member-branch');
  var courseMemberBatch = document.querySelector('#course-member-batch');
  var registerBatchId = '';
  arr.forEach(function (item) {
    if (item.branch === courseBranch.value && item.content === courseBatch.value && item.name === courseName.textContent.trim()) {
      registerBatchId = item.batchId;
    }
  });

  // 帶資料到確認頁面
  courseMemberBatchId.value = registerBatchId;
  courseMemberName.value = courseName.textContent.trim();
  courseMemberPrice.value = memberPrice.textContent.trim();
  courseMemberBranch.value = courseBranch.value.trim();
  courseMemberBatch.value = courseBatch.value.trim();

  // 點擊視窗外關閉
  registerModelMember.addEventListener('click', function (event) {
    if (event.target.getAttribute('class') === 'register-model-member register-model--active') {
      registerModelClose();
    }
  });
}

// model 控制
function registerModelControl() {
  var registerModel = document.querySelector('.register-model');
  var registerModelOpenBtn = document.querySelector('.register-btn');
  var courseBranch = document.querySelector('#course-branch');
  var courseBatch = document.querySelector('#course-batch');

  // 開啟彈跳視窗
  if (registerModelOpenBtn) {
    // eslint-disable-next-line consistent-return
    registerModelOpenBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // 判斷是否有選擇分館、梯次
      if (courseBranch.value === '- 請選擇分館 -' && courseBatch.value === '- 請選擇梯次 -') {
        Swal.fire({
          icon: 'warning',
          title: '請選擇分館與梯次',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
      if (courseBatch.value === '- 請選擇梯次 -') {
        Swal.fire({
          icon: 'warning',
          title: '請選擇梯次',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      // 判斷是否為會員
      var registerModelMember = document.querySelector('.register-model-member');
      var savedToken = localStorage.getItem('token');
      if (savedToken) {
        var userId = localStorage.getItem('userId');
        // 取得會員資訊
        axios.get("".concat(Url, "/users/").concat(userId)).then(function (res) {
          var data = res.data;
          userInfoToMemberFormCHeck(data);
        })["catch"](function (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });

        // 檢查報名表格;
        axios.get("".concat(Url, "/batches")).then(function (res) {
          var batchesData = res.data;
          courseInfoToMemberFormCheck(batchesData);
        })["catch"](function (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });
        // 打開下個頁面
        registerModelMember.classList.add('register-model--active');
      } else {
        registerModel.classList.add('register-model--active');
      }

      // 點擊視窗外關閉
      registerModelMember.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') === 'register-model-member register-model--active') {
          registerModelClose();
        }
      });
    });
  }

  // 點擊視窗外關閉
  registerModel.addEventListener('click', function (event) {
    if (event.target.getAttribute('class') === 'register-model register-model--active') {
      registerModelClose();
    }
  });

  // 鍵盤按 ESC 可關閉彈跳視窗
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      registerModelClose();
    }
  });
}

// 更新後台資料並重新渲染
function updateDataAndRerender() {
  return _updateDataAndRerender.apply(this, arguments);
} // 會員 form 表單確認或取消
function _updateDataAndRerender() {
  _updateDataAndRerender = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var registerMemberId, registerMemberName, registerMemberEmail, registerMemberPhoneNum, idValue, userID, studentsInfo, res, courseNowSignUp, courseBranch, courseBatch, res2, registerNum, obj, res3, res4, newData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            registerMemberId = document.querySelector('#course-member-id');
            registerMemberName = document.querySelector('#register-member-name');
            registerMemberEmail = document.querySelector('#register-member-email');
            registerMemberPhoneNum = document.querySelector('#register-member-phoneNum');
            idValue = registerMemberId.value;
            userID = localStorage.getItem('userId');
            studentsInfo = {
              userId: userID,
              batchId: idValue,
              name: registerMemberName.value,
              email: registerMemberEmail.value,
              contactNumber: registerMemberPhoneNum.value
            }; // 傳送報名資訊到資料庫;
            _context.next = 10;
            return axios.post("".concat(Url, "/students"), studentsInfo);
          case 10:
            res = _context.sent;
            courseNowSignUp = document.querySelector('.course-nowSignUp');
            courseBranch = document.querySelector('#course-branch');
            courseBatch = document.querySelector('#course-batch');
            courseNowSignUp.innerHTML = '';
            courseBranch.value = '- 請選擇分館 -';
            courseBatch.value = '- 請選擇梯次 -';

            // 取得最新學生人數
            _context.next = 19;
            return axios.get("".concat(Url, "/batches/").concat(idValue, "/students"));
          case 19:
            res2 = _context.sent;
            registerNum = res2.data.length;
            obj = {
              nowSignUp: registerNum
            }; // 更新資料庫最新報名人數
            _context.next = 24;
            return axios.patch("".concat(Url, "/batches/").concat(idValue), obj);
          case 24:
            res3 = _context.sent;
            _context.next = 27;
            return axios.get("".concat(Url, "/batches"));
          case 27:
            res4 = _context.sent;
            newData = res4.data; // eslint-disable-next-line no-use-before-define
            batchesChange(newData);
            return _context.abrupt("return", {
              res: res,
              res3: res3
            });
          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);
          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 33]]);
  }));
  return _updateDataAndRerender.apply(this, arguments);
}
function memberFormConfirmOrCancel() {
  var registerModelMemberForm = document.querySelector('.register-model-member-form');
  if (registerModelMemberForm) {
    var registerMemberName = document.querySelector('#register-member-name');
    var registerMemberEmail = document.querySelector('#register-member-email');
    var registerMemberPhoneNum = document.querySelector('#register-member-phoneNum');
    registerModelMemberForm.addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target.type === 'submit') {
        if (registerMemberName.value === '' || registerMemberEmail.value === '' || registerMemberPhoneNum.value === '') {
          // eslint-disable-next-line no-useless-return
          return;
        }
        updateDataAndRerender().then(function (res, res3) {
          // eslint-disable-next-line no-console
          console.log(res, res3);
          // sweet alert
          Swal.fire({
            icon: 'success',
            title: '報名成功<br />請前往填寫的信箱收取報名資訊',
            showConfirmButton: false,
            timer: 3000
          });
        });

        // 關閉視窗
        registerModelClose();
      } else if (e.target.nodeName === 'A') {
        registerModelClose();
      }
    });
  }
}

// 驗證報名表單
function registerModelMemberFormValidate() {
  var registerModelMemberForm = document.querySelector('.register-model-member-form');
  if (registerModelMemberForm) {
    var constraints = {
      username: {
        presence: {
          message: '必填'
        }
      },
      email: {
        presence: {
          message: '必填'
        },
        // Email 是必填欄位
        email: true // 需要符合 email 格式
      },

      tel: {
        presence: {
          message: '必填'
        },
        length: {
          minimum: 8,
          // 長度要超過 8
          message: '至少 8 個數字'
        }
      }
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

    var formInputs = document.querySelectorAll('input[name=username],input[name=email],input[name=tel]');
    formInputs.forEach(function (item) {
      item.addEventListener('change', function () {
        // 預設為空值
        item.nextElementSibling.textContent = '';

        // 驗證回傳的內容
        var errors = validate(registerModelMemberForm, constraints);

        // 呈現在畫面上
        if (errors) {
          Object.keys(errors).forEach(function (keys) {
            document.querySelector(".".concat(keys)).textContent = errors[keys];
          });
        }
      });
    });
  }
}

// ---------------------- 報名課程頁面 ----------------------

// 增加千分位逗點
function toThousands(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// 渲染 course register panel
function renderCourseRegisterPanel(arr) {
  var registerPanel = document.querySelector('.register-panel');
  var str = '';
  var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n</option>";
  var branchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u5206\u9928 -\" selected disabled>\n  - \u8ACB\u9078\u64C7\u5206\u9928 -\n</option>";
  arr.forEach(function (item) {
    var branchArr = item.branches;

    // 場館
    branchArr.forEach(function (i) {
      branchStr += "\n      <option value=\"".concat(i, "\">").concat(i, "</option>\n      ");
    });
    str = "\n    <div class=\"container\">\n      <div class=\"row row-cols-1 row-cols-lg-2 g-lg-8\">\n        <div class=\"col d-none d-lg-block\">\n          <img class=\"w-100\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n        </div>\n        <div class=\"col\">\n          <h1 class=\"course-name\" text-center text-lg-start fw-bold fs-1 display-size-lg-5 my-4 my-lg-10\">\n            ").concat(item.name, "\n          </h1>\n          <div class=\"d-flex flex-column flex-lg-row align-items-center mb-4 mb-lg-10\">\n            <del class=\"course-nonMember-price fs-lg-1 me-lg-4\">NT$ ").concat(toThousands(item.price), "</del> \n            <p class=\"course-member-price fs-lg-1 text-danger\">NT$ ").concat(toThousands(item.userPrice), "</p>\n          </div>\n          <form>\n            <div class=\"d-flex flex-column mb-6\">\n              <label for=\"course-branch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u5206\u9928</label>\n              <select class=\"w-100 w-lg-50 mt-2 py-1 ps-2\" name=\"course-branch\" id=\"course-branch\">\n                ").concat(branchStr, "\n              </select>\n            </div>\n            <div class=\"register-batch d-flex flex-column mb-10 mb-lg-16\">\n              <label for=\"course-batch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u68AF\u6B21</label>\n              <select class=\"w-100 w-lg-75 my-2 py-1 ps-2\" name=\"course-batch\" id=\"course-batch\">\n                ").concat(batchStr, "\n              </select>\n              <p class=\"course-nowSignUp\"></p>\n            </div>\n            <input\n              type=\"submit\"\n              value=\"\u5831\u540D\u672C\u68AF\u6B21\u8AB2\u7A0B\"\n              class=\"register-btn btn btn-primary w-100 w-lg-auto rounded-3 px-8\"\n            />\n          </form>\n        </div>\n      </div>\n      <img\n        class=\"register-course-text position-absolute d-none d-lg-block\"\n        src=\"").concat(item.courseNameEn, "\"\n      />\n    </div>\n    ");
  });
  registerPanel.innerHTML = str;
}

// 渲染 course info
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
}

// 渲染 other courses
function renderOtherCourse(arr) {
  var otherCourses = document.querySelector('.other-courses');
  var str = '';
  arr.forEach(function (item) {
    str += "\n          <li class=\"col mb-6 mb-lg-0\">\n            <img class=\"mb-4\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n            <h3 class=\"text-center text-lg-start mb-2\">").concat(item.name, "</h3>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <p class=\"me-2\">NT$ ").concat(toThousands(item.price), "</p>\n              <p class=\"mb-8\">\u5C1A\u6709\u540D\u984D</p>\n            </div>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <a href=\"#\" class=\"btn btn-primary rounded-3 px-8 py-2\" data-courseId=\"").concat(item.courseId, "\"\n                >\u67E5\u770B\u8A73\u60C5</a\n              >\n            </div>\n          </li>\n        ");
  });
  otherCourses.innerHTML = str;
}

// tab 切換
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
}

// 更改梯次
function batchesChange(array) {
  var registerPanel = document.querySelector('.register-panel');
  if (registerPanel) {
    registerPanel.addEventListener('change', function (e) {
      var courseName = document.querySelector('.course-name');
      var courseBranch = document.querySelector('#course-branch');
      var courseBatch = document.querySelector('#course-batch');
      var courseNowSignUp = document.querySelector('.course-nowSignUp');
      var batchRestSignUp = '';

      // 根據館別更改梯次
      if (e.target.id === 'course-branch') {
        var batchStr = "<option class=\"letter-12\" value=\"- \u8ACB\u9078\u64C7\u68AF\u6B21 -\" selected disabled>\n      - \u8ACB\u9078\u64C7\u68AF\u6B21 -\n    </option>";
        array.forEach(function (item) {
          if (item.branch === courseBranch.value && item.name === courseName.textContent.trim()) {
            batchStr += "<option value=\"".concat(item.content, "\">").concat(item.content, "</option>");
          }
          courseBatch.innerHTML = batchStr;
          courseNowSignUp.innerHTML = '';
        });
      }
      // 判斷梯次後顯示可報名人數;
      if (e.target.id === 'course-batch') {
        array.forEach(function (item) {
          if (courseBranch.value === item.branch && courseBatch.value === item.content && courseName.textContent.trim() === item.name) {
            batchRestSignUp = item.maximumSignUp - item.nowSignUp;
          }
        });
        courseNowSignUp.innerHTML = "\u203B \u9084\u6709 ".concat(batchRestSignUp, " \u4F4D\u540D\u984D");

        // 如果名額為 0 disable 報名按鈕
        var registerModelOpenBtn = document.querySelector('.register-btn');
        if (batchRestSignUp === 0) {
          registerModelOpenBtn.setAttribute('disabled', '');
          courseNowSignUp.innerHTML = '※ 該梯次已額滿';
          courseNowSignUp.classList.add('text-danger');
        } else {
          registerModelOpenBtn.removeAttribute('disabled');
          courseNowSignUp.classList.remove('text-danger');
        }
      }
    });
  }
}

// 點擊相關課程並渲染
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
}

// 開啟報名頁面、根據所選課程初始渲染
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
}

// course index 頁面渲染
function courseIndexRender() {
  axios.get("".concat(Url, "/activities")).then(function (res) {
    var data = res.data;
    courseRegisterOpen(data);
    checkOtherCourses(data);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

// 更新報名人數
function UpdateNowSignUp() {
  axios.get("".concat(Url, "/batches")).then(function (res) {
    var batchesData = res.data;
    batchesChange(batchesData);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}
function courseInit() {
  courseIndexRender();
  UpdateNowSignUp();
  memberFormConfirmOrCancel();
  registerModelMemberFormValidate();
}
courseInit();
"use strict";

/* eslint-disable no-plusplus */
var date = new Date();
var renderCalendar = function renderCalendar() {
  date.setDate(1);
  var monthDays = document.querySelector('.days');
  var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  var prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  var firstDayIndex = date.getDay();
  var lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  var nextDays = 7 - lastDayIndex - 1;
  var months = ['一月課表', '二月課表', '三月課表', '四月課表', '五月課表', '六月課表', '七月課表', '八月課表', '九月課表', '十月課表', '十一月課表', '十二月課表'];
  var currentMonth = document.querySelector('.current-month');
  if (currentMonth) {
    currentMonth.innerHTML = months[date.getMonth()];
  }
  var days = '';
  for (var x = firstDayIndex; x > 0; x--) {
    days += "<div class=\"prev-date\">".concat(prevLastDay - x + 1, "</div>");
  }
  for (var i = 1; i <= lastDate; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += "<div class=\"today bg-yellow-c1\">".concat(i, "</div>");
    } else {
      days += "<div>".concat(i, "</div>");
    }
  }
  for (var j = 1; j <= nextDays; j++) {
    days += "<div class=\"next-date\">".concat(j, "</div>");
  }
  if (monthDays) {
    monthDays.innerHTML = days;
  }
};
var prevMonth = document.querySelector('.prev');
if (prevMonth) {
  prevMonth.addEventListener('click', function () {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
}
var nextMonth = document.querySelector('.next');
if (nextMonth) {
  nextMonth.addEventListener('click', function () {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}
renderCalendar();
"use strict";

/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger, TextPlugin);
// preloader
// const preLoader = document.querySelector('.preloader-img');

// gsap.from(preLoader, {
//   opacity: 0,
//   duration: 1,
// });

// experience
var experienceImg = document.querySelector('.experience-img');
var expTL = gsap.timeline({
  scrollTrigger: {
    trigger: experienceImg,
    toggleActions: 'play pause resume reset',
    start: 'top 50%'
  }
});
var experienceImg1 = document.querySelector('.experience-img-1');
var experienceImg2 = document.querySelector('.experience-img-2');
var experienceImg3 = document.querySelector('.experience-img-3');
var experienceImg4 = document.querySelector('.experience-img-4');
if (experienceImg1 || experienceImg2 || experienceImg3 || experienceImg4) {
  expTL.to(experienceImg1, {
    duration: 1,
    rotateY: 360
  }).to(experienceImg2, {
    duration: 1,
    rotateY: 360
  }, '>-0.5').to(experienceImg3, {
    duration: 1,
    rotateY: 360
  }, '>-0.5').to(experienceImg4, {
    duration: 1,
    rotateY: 360
  }, '>-0.5');
}

// training gsap zoom in
var trainingBoulderingRight = document.querySelector('.training-bouldering-right');
var trainingBoulderingLeft = document.querySelector('.training-bouldering-left');
var trainingTopRopeRight = document.querySelector('.training-topRope-right');
var trainingTopRopeLeft = document.querySelector('.training-topRope-left');
var trainingLeadingRight = document.querySelector('.training-lead-right');
var trainingLeadingLeft = document.querySelector('.training-lead-left');
if (trainingBoulderingRight || trainingBoulderingLeft || trainingTopRopeRight || trainingTopRopeLeft || trainingLeadingRight || trainingLeadingLeft) {
  gsap.from(trainingBoulderingRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingBoulderingRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: 100,
    opacity: 0
  });
  gsap.from(trainingBoulderingLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingBoulderingLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: -100,
    opacity: 0
  });
  gsap.from(trainingTopRopeRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingTopRopeRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: -100,
    opacity: 0
  });
  gsap.from(trainingTopRopeLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingTopRopeLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: 100,
    opacity: 0
  });
  gsap.from(trainingLeadingRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingLeadingRight,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: 100,
    opacity: 0
  });
  gsap.from(trainingLeadingLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: trainingLeadingLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 70%'
    },
    x: -100,
    opacity: 0
  });
}

// feature gsap typing
var typingFeatureTitle1 = document.querySelector('.typing-feature-title-1');
var typingFeatureTitle2 = document.querySelector('.typing-feature-title-2');
var typingFeatureTitle3 = document.querySelector('.typing-feature-title-3');
var typingFeatureTitle4 = document.querySelector('.typing-feature-title-4');
var cursor = document.querySelectorAll('.cursor');
var typingFeatureContent = document.querySelectorAll('.typing-feature-content');
if (typingFeatureTitle1 && typingFeatureTitle2 && typingFeatureTitle3 && typingFeatureTitle4 && cursor && typingFeatureContent) {
  // 1
  gsap.to(typingFeatureTitle1, {
    text: '多樣攀岩體驗',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset'
    }
  });

  // 2
  gsap.to(typingFeatureTitle2, {
    text: '完善優質場地',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset'
    }
  });

  // 3
  gsap.to(typingFeatureTitle3, {
    text: '常設團體課程',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset'
    }
  });

  // 4
  gsap.to(typingFeatureTitle4, {
    text: '完整經驗師資',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingFeatureTitle1,
      toggleActions: 'play pause resume reset'
    }
  });
  gsap.to(cursor, {
    duration: 1.5,
    scrollTrigger: {
      trigger: cursor,
      toggleActions: 'play pause resume reset'
    },
    opacity: 0
  }, '<');
  gsap.from(typingFeatureContent, {
    duration: 1,
    scrollTrigger: {
      trigger: typingFeatureTitle4,
      toggleActions: 'play pause resume reset'
    },
    delay: 0.5,
    opacity: 0,
    y: 50
  });
}

// location gsap typing
var typingLocationTitle1 = document.querySelector('.typing-location-title-1');
var typingLocationTitle2 = document.querySelector('.typing-location-title-2');
var cursor2 = document.querySelectorAll('.cursor-2');
var typingLocationContent = document.querySelectorAll('.typing-location-content');
if (typingLocationTitle1 && typingLocationTitle2 && cursor2 && typingLocationContent) {
  // 1
  gsap.to(typingLocationTitle1, {
    text: 'HighRock 大安館',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset'
    }
  });

  // 2
  gsap.to(typingLocationTitle2, {
    text: 'HighRock 新莊館',
    duration: 1.5,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset'
    }
  });
  gsap.to(cursor2, {
    duration: 1.5,
    scrollTrigger: {
      trigger: cursor2,
      toggleActions: 'play pause resume reset'
    },
    opacity: 0
  }, '<');
  gsap.from(typingLocationContent, {
    duration: 1,
    scrollTrigger: {
      trigger: typingLocationTitle1,
      toggleActions: 'play pause resume reset'
    },
    delay: 0.5,
    opacity: 0,
    y: 50
  });
}

// rock moving
var bgRockLg1 = document.querySelector('.bg-rock-lg-1');
var bgRockLg2 = document.querySelector('.bg-rock-lg-2');
var bgRockLg3 = document.querySelector('.bg-rock-lg-3');
var bgRockLg4 = document.querySelector('.bg-rock-lg-4');
var bgRockLg5 = document.querySelector('.bg-rock-lg-5');
var bgRockLg6 = document.querySelector('.bg-rock-lg-6');
var bgRockLg7 = document.querySelector('.bg-rock-lg-7');
var bgRockLg8 = document.querySelector('.bg-rock-lg-8');
var bgRockLg9 = document.querySelector('.bg-rock-lg-9');
var bgRockLg10 = document.querySelector('.bg-rock-lg-10');
if (bgRockLg1 || bgRockLg2 || bgRockLg3 || bgRockLg4 || bgRockLg5 || bgRockLg6 || bgRockLg7 || bgRockLg8 || bgRockLg9 || bgRockLg10) {
  gsap.from(bgRockLg1, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg1
    },
    y: 300
  });
  gsap.from(bgRockLg2, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg2,
      start: 'top 60%'
    },
    x: -200
  });
  gsap.from(bgRockLg3, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg3,
      start: 'top 80%'
    },
    x: 300
  });
  gsap.from(bgRockLg4, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg4
    },
    y: 200
  });
  gsap.from(bgRockLg5, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg5
    },
    x: 500,
    rotation: 360,
    ease: 'power3.out'
  });
  gsap.from(bgRockLg6, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg6
    },
    x: -200,
    y: 200,
    rotation: 180
  });
  gsap.from(bgRockLg7, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg7
    },
    x: 100,
    y: -200,
    rotation: 180
  });
  gsap.to(bgRockLg8, {
    duration: 3,
    scrollTrigger: {
      trigger: bgRockLg8
    },
    x: -400,
    y: 0,
    rotation: 180,
    ease: 'power3.out'
  });
  gsap.to(bgRockLg9, {
    duration: 1.5,
    scrollTrigger: {
      trigger: bgRockLg9,
      start: 'top 65%'
    },
    y: 700,
    rotation: 180,
    ease: 'bounce.out'
  });
  gsap.to(bgRockLg10, {
    duration: 2,
    scrollTrigger: {
      trigger: bgRockLg10
    },
    y: -600,
    rotation: 180
  });
}

// calendar
var indexCalendarRight = document.querySelector('.index-calendar-right');
var indexCalendarLeft = document.querySelector('.index-calendar-left');
if (indexCalendarRight || indexCalendarLeft) {
  gsap.from(indexCalendarRight, {
    duration: 1.5,
    scrollTrigger: {
      trigger: indexCalendarRight,
      toggleActions: 'play pause resume reset',
      start: 'top 65%'
    },
    x: 100,
    opacity: 0
  });
  gsap.from(indexCalendarLeft, {
    duration: 1.5,
    scrollTrigger: {
      trigger: indexCalendarLeft,
      toggleActions: 'play pause resume reset',
      start: 'top 65%'
    },
    x: -100,
    opacity: 0
  });
}
// ----------------------- member register -----------------------
// rock moving
var registerRock1 = document.querySelector('.register-rock-1');
var registerRock2 = document.querySelector('.register-rock-2');
var registerRock3 = document.querySelector('.register-rock-3');
var registerRock4 = document.querySelector('.register-rock-4');
var registerRock5 = document.querySelector('.register-rock-5');
var registerRock6 = document.querySelector('.register-rock-6');
var registerRock7 = document.querySelector('.register-rock-7');
var registerRock8 = document.querySelector('.register-rock-8');
var registerRock9 = document.querySelector('.register-rock-9');
if (registerRock1 || registerRock2 || registerRock3 || registerRock4 || registerRock5 || registerRock6 || registerRock7 || registerRock8 || registerRock9) {
  gsap.from(registerRock1, {
    duration: 1,
    delay: 1,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock2, {
    duration: 1,
    delay: 2,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock3, {
    duration: 1,
    delay: 2.5,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock4, {
    duration: 1,
    delay: 3.5,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock5, {
    duration: 1,
    delay: 4,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock6, {
    duration: 1,
    delay: 5,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock7, {
    duration: 1,
    delay: 5.5,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock8, {
    duration: 1,
    delay: 6,
    opacity: 0,
    x: -200
  });
  gsap.from(registerRock9, {
    duration: 1,
    delay: 7,
    opacity: 0,
    x: -200
  });
}

// climber
var registerClimber1 = document.querySelector('.register-climber-1');
var registerClimber2 = document.querySelector('.register-climber-2');
var registerClimber3 = document.querySelector('.register-climber-3');
var registerClimber4 = document.querySelector('.register-climber-4');
var registerClimber5 = document.querySelector('.register-climber-5');
if (registerClimber1 || registerClimber2 || registerClimber3 || registerClimber4 || registerClimber5) {
  gsap.from(registerClimber1, {
    duration: 1,
    delay: 4.5,
    opacity: 0,
    y: 50
  });
  gsap.from(registerClimber2, {
    duration: 1,
    delay: 7.5,
    opacity: 0,
    y: -50
  });
  gsap.from(registerClimber3, {
    duration: 1,
    delay: 6.5,
    opacity: 0,
    y: 50
  });
  gsap.from(registerClimber4, {
    duration: 1,
    delay: 1.5,
    opacity: 0,
    y: 50
  });
  gsap.from(registerClimber5, {
    duration: 1,
    delay: 3,
    opacity: 0,
    x: -50
  });
}

// ----------------------- member login -----------------------

// rock moving
var loginRock1 = document.querySelector('.login-rock-1');
var loginRock2 = document.querySelector('.login-rock-2');
var loginRock3 = document.querySelector('.login-rock-3');
var loginRock4 = document.querySelector('.login-rock-4');
var loginRock5 = document.querySelector('.login-rock-5');
var loginRock6 = document.querySelector('.login-rock-6');
var loginRock7 = document.querySelector('.login-rock-7');
var loginRock8 = document.querySelector('.login-rock-8');
var loginRock9 = document.querySelector('.login-rock-9');
var loginRock10 = document.querySelector('.login-rock-10');
var loginRock11 = document.querySelector('.login-rock-11');
var loginRock12 = document.querySelector('.login-rock-12');
var loginRock13 = document.querySelector('.login-rock-13');
var loginRock14 = document.querySelector('.login-rock-14');
var loginRock15 = document.querySelector('.login-rock-15');
if (loginRock1 || loginRock2 || loginRock3 || loginRock4 || loginRock5 || loginRock6 || loginRock7 || loginRock8 || loginRock9 || loginRock10 || loginRock11 || loginRock12 || loginRock13 || loginRock14 || loginRock15) {
  gsap.from(loginRock1, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: -200
  });
  gsap.from(loginRock2, {
    duration: 1,
    opacity: 0,
    x: -200
  });
  gsap.from(loginRock3, {
    duration: 1,
    opacity: 0,
    x: -200
  });
  gsap.from(loginRock4, {
    duration: 1,
    opacity: 0,
    x: -200,
    y: 200
  });
  gsap.from(loginRock5, {
    duration: 1,
    opacity: 0,
    x: -100,
    y: 200
  });
  gsap.from(loginRock6, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: -100
  });
  gsap.from(loginRock7, {
    duration: 1,
    opacity: 0,
    y: -200
  });
  gsap.from(loginRock8, {
    duration: 1,
    opacity: 0,
    y: -200
  });
  gsap.from(loginRock9, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: 100
  });
  gsap.from(loginRock10, {
    duration: 1,
    opacity: 0,
    y: -200,
    x: 200
  });
  gsap.from(loginRock11, {
    duration: 1,
    opacity: 0,
    y: 200
  });
  gsap.from(loginRock12, {
    duration: 1,
    opacity: 0,
    y: 200,
    x: 100
  });
  gsap.from(loginRock13, {
    duration: 1,
    opacity: 0,
    y: 200,
    x: 200
  });
  gsap.from(loginRock14, {
    duration: 1,
    opacity: 0,
    x: 200
  });
  gsap.from(loginRock15, {
    duration: 1,
    opacity: 0,
    y: 100,
    x: 200
  });
}

// climber
var loginClimber1 = document.querySelector('.login-climber-1');
var loginClimber2 = document.querySelector('.login-climber-2');
var loginClimber3 = document.querySelector('.login-climber-3');
var loginClimber4 = document.querySelector('.login-climber-4');
var loginClimber5 = document.querySelector('.login-climber-5');
if (loginClimber1 || loginClimber2 || loginClimber3 || loginClimber4 || loginClimber5) {
  gsap.from(loginClimber1, {
    duration: 1,
    opacity: 0,
    delay: 0.5,
    y: 50
  });
  gsap.from(loginClimber2, {
    duration: 1,
    opacity: 0,
    delay: 1,
    y: -50
  });
  gsap.from(loginClimber3, {
    duration: 1,
    opacity: 0,
    delay: 1.5,
    y: 50
  });
  gsap.from(loginClimber4, {
    duration: 1,
    opacity: 0,
    delay: 2,
    y: -50
  });
  gsap.from(loginClimber5, {
    duration: 1,
    opacity: 0,
    delay: 2.5,
    x: -50
  });
}
"use strict";

// eslint-disable-next-line no-undef
Cocoen.parse(document.body);
"use strict";

/* eslint-disable no-undef */

// 渲染會員已報名課程
function renderMemberCourse(arr) {
  var memberCourseDetail = document.querySelector('.member-course-detail');
  var str = '';
  arr.forEach(function (item) {
    var batch = item.batch;
    str += "\n    <li class=\"mb-4\">\n    <div class=\"row\">\n    <div class=\"col-11\">\n      <ul class=\"row row-cols-lg-2 px-6 py-8 bg-opacity-c1 list-unstyled\">\n        <li class=\"col mb-4\">\n          <p class=\"fs-4 fs-lg-3 fw-bold\">\n            \u8AB2\u7A0B\u540D\u7A31\uFF1A<span class=\"fs-5 fs-lg-4 fw-normal\">".concat(batch.name, "</span>\n          </p>\n        </li>\n        <li class=\"col mb-4\">\n          <p class=\"fs-4 fs-lg-3 fw-bold\">\n            \u8AB2\u7A0B\u72C0\u614B\uFF1A<span class=\"fs-5 fs-lg-4 fw-normal\">").concat(batch.isOpened, "</span>\n          </p>\n        </li>\n        <li class=\"col\">\n          <p class=\"fs-4 fs-lg-3 fw-bold\">\n            \u9928\u5225\uFF1A<span class=\"fs-5 fs-lg-4 fw-normal\">").concat(batch.branch, "</span>\n          </p>\n        </li>\n        <li class=\"col\">\n          <p class=\"fs-4 fs-lg-3 fw-bold\">\n            \u8AB2\u7A0B\u65E5\u671F\uFF1A<span class=\"fs-5 fw-normal\"\n              >").concat(batch.content, "\n            </span>\n          </p>\n        </li>\n      </ul>\n    </div>\n    <div class=\"col-1 d-flex align-items-center\">\n      <button type=\"button\" class=\"cancel-course-btn btn btn-danger\" data-batchid=").concat(batch.id, " data-id=").concat(item.id, ">\u53D6\u6D88\u5831\u540D</button>\n    </div>\n    </div>\n      \n    </li>\n    ");
  });
  if (memberCourseDetail) {
    memberCourseDetail.innerHTML = str;
  }
}

// 刪除已報名課程
function deleteCourse() {
  var cancelCourseBtns = document.querySelectorAll('.cancel-course-btn');
  cancelCourseBtns.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var deleteId = e.target.dataset.id;
      var batchId = e.target.dataset.batchid;
      Swal.fire({
        title: '確定刪除此課程?',
        text: '點擊確認後將為您取消該課程報名',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios["delete"]("".concat(Url, "/students/").concat(deleteId)).then(function () {})["catch"](function (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
          axios.get("".concat(Url, "/batches/").concat(batchId)).then(function (res) {
            var newSignUpNum = res.data.nowSignUp - 1;
            return axios.patch("".concat(Url, "/batches/").concat(batchId), {
              nowSignUp: newSignUpNum
            });
          }).then(function () {
            // eslint-disable-next-line no-use-before-define
            getCourseData();
          })["catch"](function (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          });
          Swal.fire('已取消！', '您的課程已取消！', 'success');
        }
      });
    });
  });
}

// 獲取報名課程資訊
function getCourseData() {
  var id = localStorage.getItem('userId');
  axios.get("".concat(Url, "/users/").concat(id, "/students?_expand=batch")).then(function (res) {
    var data = res.data;
    renderMemberCourse(data);
    deleteCourse();
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

// 會員課程頁面初始化
function memberCourseInit() {
  getCourseData();
}
memberCourseInit();
"use strict";

/* eslint-disable no-useless-return */
/* eslint-disable no-undef */
var Url = 'http://localhost:3000';
var id = localStorage.getItem('userId');

// 渲染會員資訊
function renderMemberInfo(obj) {
  var memberEmail = document.querySelector('#member-email');
  var memberTel = document.querySelector('#member-tel');
  var memberName = document.querySelector('#member-name');
  var memberAccount = document.querySelector('#member-account');
  var memberPwd = document.querySelector('#member-pwd');
  var memberDetail = document.querySelector('.member-detail');
  if (memberEmail || memberTel || memberName || memberAccount || memberPwd) {
    memberEmail.value = obj.email;
    memberTel.value = obj.contactNumber;
    memberName.value = obj.name;
    memberAccount.value = obj.email;
    memberPwd.value = obj.password;
  }
  var str = '';
  str = "\n  <p class=\"fs-4 fs-lg-3 mb-2\">\u6703\u54E1\u7DE8\u865F\uFF1A<span>MEM - ".concat(obj.id, " </span></p>\n  <p class=\"fs-4 fs-lg-3 mb-2\">\u6703\u54E1\u8CC7\u683C\uFF1A<span>\u514D\u8CBB\u6703\u54E1</span></p>\n  <p class=\"fs-4 fs-lg-3\">VIP \u8D77\u8A16\u65E5\uFF1A<span>\u7121</span></p>\n  ");
  if (memberDetail) {
    memberDetail.innerHTML = str;
  }
}

// 編輯會員資訊
function editMemberInfo() {
  var memberInfoPanel = document.querySelector('.member-info-panel');
  var memberInfoEdit = document.querySelector('.member-info-edit');
  var memberInfoConfirmArea = document.querySelector('.member-info-confirm-area');
  var memberInfo = document.querySelectorAll('.member-info');
  if (memberInfoPanel) {
    memberInfoPanel.addEventListener('click', function (e) {
      e.preventDefault();
      var targetClass = e.target.classList;
      if (e.target.nodeName !== 'A') {
        return;
      }
      if (targetClass.contains('member-info-edit')) {
        targetClass.add('d-none');
        memberInfoConfirmArea.classList.remove('d-none');
        memberInfo.forEach(function (item) {
          item.removeAttribute('disabled');
        });
      } else if (targetClass.contains('member-info-cancel')) {
        // 取消後回復欄位內容
        axios.get("".concat(Url, "/users/").concat(id)).then(function (res) {
          memberInfo[0].value = res.data.email;
          memberInfo[1].value = res.data.contactNumber;
          memberInfo[2].value = res.data.name;
        })["catch"](function (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });

        // 清空錯誤訊息
        var formInputs = document.querySelectorAll('input[name=email],input[name=tel],input[name=username]');
        formInputs.forEach(function (item) {
          item.nextElementSibling.textContent = '';
        });

        // disable 欄位
        memberInfoConfirmArea.classList.add('d-none');
        memberInfoEdit.classList.remove('d-none');
        memberInfo.forEach(function (item) {
          item.setAttribute('disabled', '');
        });
      } else if (targetClass.contains('member-info-save')) {
        var obj = {};
        obj.email = memberInfo[0].value;
        obj.contactNumber = memberInfo[1].value;
        obj.name = memberInfo[2].value;

        // 判斷是否有空欄位
        if (obj.email === '' || obj.contactNumber === '' || obj.name === '') {
          Swal.fire({
            icon: 'warning',
            title: '還有空欄位未填',
            showConfirmButton: false,
            timer: 3000
          });
          return;
        }
        memberInfoConfirmArea.classList.add('d-none');
        memberInfoEdit.classList.remove('d-none');
        memberInfo.forEach(function (item) {
          item.setAttribute('disabled', '');
        });
        axios.patch("".concat(Url, "/users/").concat(id), obj).then(function (res) {
          if (res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '編輯成功',
              showConfirmButton: false,
              timer: 3000
            });
          }
        })["catch"](function (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      }
    });
  }
}

// 驗證會員資訊表單
function memberInfoFormValidate() {
  var memberInfoForm = document.querySelector('.member-info-form');
  if (memberInfoForm) {
    var constraints = {
      username: {
        presence: {
          message: '必填'
        }
      },
      email: {
        presence: {
          message: '必填'
        },
        // Email 是必填欄位
        email: true // 需要符合 email 格式
      },

      tel: {
        presence: {
          message: '必填'
        },
        length: {
          minimum: 8,
          // 長度要超過 8
          message: '至少 8 個數字'
        }
      }
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

    var formInputs = document.querySelectorAll('input[name=email],input[name=tel],input[name=username]');
    formInputs.forEach(function (item) {
      item.addEventListener('change', function () {
        // 預設為空值
        item.nextElementSibling.textContent = '';

        // 驗證回傳的內容
        var errors = validate(memberInfoForm, constraints);

        // 呈現在畫面上
        if (errors) {
          Object.keys(errors).forEach(function (keys) {
            document.querySelector(".".concat(keys)).textContent = errors[keys];
          });
        }
      });
    });
  }
}

// 從遠端取得該會員資訊並渲染
function getUserData() {
  axios.get("".concat(Url, "/users/").concat(id)).then(function (res) {
    var data = res.data;
    renderMemberInfo(data);
  })["catch"](function (error) {
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
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';

// 將登入資訊存入 LocalStorage
function saveUserToLocal(_ref) {
  var accessToken = _ref.accessToken,
    user = _ref.user;
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
  var navMenu = document.querySelector('.nav-menu');
  var str = '';
  str = "\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./gym-info.html\">\u5834\u9928\u8CC7\u8A0A</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./courses-index.html\">\u8AB2\u7A0B\u4ECB\u7D39</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./group-lessons.html\">\u5718\u9AD4\u8AB2\u7A0B</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"#\">\u5546\u54C1\u5C08\u5340</a></li>\n  <li class=\"nav-menu-login\"><a class=\"nav-menu-login-btn text-gray hover-decoBorder-bottom-gradient position-relative py-2 ms-8 pe-0\" href=\"./member-login.html\">\u767B\u5165</a></li>\n  ";
  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 登入後 nav menu 渲染 (一般使用者)
function renderLoginRenderNavMenu() {
  var navMenu = document.querySelector('.nav-menu');
  var str = '';
  str = "\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./gym-info.html\">\u5834\u9928\u8CC7\u8A0A</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./courses-index.html\">\u8AB2\u7A0B\u4ECB\u7D39</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./group-lessons.html\">\u5718\u9AD4\u8AB2\u7A0B</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"#\">\u5546\u54C1\u5C08\u5340</a></li>\n  <li class=\"nav-menu-member position-relative\">\n    <a class=\"nav-menu-member-btn position-relative text-gray d-flex align-items-center py-2 ms-8 pe-0\" href=\"#\">\n      <img class=\"rounded-3\" src=\"./assets/images/Avatar/anonymous.jpg\" alt=\"anonymous\">\n      <span class=\"nav-menu-member-btn-expand  fs-3 material-symbols-outlined\">\n        expand_more\n        </span>\n    </a>\n    <ul class=\"nav-menu-member-panel list-unstyled position-absolute\">\n      <li>\n      <a class=\"text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2\" href=\"./member-information.html\">\u6703\u54E1\u8CC7\u6599</a>\n      </li>\n      <li>\n      <a class=\"text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2\" href=\"./member-course.html\">\u8AB2\u7A0B\u7BA1\u7406</a>\n      </li>\n      <li>\n      <a class=\"nav-menu-logout-btn text-white position-relative hover-decoBorder-bottom-gradient py-1\" href=\"#\">\u767B\u51FA</a>\n      </li>\n    </ul>\n  </li>\n  ";
  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 登入後 nav menu 渲染 (最高權限)
function renderLoginNavMenuAAdmin() {
  var navMenu = document.querySelector('.nav-menu');
  var str = '';
  str = "\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./gym-info.html\">\u5834\u9928\u8CC7\u8A0A</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./courses-index.html\">\u8AB2\u7A0B\u4ECB\u7D39</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"./group-lessons.html\">\u5718\u9AD4\u8AB2\u7A0B</a></li>\n  <li><a class=\"text-gray hover-decoBorder-bottom-gradient position-relative py-2 px-0 ms-8\" href=\"#\">\u5546\u54C1\u5C08\u5340</a></li>\n  <li class=\"nav-menu-member position-relative\">\n    <a class=\"nav-menu-member-btn position-relative text-gray d-flex align-items-center py-2 ms-8 pe-0\" href=\"#\">\n      <img class=\"rounded-3\" src=\"./assets/images/Avatar/anonymous.jpg\" alt=\"anonymous\">\n      <span class=\"nav-menu-member-btn-expand  fs-3 material-symbols-outlined\">\n        expand_more\n        </span>\n    </a>\n    <ul class=\"nav-menu-member-panel list-unstyled position-absolute\">\n      <li>\n      <a class=\"text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2\" href=\"./member-information.html\">\u6703\u54E1\u8CC7\u6599</a>\n      </li>\n      <li>\n      <a class=\"text-white position-relative hover-decoBorder-bottom-gradient py-1 mb-2\" href=\"./member-course.html\">\u8AB2\u7A0B\u7BA1\u7406</a>\n      </li>\n      <li>\n      <a class=\"nav-menu-logout-btn text-white position-relative hover-decoBorder-bottom-gradient py-1\" href=\"#\">\u767B\u51FA</a>\n      </li>\n    </ul>\n  </li>\n  <li><a class=\"btn btn-gray-c1 text-gray py-2 px-6 ms-8\" href=\"./admin-course.html\">\u5F8C\u53F0</a></li>\n  ";
  if (navMenu) {
    navMenu.innerHTML = str;
  }
}

// 判斷登入狀態後渲染 nav menu
function renderNavMenu() {
  var savedRole = localStorage.getItem('role');
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
  var memberAccountRemember = document.querySelector('#member-account-remember');
  var memberLoginEmail = document.querySelector('#member-login-email');
  // memberAccountRemember.setAttribute('checked', 'checked');

  if (memberAccountRemember.checked === true) {
    localStorage.setItem('accountRemembered', memberLoginEmail.value);
  } else {
    localStorage.removeItem('accountRemembered');
  }
}

// 渲染登入記住帳號
function renderMemberLoginRemember() {
  var memberAccountRemember = document.querySelector('#member-account-remember');
  var memberLoginEmail = document.querySelector('#member-login-email');
  if (localStorage.getItem('accountRemembered')) {
    if (memberAccountRemember) {
      memberLoginEmail.value = localStorage.getItem('accountRemembered');
      memberAccountRemember.setAttribute('checked', 'checked');
    }
  }
}

// 登入
function login() {
  var memberLoginEmail = document.querySelector('#member-login-email');
  var memberLoginPwd = document.querySelector('#member-login-password');
  var LoginPanel = document.querySelector('.login-panel');
  var loginData = {
    email: memberLoginEmail.value.trim(),
    password: memberLoginPwd.value.trim()
  };
  var hasInput = loginData.email && loginData.password;
  if (hasInput) {
    axios.post("".concat(Url, "/login"), loginData).then(function (res) {
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.status === 200) {
        var str = '<h1 class="text-gray-c1 fw-bold mb-8">登入成功</h1><p>即將返回首頁</p>';
        accountRemember();
        LoginPanel.innerHTML = str;
        saveUserToLocal(res.data);
        setTimeout(function () {
          window.location.replace('/index.html');
          // window.history.go(-1);
        }, '3000');
        renderLoginRenderNavMenu();
      }
    })["catch"](function (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error.response.data === 'Cannot find user') {
        LoginPanel.innerHTML = '找不到此帳號';
      } else {
        LoginPanel.innerHTML = error.response.data || error;
      }
      setTimeout(function () {
        window.location.replace('/member-login.html');
      }, '2000');
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: '還有空欄位未填',
      showConfirmButton: false,
      timer: 3000
    });
  }
}

// 驗證登入表單
function memberLoginFormValidate() {
  var memberLoginForm = document.querySelector('.member-login-form');
  if (memberLoginForm) {
    var constraints = {
      email: {
        presence: {
          message: '必填'
        },
        // Email 是必填欄位
        email: true // 需要符合 email 格式
      },

      password: {
        presence: {
          message: '必填'
        },
        length: {
          minimum: 5,
          // 長度大於 ５
          maximum: 12,
          // 長度小於 12
          message: '^密碼長度需大於 5 小於 12'
        }
      }
    };
    var formInputs = document.querySelectorAll('input[name=email],input[name=password]');
    formInputs.forEach(function (item) {
      item.addEventListener('change', function () {
        // 預設為空值
        item.previousElementSibling.textContent = '';
      });
    });

    // 驗證回傳的內容
    var errors = validate(memberLoginForm, constraints);

    // 呈現在畫面上
    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        document.querySelector(".".concat(keys)).textContent = errors[keys];
      });
    }
  }
}

// 滑鼠登入
function mouseLogin() {
  var memberLoginBtn = document.querySelector('.member-login-btn');
  if (memberLoginBtn) {
    memberLoginBtn.addEventListener('click', function (e) {
      e.preventDefault();
      memberLoginFormValidate();
      login();
    });
  }
}

// 鍵盤登入
function keyboardLogin() {
  var loginPanel = document.querySelector('.login-panel');
  if (loginPanel) {
    loginPanel.addEventListener('keyup', function (e) {
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
  var navMenuMemberBtn = document.querySelector('.nav-menu-member-btn');
  if (navMenuMemberBtn) {
    var navMenuMemberBtnExpand = document.querySelector('.nav-menu-member-btn-expand');
    var navMenuMemberPanel = document.querySelector('.nav-menu-member-panel');
    navMenuMemberBtn.addEventListener('click', function (e) {
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
    document.addEventListener('click', function (e) {
      // console.log(e.target);
      if (e.target !== navMenuMemberPanel && e.target !== navMenuMemberBtn) {
        navMenuMemberBtnExpand.classList.remove('active');
        navMenuMemberPanel.classList.remove('active');
      }
    }, true);
  }
}

// 前台登出
function frontLogout() {
  var navMenuLogoutBtn = document.querySelector('.nav-menu-logout-btn');
  if (navMenuLogoutBtn) {
    navMenuLogoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      removeUserFromLocal();
      renderVisitorNavMenu();
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(function () {
        window.location.replace('/member-login.html');
      }, '3000');
    });
  }
}

// 後台登出
function adminLogout() {
  var adminLogoutBtn = document.querySelector('.admin-logout-btn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      removeUserFromLocal();
      renderVisitorNavMenu();
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(function () {
        window.location.replace('/member-login.html');
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
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';

// 註冊
function signUp() {
  var memberRegisterEmail = document.querySelector('#member-register-email');
  var memberRegisterPwd = document.querySelector('#member-register-password');
  var memberRegisterName = document.querySelector('#member-register-name');
  var memberRegisterNumber = document.querySelector('#member-register-number');
  var registerPanel = document.querySelector('.register-panel');
  var registerData = {
    email: memberRegisterEmail.value.trim(),
    password: memberRegisterPwd.value.trim(),
    name: memberRegisterName.value.trim(),
    contactNumber: memberRegisterNumber.value.trim(),
    role: 'user',
    photo: 'https://github.com/Key0329/HighRock-JS-sideproject-2022/blob/main/app/assets/images/Icon/climber.png?raw=true'
  };
  // eslint-disable-next-line max-len
  var hasInput = registerData.email && registerData.password && registerData.name && registerData.contactNumber;
  if (hasInput) {
    axios.post("".concat(Url, "/register"), registerData).then(function (res) {
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.status === 201) {
        var str = '<h1 class="text-gray-c1 fw-bold mb-8">註冊成功</h1><p>正在返回登入頁</p>';
        registerPanel.innerHTML = str;
        setTimeout(function () {
          window.location.replace('/member-login.html');
        }, '3000');
      }
    })["catch"](function (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error.response.data === 'Email already exists') {
        registerPanel.innerHTML = '帳號已註冊';
      } else {
        registerPanel.innerHTML = error.response.data || error;
      }
      setTimeout(function () {
        window.location.replace('/member-login.html');
      }, '3000');
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: '還有空欄位未填',
      showConfirmButton: false,
      timer: 3000
    });
  }
}

// 驗證註冊表單
function memberSignUpFormValidate() {
  var memberRegisterForm = document.querySelector('.member-register-form');
  if (memberRegisterForm) {
    var constraints = {
      username: {
        presence: {
          message: '必填'
        }
      },
      email: {
        presence: {
          message: '必填'
        },
        // Email 是必填欄位
        email: true // 需要符合 email 格式
      },

      tel: {
        presence: {
          message: '必填'
        },
        length: {
          minimum: 8,
          // 長度要超過 8
          message: '至少 8 個數字'
        }
      },
      password: {
        presence: {
          message: '必填'
        },
        length: {
          minimum: 5,
          // 長度大於 ５
          maximum: 12,
          // 長度小於 12
          message: '^密碼長度需大於 5 小於 12'
        }
      }
    };
    var formInputs = document.querySelectorAll('input[name=email],input[name=tel],input[name=username],input[name=password]');
    formInputs.forEach(function (item) {
      item.previousElementSibling.textContent = '(必填)';
      item.addEventListener('change', function () {
        // 預設為空值
        item.previousElementSibling.textContent = '';

        // 驗證回傳的內容
        var errors = validate(memberRegisterForm, constraints);

        // 呈現在畫面上
        if (errors) {
          Object.keys(errors).forEach(function (keys) {
            document.querySelector(".".concat(keys)).textContent = errors[keys];
          });
        }
      });
    });
  }
}

// 滑鼠點擊
function mousesSignUp() {
  var memberRegisterBtn = document.querySelector('.member-register-btn');
  if (memberRegisterBtn) {
    memberRegisterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      signUp();
    });
  }
}

// Enter確認
function keyboardSignUp() {
  var registerPanel = document.querySelector('.register-panel');
  if (registerPanel) {
    registerPanel.addEventListener('keyup', function (e) {
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
"use strict";

// swiper
// eslint-disable-next-line no-unused-vars, no-undef
var swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true
  }
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var VanillaTilt = function () {
  /**
   * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
   * Original idea: https://github.com/gijsroge/tilt.js
   * MIT License.
   * Version 1.7.3
   */
  var VanillaTilt = /*#__PURE__*/function () {
    function VanillaTilt(element) {
      var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, VanillaTilt);
      if (!(element instanceof Node)) {
        throw "Can't initialize VanillaTilt because ".concat(element, " is not a Node.");
      }
      this.width = null;
      this.height = null;
      this.clientWidth = null;
      this.clientHeight = null;
      this.left = null;
      this.top = null;

      // for Gyroscope sampling
      this.gammazero = null;
      this.betazero = null;
      this.lastgammazero = null;
      this.lastbetazero = null;
      this.transitionTimeout = null;
      this.updateCall = null;
      this.event = null;
      this.updateBind = this.update.bind(this);
      this.resetBind = this.reset.bind(this);
      this.element = element;
      this.settings = this.extendSettings(settings);
      this.reverse = this.settings.reverse ? -1 : 1;
      this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
      this.glarePrerender = VanillaTilt.isSettingTrue(this.settings['glare-prerender']);
      this.fullPageListening = VanillaTilt.isSettingTrue(this.settings['full-page-listening']);
      this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
      this.gyroscopeSamples = this.settings.gyroscopeSamples;
      this.elementListener = this.getElementListener();
      if (this.glare) {
        this.prepareGlare();
      }
      if (this.fullPageListening) {
        this.updateClientSize();
      }
      this.addEventListeners();
      this.reset();
      this.updateInitialPosition();
    }
    _createClass(VanillaTilt, [{
      key: "getElementListener",
      value:
      /**
       * Method returns element what will be listen mouse events
       * @return {Node}
       */
      function getElementListener() {
        if (this.fullPageListening) {
          return window.document;
        }
        if (typeof this.settings['mouse-event-element'] === 'string') {
          var mouseEventElement = document.querySelector(this.settings['mouse-event-element']);
          if (mouseEventElement) {
            return mouseEventElement;
          }
        }
        if (this.settings['mouse-event-element'] instanceof Node) {
          return this.settings['mouse-event-element'];
        }
        return this.element;
      }

      /**
       * Method set listen methods for this.elementListener
       * @return {Node}
       */
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        this.onMouseEnterBind = this.onMouseEnter.bind(this);
        this.onMouseMoveBind = this.onMouseMove.bind(this);
        this.onMouseLeaveBind = this.onMouseLeave.bind(this);
        this.onWindowResizeBind = this.onWindowResize.bind(this);
        this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
        this.elementListener.addEventListener('mouseenter', this.onMouseEnterBind);
        this.elementListener.addEventListener('mouseleave', this.onMouseLeaveBind);
        this.elementListener.addEventListener('mousemove', this.onMouseMoveBind);
        if (this.glare || this.fullPageListening) {
          window.addEventListener('resize', this.onWindowResizeBind);
        }
        if (this.gyroscope) {
          window.addEventListener('deviceorientation', this.onDeviceOrientationBind);
        }
      }

      /**
       * Method remove event listeners from current this.elementListener
       */
    }, {
      key: "removeEventListeners",
      value: function removeEventListeners() {
        this.elementListener.removeEventListener('mouseenter', this.onMouseEnterBind);
        this.elementListener.removeEventListener('mouseleave', this.onMouseLeaveBind);
        this.elementListener.removeEventListener('mousemove', this.onMouseMoveBind);
        if (this.gyroscope) {
          window.removeEventListener('deviceorientation', this.onDeviceOrientationBind);
        }
        if (this.glare || this.fullPageListening) {
          window.removeEventListener('resize', this.onWindowResizeBind);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        clearTimeout(this.transitionTimeout);
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
        this.reset();
        this.removeEventListeners();
        this.element.vanillaTilt = null;
        delete this.element.vanillaTilt;
        this.element = null;
      }
    }, {
      key: "onDeviceOrientation",
      value: function onDeviceOrientation(event) {
        if (event.gamma === null || event.beta === null) {
          return;
        }
        this.updateElementPosition();
        if (this.gyroscopeSamples > 0) {
          this.lastgammazero = this.gammazero;
          this.lastbetazero = this.betazero;
          if (this.gammazero === null) {
            this.gammazero = event.gamma;
            this.betazero = event.beta;
          } else {
            this.gammazero = (event.gamma + this.lastgammazero) / 2;
            this.betazero = (event.beta + this.lastbetazero) / 2;
          }
          this.gyroscopeSamples -= 1;
        }
        var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
        var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
        var degreesPerPixelX = totalAngleX / this.width;
        var degreesPerPixelY = totalAngleY / this.height;
        var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
        var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
        var posX = angleX / degreesPerPixelX;
        var posY = angleY / degreesPerPixelY;
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
        this.event = {
          clientX: posX + this.left,
          clientY: posY + this.top
        };
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter() {
        this.updateElementPosition();
        this.element.style.willChange = 'transform';
        this.setTransition();
      }
    }, {
      key: "onMouseMove",
      value: function onMouseMove(event) {
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }
        this.event = event;
        this.updateCall = requestAnimationFrame(this.updateBind);
      }
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave() {
        this.setTransition();
        if (this.settings.reset) {
          requestAnimationFrame(this.resetBind);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.event = {
          clientX: this.left + this.width / 2,
          clientY: this.top + this.height / 2
        };
        if (this.element && this.element.style) {
          this.element.style.transform = "perspective(".concat(this.settings.perspective, "px) ") + 'rotateX(0deg) ' + 'rotateY(0deg) ' + 'scale3d(1, 1, 1)';
        }
        this.resetGlare();
      }
    }, {
      key: "resetGlare",
      value: function resetGlare() {
        if (this.glare) {
          this.glareElement.style.transform = 'rotate(180deg) translate(-50%, -50%)';
          this.glareElement.style.opacity = '0';
        }
      }
    }, {
      key: "updateInitialPosition",
      value: function updateInitialPosition() {
        if (this.settings.startX === 0 && this.settings.startY === 0) {
          return;
        }
        this.onMouseEnter();
        if (this.fullPageListening) {
          this.event = {
            clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
            clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
          };
        } else {
          this.event = {
            clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
            clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
          };
        }
        var backupScale = this.settings.scale;
        this.settings.scale = 1;
        this.update();
        this.settings.scale = backupScale;
        this.resetGlare();
      }
    }, {
      key: "getValues",
      value: function getValues() {
        var x;
        var y;
        if (this.fullPageListening) {
          x = this.event.clientX / this.clientWidth;
          y = this.event.clientY / this.clientHeight;
        } else {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        }
        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0), 1);
        var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
        var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
        var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);
        return {
          tiltX: tiltX,
          tiltY: tiltY,
          percentageX: x * 100,
          percentageY: y * 100,
          angle: angle
        };
      }
    }, {
      key: "updateElementPosition",
      value: function updateElementPosition() {
        var rect = this.element.getBoundingClientRect();
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
      }
    }, {
      key: "update",
      value: function update() {
        var values = this.getValues();
        this.element.style.transform = "perspective(".concat(this.settings.perspective, "px) ") + "rotateX(".concat(this.settings.axis === 'x' ? 0 : values.tiltY, "deg) ") + "rotateY(".concat(this.settings.axis === 'y' ? 0 : values.tiltX, "deg) ") + "scale3d(".concat(this.settings.scale, ", ").concat(this.settings.scale, ", ").concat(this.settings.scale, ")");
        if (this.glare) {
          this.glareElement.style.transform = "rotate(".concat(values.angle, "deg) translate(-50%, -50%)");
          this.glareElement.style.opacity = "".concat(values.percentageY * this.settings['max-glare'] / 100);
        }
        this.element.dispatchEvent(new CustomEvent('tiltChange', {
          detail: values
        }));
        this.updateCall = null;
      }

      /**
       * Appends the glare element (if glarePrerender equals false)
       * and sets the default style
       */
    }, {
      key: "prepareGlare",
      value: function prepareGlare() {
        // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
        if (!this.glarePrerender) {
          // Create glare element
          var jsTiltGlare = document.createElement('div');
          jsTiltGlare.classList.add('js-tilt-glare');
          var jsTiltGlareInner = document.createElement('div');
          jsTiltGlareInner.classList.add('js-tilt-glare-inner');
          jsTiltGlare.appendChild(jsTiltGlareInner);
          this.element.appendChild(jsTiltGlare);
        }
        this.glareElementWrapper = this.element.querySelector('.js-tilt-glare');
        this.glareElement = this.element.querySelector('.js-tilt-glare-inner');
        if (this.glarePrerender) {
          return;
        }
        Object.assign(this.glareElementWrapper.style, {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          'pointer-events': 'none',
          'border-radius': 'inherit'
        });
        Object.assign(this.glareElement.style, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          'pointer-events': 'none',
          'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
          transform: 'rotate(180deg) translate(-50%, -50%)',
          'transform-origin': '0% 0%',
          opacity: '0'
        });
        this.updateGlareSize();
      }
    }, {
      key: "updateGlareSize",
      value: function updateGlareSize() {
        if (this.glare) {
          var glareSize = (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight) * 2;
          Object.assign(this.glareElement.style, {
            width: "".concat(glareSize, "px"),
            height: "".concat(glareSize, "px")
          });
        }
      }
    }, {
      key: "updateClientSize",
      value: function updateClientSize() {
        this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }
    }, {
      key: "onWindowResize",
      value: function onWindowResize() {
        this.updateGlareSize();
        this.updateClientSize();
      }
    }, {
      key: "setTransition",
      value: function setTransition() {
        var _this = this;
        clearTimeout(this.transitionTimeout);
        this.element.style.transition = "".concat(this.settings.speed, "ms ").concat(this.settings.easing);
        if (this.glare) this.glareElement.style.transition = "opacity ".concat(this.settings.speed, "ms ").concat(this.settings.easing);
        this.transitionTimeout = setTimeout(function () {
          _this.element.style.transition = '';
          if (_this.glare) {
            _this.glareElement.style.transition = '';
          }
        }, this.settings.speed);
      }

      /**
       * Method return patched settings of instance
       * @param {boolean} settings.reverse - reverse the tilt direction
       * @param {number} settings.max - max tilt rotation (degrees)
       * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
       * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
       * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
       * @param {string} settings.easing - Easing on enter/exit
       * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
       * @param {number} settings.speed - Speed of the enter/exit transition
       * @param {boolean} settings.transition - Set a transition on enter/exit
       * @param {string|null} settings.axis - What axis should be enabled. Can be "x" or "y"
       * @param {boolean} settings.glare - if it should have a "glare" effect
       * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
       * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
       * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
       * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
       * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
       * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
       * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
       * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
       */
    }, {
      key: "extendSettings",
      value: function extendSettings(settings) {
        var defaultSettings = {
          reverse: false,
          max: 15,
          startX: 0,
          startY: 0,
          perspective: 1000,
          easing: 'cubic-bezier(.03,.98,.52,.99)',
          scale: 1,
          speed: 300,
          transition: true,
          axis: null,
          glare: false,
          'max-glare': 1,
          'glare-prerender': false,
          'full-page-listening': false,
          'mouse-event-element': null,
          reset: true,
          gyroscope: true,
          gyroscopeMinAngleX: -45,
          gyroscopeMaxAngleX: 45,
          gyroscopeMinAngleY: -45,
          gyroscopeMaxAngleY: 45,
          gyroscopeSamples: 10
        };
        var newSettings = {};
        for (var property in defaultSettings) {
          if (property in settings) {
            newSettings[property] = settings[property];
          } else if (this.element.hasAttribute("data-tilt-".concat(property))) {
            var attribute = this.element.getAttribute("data-tilt-".concat(property));
            try {
              newSettings[property] = JSON.parse(attribute);
            } catch (e) {
              newSettings[property] = attribute;
            }
          } else {
            newSettings[property] = defaultSettings[property];
          }
        }
        return newSettings;
      }
    }], [{
      key: "isSettingTrue",
      value: function isSettingTrue(setting) {
        return setting === '' || setting === true || setting === 1;
      }
    }, {
      key: "init",
      value: function init(elements, settings) {
        if (elements instanceof Node) {
          elements = [elements];
        }
        if (elements instanceof NodeList) {
          elements = [].slice.call(elements);
        }
        if (!(elements instanceof Array)) {
          return;
        }
        elements.forEach(function (element) {
          if (!('vanillaTilt' in element)) {
            element.vanillaTilt = new VanillaTilt(element, settings);
          }
        });
      }
    }]);
    return VanillaTilt;
  }();
  if (typeof document !== 'undefined') {
    /* expose the class to window */
    window.VanillaTilt = VanillaTilt;

    /**
     * Auto load
     */
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'));
  }
  return VanillaTilt;
}();

// 3D tilt Effect with Vanilla-Tilt.js
VanillaTilt.init(document.querySelector('.index-features-image1'), {
  max: 25,
  scale: 1.1,
  speed: 1000
});
VanillaTilt.init(document.querySelector('.index-features-image2'), {
  max: 25,
  scale: 1.1,
  speed: 1000
});
//# sourceMappingURL=all.js.map
