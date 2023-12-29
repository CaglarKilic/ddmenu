if (!localStorage.length) {
  localStorage.setItem("items", JSON.stringify({}));
}

const items = JSON.parse(localStorage.getItem("items"));

function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function selectCategoryTree() {
  const main = document.querySelector("#main-category");
  const sub = document.querySelector("#sub-category");
  const item = document.querySelector("#item-category");

  const mainIndex = main.selectedIndex;
  const subIndex = sub.selectedIndex;

  main.replaceChildren();
  Object.keys(items).forEach((key) => {
    main.add(new Option(key));
  });
  main.selectedIndex = mainIndex;

  sub.replaceChildren();
  if (main.value) {
    Object.keys(items[main.value]).forEach((key) => {
      sub.add(new Option(key));
    });
    sub.selectedIndex = subIndex;
  }

  item.replaceChildren();
  if (sub.value) {
    items[main.value][sub.value].forEach((elem) => {
      item.add(new Option(elem));
    });
  }
}

function addSelect(select, options) {
  select.replaceChildren();
  options.forEach((option) => {
    select.add(new Option(option));
  });
  document.forms[0].reset();
}

function addMainCategory(event) {
  if (event.key === "Enter" && event.target.value) {
    items[event.target.value] = {};
    const select = document.querySelector("#main-category");
    addSelect(select, Object.keys(items));
    select.selectedIndex = select.options.length - 1;
    selectCategoryTree();
    updateLocalStorage();
  }
}

function addSubCategory(event) {
  if (event.key === "Enter" && event.target.value) {
    const category = document.querySelector("#main-category").value;
    items[category][event.target.value] = [];
    const select = document.querySelector("#sub-category");
    addSelect(select, Object.keys(items[category]));
    select.selectedIndex = select.options.length - 1;
    selectCategoryTree();
    updateLocalStorage();
  }
}

function addItemCategory(event) {
  if (event.key === "Enter" && event.target.value) {
    const mainCategory = document.querySelector("#main-category").value;
    const subCategory = document.querySelector("#sub-category").value;
    items[mainCategory][subCategory].push(event.target.value);
    const select = document.querySelector("#item-category");
    addSelect(select, items[mainCategory][subCategory]);
    select.selectedIndex = select.options.length - 1;
    selectCategoryTree();
    updateLocalStorage();
  }
}

document
  .querySelector("#get-main-category")
  .addEventListener("keypress", addMainCategory);

document
  .querySelector("#get-sub-category")
  .addEventListener("keypress", addSubCategory);

document
  .querySelector("#get-item-category")
  .addEventListener("keypress", addItemCategory);

document
  .querySelector("#main-category")
  .addEventListener("change", selectCategoryTree);

document
  .querySelector("#sub-category")
  .addEventListener("change", selectCategoryTree);

document.querySelector("form>button").addEventListener("click", () => {
  document.forms[0].parentElement.close();
});

function updateMainMenu() {
  const main = document.querySelector("#main");
  main.replaceChildren();
  Object.keys(items).forEach((key) => {
    const li = document.createElement("li");
    li.setAttribute("data-main", key);
    li.append(key);
    main.append(li);
  });
}

function updateDropDownMenu(main) {
  const dropDown = document.querySelector("#drop-down");
  dropDown.replaceChildren();
  Object.keys(items[main]).forEach((key) => {
    const section = document.createElement("section");
    const liSub = document.createElement("li");
    liSub.append(key);
    section.append(liSub);

    items[main][key].forEach((item) => {
      const liItem = document.createElement("li");
      liItem.append(item);
      section.append(liItem);
    });

    dropDown.append(section);
  });
}
