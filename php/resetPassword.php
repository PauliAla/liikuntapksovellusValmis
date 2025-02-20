<?php
// Sallitaan kaikki alkuperät (CORS-käytäntö)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Lisätään PHPMailer-kirjaston tiedostot
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Tietokantayhteyden asetukset
require_once('yhteys/config.php');

try {
    // Luodaan yhteys tietokantaan PDO:lla
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Tarkistetaan, onko token annettu URL-parametrina
    if (!isset($_GET['token'])) {
        throw new Exception("Tokenia ei ole annettu.");
    }

    $token = $_GET['token'];

    // Tarkistetaan, löytyykö token tietokannasta ja onko se vielä voimassa
    $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = :token AND expires_at > NOW()");
    $stmt->bindParam(':token', $token, PDO::PARAM_STR);
    $stmt->execute();
    $resetRequest = $stmt->fetch(PDO::FETCH_ASSOC);

    // Jos tokenia ei löydy tai se on vanhentunut, heitetään virhe
    if (!$resetRequest) {
        throw new Exception("Linkki on vanhentunut tai virheellinen.");
    }

    // Tarkistetaan, onko lomake lähetetty
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Tarkistetaan, onko molemmat salasanakentät täytetty
        if (!isset($_POST['password'], $_POST['confirm_password'])) {
            throw new Exception("Anna molemmat salasanat.");
        }

        $password = $_POST['password'];
        $confirmPassword = $_POST['confirm_password'];

        // Varmistetaan, että salasanat täsmäävät
        if ($password !== $confirmPassword) {
            throw new Exception("Salasanat eivät täsmää. Yritä uudelleen.");
        }

        // Hashataan uusi salasana turvallisuuden takaamiseksi
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Selvitetään, onko käyttäjä opettaja vai oppilas
        $stmt = $pdo->prepare("SELECT source FROM password_resets WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $source = $stmt->fetchColumn();

        // Päivitetään salasana oikeaan tauluun käyttäjätyypin perusteella
        if ($source === 'opettajat') {
            $updateStmt = $pdo->prepare("UPDATE opettajat SET salasana = :password WHERE S_posti = :email");
        } else {
            $updateStmt = $pdo->prepare("UPDATE oppilas SET salasana = :password WHERE S_posti = :email");
        }

        // Asetetaan arvot ja suoritetaan SQL-kysely
        $updateStmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
        $updateStmt->bindParam(':email', $resetRequest['S_posti'], PDO::PARAM_STR);
        $updateStmt->execute();

        // Poistetaan käytetty token tietokannasta, jotta sitä ei voi käyttää uudelleen
        $deleteStmt = $pdo->prepare("DELETE FROM password_resets WHERE token = :token");
        $deleteStmt->bindParam(':token', $token, PDO::PARAM_STR);
        $deleteStmt->execute();

        // Viesti käyttäjälle onnistuneesta salasanan vaihdosta
        $msg = "Salasana on vaihdettu onnistuneesti! Sinut ohjataan aloitussivulle...";

        // JavaScript-koodi, joka uudelleenohjaa käyttäjän takaisin kirjautumissivulle 2,5 sekunnin kuluttua
        echo "<script>
                setTimeout(function() {
                    window.location.href = 'http://localhost:3000/';
                }, 2500);
              </script>";
    }
} catch (PDOException $e) {
    // Virheenkäsittely tietokantavirheiden varalta
    $error = "Tietokantavirhe: " . $e->getMessage();
} catch (Exception $e) {
    // Yleinen virheenkäsittely
    $error = "Virhe: " . $e->getMessage();
}
?>


<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vaihda salasana</title>
    
    <!-- Bootstrapin CSS-tiedosto ladattuna CDN:stä -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <style>
        /* Gradienttitausta sivulle */
        .gradient-custom {
            background: linear-gradient(to right, #ff9a9e, #fad0c4);
        }

        /* Kortin taustaväri */
        .gradient-custom-3 {
            background: rgba(255, 255, 255, 0.8);
        }

        /* Korostuskehys fokusoitaville kentille */
        .focus-ring:focus {
            outline: 2px solid #007bff;
        }

        /* Otsikon tyylit */
        .otsikko {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            color: Blue;
            font-size: 2.5em;
        }
    </style>
</head>
<body class="vh-100 gradient-custom">
    <!-- Maski, joka keskittää sisällön pystysuunnassa -->
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card">
                        <div class="card-body p-5">
                            <!-- Sivun otsikot -->
                            <h3 class="otsikko text-center mb-2">OSAO</h3>
                            <h3 class="kirjaudu text-center mb-4">Vaihda salasana</h3>

                            <!-- Virheviesti, jos jokin meni pieleen -->
                            <?php if (isset($error)) : ?>
                                <div class="alert alert-danger text-center"><?php echo $error; ?></div>
                            <?php endif; ?>

                            <!-- Onnistumisviesti, jos salasana on vaihdettu -->
                            <?php if (isset($msg)) : ?>
                                <div class="alert alert-success text-center"><?php echo $msg; ?></div>
                            <?php endif; ?>

                            <?php if (!isset($msg)) : ?>
                            <!-- Lomake salasanan vaihtoa varten -->
                            <form method="POST">
                                <!-- Uusi salasana -kenttä -->
                                <div class="form-outline mb-2">
                                    <label class="form-label" for="password">Uusi salasana:</label>
                                    <input type="password" class="form-control form-control-lg focus-ring"
                                           name="password" id="password" placeholder="Uusi salasana" required>
                                </div>

                                <!-- Salasanan vahvistus -kenttä -->
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="confirm_password">Vahvista salasana:</label>
                                    <input type="password" class="form-control form-control-lg focus-ring"
                                           name="confirm_password" id="confirm_password" placeholder="Vahvista salasana" required>
                                </div>

                                <!-- Vaihda salasana -painike -->
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="tallenna btn btn-primary py-1">Vaihda salasana</button>
                                </div>
                            </form>
                            <?php endif; ?>
                            <!-- Lomake päättyy -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
