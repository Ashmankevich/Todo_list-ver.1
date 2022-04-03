const addTaskBtn = document.getElementById("add-task-btn");
const deleteAllTaskBtn = document.getElementById("delete-task-btn");
const deleteTaskBtn = document.querySelector(".btn-delete");
const dscrptnTask = document.querySelector(".input");
const todoRow = document.querySelector(".row");

let todoItemElems = [];
let allTasks;

if (localStorage.allTasks === allTasks) {
   allTasks = [];
} else {
   allTasks = JSON.parse(localStorage.getItem('allTasks'))
};

const updateLocalStorage = () => {
   localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function GetTask(description) {
   this.description = description;
   this.isChecked = false;
   this.id = Date.now();
}

const getSample = (oneTask, index) => {
   return `
      <div class="list ${oneTask.isChecked ? 'checked' : ' '}">
      <div class="item">
      <input onclick="completeTask(${index})" type="checkbox" ${oneTask.isChecked ? 'checked' : ' '} class="btn-complete">
      <span class="check__box"></span>
      </div>
      <div class="item">
      <p class="description">${oneTask.description}</p>
      </div>
      <div class="item">
      <button onclick="deleteTask(${index})" class="btn-delete">
      <i class="fa-solid fa-trash-can"></i>
      </button>
      </div>
      </div>
   `
}

const fillListItem = () => {
   todoRow.innerHTML = '';
   if (allTasks.length > 0) {
      allTasks.forEach((item, index) => {
         todoRow.innerHTML += getSample(item, index)
      });
      todoItemElems = document.querySelectorAll('.list');
   }
}
fillListItem();

const completeTask = (index) => {
   allTasks[index].isChecked = !allTasks[index].isChecked;
   if (allTasks[index].isChecked) {
      todoItemElems[index].classList.add('checked');
   } else {
      todoItemElems[index].classList.remove('checked');
   }
   updateLocalStorage();
   fillListItem();
}

const deleteTask = (index) => {
   allTasks.splice(index, 1);
   updateLocalStorage();
   fillListItem();
}

addTaskBtn.addEventListener('click', () => {
   allTasks.push(new GetTask(dscrptnTask.value));
   updateLocalStorage();
   fillListItem();
   dscrptnTask.value = ' ';
});

deleteAllTaskBtn.addEventListener('click', () => {
   allTasks.splice(0);
   updateLocalStorage();
   fillListItem();
});