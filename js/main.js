// start aside dom
// all elements vars
let Body = document.body;
let AsideBtn = document.querySelector(".aside-btn");
let ModeBtn = document.querySelector(".mode-btn");
let ModeBtnTxt = document.querySelector(".mode-btn p")
let TempBtn = document.querySelector(".temp-btn");
let TempBtnTxt = document.querySelector(".temp-btn p");
let WindSpeedBtn = document.querySelector(".wind-speed-btn");
let WindSpeedBtnTxt = document.querySelector(".wind-speed-btn p");
let CoordinatesBtn = document.querySelector(".coordinates-btn");
let CoordinatesBtnTxt = document.querySelector(".coordinates-btn p");
let SearchBtn = document.querySelector(".search-box button");
let CountriesInput = document.querySelector(".search-box input");
let SuggestionsBox = document.querySelector(".suggestions");
let ShowMoreBtn = document.querySelector(".show-btn");
let SecondCard = document.querySelector(".second-card");
let MainInfo = document.querySelectorAll(".text p");
let AllInfo = document.querySelectorAll(".second-card p");
let FooterTxt = document.querySelector(".email");
let CopyTxt = document.querySelector(".email+p");
// country suggestions
import { CountrySuggestions } from './countries.js';
// background changer
let RandomNum = Math.floor(Math.random()*6);
Body.setAttribute("style",`background-image: url(image/bodyimg${RandomNum}.jpg);`)
// show / hide aside
AsideBtn.addEventListener('click',() => {
    let Visibility = AsideBtn.getAttribute("visibility");
    if(Visibility === "false"){
        AsideBtn.setAttribute("visibility","true");
    } else {
        AsideBtn.setAttribute("visibility","false");
    }
});
// light / dark mode
ModeBtn.addEventListener('click', () => {
    if(Body.classList.contains("dark")){
        Body.classList.remove("dark");
        ModeBtnTxt.innerHTML = "Light mode";
        window.localStorage.setItem("Mode","light");
    }else {
        Body.classList.add("dark");
        ModeBtnTxt.innerHTML = "Dark mode";
        window.localStorage.setItem("Mode","dark");
    }
});
// local storage 
if(window.localStorage.getItem("Mode") === "light"){
    Body.classList.remove("dark");
}else if(window.localStorage.getItem("Mode") === "dark"){
    Body.classList.add("dark");
}
// °C / °F temp 
TempBtn.addEventListener('click',() => {
    if(TempBtnTxt.innerHTML === "°C"){
        TempBtnTxt.innerHTML = "°F";
        window.localStorage.setItem("temp","°F");
    }else if (TempBtnTxt.innerHTML === "°F"){
        TempBtnTxt.innerHTML = "°C";
        window.localStorage.setItem("temp","°C");
    }
    Tempchanger();
});
function Tempchanger(){
    if(TempBtnTxt.innerHTML === "°C"  && MainInfo[1].innerHTML !== "" ){
        MainInfo[1].innerHTML = `${parseInt(MainInfo[1].innerHTML)-273}°`;
    }else if (TempBtnTxt.innerHTML === "°F" && MainInfo[1].innerHTML !== ""){
        MainInfo[1].innerHTML = `${parseInt(MainInfo[1].innerHTML)+273}°`;
    }
}
// local storage for temp
if(window.localStorage.getItem("temp") !== null){
    TempBtnTxt.innerHTML = window.localStorage.getItem("temp");
    Tempchanger();
}
// wind speed 
WindSpeedBtn.addEventListener('click', () => {
    if(WindSpeedBtnTxt.innerHTML === "KM/H"){
        WindSpeedBtnTxt.innerHTML = "MPH";
        window.localStorage.setItem("windSpeed","MPH");
    }else {
        WindSpeedBtnTxt.innerHTML = "KM/H";
        window.localStorage.setItem("windSpeed","KM/H");
    }
    windspeedchanger();
});
function windspeedchanger(){
    let speed = AllInfo[0].textContent.split("").filter(function (e) { // to get numbers from the wind speed text
        return !isNaN(parseInt(e));
    }).join("");
    if(WindSpeedBtnTxt.innerHTML === "MPH" && speed !== ""){
        AllInfo[0].textContent = `Wind speed : ${Math.round(speed/1.609344)} MPH `;
    }else if(WindSpeedBtnTxt.innerHTML === "KM/H" && AllInfo[1].innerHTML !== ""){
        AllInfo[0].textContent = `Wind speed : ${Math.round(speed*1.609344)} KM/H `;
    }
}
// local storage for wind speed
if(window.localStorage.getItem("windSpeed") !== null){
    WindSpeedBtnTxt.innerHTML = window.localStorage.getItem("windSpeed");
    windspeedchanger();
}
// coordinates status
CoordinatesBtn.addEventListener('click', () => {
    if(CoordinatesBtn.classList.contains("shown")){
        CoordinatesBtn.classList.remove("shown");
        CoordinatesBtn.classList.add("hidden");
        window.localStorage.setItem("coords","hidden");
    }else {
        CoordinatesBtn.classList.remove("hidden");
        CoordinatesBtn.classList.add("shown");
        window.localStorage.setItem("coords","shown");
    }
    coordsBtn();
});
// show / hide coordinates
function coordsBtn(){
    if(CoordinatesBtn.classList.contains("shown")){
        AllInfo[3].style.display = "block";
        AllInfo[4].style.display = "block";
        CoordinatesBtnTxt.innerHTML = "Hide Coordinates";
    } else {
        AllInfo[3].style.display = "none";
        AllInfo[4].style.display = "none";
        CoordinatesBtnTxt.innerHTML = "Show Coordinates";
    }
}
// local storage for coords
if(window.localStorage.getItem("coords") !== null){
    CoordinatesBtn.classList.remove("shown");
    CoordinatesBtn.classList.remove("hidden");
    CoordinatesBtn.classList.add(window.localStorage.getItem("coords"));
    coordsBtn();
}
// end aside dom
// start show more btn
ShowMoreBtn.addEventListener('click',()=>{
    let visibility = SecondCard.getAttribute("visibility");
    if(visibility === "false" && AllInfo[1].innerHTML !== ""){
        SecondCard.setAttribute("visibility","true");
    }else {
        SecondCard.setAttribute("visibility","false");
    }
});
function ShowMoreBtnActivator(){ // to stop the show more btn 
    if(AllInfo[1].innerHTML === ""){
        ShowMoreBtn.style.cursor = "not-allowed";
    } else {
        ShowMoreBtn.style.cursor = "pointer";
    }
}
ShowMoreBtnActivator();
// end show more btn
// start search box
CountriesInput.addEventListener('keyup', () => { // when the user type 
    let lis = document.querySelectorAll(".suggestions li"); // to clear the old sugg
    lis.forEach((ele)=> {
        ele.remove();
    });
    let suggarray = CountrySuggestions.filter((data)=> { // to filter the array
        return data.toLocaleLowerCase().startsWith(CountriesInput.value.toLocaleLowerCase());
    });
    suggarray.forEach((data)=> { // to add sugg to list
        let newli = document.createElement("li");
        newli.textContent = data;
        SuggestionsBox.append(newli);
    });
});
CountriesInput.addEventListener('blur',()=>{ // when finishing of the search
    let lis = document.querySelectorAll(".suggestions li");
    lis.forEach((ele)=>{
        ele.addEventListener('click',()=>{
            CountriesInput.value = ele.textContent;
            CountriesInput.focus();
        })
    })
    setTimeout(()=> {
        lis.forEach((ele)=> {
            ele.remove();
        });
    },100)
});
SearchBtn.addEventListener('click',()=> {
    onsearch();                // when the user clicks on the search icon
}); 
CountriesInput.addEventListener('keyup',(event)=>{
    if(event.key == "Enter"){
        onsearch();            // when the user clicks Enter to search
    }
})
// end search box

function onsearch(){  // when the user search 
    let CountryName = CountriesInput.value;
    CountriesInput.blur();
    getcoordinates(CountryName);
    window.localStorage.setItem("Country", CountryName);
    CountriesInput.value = "";
};
// local storage
if(window.localStorage.getItem("Country") !== null){
    getcoordinates(window.localStorage.getItem("Country"));
}
function getcoordinates(CountryName){ // to get coords and check if the country exists
    let coordinatesRequest = new XMLHttpRequest();
    coordinatesRequest.open("GET",`http://api.openweathermap.org/geo/1.0/direct?q=${CountryName.toLocaleLowerCase()}&limit=1&appid=6734af4bda8f938c1311e2dfb0dc9c54`);
    coordinatesRequest.send();
    coordinatesRequest.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let LatAndLon = JSON.parse(this.responseText);
        if (LatAndLon.length === 0) {
            let MainInfo = document.querySelectorAll(".text p");
            MainInfo[0].innerHTML = `Oops!`;
            MainInfo[1].innerHTML = "";
            MainInfo[2].innerHTML = `Looks like that there's no country named ${CountryName}`;
            AllInfo[1].innerHTML = "";
            SecondCard.setAttribute("visibility","false");
            ShowMoreBtnActivator();
            } else {
                let Lat = LatAndLon[0].lat;
                let Lon = LatAndLon[0].lon;
                getweatherdata(Lat,Lon);
            }
        }else if(this.readyState === 4 && this.status === 400){
            CountriesInput.focus();
        }
    };
};
function getweatherdata(Lat , Lon){ // to get the main data from the api
    let weatherdata = new XMLHttpRequest();
    weatherdata.open("GET",`https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=6734af4bda8f938c1311e2dfb0dc9c54`);
    weatherdata.send();
    weatherdata.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let info = JSON.parse(this.responseText);
            let name = info.name;
            let temp = info.main.temp;
            let windspeed = info.wind.speed;
            let humidity =info.main.humidity;
            let descr = info.weather[0].description;
            let lat = info.coord.lat;
            let lon = info.coord.lon;
            displaydata(name , temp , windspeed , humidity , descr , lat , lon);
        }
    }
}
function displaydata(name , temp , windspeed , humidity , descr , lat , lon){ // to display data on screen
    let MainInfo = document.querySelectorAll(".text p");
    let AllInfo = document.querySelectorAll(".second-card p");
    if(TempBtnTxt.innerHTML === "°C"){ // to change the temp C/F
        temp = parseInt(temp)-273;
    }
    MainInfo[0].innerHTML = `${name}`;
    MainInfo[1].innerHTML = `${Math.round(temp)}°`;
    MainInfo[2].innerHTML = ``;
    if(WindSpeedBtnTxt.innerHTML === "KM/H"){ // to check the wind speed that user sellected
        windspeed = parseInt(windspeed)*1.609344;
        AllInfo[0].innerHTML = `Wind speed : ${Math.round(windspeed)} KM/H`;
    } else {
        AllInfo[0].innerHTML = `Wind speed : ${Math.round(windspeed)} MPH`;
    }
    AllInfo[1].innerHTML = `humidity : ${humidity}%`;
    AllInfo[2].innerHTML = `description : ${descr}`;
    AllInfo[3].innerHTML = `lat : ${lat}`;
    AllInfo[4].innerHTML = `lon : ${lon}`;
    ShowMoreBtnActivator();
};
// footer 
FooterTxt.addEventListener('click',()=>{
    navigator.clipboard.writeText("contact@malikkajiji.online");
    CopyTxt.innerHTML = "copied";
    setTimeout(() => {
        CopyTxt.innerHTML = "copy";
    }, 3000);
})