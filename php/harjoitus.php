<?php

// Samat kommentoinnit kuin etusivu.php:ssa rakenteeltaan
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

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
    $sql = "SELECT ID,harjoitus, Aika, Matka, Kulutus, Nopeus, Vastaus1, Vastaus2, Linkki, Pvm, Tila, OppilasID, Arviointi FROM harjoitus WHERE ID='$data'"; 
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
  case 'PUT':
    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "UPDATE harjoitus SET Tila='Hylätty', Aika='00:00:00' WHERE ID='$data'";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else{
      echo json_encode($result);
    }
    break;
}
$con->close();

