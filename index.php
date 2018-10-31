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
        <div class="navbar">
            <div class="appTitle boxAlign">
                <p>WeatherBy</p>
            </div>
        </div>
    </header>
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