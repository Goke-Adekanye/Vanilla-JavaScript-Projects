let count = 0;

const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');

btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const clax = e.currentTarget.classList;

    clax.contains('decrease') ? count-- : clax.contains('increase') ? count++ : (count = 0);
    value.textContent = count;
    count < 0
      ? (value.style.color = 'red')
      : count > 0
      ? (value.style.color = 'green')
      : (value.style.color = 'black');
    // console.log(count);
  });
});
