const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");
const removeItem = document.querySelector("ul");
const filterItems = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUi();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("You need to add something");
    return; // return it does not submit empty list item in the the todo list
  }
  if (checkIFitemExists(newItem)) {
    alert("that item already exists ");
    return;
  }
  addItemToDom(newItem);
  addItemToStorage(newItem);

  checkUi();

  itemInput.value = ""; // it does clear the add item input
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  // if (localStorage.getItem("items") === null) {
  //   itemsFromStorage = [];
  // } else {
  //   itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  // }
  //push the item to the local storage array
  itemsFromStorage.push(item);
  // convert json to js object in order to be shown
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function clearAll() {
  const list = document.querySelectorAll("li");
  list.forEach((item) => item.remove());

  /// clear from local storage

  localStorage.removeItem("items");

  checkUi();
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    clearItem(e.target.parentElement.parentElement);
  }
}

function checkIFitemExists(item) {
  itemInput.value = "";
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function clearItem(item) {
  if (confirm("are you sure ?")) {
    // remove item from dom
    item.remove();

    // remove item from storage
    removeItemFromStorage(item.textContent);
    checkUi();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  // filter out item to be removed

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //reset to localstorage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function filterItem(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUi() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clear.style.display = "none";
    filterItems.style.display = "none";
  } else {
    clear.style.display = "block";
    filterItems.style.display = "block";
  }
}

function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  clear.addEventListener("click", clearAll);
  removeItem.addEventListener("click", onClickItem);
  filterItems.addEventListener("keydown", filterItem);
  window.addEventListener("DOMContentLoaded", displayItems);

  checkUi();
}

init();


console.log('Hi')