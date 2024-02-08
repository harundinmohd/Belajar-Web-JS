const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Hey, you must write something in the box!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Add the "Remove" button
        let removeBtn = document.createElement("button");
        removeBtn.className = "removeBtn";
        removeBtn.innerHTML = "Remove";
        li.appendChild(removeBtn);

        // Add the "Edit" button
        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = "Edit";
        li.appendChild(editBtn);

        // Append the list item to the container
        listContainer.appendChild(li);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    const target = e.target;

    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    } else if (target.classList.contains("removeBtn")) {
        target.parentElement.remove();
        saveData();
    } else if (target.classList.contains("editBtn")) {
        editTask(target.parentElement);
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

function editTask(taskElement) {
    let updatedTask = prompt("Edit the task:", taskElement.textContent.trim());
    if (updatedTask !== null) {
        taskElement.innerHTML = updatedTask;

        // Add the "Remove" button again after editing
        let removeBtn = document.createElement("button");
        removeBtn.className = "removeBtn";
        removeBtn.innerHTML = "Remove";
        taskElement.appendChild(removeBtn);

        // Add the "Edit" button again after editing
        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = "Edit";
        taskElement.appendChild(editBtn);

        saveData();
    }
}
