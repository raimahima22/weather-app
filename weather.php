<?php
//database connection
$servername = "localhost";
$username = "root";
$password = "";
$database="weather_app";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn){
    die("Sorry we failed to connect: ".mysqli_connect_error());
}
else{
    // echo "Connection was successful";
}
//Handling location search based on user input
if ($_SERVER["REQUEST_METHOD"]==="POST"){
    $new_city=$_POST["inputPlace"];
    $api_key = "2679c63e0aadb5820dafa203f8b8f0cd";
    $url= "https://api.openweathermap.org/data/2.5/weather?q=".urlencode($new_city)."&appid=".$api_key."&units=metric";

    $json_data = file_get_contents($url);
    if ($json_data === false) {
        echo "City not found";
    }else{
    $weather_data = json_decode($json_data, true);
    $date=date("Y-m-d");
    $temperature = $weather_data['main']['temp'];
    $humidity = $weather_data['main']['humidity'];
    $pressure = $weather_data['main']['pressure'];
    $wind_speed = $weather_data['wind']['speed'];
    $weather_description = $weather_data['weather'][0]['description'];
    $visibility = $weather_data['visibility'];
    $city=$weather_data['name'];
    
    $sql="INSERT INTO weather (Date, Temperature, City, Humidity, Pressure, Visibility, Wind_speed, Weather_description)
    VALUES ('$date', '$temperature','$city', '$humidity', '$pressure', '$visibility', '$wind_speed', '$weather_description')";

if (mysqli_query($conn, $sql)) {
    // echo "Weather data inserted successfully";
} else {
    echo "Error: " .mysqli_error($conn);
}
//Retrieve weather data for the selected city
$table = "SELECT * FROM weather where City='$city'";
$result = mysqli_query($conn, $table);
if ($result) {
//     echo "Data retrieval successful. Number of rows: " . mysqli_num_rows($result);
} else {
    echo "Error: " . mysqli_error($conn);
}

$weather = array();
while ($row = mysqli_fetch_assoc($result)){
  $weather[] = $row;
}
}  
}else{
// Get weather data from API for the default city
$api_key = "2679c63e0aadb5820dafa203f8b8f0cd";
$city_name = "Dhangadhi";
$url= "https://api.openweathermap.org/data/2.5/weather?q=".urlencode($city_name)."&appid=".$api_key."&units=metric";

$json_data = file_get_contents($url);

$weather_data = json_decode($json_data, true);

$date=date("Y-m-d");
$temperature = $weather_data['main']['temp'];
$humidity = $weather_data['main']['humidity'];
$pressure = $weather_data['main']['pressure'];
$wind_speed = $weather_data['wind']['speed'];
$weather_description = $weather_data['weather'][0]['description'];
$visibility = $weather_data['visibility'];
$city=$weather_data['name'];

$sql="INSERT INTO weather (Date, Temperature, City, Humidity, Pressure, Visibility, Wind_speed, Weather_description)
VALUES ('$date', '$temperature', '$city','$humidity', '$pressure', '$visibility', '$wind_speed', '$weather_description')";

if (mysqli_query($conn, $sql)) {
    // echo "Weather data inserted successfully";
} else {
    echo "Error: " .mysqli_error($conn);
}

$table = "SELECT * FROM weather where City='Dhangadhi'";
$result = mysqli_query($conn, $table);
if ($result) {
    // echo "Data retrieval successful. Number of rows: " . mysqli_num_rows($result);
} else {
    echo "Error: " . mysqli_error($conn);
}

$weather = array();
while ($row = mysqli_fetch_assoc($result)){
  $weather[] = $row;
}}

$delete_query = "DELETE FROM weather WHERE Date < DATE_SUB(NOW(), INTERVAL 7 DAY)";
$conn->query($delete_query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather app </title>
    <link rel="stylesheet" href="style2.css">
</head>
<body>
<nav>
        <div class ="home">
        <form method="post" action="">
        <div class="index">
           <input type="text" placeholder="Search location.." name="inputPlace" id="inputPlace">
           <button type="submit" id="search">search</button>
        </div>
        </form>
        </div>
    </nav>
    <div class="container">
        <?php $previous_date = null;  ?>
    <?php foreach ($weather as $data): ?>
        <?php $current_date = date('l, F j, Y', strtotime($data['Date'])); 
        if ($current_date != $previous_date):?>
    <div class="card"> 
    <h2 class="date"><?php echo $current_date ?></h2>
    <p class="temperature"><?php echo $data['Temperature'] ?> °C </p>
    <p class="city"><?php echo $data['City'] ?> </p>
    <div class="icon">
            <?php
$weatherIcon =$data['Weather_description']; ?>
<?php 
if($weatherIcon=="clear sky"): ?>
<img src="https://openweathermap.org/img/wn/01d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="broken clouds"|| $weatherIcon=="overcast clouds"|| $weatherIcon==" clouds"|| $weatherIcon=="scattered clouds"): ?>
<img src="https://openweathermap.org/img/wn/04d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="drizzle"): ?>
<img src="https://openweathermap.org/img/wn/09d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="thunderstorm"): ?>
<img src="https://openweathermap.org/img/wn/11d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="rain" || $weatherIcon=="moderate rain" || $weatherIcon=="light rain"|| $weatherIcon=="heavy intensity rain"): ?>
<img src="https://openweathermap.org/img/wn/09d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="snow"): ?>
<img src="https://openweathermap.org/img/wn/13d@2x.png" >
<?php endif ?>
<?php

if($weatherIcon=="mist"): ?>
<img src="https://openweathermap.org/img/wn/50d@2x.png" >
<?php endif ?>
    </div>    
    <p class="weather_condition"><?php echo $data['Weather_description'] ?> </p>
    <p class="pressure">Pressure:<?php echo $data['Pressure'] ?> hPa</p>   
    <p class="humidity">Humidity:<?php echo $data['Humidity'] ?>% </p>
    <p class="wind_speed">Wind speed:<?php echo $data['Wind_speed'] ?>m/s</p>  
    <p class="visibility">Visibility:<?php echo $data['Visibility'] ?>m/s</p>
</div>
    <?php endif; ?>
    <?php  $previous_date = $current_date;  ?>
    <?php endforeach; ?>
</div> 
</body>
</html>
