

<?php
// Sovellukseen kuulumaton tiedosto jolla voi hashata oppilaan salasanan /Veeti
require_once('yhteys/config.php');

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Tietokantayhteys epäonnistui: " . mysqli_connect_error());
}

// Käyttäjän tiedot
$sahkoposti = "marjaana@osao.fi";  // Käyttäjän sähköposti
$uusiSalasana = "jip"; // Uusi salasana

// Hashataan salasana
$hashedPassword = password_hash($uusiSalasana, PASSWORD_DEFAULT);

// Päivitetään hashattu salasana tietokantaan
$sql = "UPDATE opettajat SET Salasana = ? WHERE S_posti = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $hashedPassword, $sahkoposti);

if ($stmt->execute()) {
    echo "Salasana päivitetty onnistuneesti!";
} else {
    echo "Virhe: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>