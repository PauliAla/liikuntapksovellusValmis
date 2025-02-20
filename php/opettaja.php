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
else{
   
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
  
    case 'GET':
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
    $sql = "SELECT Etunimi, Sukunimi FROM opettajat WHERE S_posti='$data' ";//haetaan opettajat taulusta tiedot
    $res = mysqli_query($conn, $sql);
     
    if($res){
        if(mysqli_num_rows($res) == 1) {//jos s-posti löytyy
        echo json_encode($res);
    
    }
    }
}
    $conn->close();
}