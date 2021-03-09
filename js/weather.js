const COORDS = `coords`;

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(position){
    alert("위치 정보를 읽을 수 없습니다.");
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
    const coordsObj = {
        latitude, // 객체에 변수 이름과 key 이름을 같게 저장
        longitude
    };
    saveCoords(coordsObj);
}

function askForCoords(){
    // navigator API
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // getCurrentPosition(성공 시 실행함수, 실패 시 실행 함수)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        // getWeather
    }
}

function init(){
    loadCoords();
}

init();