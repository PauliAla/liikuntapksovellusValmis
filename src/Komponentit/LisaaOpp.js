import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Etusivu() {
  const navigate = useNavigate();  // Haetaan harjoituksen ID localStoragesta
  // Määritellään muuttujia joita käytetään sivun toiminaallisuudessa / Kai ja Veeti
  const [posti, setPosti] = useState('');
  const [etunimi, setEtunimi] = useState('');
  const [sukunimi, setSukunimi] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [postiError, setPostiError] = useState('');
  const [etunimiError, setEtunimiError] = useState('');
  const [sukunimiError, setSukunimiError] = useState('');

  const sposti = localStorage.getItem('posti');
  
   // Funktio uloskirjautumiseen / Kai 
  const LogoutSubmit = () => {
    localStorage.setItem("kirjaudu", "");
    localStorage.setItem("loginStatus", "Olet kirjautunut ulos!");
    navigate("/Ulos");
  };
  // Funktio lomakkeen käsittelyyn  / Kai ja Veeti 
  const handleSubmit = (event) => {
    event.preventDefault();

    setPostiError('');
    setEtunimiError('');
    setSukunimiError('');
     // Tarkastetaan onko kentät täytetty / Kai ja Veeti 
    if (etunimi.length === 0) {
      setEtunimiError('Syötä etunimi...');
      return;
    }
    if (sukunimi.length === 0) {
      setSukunimiError('Syötä sukunimi...');
      return;
    }
    if (posti.length === 0) {
      setPostiError('Syötä sähköpostiosoite!');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(posti)) {
      setPostiError('Anna oikea sähköpostiosoite.');
      return;
    }
     // Kun kentät ovat täytetty lisätään oppilas tietokantaan / Kai ja Veeti 
      const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/lisaaOpp.php';
      let fData = new FormData();
    fData.append('posti', posti);
    fData.append('etunimi', etunimi);
    fData.append('sukunimi', sukunimi);

    axios.post(url, fData)
      .then((response) => {
        if (response.data.success) {
          setMsg(response.data.success);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError("Virhe palvelimella: " + error.message);
      });
  };

  return (
    <>
      <div className="container-fluid px-5">
         {/*Tulostetaan sivun otsikko ja uloskirjautuminen /Kai */}
        <div className="row py-3">
          <div className="col-lg-4"><h3 className="logo text-start">OSAO</h3></div>
          <div className="col-lg-4"><h3 className="navbar-text text-center p-4">Liikuntapäiväkirja</h3></div>
          <div className="col-lg-4 text-end">
            <h3 className="navbar-user py-4">{sposti}
            <button className="valinta5 btn btn-primary py-1 mb-1 fw-bold ms-5" onClick={LogoutSubmit}>
                Kirjaudu ulos
              </button>
            </h3>
          </div>
          <div className="p-1 bg-dark w-100 rounded"></div>
        </div>
      </div>

      <div className="container-fluid px-5 mt-5">
        <div className="row">
          <div className="col-sm-12">
            <div className="d-flex justify-content-md-end mb-3">
             {/*Tulostetaan linkki takaisin etusivulle /Kai */}
              <Link to="/Etusivu" className="lisaa btn btn-primary py-1">Etusivulle</Link> 
            </div>
          </div>
        </div>
      </div>

      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h3 className="kirjaudu text-center mb-4">Lisää käyttäjä sovellukseen</h3>
                 {/*Lomake uuden käyttäjän lisäämiseen /Kai */}
                <form onSubmit={handleSubmit}>
                  <label className="errorLabel">{error}</label>
                  <label className="messageLabel">{msg}</label>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="etunimi">Etunimi:</label>
                    <input type="text" className="form-control form-control-lg" id="etunimi"
                      placeholder="Malli" value={etunimi} onChange={(e) => setEtunimi(e.target.value)} />
                    <label className="errorLabel">{etunimiError}</label>
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="sukunimi">Sukunimi:</label>
                    <input type="text" className="form-control form-control-lg" id="sukunimi"
                      placeholder="Oppilas" value={sukunimi} onChange={(e) => setSukunimi(e.target.value)} />
                    <label className="errorLabel">{sukunimiError}</label>
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="posti">Sähköpostiosoite:</label>
                    <input type="email" className="form-control form-control-lg" id="posti"
                      placeholder="malli@email.fi" value={posti} onChange={(e) => setPosti(e.target.value)} />
                    <label className="errorLabel">{postiError}</label>
                  </div>

                  <p className="text-center">Salasana luodaan automaattisesti ja lähetetään oppilaan sähköpostiin.</p>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="tallenna btn btn-primary mt-2 py-1">Tallenna</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Etusivu;
