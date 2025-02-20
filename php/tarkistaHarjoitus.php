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
    $sql = "SELECT OppilasID FROM harjoitus WHERE ID='$data'"; 
    $result = mysqli_query($con,$sql);
    
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
    echo json_encode($result);
    break;
}
$con->close();