const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function paintToDo(text) {
    // console.log(text); // check
    const li = document.createElement("li"); // li 생성
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerHTML = text;
    li.appendChild(span); // span → il
    li.appendChild(delBtn); // delBtn → il 
    toDoList.appendChild(li); // li → ul
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const ToDoValue = toDoInput.value;
    paintToDo(ToDoValue);
    toDoInput.value = ""; // submit
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null) {
        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();