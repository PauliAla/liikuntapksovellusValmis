<?php

// PhP:n käyttöönottoon liittyviä sallimisia
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Käytetään tietokannan tietoja jotka ovat config.php:ssä
require_once('yhteys/config.php');

// Yhteyden luominen tietokantaan
$con = mysqli_connect($servername, $username, $password, $dbname);
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}

$method = $_SERVER['REQUEST_METHOD']; 
 
switch ($method) {
  case 'POST':
    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $Arviointi= $_POST['arviointi'];
    
    $sql = "UPDATE harjoitus SET Arviointi='$Arviointi' WHERE ID='$data'";
    $result = mysqli_query($con,$sql);
    
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    echo json_encode($result);
    break;

}
$con->close();