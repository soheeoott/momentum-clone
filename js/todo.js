const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const toDos = []; // 목록으로 저장

function saveToDos() {
    // local storage 에는 자바스크립트의 data 를 저장할 수 없음 → 오직 문자열만 저장
    // JSON : 데이터를 전달할 때 자바스크립트가 작업을 수행할 수 있도록 문자열 또는 객체로 바꿔주는 기능
    // 객체 → 문자열
    // 문자열 → 객체
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify() : 객체 → 문자열로 변환
}

function paintToDo(text) {
    // console.log(text); // check
    const newId = toDos.length + 1;
    const li = document.createElement("li"); // li 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    span.innerHTML = text;
    
    li.appendChild(span); // span → il
    li.appendChild(delBtn); // delBtn → il 
    toDoList.appendChild(li); // li → ul
    li.id = newId; // id 생성

    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj); // 배열에 요소 넣기
    saveToDos()
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const ToDoValue = toDoInput.value;
    paintToDo(ToDoValue);
    toDoInput.value = ""; // submit
}

function toDoForEach(toDo) {
    paintToDo(toDo.text);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); // localStorage string
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // string → object
        parsedToDos.forEach(toDoForEach); // forEach 배열에 담겨있는 값들을 각각 한번씩 함수를 실행시켜 출력
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();