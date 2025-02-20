import axios from "axios"
import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";



function Oppilas() {
  const navigate = useNavigate();
const [role, setRole] = useState(""); // Käyttäjän rooli

// Haetaan käyttäjän rooli localStoragesta
useEffect(() => {
  const userRole = localStorage.getItem("role");
  setRole(userRole);
}, []);

    function LogoutSubmit(){
        localStorage.setItem("kirjaudu", "");
        localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
        navigate("/Ulos");
      }
  const weekNumber = getDateWeek();
  const current = new Date();
  const day = current.getDay();
  const weekday = currday(day);
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [sijaintikuva, setSijaintikuva] = useState([]);
  const {OppilasID}=   useParams();
  const [suunnitelma, setSuunnitelma] = useState([]);
    const [harjoitus, setHarjoitus] = useState([]);
  const [viikko, setViikko] = useState([]);
  const [maanantai, setMaanantai] = useState([]);
  const [tiistai, setTiistai] = useState([]);
  const [keskiviikko, setKeskiviikko] = useState([]);
  const [torstai, setTorstai] = useState([]);
  const [perjantai, setPerjantai] = useState([]);
  const [lauantai, setLauantai] = useState([]);
  const [sunnuntai, setSunnuntai] = useState([]);
  const [kulutus, setKulutus] = useState('');
  const [nopeus, setNopeus] = useState('');
  const [file, setFile] = useState("");
  const [harjoitus2, setHarjoitus2] = useState('');
  const [paivamaara, setPaivamaara] = useState('');
  const [kaytettyAika, setKaytettyAika] = useState('');
  const [kuljettuMatka, setKuljettuMatka] = useState('');
  const [kunnonVastaus, setKunnonVastaus] = useState('');
  const [tyokykyVastaus, setTyokykyVastaus] = useState('');
  const [linkki, setLinkki] = useState('');
  const [viesti, setViesti] = useState('');


  useEffect(() => {
    
    axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/suunnitelma.php/'+OppilasID).then(function(response) {
      //console.log(response.data);
      setSuunnitelma(response.data);
    });
  }, [OppilasID]);  



  useEffect(() => {
      axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/oppilas.php/'+OppilasID).then(function(response) {
        //console.log(response.data);
        setHarjoitus(response.data);
      });
    }, [OppilasID]);  


  function acceptKaikki(){
    axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/oppilas.php/'+OppilasID).then(function(response){
      //console.log(response.data);
      window.location.reload();
    });
  }
 

    function muutaLiikuntasuunnitelmaa(){
      const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/muutaLiikuntasuunnitelmaa.php/'+OppilasID;
      let fData = new FormData();

      fData.append('viikko', viikko);
      fData.append('maanantai', maanantai);  
      fData.append('tiistai', tiistai);
      fData.append('keskiviikko', keskiviikko);
      fData.append('torstai', torstai);
      fData.append('perjantai', perjantai);
      fData.append('lauantai', lauantai);
      fData.append('sunnuntai', sunnuntai);
      alert("Tietokanta on päivitetty");
      axios.post(url, fData).then((response)=> {
        console.log(response.data);
        window.location.reload();
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/lisaaHar2.php/'+OppilasID;
      let fData2 = new FormData();

      fData2.append('harjoitus2', harjoitus2);
      fData2.append('paivamaara', paivamaara);  
      fData2.append('kaytettyAika', kaytettyAika);
      fData2.append('kuljettuMatka', kuljettuMatka);
      fData2.append('file', file);
      fData2.append('kunnonVastaus', kunnonVastaus);
      fData2.append('tyokykyVastaus', tyokykyVastaus);
      fData2.append('linkki', linkki);
   
      alert("Tietokanta on päivitetty");
      axios.post(url, fData2).then((response)=> {
        console.log(response.data);
        window.location.reload();
    });
  };

  function getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

function currday (day)  {
    if(day=== 1){
      return "Maanantai";
    }
    else if(day=== 2){
      return "Tiistai";
    }
    else if(day=== 3){
      return "Keskiviikko";
    }
    else if(day === 4){
      return "Torstai";
    }
    else if(day === 5){
      return "Perjantai";
    }
    else if(day=== 6){
      return "Lauantai";
    }
    else{
      return "Sunnuntai";
    }
  }





      const convertToBlob =(e) => {
        setFile(URL?.createObjectURL(e.target.files[0]));
        console.log({file}) //the result will in blob format.
        
        }



  const laitaAika = () => {
    axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/etusivu.php/'+OppilasID).then(function(response){
      //console.log(response.data);
      //window.location.reload();
  });
}

window.addEventListener("beforeunload", () => {
  laitaAika();
});
  const posti= localStorage.getItem('posti');
return(
    <>
      <div className="container-fluid px-5">
       <div className="row py-3">
       <div className="col-sm-4"> <h3 className="logo text-start" >OSAO</h3></div>
        <div className="col-sm-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
        <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{posti}
              <button className="valinta1 btn btn-primary py-1 mb-1 fw-bold ms-5" type="submit" onClick={LogoutSubmit}>
                Kirjaudu ulos
              </button></h3>
          </div>     
      <div className="p-1 bg-dark w-100 rounded "></div>
      </div>
      </div>
      <div className="container-fluid px-5 mt-4">
                <div className="row">
                    <div className="col-sm-12">
                    <h4 className="mt-2 fw-bold">Päivämäärä: {weekday} {date}</h4>  
             
                    <h4 className="mt-2 fw-bold">Nyt on viikko  {weekNumber}</h4> 
             
              
                    {role !== "oppilas" && (
                  <Link to="/Etusivu" className="lisaa btn btn-primary py-1">
                  Etusivulle
                </Link>
                  )}
                 
                    <h4 className="mt-2 fw-bold">Tämän hetkinen liikuntasuunnitelma:</h4> 
                
                    <div className="col-sm-6">
                    <table className="table text-center">
                        <thead className="bg-light">
                           <tr>
                           <th>Viikko</th>
                            <th>Maanantai</th>
                            <th>Tiistai</th>
                            <th>Keskiviikko</th>
                            <th>Torstai</th>
                            <th>Perjantai</th>
                            <th>Lauantai</th>
                            <th>Sunnuntai</th>
                            </tr> 
                        </thead>
                        <tbody >
                            {suunnitelma.map((suunnit, key) =>
                              <tr key={key} >
                                <td>{suunnit.Viikko}</td>
                                <td>{suunnit.Maanantai}</td>
                                <td>{suunnit.Tiistai}</td>
                                <td>{suunnit.Keskiviikko}</td>
                                <td>{suunnit.Torstai}</td>
                                <td>{suunnit.Perjantai}</td>
                                <td>{suunnit.Lauantai} </td>
                                <td>{suunnit.Sunnuntai}</td>
                              </tr>
                            )}
                        </tbody>
                       
                    </table></div> 
                    {role !== "opettaja" && (
                    <div className="col-sm-6">
                    <h4 className="mt-2 fw-bold">Muuta liikuntasuunnitelmaa:</h4> 
                    <div className="col-sm-6">
                      
                    <table className="table text-center">
                      
                        <thead className="bg-light">
                 
                        <input type="number" name="viikko" 
                        id="viikko" value={viikko} onChange={(e) => setViikko(e.target.value)}
                        placeholder="Viikko nro"
                        title="Numero väliltä 1-52"   
                        inputProps={{ maxLength: 52}}                     
                        ></input>
                            <select id="maanantai" name="maanantai" value={maanantai} onChange={(e) => setMaanantai(e.target.value)} > 
                  
                            <option value="" disabled selected hidden>Maanantai</option>
                                <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="tiistai" name="tiistai" value={tiistai} onChange={(e) => setTiistai(e.target.value)} >
                            <option value="" disabled selected hidden>Tiistai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="keskiviikko" name="keskiviikko" value={keskiviikko} onChange={(e) => setKeskiviikko(e.target.value)}>
                            <option value="" disabled selected hidden>Keskiviikko</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="torstai" name="torstai" value={torstai} onChange={(e) => setTorstai(e.target.value)}>
                            <option value="" disabled selected hidden>Torstai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="perjantai" name="perjantai" value={perjantai} onChange={(e) => setPerjantai(e.target.value)} >
                            <option value="" disabled selected hidden>Perjantai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="lauantai" name="lauantai" value={lauantai} onChange={(e) => setLauantai(e.target.value)}>
                            <option value="" disabled selected hidden>Lauantai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <select id="sunnuntai" name="sunnuntai" value={sunnuntai} onChange={(e) => setSunnuntai(e.target.value)}>
                            <option value="" disabled selected hidden>Sunnuntai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                            </select>
                            <th><button className="valinta3 btn btn-success fw-bold py-1" onClick={muutaLiikuntasuunnitelmaa}>Muuta liikuntasuunnitelmaa</button></th>
                        </thead>
                        
                        
                    </table></div> 
                    </div>
                  )}
                 
                    <h4 className="mt-5 fw-bold">Suoritukset:</h4>

                    <table className="table text-center">
                        <thead className="bg-light">
                           <tr>
                            <th>ID</th>
                            <th>Harjoitus</th>
                            <th>Päivämäärä</th>
                            <th>Matka km</th>
                            <th>Käytetty aika</th>
                            <th>Hyväksytty/hylätty</th>
                            {/* Näytä painike vain, jos rooli ei ole "oppilas" */}
                  {role !== "oppilas" && (
                    <th>
                      <button
                        className="valinta3 btn btn-success fw-bold py-1"
                        onClick={acceptKaikki}
                      >
                        Hyväksy kaikki
                      </button>
                    </th>
                  )}

                            </tr> 
                        </thead>
                        <tbody >
                            {harjoitus.map((opp, key) =>{
                              let vari = opp.Tila === 'Hyväksytty'? 'green': (opp.Tila === 'Hylätty' ? 'red': 'black');
                              return <tr key={key} >
                                <td style={{color: vari}}>{opp.ID}</td>
                                <td style={{color: vari}}>{opp.harjoitus}</td>
                                <td style={{color: vari}}>{opp.Pvm}</td>
                                <td style={{color: vari}}>{opp.Matka}</td>
                                <td style={{color: vari}}>{opp.Aika}</td>
                                <td style={{color: vari}}>{opp.Tila} </td>
                                <td ><Link to={"/Harjoitus/"+opp.ID} className="valinta1 btn btn-primary fw-bold py-1">Näytä tiedot</Link></td> 
                              </tr>
                            })}
                        </tbody>
                    </table> 
                   </div> 
                  </div>   
                </div>  
                
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                {role !== "opettaja" && (
                  <div className="container">
      <h1>Lisää uusi harjoitus</h1>
      {viesti && <p>{viesti}</p>}
    
      <form method="post" action="http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/upload.php/" enctype="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px' }} >
      <label>
          Harjoitus:
          <input
            type="text"
            name="harjoitus2"
                  
            required
            style={{ width: '100%' }}
          />
        </label>
               

        <label>
          Kuva sijainnista:
          <input type="file" name="image" 

    
            style={{ width: '100%' }}
          />
        </label>
        <label>
        Päivämäärä (muodossa vuosi-kuukausi-päivä(esim. 2025-01-28)):
          <input
            type="text"
            name="paivamaara"
   
            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Käytetty aika (tunnit:minuutit:sekunnit):
          <input
            type="text"
            step="1"
            name="kaytettyAika"

            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Kuljettu matka (km):
          <input
            type="number"
            step="0.01"
            name="kuljettuMatka"
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Kulutus (arvioitu kaloreina):
          <input
            type="number"
            step="5"
            name="kulutus"

            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Nopeus km/h (matka(km)/käytetty aika(h)):
          <input
            type="number"
            step="0.01"
            name="nopeus"

            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Kuva harjoituksesta:
          <input type="file" name="image2" 

    
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Kunnon osa-alue vastaus:
          <input
            type="text"
            name="kunnonVastaus"
            required
            style={{ width: '100%' }}
          />
        </label>
 
        <label>
          Työkyky ja hyvinvointi vastaus:
          <input
            type="text"
            name="tyokykyVastaus"

            required
            style={{ width: '100%' }}
          />
        </label>

        <label>
          Linkki aktiviteettiin:
          <input
            type="url"
            name="linkki"
            required
            style={{ width: '100%' }}
          />
        </label>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer' }}>
          Tallenna
        </button>
      </form>
    </div>  
         )}
    </div>   
    </>  
      )
      
    }
export default Oppilas;