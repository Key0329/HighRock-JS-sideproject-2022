/* eslint-disable no-undef */
// const Url = 'https://high-rock-server.vercel.app';
const Url = 'https://highrock-server-render.onrender.com';

// 渲染後臺消息列表
function renderNewsList(data) {
  const adminLatestNews = document.querySelector('.admin-latest-news');

  let str = `
    <div class="col">
      <div class="card h-100 shadow-sm border-1 border-primary d-flex justify-content-center align-items-center">
        <a href="./admin-news-create.html" class="stretched-link d-flex flex-column justify-content-center align-content-center hover-orange">
        <span class="d-block fs-1">新增</span>
        <span class="material-symbols-outlined fs-1 text-center">
        add_circle
        </span></a>
      </div>
    </div>
    `;

  data.forEach((item) => {
    str += `
    <div class="col">
      <div class="card h-100 shadow-sm">
        <img src=${item.imgUrl} class="card-img-top" alt="gym-sm-6" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold fs-2">${item.title}</h5>
          <div class=card-text>
          ${item.description}
          </div>
        </div>
        <div class="card-footer text-end">
          <button class="news-edit-btn btn btn-warning" data-id=${item.id}>編輯</button>
          <button class="news-delete-btn btn btn-danger" data-id=${item.id}>刪除</button>
        </div>
      </div>
    </div>
    `;
  });

  if (adminLatestNews) {
    adminLatestNews.innerHTML = str;
  }
}

// 刪除消息列表
function deleteNews() {
  const newsDeleteBtn = document.querySelectorAll('.news-delete-btn');
  newsDeleteBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const dataId = e.target.dataset.id;

      Swal.fire({
        title: '確定要刪除該文章?',
        text: '該文章將無法回復',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '繼續刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${Url}/posts/${dataId}`)
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              getNewsListData();
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
          Swal.fire('已刪除!', '該篇po文已刪除', 'success');
        }
      });
    });
  });
}

// 編輯消息列表
function updateNews() {
  const newsEditBtn = document.querySelectorAll('.news-edit-btn');
  newsEditBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const newsId = e.target.dataset.id;
      localStorage.setItem('newsId', newsId);
      window.location.replace('./admin-news-edit.html');
    });
  });
}

// 取得消息列表資料
function getNewsListData() {
  axios
    .get(`${Url}/posts`)
    .then((res) => {
      const { data } = res;
      renderNewsList(data);
      deleteNews();
      updateNews();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

function adminNewsListInit() {
  getNewsListData();
}

adminNewsListInit();
