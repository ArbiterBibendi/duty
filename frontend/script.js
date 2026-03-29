const URL = "http://localhost:3000/tasks";
const toggleTask = (id, value) => {
  fetch(URL + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      complete: value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const displayDate = (dateString) => {
  const cutoff = 5; // 5 days
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  );
  // If date is null then it is due at epoch
  // if date is passed due, then it just shows as due today
  const daysUntilDue = (date.getTime() - today.getTime()) / 1000 / 60 / 60 / 24;
  if (daysUntilDue < 1) {
    return "Today";
  }
  if (daysUntilDue < 2 && daysUntilDue >= 1) {
    return "Tomorrow";
  }
  if (daysUntilDue <= cutoff) {
    return `${daysUntilDue} days`;
  }
  return date.toLocaleDateString();
};
const taskscontainer = document.getElementsByClassName("taskscontainer")[0];
// {title, description, due, complete, created, id}
const addTask = (task) => {
  if (!task.title || !task.created || !task.id) {
    console.error("Task missing required key");
  }
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  const { title, description, due, complete, created, id } = task;
  taskDiv.setAttribute("id", id);

  const titleDiv = document.createElement("div");
  titleDiv.className = "tasktitle";
  titleDiv.innerText = title;

  const completeDiv = document.createElement("div");
  completeDiv.className = "taskcomplete";
  const completeInput = document.createElement("input");
  completeInput.type = "checkbox";
  completeInput.checked = complete;
  completeInput.innerText = "Complete";
  completeInput.onclick = (event) => {
    toggleTask(event.target.parentNode.parentNode.id, completeInput.checked);
  };

  const descriptionFooter = document.createElement("footer");
  descriptionFooter.className = "taskdescription";
  descriptionFooter.innerText = description;

  const dueDiv = document.createElement("div");
  dueDiv.className = "taskdue";
  dueDiv.innerText = displayDate(due);

  const dueTextDiv = document.createElement("div");
  dueTextDiv.innerText = "Due:";
  dueTextDiv.className = "duetext";
  taskDiv.appendChild(titleDiv);
  taskDiv.appendChild(dueTextDiv);
  taskDiv.appendChild(descriptionFooter);
  taskDiv.appendChild(dueDiv);

  completeDiv.appendChild(completeInput);
  taskDiv.appendChild(completeDiv);

  taskscontainer.appendChild(taskDiv);
};

taskscontainer.removeChild(document.getElementById("testtask"));
const tasks = fetch(URL)
  .then((res) => res.json())
  .then((body) => {
    const sortedTasks = body.toSorted((first, second) => {
      let firstDate, secondDate;
      if (first.due != second.due) {
        firstDate = new Date(first.due);
        secondDate = new Date(second.due);
      } else {
        firstDate = new Date(first.created);
        secondDate = new Date(second.created);
      }
      return firstDate.getTime() - secondDate.getTime();
    });
    sortedTasks.forEach((task) => {
      addTask(task);
    });
  });
