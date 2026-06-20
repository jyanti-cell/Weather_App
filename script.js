function showSignup(){

    document.getElementById(
    "loginForm").style.display =
    "none";

    document.getElementById(
    "signupForm").style.display =
    "block";
}

function showLogin(){

    document.getElementById(
    "signupForm").style.display =
    "none";

    document.getElementById(
    "loginForm").style.display =
    "block";
}

function createAccount(){

    let username =
    document.getElementById(
    "newUser").value;

    let password =
    document.getElementById(
    "newPass").value;

    if(username === "" ||
       password === ""){

        alert("Fill all fields");

        return;
    }

    localStorage.setItem(
    "username",
    username);

    localStorage.setItem(
    "password",
    password);

    alert("Account Created Successfully");

    showLogin();
}

function login(){

    let user =
    document.getElementById(
    "loginUser").value;

    let pass =
    document.getElementById(
    "loginPass").value;

    let savedUser =
    localStorage.getItem(
    "username");

    let savedPass =
    localStorage.getItem(
    "password");

    if(user === savedUser &&
       pass === savedPass){

        document.getElementById(
        "authSection").style.display =
        "none";

        document.getElementById(
        "weatherSection").style.display =
        "block";

    }else{

        document.getElementById(
        "loginMsg").innerHTML =
        "❌ Invalid Username or Password";
    }
}

function logout(){

    document.getElementById(
    "weatherSection").style.display =
    "none";

    document.getElementById(
    "authSection").style.display =
    "block";
}

async function getWeather(){

    let city =
    document.getElementById(
    "city").value;

    let apiKey =
    "84b1df4a129dfb15410668962dd98881";

    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById(
    "weatherResult").innerHTML =
    "⏳ Loading...";

    try{

        let response =
        await fetch(url);

        let data =
        await response.json();
        let quote = "";

if(data.main.temp >= 45){
    quote = "🔥 Weather bol raha hai: 'Zinda ho? Rehna nahi chahiye.' Bahar gaye toh seedha swarg ka visa milega.";
}
else if(data.main.temp >= 40){
    quote = "🥵 sooraj bro please control your hotness bro..(lgta hai lamba lamba ghunghat krna pdega)";
}
else if(data.main.temp >= 35){
    quote = "🌞 Bahar itni dhoop hai ki sunscreen lagao ya ghee, fry dono me hi hona hai.";
}
else if(data.main.temp >= 30){
    quote = "😎 Na garmi hai na thand, bas chipchipahat aur gussa hai. Chup-chaap nimbu paani piyo aur kalesh se door raho.";
}
else if(data.main.temp >= 20){
    quote = "😊 Mausam itna romantic ho rakha hai ki single hone ka dukh double feel ho raha hai.";
}

    else if(data.main.temp >= 10){
    quote = "🧥 Mummy ka 'sweater kalesh' mode active. Chahe dhoop nikli ho, pehnna toh padega hi.";
}
else if(data.main.temp >= 0){
    quote = "🥶 Is mausam me jo bina garm paani ke naha raha hai, usse dosti tod do. Woh psychopath hai.";
}
else{
    quote = "❄️ Bhai frozen peas ban chuke ho tum. Ab sidha daal-makhani me miloge.";
}

        if(data.cod != 200){

            document.getElementById(
            "weatherResult").innerHTML =
            "❌ City Not Found";

            return;
        }

        document.getElementById(
        "weatherResult").innerHTML =

        `
        <h2>${data.name}, ${data.sys.country}</h2>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

        <p>🌡 Temperature:
        ${data.main.temp} °C</p>

        <p>☁ Weather:
        ${data.weather[0].main}</p>

        <p>💧 Humidity:
        ${data.main.humidity}%</p>

        <p>🌬 Wind Speed:
        ${data.wind.speed} m/s</p>

        <p style="color:tomato;font-weight:bold;">😂 ${quote}
          </p>
        `;

    }
    catch(error){
         console.log(error);
        document.getElementById("weatherResult").innerHTML ="⚠ Something Went Wrong";
    }
}

document.getElementById(
"city").addEventListener(
"keypress",
function(e){

    if(e.key === "Enter"){

        getWeather();
    }
});