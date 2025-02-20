<?php 
//Pauli ja Veeti
   header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

    require_once('yhteys/config.php');

    $conn = mysqli_connect($servername, $username, $password, $dbname);
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }else{


      $url= $_SERVER['REQUEST_URI']; // Ottaa sivun url - osoiteen
      $base = basename($url); // Otetaan viimeinen parametri url - osoittesta joka on oppilasID

      // Määritellään muuttujia joihin asetetaan axiosista fdatalla lähetettyä tietoa 
      $Harjoitus = $_POST["harjoitus2"];

     $data =addslashes (file_get_contents($_FILES['image']['tmp_name']));

      $Aika = $_POST["kaytettyAika"];
      $Matka = $_POST["kuljettuMatka"];
      $Kulutus = $_POST["kulutus"];
      $Nopeus = $_POST["nopeus"];
 
      $data2 =addslashes (file_get_contents($_FILES['image2']['tmp_name']));
   
      $Vastaus1 = $_POST["kunnonVastaus"];
      $Vastaus2 = $_POST["tyokykyVastaus"];
      $Linkki = $_POST["linkki"];
      $Paivamaara = $_POST["paivamaara"];

      $sql = "CREATE TABLE IF NOT EXISTS harjoitus (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        Harjoitus VARCHAR(255) NOT NULL,
        Paivamaara DATE NOT NULL,
        Aika TIME,
        Matka Float,
        Vastaus1 TEXT,
        Vastaus2 TEXT,
        Linkki VARCHAR(255)
        
      )";
      // Luodaan yhteys tietokantaan ja suoritetaan sql- lause joka lisää uuden harjoituksen
      mysqli_query($conn, $sql);

      $sql = "INSERT INTO harjoitus (harjoitus,  Sijainti_kuva, Aika, Matka, Kulutus, Nopeus, Kuva, Vastaus1, Vastaus2, Linkki, OppilasID)
VALUES ('$Harjoitus', '$data', '$Aika', '$Matka', '$Kulutus', '$Nopeus', '$data2', '$Vastaus1', '$Vastaus2', '$Linkki','$base')";
mysqli_query($conn, $sql);
      }
mysqli_close($conn);
  

?>