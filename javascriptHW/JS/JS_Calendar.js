const dateTitle = document.querySelector(".date-title");
const lastMonthBtn = document.querySelector(".lastMonthBtn");
const nextMonthBtn = document.querySelector(".nextMonthBtn");
const todayBtn = document.querySelector(".todayBtn");
const addTodoBtn = document.querySelector(".addTodoBtn");

var myOffcanvas = document.getElementById("offcanvas");
var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
let currentYear, currentMonth, today;

let todoItemObj = {};
const storageKey = "my-todo-key";
const todoListGroup = document.querySelector("#todo_list_group");
const addBtn = document.querySelector("#add_btn");
const todoInput = document.querySelector("#todo_input");
const dateInput = document.querySelector("#datepicker");

window.addEventListener("load", () => {
  getTodoListFromStorage();
  initCalendar();
  renderTodoOnCalendar();
});

lastMonthBtn.addEventListener("click", () => {
  currentMonth -= 1;
  if (currentMonth < 1) {
    currentYear -= 1;
    currentMonth = 12;
  }
  renderingCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth += 1;
  if (currentMonth > 12) {
    currentYear += 1;
    currentMonth = 1;
  }
  renderingCalendar();
});

todayBtn.addEventListener("click", () => {
  initCalendar();
});

const fp = flatpickr("#datepicker", {
  altInput: true,
  dateFormat: "Y-m-d",
  altFormat: "Y/M/D",
  allowInput: false,
  parseDate: (datestr, format) => {
    return moment(datestr, format, true).toDate();
  },
  formatDate: (date, format, locale) => {
    // locale can also be used
    return moment(date).format(format);
  },
});

addTodoBtn.addEventListener("click", () => {
  // 正確取得 Flatpickr 選擇的日期
  const selectedDate = fp.selectedDates[0];
  // 使用 Flatpickr 內建的 formatDate 來確保格式正確
  const formattedDate = fp.formatDate(selectedDate, "Y/M/D");
  const dateStr = `${formattedDate} 待辦事項`;
  const todoText = document.querySelector("#message-text");
  const todoContent = todoText.value.trim();
  if (todoContent === "") {
    return;
  }
  dateInput.value = "";

  saveTodoItem(dateStr, todoContent);
});

function initCalendar() {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth() + 1;
  today = now;
  renderingCalendar();
}

function renderingCalendar() {
  //   console.log(`${currentYear}+${currentMonth}`);
  const thisMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const getMonthFirstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  // console.log(getMonthFirstDay);
  const lastMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

  setDateTitle();
  let t = 1;

  const dayInCalendar = [];
  for (let i = 0; i < thisMonthDays; i++) {
    dayInCalendar[getMonthFirstDay + i] = i + 1;
  }
  for (let i = 0; i < getMonthFirstDay; i++) {
    dayInCalendar[i] = lastMonthDays - getMonthFirstDay + (i + 1);
  }
  let r = dayInCalendar.length; //欄位顯示
  while (r % 7 !== 0) {
    r++;
  }
  for (let i = dayInCalendar.length; i < r; i++) {
    dayInCalendar[i] = t;
    t++;
  }

  const getRdArea = document.querySelector("tbody");
  const tbodyContent = dayInCalendar
    .reduce((acc, curr, index) => {
      // 每 7 個元素開始新的 <tr>
      if (index % 7 === 0) {
        acc.push([]);
      }
      // 將 <td> 加入當前的 <tr>
      if (index < getMonthFirstDay) {
        acc[acc.length - 1].push(
          `<td class="last-month-days text-secondary">${curr}</td>`
        );
      } else if (index > getMonthFirstDay - 1 + thisMonthDays) {
        acc[acc.length - 1].push(
          `<td class="next-month-days text-secondary">${curr}</td>`
        );
      } else {
        acc[acc.length - 1].push(`<td class="text-primary">${curr}</td>`);
      }
      return acc;
    }, [])
    .map((tr) => `<tr>\n  ${tr.join("\n  ")}\n</tr>`)
    .join("\n");

  const tableHTML = `<tbody class="text-end ">\n${tbodyContent}\n</tbody>`;
  getRdArea.innerHTML = tableHTML;

  if (
    today.getFullYear() === currentYear &&
    today.getMonth() + 1 === currentMonth
  ) {
    const AllTd = document.querySelectorAll("td");
    const getTodayTd = AllTd[getMonthFirstDay - 1 + today.getDate()];
    getTodayTd.classList.add("table-warning");
  }

  getRdArea.onclick = function (e) {
    let target = e.target;
    let tempM = currentMonth;
    let result;
    if (target.classList.contains("last-month-days")) {
      tempM--;
      result = tempM < 1 ? 12 : tempM;
    } else if (target.classList.contains("next-month-days")) {
      tempM++;
      result = tempM > 12 ? 1 : tempM;
    } else {
      result = currentMonth;
    }
    document.querySelector(
      ".offcanvas-title"
    ).textContent = `${currentYear}/${result}/${target.textContent} 待辦事項`;
    bsOffcanvas.show();
    renderingTodoList();
  };
}
function renderTodoOnCalendar() {

  
}
function setDateTitle() {
  const setYear = currentYear;
  const setMonth = currentMonth - 1;

  const MonthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  dateTitle.textContent = `${setYear} ${MonthArr[setMonth]}`;
}

function getTodoListFromStorage() {
  const localStorageItem = JSON.parse(localStorage.getItem(storageKey));
  if (localStorageItem) {
    todoItemObj = localStorageItem;
  }
}

function saveTodoListToStorage() {
  const json = JSON.stringify(todoItemObj);
  localStorage.setItem(storageKey, json);
}

function getSelectedDate() {
  return document.querySelector(".offcanvas-title").textContent;
}

addBtn.addEventListener("click", () => {
  const dateStr = getSelectedDate();
  const todoContent = todoInput.value.trim();
  if (todoContent === "") {
    return;
  }
  todoInput.value = "";

  saveTodoItem(dateStr, todoContent);
});

function saveTodoItem(dateStr, todoItem) {
  if (!Array.isArray(todoItemObj[dateStr])) {
    todoItemObj[dateStr] = [];
  }
  todoItemObj[dateStr].push({ content: todoItem });
  saveTodoListToStorage();
  renderingTodoList();
  renderTodoOnCalendar();
}

function edit(el) {
  const todoContent = el.parentElement.querySelector(".todo-content");
  todoContent.disabled = false;
  //顯示"儲存"按鈕
  const saveBtn = el.parentElement.querySelector(".save-btn");
  saveBtn.classList.remove("d-none");
  //隱藏"編輯"按鈕
  el.classList.add("d-none");
}

function save(el, idx) {
  const todoContent = el.parentElement.querySelector(".todo-content");
  todoContent.disabled = true;

  //儲存內容
  const dateStr = getSelectedDate();
  if (todoItemObj[dateStr]) {
    todoItemObj[dateStr][idx].content = todoContent.value;
    saveTodoListToStorage();
  }
  //顯示"編輯"按鈕
  const editBtn = el.parentElement.querySelector(".edit-btn");
  editBtn.classList.remove("d-none");
  //隱藏"儲存"按鈕
  el.classList.add("d-none");
}
function remove(dateStr, idx) {
  todoItemObj[dateStr].splice(idx, 1);
  saveTodoListToStorage();
  renderingTodoList();
}

function renderingTodoList() {
  const dateStr = getSelectedDate();
  todoListGroup.innerHTML = "";

  if (!todoItemObj[dateStr] || todoItemObj[dateStr].length === 0) {
    return;
  }

  todoItemObj[dateStr].forEach((item, idx) => {
    todoListGroup.innerHTML += `
    <li class="list-group-item">
      <div class="input-group">
        <input
          type="text"
          class="form-control todo-content"
          aria-label="Text input with checkbox"
          value="${item.content}"
          disabled
        />
        <button class="btn save-btn btn-success d-none" type="button" onclick="save(this,${idx})">儲存</button>
        <button class="btn edit-btn btn-warning" type="button" onclick="edit(this)">編輯</button>
        <button class="btn btn-danger" type="button" onclick="remove('${dateStr}',${idx})">刪除</button>
      </div>
    </li>`;
  });
}
