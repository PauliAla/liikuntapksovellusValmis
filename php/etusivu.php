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
$id = ''; 
$method = $_SERVER['REQUEST_METHOD']; // otetaan käytttöön http- metodeja joita voidaan käyttää switch-lauseessa

switch ($method) { // Switch-casella vaihdetaan siihen metodiin mitä axiosilla on kutsuttu
      
  case 'GET': // Palautetaan axios.get:lle tietoa tietokannasta
      $sql = "SELECT OppilasID, Etunimi, Sukunimi, S_posti, Pvm, Suoritukset FROM oppilas ORDER BY Suoritukset DESC";
      $result = mysqli_query($con,$sql);
      
      if (!$result) { // Jos yhteyttä tietokantaan ei ole annetaan virheilmoitus
        http_response_code(404);
        die(mysqli_error($con));
      }
      // Kai ronkaisen koodia
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

  case 'DELETE':  // Poistetaan tietoa axios.deleten perusteella

    $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
   
    mysqli_autocommit($con,FALSE);

    // poisto kaikista tauluista
    mysqli_query($con,"DELETE FROM profiili WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM liikuntasuunnitelma WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM harjoitus WHERE OppilasID = '$data'");
    mysqli_query($con,"DELETE FROM oppilas WHERE OppilasID = '$data'");

    // poisto epäonnistui
    if (!mysqli_commit($con)) {
      echo json_encode("Poisto epäonnistui!");
      exit();
    }
    else{
      echo json_encode(["success"=>"ID: $data Käyttäjä poistettu järjestelmästä!"]);
      return;
    }

    case 'PUT': // Talletetaan tietokantaan tietoa axios.put:n perusteella
      $url= $_SERVER['REQUEST_URI'];
      $data = basename($url);
      $sql = "UPDATE oppilas SET Suoritukset =(SELECT SUM( extract(hour from Aika) + extract(minute from Aika) / 60 + extract(second from Aika) / 3600 ) hours FROM harjoitus WHERE OppilasID= '$data') WHERE OppilasID='$data'";
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else{
        echo json_encode($result);
      }
      break;

}

$con->close(); // Suljetaan tietokantayhteys lopuksi

//UPDATE oppilas SET Suoritukset =(SELECT SUM( extract(hour from Aika) + extract(minute from Aika) / 60 + extract(second from Aika) / 3600 ) hours FROM harjoitus WHERE OppilasID= 5) WHERE OppilasID=5;
