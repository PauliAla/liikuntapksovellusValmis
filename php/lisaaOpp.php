
<?php

//Veeti
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Asetetaan aikavyöhyke
date_default_timezone_set('Europe/Helsinki');

// Lisätään php-mailer-tiedostot
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

// Otetaan käyttöön php-mailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Tietokantayhteys


require_once('yhteys/config.php');
try {
    // Otetaan yhteys tietokantaan
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Tarkista, että kaikki lomakkeen kentät on täytetty
    if (isset($_POST['posti'], $_POST['etunimi'], $_POST['sukunimi'])) {
        $posti = $_POST['posti'];
        $etunimi = $_POST['etunimi'];
        $sukunimi = $_POST['sukunimi'];

        // Tarkista, onko sähköposti jo käytössä
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM oppilas WHERE S_posti = :posti");
        $stmt->bindParam(':posti', $posti, PDO::PARAM_STR);
        $stmt->execute();
        $emailExists = $stmt->fetchColumn();

        if ($emailExists) {
            echo json_encode(["error" => "Sähköpostiosoite on jo käytössä"]);
            exit();
        }

        // Lisää uusi oppilas
        $stmt = $pdo->prepare("INSERT INTO oppilas (Etunimi, Sukunimi, S_posti) VALUES (:etunimi, :sukunimi, :posti)");
        $stmt->bindParam(':etunimi', $etunimi, PDO::PARAM_STR);
        $stmt->bindParam(':sukunimi', $sukunimi, PDO::PARAM_STR);
        $stmt->bindParam(':posti', $posti, PDO::PARAM_STR);

        if ($stmt->execute()) {
            // Luo satunnainen salasana
            $randomString = bin2hex(random_bytes(8));
            $hashedPassword = password_hash($randomString, PASSWORD_DEFAULT);

            // Päivitä salasana oppilaalle
            $stmt = $pdo->prepare("UPDATE oppilas SET Salasana = :salasana WHERE S_posti = :posti");
            $stmt->bindParam(':salasana', $hashedPassword, PDO::PARAM_STR);
            $stmt->bindParam(':posti', $posti, PDO::PARAM_STR);
            $stmt->execute();

            // Luo salasanan vaihto -linkki
            $resetToken = bin2hex(random_bytes(32));
            $expiry = date("Y-m-d H:i:s", strtotime("+72 hour"));

            // Tallenna token tietokantaan
            $stmt = $pdo->prepare("INSERT INTO password_resets (S_posti, token, expires_at, source) VALUES (:posti, :token, :expires, 'oppilas')");
            $stmt->bindParam(':posti', $posti, PDO::PARAM_STR);
            $stmt->bindParam(':token', $resetToken, PDO::PARAM_STR);
            $stmt->bindParam(':expires', $expiry, PDO::PARAM_STR);
            $stmt->execute();

            // Lähetä sähköposti PHPMailerilla
            try {
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'pouta750@gmail.com'; //Laita oma testisähköposti
                $mail->Password   = 'stof ennf suwr fvng'; // VAIHDA TÄMÄ OIKEAAN GMAIL-SOVELLUSSALASANAAN
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;

                $mail->setFrom('pouta750@gmail.com', 'OSAO');
                $mail->addAddress($posti, "$etunimi $sukunimi");

                $resetLink = "http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/resetPassword.php?token=$resetToken";
                // mailin sisältö
                $mail->isHTML(true); 
                $mail->CharSet = 'UTF-8';
                $mail->Encoding = 'base64';
                $mail->Subject = "Tervetuloa! Aseta salasanasi";
                $mail->Body    = "<p>Hei $etunimi,</p>
                                  <p>Olet lisätty järjestelmään. Aseta salasana napsauttamalla alla olevaa linkkiä:</p>
                                  <a href='$resetLink'>$resetLink</a>
                                  <p>Linkki on voimassa 3 päivää.</p>";
                $mail->AltBody = "Hei $etunimi, käytä tätä linkkiä salasanan asettamiseen: $resetLink";

                $mail->send();
                echo json_encode(["success" => "Oppilas lisätty ja ohjaa oppilas vaihtamaan salasana löytyy sähköpostista!"]);
            } catch (Exception $e) {
                echo json_encode(["error" => "Sähköpostin lähetys epäonnistui: {$mail->ErrorInfo}"]);
            }
        } else {
            echo json_encode(["error" => "Jokin meni pieleen käyttäjän lisäyksessä"]);
        }
    } else {
        echo json_encode(["error" => "Kaikki kentät eivät ole täytetty"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Tietokantavirhe: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Sähköpostin lähetys epäonnistui. Virhe: " . $e->getMessage()]);
}
?>