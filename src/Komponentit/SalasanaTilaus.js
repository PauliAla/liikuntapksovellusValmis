import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
//Veetin tekemä sivu
function Salasana(){
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = () => {//lomakkeen käsittely
        setEmailError('') 
        if(email.length === 0){//tyhjä kenttä
          setEmailError('Syötä sähköpostiosoitteesi!')
          return
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {//merkkien tarkistus
          setEmailError('Anna oikea sähköpostiosoite?')
          return
        }
        else{//kentät täytetty php tarkistus ja uudelleen ohjaus
          const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/salasanaTilaus.php';
          let fData = new FormData();//lomakkeelta tiedot
          fData.append('email', email);
          axios.post(url, fData).then((response)=> {//tiedot php:lle ja vastaus
          if(response.data === "Uusi salasana lähetetty annettuun sähköpostiosoitteeseen!"){//jos s-posti ja salasana oikein
            setMsg(response.data);//ilmoitus kirjautumisesta
            setTimeout(function(){
            navigate("/");//ohjataan etusivulle
            }, 4000);
          }else {//jos s-posti tai salasana väärin, error ilmoitus ja sivun uudelleen lataus
            setError(response.data);
            setTimeout(function(){
              window.location.reload();
            }, 2000);
          } 
       })
      };
    }
return(
    <>
    <div className="vh-100 gradient-custom">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h3 className="otsikko text-center mb-2">OSAO</h3>
                <h3 className="kirjaudu text-center mb-3">Tilaa uusi salasana</h3>
                <form>
                  <label className="errorLabel">{error}</label>
                  <label className="messageLabel">{msg}</label>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="email">Sähköpostiosoite:</label>
                    <input type="email" className="form-control form-control-lg focus-ring" name="email" id="email" placeholder="malli@email.fi" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="errorLabel">{emailError}</label>
                  </div>
                  <p className="text-center mb-4" htmlFor="email">Salasana lähetetään hyväksyttyyn sähköpostiosoitteeseen.</p>
                  <div className="d-flex justify-content-center">
                  <input type="button" className="tallenna btn btn-primary" name="submit" id="submit" value="Tilaa salasana" onClick={handleSubmit} />
                  </div>
                  <Link to="/"><p className="tilaus text-center mt-4 mb-0">Palaa kirjautumissivulle</p></Link>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
    </>
)
}
export default Salasana;