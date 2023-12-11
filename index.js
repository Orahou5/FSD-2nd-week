const storage = window.localStorage;

function createTasksFromStorage() {
    const obj = {
        1: [],
        2: [],
        3: [],
        unknown: []
    }

    Object.entries(storage).forEach(([title, priority]) => {
        const array = obj[+priority] ?? obj.unknown;
        array.push(title)
    })

    Object.entries(obj).forEach(([priority, arrayOfTitles]) => {
        arrayOfTitles.forEach((title) => {
            addTask(title, `${priority}`);
        })
    })
}

function strikeTask(event) {
    const li = event.target.parentElement.parentElement;
    li.classList.toggle("finished");
}

function createTask(title, priority) {
    const newLi = document.createElement("li");
    const newLabel = document.createElement("label");
    const newInput = document.createElement("input");

    newInput.type = "checkbox";

    newInput.addEventListener("click", strikeTask);

    newLabel.append(newInput, " ", title);

    newLi.append(newLabel);

    newLi.classList.add(({
        1: "high",
        2: "normal",
        3: "low"
    })[priority] ?? "unknown")

    newLi.dataset.id = title;

    return newLi;
}

function deleteTask(task) {
    const title = task?.dataset.id;

    if(!!storage.getItem(title)) {
        storage.removeItem(title);
        task.remove();
    }
}

function getTask(title) {
    return document.querySelector(`[data-id="${title}"]`);
}

function deleteAllFinishedTasks(event) {
    event.preventDefault()
    const ul = getUl()

    const finishedTasks = [...ul.querySelectorAll(".finished").values()];

    finishedTasks.forEach(deleteTask)

    notification(finishedTasks.length)
}

function notification(numberOfTasks) {
    const bool = numberOfTasks > 1;
    const plural = bool ? "s" : "";
    const auxiliaire = bool ? "ont" : "a";

    alert(`${numberOfTasks} tache${plural} ${auxiliaire} été supprimée${plural}`)
}

function addTask(title, priority) {
    const ul = getUl()

    ul.append(createTask(title, priority));
}

function getUl() {
    return document.querySelector("ul")
}

{
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Supprimer toutes les taches finies"
    deleteButton.addEventListener("click", deleteAllFinishedTasks)

    getUl()?.after(deleteButton)
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.target.querySelector("#title").value
    const priority = event.target.querySelector("#priority").value

    if(!!title) {
        getUl().innerHTML = "";
        storage.setItem(title, priority);
        createTasksFromStorage()
    } 
    event.target.reset();
})

createTasksFromStorage();