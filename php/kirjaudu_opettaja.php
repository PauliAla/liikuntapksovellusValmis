<?php 
    header('Access-Control-Allow-Origin: *');
    require_once('yhteys/config.php');

    $conn = mysqli_connect($servername, $username, $password, $dbname);
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $posti = $_POST['posti'];//lomakkeen tiedot
        $salasana = $_POST['salasana'];
        
        $sql = "SELECT * FROM opettajat WHERE S_posti='$posti' AND Salasana='$salasana' ";//haetaan opettajat taulusta tiedot
        $res = mysqli_query($conn, $sql);
         
        if($res){
            if(mysqli_num_rows($res) == 1) {//jos s-posti ja salasana löytyy
                echo json_encode("Kirjaudutaan sisään...");
        
        }
        else{//jos s-posti tai salasana väärin 
            echo json_encode("Käyttäjätunnusta tai salasanaa ei löydy!");
        }
        }
        $conn->close();
    }