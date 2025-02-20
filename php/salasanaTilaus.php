<?php
// Sallitaan kaikki pyynnöt CORSin kautta (voi olla tietoturvariski tuotantoympäristössä)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Asetetaan aikavyöhyke Suomeen
date_default_timezone_set('Europe/Helsinki');

// Lisätään PHPMailer-tiedostot
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('yhteys/config.php');

try {
    // Yhdistetään tietokantaan käyttäen PDO:ta
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $mail = new PHPMailer(true);

    // Tarkistetaan, onko sähköposti saatu POST-pyynnössä
    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $recipientEmail = $_POST['email']; // Käyttäjän syöttämä sähköposti

        // Tarkistetaan, onko sähköposti olemassa opettajat- tai oppilas-taulussa
        $stmt = $pdo->prepare("SELECT 'opettajat' AS source, S_posti AS email FROM opettajat WHERE S_posti = :email
                               UNION
                               SELECT 'oppilas' AS source, S_posti AS email FROM oppilas WHERE S_posti = :email");
        $stmt->bindParam(':email', $recipientEmail, PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Jos käyttäjä löytyi, luodaan satunnainen reset-token
            $resetToken = bin2hex(random_bytes(32)); // 32 tavun satunnainen merkkijono
            $expiry = date("Y-m-d H:i:s", strtotime("+1 hour")); // Tokenin voimassaoloaika 1 tunti

            // Tarkistetaan, onko token vanhentunut
            $currentDate = date("Y-m-d H:i:s");
            if ($currentDate > $expiry) {
                echo "Token on vanhentunut.";
            } 

            // Tallennetaan token tietokantaan
            $resetStmt = $pdo->prepare("INSERT INTO password_resets (S_posti, source, token, expires_at) 
                                        VALUES (:S_posti, :source, :token, :expires_at)");
            $resetStmt->bindParam(':S_posti', $user['email'], PDO::PARAM_STR);
            $resetStmt->bindParam(':source', $user['source'], PDO::PARAM_STR); // Onko opettaja vai oppilas
            $resetStmt->bindParam(':token', $resetToken, PDO::PARAM_STR);
            $resetStmt->bindParam(':expires_at', $expiry, PDO::PARAM_STR);
            $resetStmt->execute();

            // Sähköpostin lähetysasetukset
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';        // Gmailin SMTP-palvelin
            $mail->SMTPAuth   = true;                    // Käytetään autentikointia
            $mail->Username   = 'pouta750@gmail.com';    // Lähettävä sähköposti (korvaa omalla testisähköpostilla)
            $mail->Password   = 'stof ennf suwr fvng';   // Gmail-sovellussalasana
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Käytetään salausta
            $mail->Port       = 587;                     // SMTP-portti

            // Lähettäjän tiedot
            $mail->setFrom('pouta750@gmail.com', 'OSAO');
            $mail->addAddress($user['email'], 'Käyttäjä'); // Vastaanottaja

            // Luodaan palautuslinkki
            $resetLink = "http://localhost/php/resetPassword.php?token=$resetToken"; // Korvaa oikealla domainilla
            //Mailin sisältö
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->Subject = 'Salasanan palautus';
            $mail->Body    = "<p>Hei,</p><p>Klikkaa alla olevaa linkkiä vaihtaaksesi salasanasi:</p><a href='$resetLink'>$resetLink</a><p>Linkki on voimassa 1 tunnin.</p>";
            $mail->AltBody = "Hei, käytä tätä linkkiä salasanan vaihtamiseen: $resetLink";

            // Lähetetään sähköposti
            $mail->send();
            echo 'Palautuslinkki on lähetetty sähköpostiosoitteeseen!';
        } else {
            // Jos sähköpostiosoitetta ei löydy tietokannasta
            echo 'Sähköpostiosoitetta ei löydy järjestelmästä.';
        }
    } else {
        // Jos sähköpostia ei annettu lomakkeella
        echo 'Sähköpostiosoitetta ei annettu.';
    }
} catch (PDOException $e) {
    // Tietokantavirheen käsittely
    echo "Tietokantavirhe: " . $e->getMessage();
} catch (Exception $e) {
    // Sähköpostin lähetyksen virhe
    echo "Sähköpostin lähetys epäonnistui. Virhe: {$mail->ErrorInfo}";
}
?>

