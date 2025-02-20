<?php 
// Veeti 
header('Access-Control-Allow-Origin: *');
require_once('yhteys/config.php');

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_error()) {
    echo json_encode("Tietokantavirhe: " . mysqli_connect_error());
    exit();
} else {
    $posti = $_POST['posti']; // Lomakkeen tiedot
    $salasana = $_POST['salasana'];
    
    // Haetaan vain salasana tietokannasta (ei suoraa vertailua)
    $sql = "SELECT Salasana FROM opettajat WHERE S_posti = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $posti);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['Salasana'];

        // Tarkistetaan hashattu salasana
        if (password_verify($salasana, $hashedPassword)) {
            echo json_encode("Kirjaudutaan sisään...");
        } else {
            echo json_encode("Käyttäjätunnusta tai salasanaa ei löydy!");
        }
    } else {
        echo json_encode("Käyttäjätunnusta tai salasanaa ei löydy!");
    }
    
    $stmt->close();
    $conn->close();
}
?>
