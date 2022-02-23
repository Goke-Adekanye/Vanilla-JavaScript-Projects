//using selectors inside the element
// const qContainers = document.querySelectorAll('.question');

// qContainers.forEach(function (question) {
//   const qBtn = question.querySelector('.question-btn');
//   qBtn.addEventListener('click', () => {
//     qContainers.forEach((item) => {
//       if (item !== question) item.classList.remove('show-text');
//     });
//     question.classList.toggle('show-text');
//   });
// });

// traversing the dom
const qBtns = document.querySelectorAll('.question-btn');

qBtns.forEach(function (qBtn) {
  qBtn.addEventListener('click', function (e) {
    const qContainer = e.currentTarget.parentElement.parentElement;
    qBtns.forEach((item) => {
      const itemContainer = item.parentElement.parentElement;
      if (itemContainer !== qContainer) {
        itemContainer.classList.remove('show-text');
      }
    });
    qContainer.classList.toggle('show-text');
  });
});
