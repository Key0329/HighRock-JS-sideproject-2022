/* eslint-disable no-undef */
// const Url = 'https://highrock-server-render.onrender.com';

const form = document.querySelector('.js-form-editor');
const btnSendEditor = document.querySelector('.js-send-to-set-editor');
const createEditor = document.querySelector('#createEditor');

// 新增最新消息到資料庫
function submitPost(articleData, dataText) {
  const data = {
    imgUrl: 'https://picsum.photos/400',
    title: form.title.value,
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
    .post(`${Url}/posts`, data)
    .then((res) => {
      const isOK = res.status === 201 || res.status === 200;
      if (isOK) {
        Swal.fire({
          icon: 'success',
          title: '新增成功',
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
function getEditorData(editor) {
  const articleData = editor.getData();

  const dataText = editor.ui.view.editable.element.innerText;

  return submitPost(articleData, dataText);
}

// po文按鈕監聽
function editorHandler(editor) {
  btnSendEditor.addEventListener('click', () => getEditorData(editor));
}

// 初始化
function adminCreateInit() {
  if (createEditor) {
    // eslint-disable-next-line no-undef
    ClassicEditor.create(createEditor)
      .then((editor) => {
        editorHandler(editor);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }
}

adminCreateInit();
