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
    if (item.isUser === true) {
      isMember = '會員';
    } else {
      isMember = '非會員';
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
  var status = '';
  var statusColor = '';
  arr.forEach(function (item) {
    if (item.isExpired === true) {
      status = '已到期';
      statusColor = 'text-danger';
    } else {
      status = '未到期';
      statusColor = 'text-success';
    }
    str += "\n    <tr class=\"vertical-middle\">\n      <th scope=\"row\">MEM ".concat(item.id, "</th>\n      <td>\n        <div class=\"admin-account-avatar me-2\">\n          <img\n            class=\"rounded-circle\"\n            src=\"").concat(item.photo, "\"\n            alt=\"avatar\"\n          />\n        </div>\n      </td>\n      <td>").concat(item.name, "</td>\n      <td>").concat(item.contactNumber, "</td>\n      <td>").concat(item.email, "</td>\n      <td>").concat(item.startDate, " \uFF5E ").concat(item.expireDate, "</td>\n      <td class=").concat(statusColor, ">").concat(status, "</td>\n    </tr>\n    ");
  });
  if (adminMemberTable) {
    adminMemberTable.innerHTML = str;
  }
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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* eslint-disable no-undef */

var Url = 'http://localhost:3000';
var toggleList = 'introduction';

// ---------------------- 報名課程 彈跳視窗 ----------------------

// model 關閉
function registerModelClose() {
  var registerModel = document.querySelector('.register-model');
  var registerModelNonMember = document.querySelector('.register-model-nonMember');
  registerModel.classList.remove('register-model--active');
  registerModelNonMember.classList.remove('register-model--active');
}

// model 控制
function registerModelControl() {
  var registerModel = document.querySelector('.register-model');
  var registerModelOpenBtn = document.querySelector('.register-btn');

  // 開啟彈跳視窗
  if (registerModelOpenBtn) {
    registerModelOpenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      registerModel.classList.add('register-model--active');
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

// 非會員報名彈跳視窗;
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
      registerModelNonMember.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') === 'register-model-nonMember register-model--active') {
          registerModelClose();
        }
      });
    });
  }
}

// 更新後台資料並重新渲染
function updateDataAndRerender() {
  return _updateDataAndRerender.apply(this, arguments);
} // 非會員 form 表單確認或取消
function _updateDataAndRerender() {
  _updateDataAndRerender = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var registerNonMemberId, registerNonMemberName, registerNonMemberEmail, registerNonMemberPhoneNum, idValue, registeredStudentInfo, res, courseNowSignUp, courseBranch, courseBatch, res2, registerNum, obj, res3, res4, newData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            registerNonMemberId = document.querySelector('#course-nonMember-id');
            registerNonMemberName = document.querySelector('#register-nonMember-name');
            registerNonMemberEmail = document.querySelector('#register-nonMember-email');
            registerNonMemberPhoneNum = document.querySelector('#register-nonMember-phoneNum');
            idValue = registerNonMemberId.value;
            registeredStudentInfo = {
              isUser: false,
              batchId: idValue,
              name: registerNonMemberName.value,
              email: registerNonMemberEmail.value,
              contactNumber: registerNonMemberPhoneNum.value
            }; // 傳送報名資訊到資料庫;
            _context.next = 9;
            return axios.post("".concat(Url, "/registeredStudent"), registeredStudentInfo);
          case 9:
            res = _context.sent;
            courseNowSignUp = document.querySelector('.course-nowSignUp');
            courseBranch = document.querySelector('#course-branch');
            courseBatch = document.querySelector('#course-batch');
            courseNowSignUp.innerHTML = '';
            courseBranch.value = '- 請選擇分館 -';
            courseBatch.value = '- 請選擇梯次 -';

            // 取得最新學生人數
            _context.next = 18;
            return axios.get("".concat(Url, "/batches/").concat(idValue, "/registeredStudent"));
          case 18:
            res2 = _context.sent;
            registerNum = res2.data.length;
            obj = {
              nowSignUp: registerNum
            }; // 更新資料庫最新報名人數
            _context.next = 23;
            return axios.patch("".concat(Url, "/batches/").concat(idValue), obj);
          case 23:
            res3 = _context.sent;
            _context.next = 26;
            return axios.get("".concat(Url, "/batches"));
          case 26:
            res4 = _context.sent;
            newData = res4.data; // eslint-disable-next-line no-use-before-define
            batchesChange(newData);
            return _context.abrupt("return", {
              res: res,
              res3: res3
            });
          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);
          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 32]]);
  }));
  return _updateDataAndRerender.apply(this, arguments);
}
function nonMemberFormConfirmOrCancel() {
  var registerModelNonMemberForm = document.querySelector('.register-model-nonMember-form');
  if (registerModelNonMemberForm) {
    registerModelNonMemberForm.addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target.type === 'submit') {
        updateDataAndRerender().then(function (res, res3) {
          // eslint-disable-next-line no-console
          console.log(res, res3);
        });

        // sweet alert
        Swal.fire({
          icon: 'success',
          title: '報名成功<br />請前往填寫的信箱收取報名資訊',
          showConfirmButton: false,
          timer: 3000
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
    str = "\n    <div class=\"container\">\n      <div class=\"row row-cols-1 row-cols-lg-2 g-lg-8\">\n        <div class=\"col d-none d-lg-block\">\n          <img class=\"w-100\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n        </div>\n        <div class=\"col\">\n          <h1 class=\"course-name\" text-center text-lg-start fw-bold fs-1 display-size-lg-5 my-4 my-lg-10\">\n            ").concat(item.name, "\n          </h1>\n          <div class=\"d-flex flex-column flex-lg-row align-items-center mb-4 mb-lg-10\">\n            <del class=\"course-nonmember-price fs-lg-1 me-lg-4\">NT$ ").concat(item.price, "</del>\n            <p class=\"course-member-price fs-lg-1 text-danger\">NT$ ").concat(item.userPrice, "</p>\n          </div>\n          <form>\n            <div class=\"d-flex flex-column mb-6\">\n              <label for=\"course-branch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u5206\u9928</label>\n              <select class=\"w-100 w-lg-50 mt-2 py-1 ps-2\" name=\"course-branch\" id=\"course-branch\">\n                ").concat(branchStr, "\n              </select>\n            </div>\n            <div class=\"register-batch d-flex flex-column mb-10 mb-lg-16\">\n              <label for=\"course-batch\" class=\"letter-12\">\u8ACB\u9078\u64C7\u68AF\u6B21</label>\n              <select class=\"w-100 w-lg-75 my-2 py-1 ps-2\" name=\"course-batch\" id=\"course-batch\">\n                ").concat(batchStr, "\n              </select>\n              <p class=\"course-nowSignUp\"></p>\n            </div>\n            <input\n              type=\"submit\"\n              value=\"\u5831\u540D\u672C\u68AF\u6B21\u8AB2\u7A0B\"\n              class=\"register-btn btn btn-primary w-100 w-lg-auto rounded-3 px-8\"\n            />\n          </form>\n        </div>\n      </div>\n      <img\n        class=\"register-course-text position-absolute d-none d-lg-block\"\n        src=\"").concat(item.courseNameEn, "\"\n      />\n    </div>\n    ");
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
    str += "\n          <li class=\"col mb-6 mb-lg-0\">\n            <img class=\"mb-4\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" />\n            <h3 class=\"text-center text-lg-start mb-2\">").concat(item.name, "</h3>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <p class=\"me-2\">NT$ ").concat(item.price, "</p>\n              <p class=\"mb-8\">\u5C1A\u6709\u540D\u984D</p>\n            </div>\n            <div class=\"d-flex justify-content-center justify-content-lg-start\">\n              <a href=\"#\" class=\"btn btn-primary rounded-3 px-8 py-2\" data-courseId=\"").concat(item.courseId, "\"\n                >\u67E5\u770B\u8A73\u60C5</a\n              >\n            </div>\n          </li>\n        ");
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
  axios.get("".concat(Url, "/courses")).then(function (res) {
    var data = res.data;
    courseRegisterOpen(data);
    checkOtherCourses(data);
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

// 檢查報名表格、更新報名人數
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
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';
function saveUserToLocal(_ref) {
  var accessToken = _ref.accessToken,
    user = _ref.user;
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userID', user.id);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userNumber', user.contactNumber);
}
function renderNavMenu() {}
function login() {
  var memberLoginBtn = document.querySelector('.member-login-btn');
  if (memberLoginBtn) {
    memberLoginBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var memberLoginEmail = document.querySelector('#member-login-email');
      var memberLoginPwd = document.querySelector('#member-login-password');
      var LoginPanel = document.querySelector('.login-panel');
      var navMenuLogin = document.querySelector('.nav-menu-login');
      var navMenuMember = document.querySelector('.nav-menu-member');
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
            LoginPanel.innerHTML = str;
            saveUserToLocal(res.data);
            setTimeout(function () {
              window.location.replace('/index.html');
            }, '3000');
            navMenuLogin.classList.add('d-none');
            navMenuMember.classList.remove('d-none');
          }
        })["catch"](function (error) {
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
  var navMenuMemberBtn = document.querySelector('.nav-menu-member-btn');
  if (navMenuMemberBtn) {
    navMenuMemberBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var navMenuMemberBtnExpand = document.querySelector('.nav-menu-member-btn-expand');
      var navMenuMemberPanel = document.querySelector('.nav-menu-member-panel');
      if (navMenuMemberBtnExpand.classList.contains('active') && navMenuMemberPanel.classList.contains('active')) {
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
"use strict";

/* eslint-disable no-undef */
var Url = 'http://localhost:3000';
function signUp() {
  var memberRegisterBtn = document.querySelector('.member-register-btn');
  if (memberRegisterBtn) {
    memberRegisterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var memberRegisterEmail = document.querySelector('#member-register-email');
      var memberRegisterPwd = document.querySelector('#member-register-password');
      var memberRegisterName = document.querySelector('#member-register-name');
      var memberRegisterNumber = document.querySelector('#member-register-number');
      var registerPanel = document.querySelector('.register-panel');
      var registerData = {
        email: memberRegisterEmail.value.trim(),
        password: memberRegisterPwd.value.trim(),
        name: memberRegisterName.value.trim(),
        contactNumber: memberRegisterNumber.value.trim()
      };
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
//# sourceMappingURL=all.js.map
