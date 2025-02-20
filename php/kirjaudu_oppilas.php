<?php 

//Veeti
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//käytetään tietokkantietoja
require_once('yhteys/config.php');
//yhteys tietokantaan
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Tarkistetaan, onnistuiko tietokantayhteys
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Tietokantayhteys epäonnistui"]);
    exit();
}
// Käyttäjän tiedot
$posti = $_POST['posti'];
$salasana = $_POST['salasana'];

// Haetaan vain hashattu salasana oppilas-taulusta
$sql = "SELECT OppilasID, S_posti, Salasana FROM oppilas WHERE S_posti = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $posti);
$stmt->execute();
$result = $stmt->get_result();
// Tarkistetaan, onko käyttäjä olemassa
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashedPassword = $row['Salasana'];

    // Tarkistetaan salasana hashin avulla
    if (password_verify($salasana, $hashedPassword)) {
        echo json_encode([
            "status" => "success",
            "message" => "Kirjaudutaan sisään...",
            "id" => $row['OppilasID'],
            "email" => $row['S_posti']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Käyttäjätunnusta tai salasanaa ei löydy!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Käyttäjätunnusta tai salasanaa ei löydy!"]);
}

$stmt->close();
$conn->close();
?>

