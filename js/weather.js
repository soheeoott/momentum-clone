const weather = document.querySelector(".js-weather");
const API_KEY = `bfd3b97e6d29c5720e15c84e8732b1be`;
const COORDS = `coords`;

// units=metric = 섭씨(celsius) 단위
// then 데이터가 완전히 들어온 다음 호출
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

// then → async : then() 과 같은 역할
// async function getWeather(lat, lng) {
//     const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
//     );
//     const json = await response.json();
//     const temperature = json.main.temp;
//     const place = json.name;
//     weather.innerText = `${temperature} @ ${place}`;
// }

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
    getWeather(latitude, longitude);
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
        const parseCoords = JSON.parse(loadedCoords); // string → object
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();