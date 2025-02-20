<?php

//Pauli samat kommentoinnit rakenteellisesti kuin lisaahar:ssa
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once('yhteys/config.php');

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
    $Viikko = $_POST['viikko'];
    $Maanantai= $_POST['maanantai'];
    $Tiistai= $_POST['tiistai'];
    $Keskiviikko= $_POST['keskiviikko'];
    $Torstai= $_POST['torstai'];
    $Perjantai= $_POST['perjantai'];
    $Lauantai= $_POST['lauantai'];
    $Sunnuntai= $_POST['sunnuntai'];
    $query = "SELECT * FROM liikuntasuunnitelma WHERE OppilasID = '$data'";
$result = mysqli_query($con,$query); 

if(mysqli_num_rows($result) > 0 ){
    $sql = "UPDATE liikuntasuunnitelma SET Viikko='$Viikko' , Maanantai ='$Maanantai' , Tiistai ='$Tiistai' , Keskiviikko ='$Keskiviikko' , Torstai ='$Torstai' , Perjantai  ='$Perjantai' , Lauantai ='$Lauantai', Sunnuntai ='$Sunnuntai' WHERE OppilasID='$data'";
    $result1 = mysqli_query($con,$sql);

  } else if($bool='false' ){
    $sql2 = "INSERT INTO liikuntasuunnitelma (Viikko,Maanantai,Tiistai,Keskiviikko,Torstai,Perjantai,Lauantai,Sunnuntai,OppilasID)
      VALUES ('$Viikko', '$Maanantai', '$Tiistai', '$Keskiviikko', '$Torstai', '$Perjantai' , '$Lauantai' , '$Sunnuntai','$data')";
      $result2 = mysqli_query($con,$sql2);

  }
    
    break;
}
$con->close();