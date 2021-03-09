const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDosList"; // 임의 문자열 또는 숫자를 저장할 때 변수 이름을 대문자로 작성
let toDosList = []; // 목록으로 저장

// filter 는 배열의 모든 요소를 통해 함수를 실행 후 true 인 아이템들만 가지고 새로운 배열을 생성 
// forEach 의 함수를 실행하는 것 같이 각각의 요소와 같이 실행

// parentElement = 부모 노드가 없을 때 null 을 리턴하지만, 
// parentNode = Document node 를 리턴
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDosList.filter((toDo) => { // filterFn 이 체크가 된 요소들의 배열을 생성
       return toDo.id !== parseInt(li.id); // toDosList 가 li 의 id 와 같지 않을 때 - 삭제되지 않은 요소 리턴
    });
    toDosList = cleanToDos;

    saveToDos();
}

function saveToDos() { // localStorage에 목록 저장
    // local storage 에는 자바스크립트의 data 를 저장할 수 없음 → 오직 문자열만 저장
    // JSON : 데이터를 전달할 때 자바스크립트가 작업을 수행할 수 있도록 문자열 또는 객체로 바꿔주는 기능
    // 객체 → 문자열
    // 문자열 → 객체
    localStorage.setItem(TODOS_LS, JSON.stringify(toDosList)); // JSON.stringify() : 객체 → 문자열로 변환
}

function paintToDo(text) { // 화면(HTML)에 출력
    // console.log(text); // check
    // const newId = toDosList.length + 1; // id 중복현상 발생
    // const newId = idNumbering++; // 새로운 to do가 생성될 때마다 증가, 삭제했을 때는 변하지 않음
    // 마지막 요소 값 비교
    // const newId = (toDoList.lastElementChild === null ? 1 : parseInt(toDoList.lastElementChild.id) + 1); // 2번째 요소를 삭제 후 새로운 내용을 넣었을 경우 [1, 3, 4] 로 정렬 됨
    const newId = Date.now(); // 임의의 id 값
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
    toDosList.push(toDoObj); // 배열에 요소 넣기

    delBtn.addEventListener("click", deleteToDo);
    saveToDos();
}

function handleToDoSubmit(event) { // submit 이벤트 처리 
    event.preventDefault();

    if(toDoInput.value !== ""){ // 문자열을 입력
        const ToDoValue = toDoInput.value;
        paintToDo(ToDoValue);
        toDoInput.value = ""; // submit
    } else {
        alert("내용을 입력해주세요.");
    }
}

function toDoForEach(toDo) { // forEach 함수 수행
    paintToDo(toDo.text);
}

function loadToDos() { // 저장되어 있는 목록의 값 불러오기
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