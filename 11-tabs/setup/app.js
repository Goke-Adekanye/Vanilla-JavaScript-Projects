const btns = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');

btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const clickedBtn = e.currentTarget;
    const id = clickedBtn.getAttribute('data-id');
    const article = document.getElementById(id);

    setActive(btns, clickedBtn);
    setActive(contents, article);
  });
});

function setActive(parent, activeItem) {
  parent.forEach(function (item) {
    item.classList.remove('active');
    activeItem.classList.add('active');
  });
}
