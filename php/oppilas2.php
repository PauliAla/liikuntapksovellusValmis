<?php
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
    $sql = "SELECT ID,harjoitus, Pvm, Matka, Aika, Kulutus, Nopeus, Tila FROM harjoitus WHERE OppilasID='$data'"; 
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
    $sql = "UPDATE harjoitus SET Tila='Hyväksytty' WHERE OppilasID='$data'";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else{

      echo json_encode($result);
    }
    break;

    case 'DELETE':
      $path = explode('/', $_SERVER['REQUEST_URI']);
      $id = intval(end($path)); 
  
      if ($id > 0) { 
          mysqli_autocommit($con, FALSE);
  
          $result = mysqli_query($con, "DELETE FROM harjoitus WHERE ID = $id");
  
          if ($result && mysqli_commit($con)) {
              echo json_encode(["success" => "Harjoitus ID: $id poistettu järjestelmästä!"]);
          } else {
              mysqli_rollback($con); 
              echo json_encode(["error" => "Poisto epäonnistui!"]);
          }
      } else {
          echo json_encode(["error" => "Virheellinen ID!"]);
      }
      exit();
}
$con->close();