const URL = "http://localhost:3000/tasks";
const taskscontainer = document.getElementsByClassName("taskscontainer")[0];
// {title, description, due, complete, created, id}
const addTask = (task) => {
  if (!task.title || !task.created || !task.id) {
    console.error("Task missing required key");
  }
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  const { title, description, due, complete, created, id } = task;

  const titleDiv = document.createElement("div");
  titleDiv.className = "tasktitle";
  titleDiv.innerText = title;

  const completeDiv = document.createElement("div");
  completeDiv.className = "taskcomplete";
  const completeInput = document.createElement("input");
  completeInput.type = "checkbox";
  completeInput.checked = complete;
  completeInput.innerText = "Complete";

  const descriptionFooter = document.createElement("footer");
  descriptionFooter.className = "taskdescription";
  descriptionFooter.innerText = description;

  const dueDiv = document.createElement("div");
  dueDiv.className = "taskdue";
  dueDiv.innerText = due;

  taskDiv.appendChild(titleDiv);
  completeDiv.appendChild(completeInput);
  taskDiv.appendChild(completeDiv);
  taskDiv.appendChild(descriptionFooter);
  taskDiv.appendChild(dueDiv);
  taskscontainer.appendChild(taskDiv);
};

taskscontainer.removeChild(document.getElementById("testtask"));
const tasks = fetch(URL)
  .then((res) => res.json())
  .then((body) => {
    body.forEach((task) => {
      addTask(task);
    });
  });
