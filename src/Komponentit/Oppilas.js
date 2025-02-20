import axios from "axios"
import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";



function Oppilas() {
  const navigate = useNavigate(); 
  const [role, setRole] = useState(""); // Käyttäjän rooli

  // otetaan id osoitepalkista jota verrataan myöhemmin käyttäjän id:hen useEffectillä /Pauli
  const pathArray = window.location.pathname.split('/');
  const pathArray2 = pathArray[pathArray.length - 1];


    // Haetaan käyttäjän ID localStoragesta
    const id = localStorage.getItem("id");

   
// Haetaan käyttäjän rooli localStoragesta ja varmistetaan että käyttäjällä on valtuudet tarkastella sivua /Pauli ja Veeti
useEffect(() => {
  
  const id = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  setRole(userRole);
  if (userRole!=="opettaja") {
  if (id !== pathArray2)  {
    alert("Sinulla ei ole oikeuksia päästä tarkastelemaan tätä sivua.");
    navigate(`/Oppilas/${id}`);
  }
}
}, []);


    // Uloskirjautuminen toiminnallisuus /Kaikki

    function LogoutSubmit(){
        localStorage.setItem("kirjaudu", "");
        localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
        navigate("/Ulos");
      }

      // Muuttujien määrittelyä joita käytetään muuttamaan liikuntyasuunnitemaa /Pauli
      const [selectedOption, setSelectedOption] = useState('');
      const [otherValue, setOtherValue] = useState('');
      const [selectedOption2, setSelectedOption2] = useState('');
      const [otherValue2, setOtherValue2] = useState('');
      const [selectedOption3, setSelectedOption3] = useState('');
      const [otherValue3, setOtherValue3] = useState('');
      const [selectedOption4, setSelectedOption4] = useState('');
      const [otherValue4, setOtherValue4] = useState('');
      const [selectedOption5, setSelectedOption5] = useState('');
      const [otherValue5, setOtherValue5] = useState('');
      const [selectedOption6, setSelectedOption6] = useState('');
      const [otherValue6, setOtherValue6] = useState('');
      const [selectedOption7, setSelectedOption7] = useState('');
      const [otherValue7, setOtherValue7] = useState('');
      const handleSelectChange = (event) => {
        setMaanantai(event.target.value);
        setSelectedOption(event.target.value);
      };
       
      const handleOtherChange = (event) => {
        setMaanantai(event.target.value);
        setOtherValue(event.target.value);
      };
      const handleSelectChange2 = (event) => {
        setTiistai(event.target.value);
        setSelectedOption2(event.target.value);
      };
    
      const handleOtherChange2 = (event) => {
        setTiistai(event.target.value);
        setOtherValue2(event.target.value);
      };
      const handleSelectChange3 = (event) => {
        setKeskiviikko(event.target.value);
        setSelectedOption3(event.target.value);
      };
    
      const handleOtherChange3 = (event) => {
        setKeskiviikko(event.target.value);
        setOtherValue3(event.target.value);
      };
      const handleSelectChange4 = (event) => {
        setTorstai(event.target.value);
        setSelectedOption4(event.target.value);
      };
    
      const handleOtherChange4 = (event) => {
        setTorstai(event.target.value);
        setOtherValue4(event.target.value);
      };
      const handleSelectChange5 = (event) => {
        setPerjantai(event.target.value);
        setSelectedOption5(event.target.value);
      };
    
      const handleOtherChange5 = (event) => {
        setPerjantai(event.target.value);
        setOtherValue5(event.target.value);
      };
      const handleSelectChange6 = (event) => {
        setLauantai(event.target.value);
        setSelectedOption6(event.target.value);
      };
    
      const handleOtherChange6 = (event) => {
        setLauantai(event.target.value);
        setOtherValue6(event.target.value);
      };
      const handleSelectChange7 = (event) => {
        setSunnuntai(event.target.value);
        setSelectedOption7(event.target.value);
      };
    
      const handleOtherChange7 = (event) => {
        setSunnuntai(event.target.value);
        setOtherValue7(event.target.value);
      };

  const weekNumber = getDateWeek(); //Haetaan tämän hetkisen viikon numero funktiolla getDateWeek() /Pauli  
   // Määritellään muuttujia joiden avulla saadaan selville tämän hetkinen viikonpäivä /Pauli

   const current = new Date();
  const day = current.getDay();
  const weekday = currday(day);
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const {OppilasID}=   useParams(); // Määritellääm OppilasID jota käytetään axios linkeissä

  // Muuttujia joita käytetään muuttamaan oppilaan liikuntasuunnitelmaa

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

  // Määritellään muutttujia joita käytetään uuden harjoituksen lisäämiseen tietokantaan
  
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
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


  // Haetaan liikuntasuunnitelma tietokannasta /Kai Ronkainen
  useEffect(() => {
    
    axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/suunnitelma.php/'+OppilasID).then(function(response) {
      //console.log(response.data);
      setSuunnitelma(response.data);
    });
  }, [OppilasID]);  


  // Haetaan kaikki oppilaan harjoitukset tietokannasta /Kai Ronkainen
  useEffect(() => {
      axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/oppilas2.php/'+OppilasID).then(function(response) {
        //console.log(response.data);
        setHarjoitus(response.data);
      });
    }, [OppilasID]);  

  //Funktio joka hyväksyy kaikki harjoitukset /Kai Ronkainen
  function acceptKaikki(){
    axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/oppilas.php/'+OppilasID).then(function(response){
      //console.log(response.data);
      window.location.reload();
    });
  }

  // Funktio joka poistaa harjoituksen / Veeti
  const poistaHarjoitus = (id) => {
    if (window.confirm("Haluatko varmasti poistaa harjoituksen ID: " + id + "?")) {
      axios
        .delete(`http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/oppilas.php/${id}`) 
        .then((response) => {
          if (response.data.success) {
            alert(response.data.success);
            window.location.reload(); 
          } else {
            alert(response.data.error || "Virhe tapahtui poiston yhteydessä.");
          }
        })
        .catch((error) => {
          console.error("Virhe poistettaessa harjoitusta:", error);
          alert("Poisto epäonnistui. Yritä uudelleen.");
        });
    
  };
  
  };
 
 // Funktio jolla muutetaan liikuntasuunnitelmaa /Pauli
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

  // Funktio jolla lisätään uusi harjoitus /Pauli
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/lisaaHar2.php/'+OppilasID;
      let fData2 = new FormData();

      fData2.append('harjoitus2', harjoitus2);
      fData2.append('paivamaara', paivamaara);  
      fData2.append('kaytettyAika', kaytettyAika);
      fData2.append('kuljettuMatka', kuljettuMatka);
      fData2.append('kulutus', kulutus);
      fData2.append('nopeus', nopeus);
      fData2.append('image', image);
      fData2.append('image2', image2);
      fData2.append('kunnonVastaus', kunnonVastaus);
      fData2.append('tyokykyVastaus', tyokykyVastaus);
      fData2.append('linkki', linkki);
   
      alert("Tietokanta on päivitetty");
      axios.post(url, fData2, { headers: {'content-type': 'multipart/form-data',}}).then((response)=> {
        console.log(response.data);
        window.location.reload();
    });
  };

  
  // Funktio jolla haetaan viikon numero /Pauli
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

// Funktio jolla haetaan viikonpäivä /Pauli
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



  const laitaAika = () => {
    axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/etusivu.php/'+OppilasID).then(function(response){
      //console.log(response.data);
      //window.location.reload();
  });
}


  function handleImage(e) {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }
  function handleImage2(e) {
    console.log(e.target.files)
    setImage2(e.target.files[0])
  }

  function compareWeek(suunnit){
    
    console.log(suunnit.Viikko);
    console.log(weekNumber);
    if(suunnit.Viikko==weekNumber){
      if(weekday=== "Maanantai"){
        return suunnit.Maanantai;
      }
      else if(weekday=== "Tiistai"){
        return suunnit.Tiistai;
      }
      else if(weekday=== "Keskiviikko"){
        return suunnit.Keskiviikko;
      }
      else if(weekday=== "Torstai"){
        return suunnit.Torstai;
      }
      else if(weekday=== "Perjantai"){
        return suunnit.Perjantai;
      }
      else if(weekday=== "Lauantai"){
        return suunnit.Lauantai;
      }
      else if(weekday=== "Sunnuntai"){
        return suunnit.Sunnuntai;
      }
    }
    else{
      return 'Ei mitään.';
    }
  
  }

window.addEventListener("beforeunload", () => {
  laitaAika();
});

  
  const posti= localStorage.getItem('posti'); // Määritellään muuttuja posti johon asetetaan kirjautumisen yhteydessä saatu sähköpostiosoite /Kai Ronkainen
  return(
    <>
      {/*Tulostetaan sivun otsikko ja uloskirjautuminen */}
      <div className="container-fluid px-5">
  
       <div className="row py-3">
       <div className="col-sm-4"> <h3 className="logo text-start" >OSAO</h3></div>
        <div className="col-sm-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
        <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{posti}
              <button className="valinta5 btn btn-primary py-1 mb-1 fw-bold ms-5" type="submit" onClick={LogoutSubmit}>
                Kirjaudu ulos
              </button></h3>
          </div>     
      <div className="p-1 bg-dark w-100 rounded "></div>
      </div>
      </div>
       {/*Tulostetaan päivänmäärä, viikonnumero ja linkki etusivulle jos rooli ei ole oppilas/ Pauli*/}
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
                  {/*Tulostetaan oppilaan tämän hetkinen liikuntasuunnitelma /Pauli*/}
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
                    <br></br>
                    
                   {/*Tulostetaan mitä oppilaalla on tänään liikuntasuunnitelmassa /Pauli*/}
                    <div className="col-sm-6">
                    <table className="table text-center">
                        <thead className="bg-light">
                           <tr>
                
                            <th>Tänään liikuntasuunnitelmassasi on</th>
                            </tr> 
                        </thead>
                        <tbody >
                            {suunnitelma.map((suunnit, key) =>
                              <tr key={key} >
                                                
                                {compareWeek(suunnit)}
                              </tr>
                             
                            )}
                        </tbody>
                        
                
                    </table></div> 
                    {/*Jos rooli ei ole opettaja niin voidaan muuta liikuntasuunnitelmaa valikoilla /Veeti ja Pauli*/}
                    {role !== "opettaja" && (
                    <div className="col-sm-6">
                    <h4 className="mt-2 fw-bold">Muuta liikuntasuunnitelmaa:</h4> 
                    <div className="col-sm-6">
                     {/*Lisätään viikko joka on numero väliltä 1-52 (ei välttämä toimi niin kuin pitäisi)*/}
                    <table className="table text-center">
                      
                        <thead className="bg-light">
                 
                        <input type="number" name="viikko" 
                        id="viikko" value={viikko} onChange={(e) => setViikko(e.target.value)}
                        placeholder="Viikko nro"
                        title="Numero väliltä 1-52"   
                        inputProps={{ maxLength: 52}}                     
                        ></input>
                         {/*Valitaan haluttu laji maanantaipäivälle. Jos laji on muu laji, suoritetaan handleOtherChange-funktio, jonka avulla käyttäjä voi lisätä oman lajinsa /Pauli*/}
                            <select id="maanantai" name="maanantai" value={maanantai} onChange={handleSelectChange}>
                              
                  
                            <option value="" disabled selected hidden>Maanantai</option>
                                <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option>   
                            </select>
                            {selectedOption === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji maanantaille"
                                  type="text"
                                  value={otherValue}       
                                  onChange={handleOtherChange}
                                />
                              </div>
                            )}
                            <select id="tiistai" name="tiistai" value={tiistai} onChange={handleSelectChange2}>
                            <option value="" disabled selected hidden>Tiistai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption2 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji tiistaille"
                                  type="text"
                                  value={otherValue2}       
                                  onChange={handleOtherChange2}
                                />
                              </div>
                            )}
                            <select id="keskiviikko" name="keskiviikko" value={keskiviikko}  onChange={handleSelectChange3}>
                            <option value="" disabled selected hidden>Keskiviikko</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption3 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji keskiviikolle"
                                  type="text"
                                  value={otherValue3}       
                                  onChange={handleOtherChange3}
                                />
                              </div>
                            )}
                            <select id="torstai" name="torstai" value={torstai} onChange={handleSelectChange4}>
                            <option value="" disabled selected hidden>Torstai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption4 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji torstaille"
                                  type="text"
                                  value={otherValue4}       
                                  onChange={handleOtherChange4}
                                />
                              </div>
                            )}
                            <select id="perjantai" name="perjantai" value={perjantai} onChange={handleSelectChange5}>
                            <option value="" disabled selected hidden>Perjantai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption5 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji perjantaille"
                                  type="text"
                                  value={otherValue5}       
                                  onChange={handleOtherChange5}
                                />
                              </div>
                            )}
                            <select id="lauantai" name="lauantai" value={lauantai}  onChange={handleSelectChange6}>
                            <option value="" disabled selected hidden>Lauantai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption6 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji lauantaille"
                                  type="text"
                                  value={otherValue6}       
                                  onChange={handleOtherChange6}
                                />
                              </div>
                            )}
                            <select id="sunnuntai" name="sunnuntai" value={sunnuntai}  onChange={handleSelectChange7}>
                            <option value="" disabled selected hidden>Sunnuntai</option>
                            <option value="Kävely">Kävely</option>
                                <option value="Juoksu">Juoksu</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Hiihto">Hiihto</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Lepo">Lepo</option>
                                <option value="other">Muu laji,mikä?</option> 
                            </select>
                            {selectedOption7 === 'other' && (
                              <div> 
                                <input
                                  id="otherInput"
                                  placeholder="Muu laji sunnuntaille"
                                  type="text"
                                  value={otherValue7}       
                                  onChange={handleOtherChange7}
                                />
                              </div>
                            )}
                             {/*Suoritetaan muutaLiikuntaSuunnitelmaa-funktio, kun painetaan tätä nappia /Pauli*/}
                            <th><button className="valinta3 btn btn-success fw-bold py-1" onClick={muutaLiikuntasuunnitelmaa}>Muuta liikuntasuunnitelmaa</button></th>
                        </thead>
                        
                        
                    </table></div> 
                    </div>
                  )}
                     {/*Näytetään kaikki harjoitukset jotka oppilas on suorittanut /Kai ja Veeti */}
                    <h4 className="mt-5 fw-bold">Suoritukset:</h4>

                    <table className="table text-center">
                        <thead className="bg-light">
                           <tr>
                            <th>ID</th>
                            <th>Harjoitus</th>
                            <th>Päivämäärä</th>
                            <th>Matka km</th>
                            <th>Kulutus kaloreita</th>
                            <th>Nopeus km/h</th>
                            <th>Käytetty aika</th>
                            <th>Hyväksytty/hylätty</th>
                            {/* Näytä painike vain, jos rooli ei ole "oppilas" /Veeti */}
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
                         {/*Tulostetaan kaikki tietokannasta haetut tiedot ja se onko oppilas hyväksynyt tai hylännyt harjoituksen /Kai*/}
                        <tbody >
                            {harjoitus.map((opp, key) =>{
                              let vari = opp.Tila === 'Hyväksytty'? 'green': (opp.Tila === 'Hylätty' ? 'red': 'black');
                              return <tr key={key} >
                                <td style={{color: vari}}>{opp.ID}</td>
                                <td style={{color: vari}}>{opp.harjoitus}</td>
                                <td style={{color: vari}}>{opp.Pvm}</td>
                                <td style={{color: vari}}>{opp.Matka}</td>
                                <td style={{color: vari}}>{opp.Kulutus}</td>
                                <td style={{color: vari}}>{opp.Nopeus}</td>
                                <td style={{color: vari}}>{opp.Aika}</td>
                                <td style={{color: vari}}>{opp.Tila} </td>
                                 {/*Tästä linkistä voidaan mennä harjoitus-sivulle harjoituksen ID:N perusteella /Kai*/}
                                <td ><Link to={"/Harjoitus/"+opp.ID} className="valinta4  btn btn-danger fw-bold py-1">Näytä tiedot</Link></td> 
                           <td>
   {/*Tästä nappulasta voidaan poistaa harjoitus /Veeti*/}
  <button
    className="valinta2 btn btn-danger fw-bold py-1"
    onClick={() => poistaHarjoitus(opp.ID)}
  >
    Poista harjoitus
  </button>
</td>
                              </tr>
                            })}
                        </tbody>
                    </table> 
                   </div> 
                  </div>   
                </div>  
                 {/*Jos rooli ei ole opettaja voidaan lisätä uusi harjoitus tietokantaan /Pauli ja Veeti*/}
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                  
                {role !== "opettaja" && (
                  <div className="container">
      <h1>Lisää uusi harjoitus</h1>
      {viesti && <p>{viesti}</p>}
       {/*Lomake johon lisätään harjoituksen tiedot /Pauli ja Veeti*/}
      <form onSubmit={handleSubmit} enctype="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px' }}>
       {/*Lisätään harjoituksen nimi*/}
      <label>
          Harjoitus:
          <input
            type="text"
            name="harjoitus2"
            onChange={(e) => setHarjoitus2(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
                      
              {/*Lisätään kuva sijainnista*/}
        <label>
          Kuva sijainnista (.jpg):
          <input type="file" name="image" 

          onChange={handleImage}
            style={{ width: '100%' }}
          />
        </label>
         {/*Lisätään päivämäärä*/}
        <label>
        Päivämäärä (muodossa vuosi-kuukausi-päivä(esim. 2025-01-28)):
          <input
            type="text"
            name="paivamaara"
            onChange={(e) => setPaivamaara(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
         {/*Lisätään harjoituksee  käytetty aika*/}
        <label>
          Käytetty aika (tunnit:minuutit:sekunnit):
          <input
            type="text"
            step="1"
            name="kaytettyAika"
            onChange={(e) => setKaytettyAika(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
          {/*Lisätään harjoituksessa kuljettu matka*/}
        <label>
          Kuljettu matka (km):
          <input
            type="number"
            step="0.01"
            name="kuljettuMatka"
            onChange={(e) => setKuljettuMatka(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
          {/*Lisätään harjoituksessa kulutettu energia*/}
        <label>
          Kulutus (arvioitu kaloreina):
          <input
            type="number"
            step="1"
            name="kulutus"
            onChange={(e) => setKulutus(e.target.value)}
          
            style={{ width: '100%' }}
          />
        </label>
          {/*Lisätään harjoituksen nopeus jos kyseesssä on sellainen harjoitus jossa nopeutta voidaan mitata*/}
        <label>
          Nopeus km/h (matka(km)/käytetty aika(h)):
          <input
            type="number"
            step="0.01"
            name="nopeus"
            onChange={(e) => setNopeus(e.target.value)}
          
            style={{ width: '100%' }}
          />
        </label>
        {/*Lisätään kuva itsestä tekemässä harjoitusta*/}
        <label>
          Kuva harjoituksesta (.jpg):
          <input type="file" name="image2" 

onChange={handleImage2}
            style={{ width: '100%' }}
          />
        </label>
          {/*Mitä kunnon osa-aluetta harjoitetaan (esim. Kestävyyskunto)*/}
        <label>
          Kunnon osa-alue vastaus:
          <input
            type="text"
            name="kunnonVastaus"
            onChange={(e) => setKunnonVastaus(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
          {/*Miten harjoitus edistää työkykyä ja hyvinvointia*/}        
        <label>
          Työkyky ja hyvinvointi vastaus:
          <input
            type="text"
            name="tyokykyVastaus"
            onChange={(e) => setTyokykyVastaus(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
             {/*Lisätään linkki harjoitukseen (esim.SportTracker) jotta opettaja voi tarkastaa että oppilas on suorittanut harjoituksen*/}        
        <label>
          Linkki aktiviteettiin:
          <input
            type="url"
            name="linkki"
            onChange={(e) => setLinkki(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </label>
             {/*Tällä napilla suoritetaan lomake ja lähetetään tiedot tietokantaan*/}        
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