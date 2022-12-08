/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

const editForm = document.querySelector('.js-form-editor-edit');
const btnEditEditor = document.querySelector('.js-send-to-edit-editor');
const editEditor = document.querySelector('#editEditor');
const newsId = localStorage.getItem('newsId');

// 修改最新消息
function submitEdit(articleData, dataText) {
  const data = {
    imgUrl: 'https://picsum.photos/400',
    title: editForm.title.value,
    text: dataText,
    createTime: `${Date.now()}`,
    description: articleData,
  };

  if (data.title === '' || data.description === '' || data.body === '') {
    Swal.fire({
      icon: 'warning',
      title: '有空欄位未填',
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }

  axios
    .put(`${Url}/posts/${newsId}`, data)
    .then((res) => {
      const isOK = res.status === 201 || res.status === 200;
      if (isOK) {
        Swal.fire({
          icon: 'success',
          title: '編輯成功',
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          window.location.replace('./admin-news-list.html');
        }, 1000);
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 取得 editor 內的資料
function getEditEditorData(editor) {
  const articleData = editor.getData();
  const dataText = editor.ui.view.editable.element.innerText;

  return submitEdit(articleData, dataText);
}

// 修改按鈕監聽
function editEditorHandler(editor) {
  btnEditEditor.addEventListener('click', () => getEditEditorData(editor));
}

// 取得原有資料內容並帶入編輯器
function renderOldData(editor) {
  axios
    .get(`${Url}/posts/${newsId}`)
    .then((res) => {
      const { data } = res;
      const editNewsTitle = document.querySelector('#edit-news-title');

      editNewsTitle.value = data.title;
      editor.setData(data.description);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 初始化
function adminEditInit() {
  if (editEditor) {
    // eslint-disable-next-line no-undef
    ClassicEditor.create(editEditor)
      .then((editor) => {
        renderOldData(editor);
        editEditorHandler(editor);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }
}

adminEditInit();
