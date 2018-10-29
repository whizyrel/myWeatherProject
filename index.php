<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather App</title>
    <link rel="manifest" href="weather.webmanifest">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
<header>
<!--     <div class="navbar">
        <div class="appTitle boxAlign">
            <p>WeatherBy</p>
        </div>
        <div class="searchBar boxAlign">
            <button></button>   
        </div>
    </div>
</header>
 -->

<header>
    <h1>The Super Awesome Weather App</h1>
</header>
<div class="main">
    <div class="search">
        <label>City Name</label>
        <input class="city" type="text" placeholder="What's the name of the city?">
        <button class='btn' type="button">Submit</button>
    </div>
    <div class="load">Loading...</div>
    <div class="weather">
        <h1 class="weatherCity">City Name</h1>
        <div class="weatherDescription">Weather Description</div>
        <div class="weatherTemperature">Temperature</div>
    </div>
</div>
<script src="https://www.gstatic.com/firebasejs/5.5.3/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGImpRiHMInrz0znVhKt5IwX3CVFHS_oU",
    authDomain: "weatherby-9ffac.firebaseapp.com",
    databaseURL: "https://weatherby-9ffac.firebaseio.com",
    projectId: "weatherby-9ffac",
    storageBucket: "weatherby-9ffac.appspot.com",
    messagingSenderId: "480566564233"
  };
  firebase.initializeApp(config);
</script>
<script src="app.js"></script>
</body>
</html>