const employees = [];

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const department = document.getElementById("department").value;
  const salary = parseFloat(document.getElementById("salary").value);
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  const emp = {
    id,
    name,
    department,
    salary,
    contact,
    email,
    address,
    type,
    tasks: []
  };

  employees.push(emp);
  displayEmployees();
  this.reset();
});

function displayEmployees() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";
  employees.forEach((e, i) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${e.name}</strong> (${e.type.toUpperCase()})<br>
      ID: ${e.id} | Dept: ${e.department} | Salary: ${e.salary}<br>
      Contact: ${e.contact} | Email: ${e.email} | Address: ${e.address}<br>
      <button onclick="showTaskForm(${i})">Assign Task</button>
      <button onclick="viewTasks(${i})">View Tasks</button>
    `;
    list.appendChild(card);
  });
}

function showTaskForm(index) {
  document.getElementById("taskSection").classList.remove("hidden");
  document.getElementById("taskForm").setAttribute("data-index", index);
  document.getElementById("taskEmpName").innerText = employees[index].name;
  document.getElementById("taskList").innerHTML = "";
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const index = this.getAttribute("data-index");
  const taskId = document.getElementById("taskId").value;
  const desc = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;

  const task = { taskId, description: desc, deadline };
  employees[index].tasks.push(task);

  this.reset();
  viewTasks(index);
});

function viewTasks(index) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = `<h3>Tasks for ${employees[index].name}</h3>`;
  employees[index].tasks.forEach((t) => {
    const div = document.createElement("div");
    div.innerText = `ID: ${t.taskId} | ${t.description} | Due: ${t.deadline}`;
    taskList.appendChild(div);
  });
}
