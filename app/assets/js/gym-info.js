/* eslint-disable no-undef */
Cocoen.parse(document.body);

// 渲染最新消息

function renderLatestNews(data) {
  const gymLatestNews = document.querySelector('.gym-latest-news');

  let str = '';

  data.forEach((item) => {
    const createPostTime = new Date(+item.createTime);
    const createPostDate = `${createPostTime.getFullYear()} / ${
      createPostTime.getMonth() + 1
    } / ${createPostTime.getDate()}`;

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
          <small class="text-muted">建立於 ${createPostDate}</small>
        </div>
      </div>
    </div>
    `;
  });

  if (gymLatestNews) {
    gymLatestNews.innerHTML = str;
  }
}

function getNewsData() {
  axios
    .get(`${Url}/posts`)
    .then((res) => {
      const { data } = res;
      renderLatestNews(data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

// 初始化
function gymInfoInit() {
  getNewsData();
}

gymInfoInit();
