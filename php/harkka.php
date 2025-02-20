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
  case 'POST': // // Päivitetään tietokantaa azios.postin perusteella
    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $Aika = $_POST['aika'];
    
    $sql = "UPDATE harjoitus SET Aika='$Aika' WHERE ID='$data'";
    $result = mysqli_query($con,$sql);
    
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }
    else if (mysqli_num_rows($result) > 0){
      $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
      $path = explode('/', $_SERVER['REQUEST_URI']);
      $oppilas = "SELECT OppilasID FROM harjoitus WHERE ID='$data'";
      $sql = "UPDATE oppilas SET Suoritukset =(SELECT SUM( extract(hour from Aika) + extract(minute from Aika) / 60 + extract(second from Aika) / 3600 ) hours FROM harjoitus WHERE OppilasID= '$oppilas') WHERE OppilasID='$oppilas'";
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else{
        echo json_encode($result);
      }
    }
    echo json_encode($result);
    break;
  case 'PUT':
    $url= $_SERVER['REQUEST_URI'];
    $data = basename($url);
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $sql = "UPDATE harjoitus SET Tila='Hyväksytty' WHERE ID='$data'";
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