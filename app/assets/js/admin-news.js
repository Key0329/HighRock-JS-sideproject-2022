/* eslint-disable no-undef */
const Url = 'http://localhost:3000';

const form = document.querySelector('.js-form-editor');
const btnSendEditor = document.querySelector('.js-send-to-set-editor');

const createEditor = document.querySelector('#createEditor');

function submitPost(articleData, dataText) {
  // const userId = localStorage.getItem('userId');
  // const AUTH = `Bearer ${localStorage.getItem('token')}`;
  // axios.defaults.headers.common.Authorization = AUTH;

  const data = {
    imgUrl: 'https://picsum.photos/400',
    title: form.title.value,
    description: dataText,
    createTime: `${Date.now()}`,
    body: articleData,
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
        //   window.location.replace('/admin/desk.html');
        Swal.fire({
          icon: 'success',
          title: '新增成功',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

function getEditorData(editor) {
  const articleData = editor.getData();

  const dataText = editor.ui.view.editable.element.innerText;

  return submitPost(articleData, dataText);
}

function editorHandler(editor) {
  btnSendEditor.addEventListener('click', () => getEditorData(editor));
}

function adminNewsInit() {
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

adminNewsInit();
