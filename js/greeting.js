const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){ // 사용자 이름을 localStorage에 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){ // submit 이벤트 처리
    event.preventDefault(); // submit 의 기본 동작 - 새로고침 무력화
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){ // 사용자 이름 설정
    form.classList.add(SHOWING_CN); // 폼 활성화 - 입력 요청 (showing)
    form.addEventListener("submit", handleSubmit);
}    

function paintGreeting(text){ // 화면(HTML)에 출력
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`; // 사용자 이름 출력
}

function loadName(){ // 사용자 이름 값(currentUser)의 존재여부 체크
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();