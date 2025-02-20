import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

function Kirjaudu_oppilas() {
  const navigate = useNavigate(); // Lisätään navigointi
  // Määritellään muuttujia joita käytetään sivun toiminaallisuudessa / Veeti
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [posti, setPosti] = useState('');
  const [salasana, setSalasana] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  // Sivun latauduttua tarkastetaan onko käyttäjä kirjautunut ja jos on, viedään etusivulle /Kai ja Veeti
  useEffect(() => {
    let login = localStorage.getItem("kirjaudu");
    if (login) {
      // Jos käyttäjä on jo kirjautunut, ohjataan etusivulle
      navigate("/Tervetuloa_oppilas");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      // Odotetaan pari sekuntia ennen kuin kirjauudutaan /Kai 
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 2000);
    }
    setTimeout(function () {
      setMsg("");
    }, 2000);
  }, [navigate, msg]);

  const handleSubmit = () => { // Lomakkeen käsittely / Veeti
    setEmailError('');
    setPasswordError('');

    if (posti.length === 0) {
        setEmailError('Syötä sähköpostiosoitteesi!');
        return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(posti)) {
        setEmailError('Anna oikea sähköpostiosoite!');
        return;
    }
    if (salasana.length === 0) {
        setPasswordError('Syötä salasanasi.');
        return;
    }

    const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kirjaudu_oppilas.php';
    let fData = new FormData();
    fData.append('posti', posti);
    fData.append('salasana', salasana);

    axios.post(url, fData).then((response) => {
        const data = response.data;
        if (data.status === "success") {
            // Tallennetaan tiedot localStorageen
            localStorage.setItem("kirjaudu", true);
            localStorage.setItem("posti", posti);
            localStorage.setItem("role", "oppilas"); // Oppilaan roolin tallennus
            localStorage.setItem("id", data.id); // Tallennetaan käyttäjän ID

            // Navigoidaan Tervetuloa-sivulle
            navigate("/Tervetuloa_oppilas");
        } else {
            setError(data.message);
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }).catch(() => {
        setError("Yhteys epäonnistui. Yritä myöhemmin uudelleen.");
    });
  };


  return (

    
    <div className="vh-100 gradient-custom">
       {/*Tulostetaan sivun otsikko */}
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h3 className="otsikko text-center mb-2">OSAO</h3>
                  <h3 className="kirjaudu text-center mb-4">Kirjaudu oppilaan liikuntapäiväkirjaan</h3>
                   {/*Lomake sisäänkirjautumiseen johon lisätään käyttäjän sähköpostiosoite ja salasana ja kirjaudutaan painamalla kirjaudu-nappia /Kai*/}
                  <form>
                    <label className="errorLabel">{error}</label>
                    <label className="messageLabel">{msg}</label>
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="posti">Sähköpostiosoite:</label>
                      <input
                        type="email"
                        className="form-control form-control-lg focus-ring"
                        name="posti"
                        id="posti"
                        placeholder="malli@email.fi"
                        value={posti}
                        onChange={(e) => setPosti(e.target.value)}
                      />
                      <label className="errorLabel">{emailError}</label>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="salasana">Salasana:</label>
                      <input
                        type="password"
                        className="form-control form-control-lg focus-ring"
                        name="salasana"
                        id="salasana"
                        placeholder="Salasana..."
                        value={salasana}
                        onChange={(e) => setSalasana(e.target.value)}
                      />
                      <label className="errorLabel">{passwordError}</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="button"
                        className="tallenna btn btn-primary py-1"
                        name="submit"
                        id="submit"
                        value="Kirjaudu"
                        onClick={handleSubmit}
                      />
                    </div>
                     {/*Linkki salasanan tilaamiseen ja kirjautumiseen oppilaan päiväkirjaan /Veeti*/}
                    <Link to="/SalasanaTilaus">
                      <p className="tilaus text-center mt-4 mb-0">Unohtuiko <u>salasana?</u></p>
                    </Link>
                    <Link to="/Kirjaudu_opettaja">Kirjaudu Opettajana</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kirjaudu_oppilas;