const localBucket = window.localStorage;
const tableBody = document.querySelector("tbody");

function tableInit() {
  tableBody.innerHTML = "";
  const taskArray = JSON.parse(localBucket.getItem("taskList"));
  taskArray?.forEach((element) => {
    const html = `
        <tr>    
        <td style="padding: 0 2rem;">${element.taskName}</td>
        <td style="padding: 0 2rem;">${element.startDate}</td>
        <td style="padding: 0 2rem;">${element.endDate}</td>
        <td style="padding: 0 2rem;">${element.remainingDays}</td>
        </tr>
        `;
    tableBody.insertAdjacentHTML("afterbegin", html);
  });
}

function updateRemainingDays() {
  const taskArray = JSON.parse(localBucket.getItem("taskList")) ?? [];
  taskArray.forEach((task) => {
    task.remainingDays = calculateRemainingDays(task.startDate);
  });
  localBucket.setItem("taskList", JSON.stringify(taskArray));
}

function calculateRemainingDays(startDate) {
  const remainingDays = Math.trunc(
    (new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (remainingDays < 1) return `Task Due`;
  return `${remainingDays}`;
}

function addTask() {
  const taskForm = document.forms["taskForm"];
  const taskName = taskForm["taskName"].value;
  const startDate = taskForm["startDate"].value;
  const endDate = taskForm["endDate"].value;
  const remainingDays = calculateRemainingDays(startDate);

  const taskArray = JSON.parse(localBucket.getItem("taskList")) ?? [];
  taskArray.push({ taskName, startDate, endDate, remainingDays });
  localBucket.setItem("taskList", JSON.stringify(taskArray));
  tableInit();
}

function sortStartDate() {
  const taskArray = JSON.parse(localBucket.getItem("taskList")) ?? [];
  taskArray.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  localBucket.setItem("taskList", JSON.stringify(taskArray));
  tableInit();
}
function sortEndDate() {
  const taskArray = JSON.parse(localBucket.getItem("taskList")) ?? [];
  taskArray.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  localBucket.setItem("taskList", JSON.stringify(taskArray));
  tableInit();
}

function sortRemainingDays() {
  const taskArray = JSON.parse(localBucket.getItem("taskList")) ?? [];
  taskArray.sort((a, b) => b.remainingDays - a.remainingDays);
  localBucket.setItem("taskList", JSON.stringify(taskArray));
  tableInit();
}

function sortTable(n) {
  switch (n) {
    case 1:
      sortStartDate();
      break;
    case 2:
      sortEndDate();
      break;
    case 3:
      sortRemainingDays();
      break;
    default:
      console.log("System Error!");
      break;
  }
}

function clearTable() {
  tableBody.innerHTML = "";
  localBucket.clear();
}

window.onload(updateRemainingDays());
