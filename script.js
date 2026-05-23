const loginPage =
document.getElementById("loginPage");

const mainApp =
document.getElementById("mainApp");

const notification =
document.getElementById("notification");

const clock =
document.getElementById("clock");

const themeBtn =
document.getElementById("themeBtn");

const todo =
document.getElementById("todo");

const completed =
document.getElementById("completed");

const taskInput =
document.getElementById("taskInput");

const totalTasks =
document.getElementById("totalTasks");

const completedTasks =
document.getElementById("completedTasks");

const pendingTasks =
document.getElementById("pendingTasks");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

/* LOGIN */

function login(){

  const employeeId =
  document.getElementById("employeeId").value;

  const password =
  document.getElementById("password").value;

  if(employeeId === "" || password === ""){

    alert("Enter Login Details");

    return;

  }

  loginPage.style.display = "none";

  mainApp.style.display = "block";

}

/* PAGE SWITCH */

function showPage(pageId){

  const pages =
  document.querySelectorAll(".page");

  pages.forEach(page=>{

    page.classList.remove("active");

  });

  document
  .getElementById(pageId)
  .classList.add("active");

}

/* TASK SYSTEM */

function addTask(){

  const taskName =
  taskInput.value;

  const dueDate =
  document.getElementById("dueDate").value;

  const priority =
  document.getElementById("priority").value;

  if(taskName === ""){

    alert("Enter Task");

    return;

  }

  tasks.push({

    id:Date.now(),

    name:taskName,

    dueDate:dueDate,

    priority:priority,

    done:false

  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  taskInput.value = "";

  renderTasks();

}

function renderTasks(){

  todo.innerHTML = "";

  completed.innerHTML = "";

  tasks.forEach(task=>{

    const div =
    document.createElement("div");

    div.classList.add("task-item");

    div.innerHTML = `
      <h3>${task.name}</h3>

      <p>Priority: ${task.priority}</p>

      <p>Due: ${task.dueDate}</p>

      <button
      class="complete-btn"
      onclick="completeTask(${task.id})">
      Complete
      </button>

      <button
      class="delete-btn"
      onclick="deleteTask(${task.id})">
      Delete
      </button>
    `;

    if(task.done){

      completed.appendChild(div);

    }

    else{

      todo.appendChild(div);

    }

  });

  updateStats();

}

function completeTask(id){

  tasks = tasks.map(task=>{

    if(task.id === id){

      task.done = true;

    }

    return task;

  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();

}

function deleteTask(id){

  tasks =
  tasks.filter(task=>task.id !== id);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();

}

function updateStats(){

  totalTasks.innerHTML =
  tasks.length;

  const completedCount =
  tasks.filter(task=>task.done).length;

  completedTasks.innerHTML =
  completedCount;

  pendingTasks.innerHTML =
  tasks.length - completedCount;

}

/* REPORT */

function submitReport(){

  const report =
  document.getElementById("reportText");

  if(report.value === ""){

    alert("Write Report");

    return;

  }

  alert("Report Submitted");

  report.value = "";

}

/* CLOCK */

function updateClock(){

  const now = new Date();

  clock.innerHTML =
  now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

/* DARK MODE */

let darkMode = true;

themeBtn.addEventListener("click",()=>{

  darkMode = !darkMode;

  if(darkMode){

    document.body.style.background =
    "linear-gradient(135deg,#12c2e9,#1d7cf2)";

    document.querySelector(".sidebar").style.background =
    "#2d4379";

  }

  else{

    document.body.style.background =
    "#dbeafe";

    document.querySelector(".sidebar").style.background =
    "#111827";

  }

});

/* CHART */

new Chart(
  document.getElementById("taskChart"),
  {
    type:"bar",

    data:{

      labels:[
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4"
      ],

      datasets:[{

        label:"Tasks",

        data:[12,19,8,15],

        backgroundColor:[
          "#2d4379",
          "#1fc8a5",
          "#ffca28",
          "#ff5ea8"
        ]

      }]

    }

  }
);

renderTasks();