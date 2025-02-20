<?php

// Php joka palauttaa tämän hetkisen liikuntasuunnitelman /Pauli
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

require_once('yhteys/config.php');

$con = mysqli_connect($servername, $username, $password, $dbname);
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
$id = '';
$method = $_SERVER['REQUEST_METHOD'];
 
switch ($method) {
    case 'GET':
      $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "SELECT * FROM liikuntasuunnitelma WHERE OppilasID='$data'"; 
    $result = mysqli_query($con,$sql);

    
 
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } else {
    echo mysqli_affected_rows($con);
  }
  break;
}