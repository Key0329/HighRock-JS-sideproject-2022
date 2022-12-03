// ---------------------- preloader ---------------------

window.onload = () => {
  const preLoader = document.querySelector('#preloader');
  if (preLoader) {
    preLoader.classList.add('loader-hide');
  }
};

// 增加千分位逗點
// eslint-disable-next-line no-unused-vars
function toThousands(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
