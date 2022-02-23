// ****** SELECT ITEMS **********
const form = document.querySelector('.grocery-form');
const alert = document.querySelector('.alert');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
//Load Items
window.addEventListener('DOMContentLoaded', setupItems);
//Submit form
form.addEventListener('submit', addItem);
//clear items
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    //create item
    createItem(id, value);
    //display alert
    displayAlert('item added successfully', 'success');
    //show container
    container.classList.add('show-container');
    //add to localStorage
    addToLocalStorage(id, value);
    //set to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('item edit successfully', 'success');
    //edit local storage
    editToLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert('enter value', 'danger');
  }
}

//Display Alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert
  setTimeout(() => {
    alert.textContent = ``;
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
//Clear Items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}
//Delete Item
function deleteItem(e) {
  const items = document.querySelectorAll('.grocery-item');
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.getAttribute('data-id');
  items.forEach(function (item) {
    if (id === item.getAttribute('data-id')) {
      list.removeChild(item);
    }
  });
  displayAlert('item remove', 'danger');
  if (!list.children.length) {
    container.classList.remove('show-container');
  }
  setBackToDefault();
  removeFromLocalStorage(id);
}
//Delete Item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = id;
  submitBtn.textContent = 'edit';

  //   console.log(editElement);
}
//Set to Default
function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}
// ****** LOCAL STORAGE **********
//Aad to Storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();

  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
}
//Edit to Storage
function editToLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
//remove from storage
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  console.log(items);

  items = items.filter(function (item) {
    if (item.id !== id) return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}

function createItem(id, value) {
  //create element
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  //create attr
  let attr = document.createAttribute('data-id');
  attr.value = id;
  //set attr
  element.setAttributeNode(attr);

  element.innerHTML = `
     <p class="title">${value}</p>
     <div class="btn-container">
     <!-- edit btn -->
     <button type="button" class="edit-btn">
         <i class="fas fa-edit"></i>
     </button>
     <!-- delete btn -->
     <button type="button" class="delete-btn">
         <i class="fas fa-trash"></i>
     </button>
     </div>
     `;

  // console.log(element);
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);
  //append child
  list.appendChild(element);
}
