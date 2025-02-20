<?php

// Kai Ronkaisen koodia jolla haetaan kuva harjoituksesta tietokannasta
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
    $sql = "SELECT Kuva FROM harjoitus WHERE ID='$data'"; 
    $result = mysqli_query($con,$sql);
        
    if (!$result) {
    http_response_code(404);
     die(mysqli_error($con));
    }
    
    if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                echo base64_encode($row['Kuva']);
            }
        }
  break;
}
$con->close();