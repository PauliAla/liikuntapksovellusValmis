import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";




function Harjoitus() {
     
    const {ID}=   useParams(); // Haetaan harjoituksen ID localStoragesta

    // Muuttujien määrittelyä joita käytetään harjoituksen tietojen hakemiseen /Pauli
    const [suoritus, setSuoritus] = useState([]);
    const [kuva, setKuva] = useState([]);
    const [kuva2, setKuva2] = useState([]);
    // Muuttuja jota käytetään harjoitukseen käytetyn ajan muuttamiseen
    const [aika, setAika] = useState([]);
    // Muuttuja jota käytetään opettajan harjoituksen arvioinnin lisäämiseen tietokantaan
    const [arviointi, setArviointi] = useState([]);
    const [role, setRole] = useState(""); // Muuttuja jota käytetään käyttäjän roolin hakemiseen
    const navigate = useNavigate();  
    const id = localStorage.getItem("id"); // haetaan id localStoragesta 


    // Haetaan käyttäjän rooli localStoragesta /Veeti
    useEffect(() => {
      const userRole = localStorage.getItem("role");
      setRole(userRole);
      
    }, []);


     useEffect(() => {
  
          window.addEventListener('beforeunload', alertUser)
          return () => {
            window.removeEventListener('beforeunload', alertUser)
          }
        }, [])
    
        const alertUser = e => {
          e.preventDefault()
          e.returnValue = ''
        }

    // Funktio jolla kirjaudutaan ulos /Kai
    function LogoutSubmit(){
        localStorage.setItem("kirjaudu", "");
        localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
        navigate("/Ulos");
    }
    
    // Heti sivun ladtauduttua haetaan kaikki harjoituksen tiedot /KAi
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harjoitus.php/'+ID).then(function(response) {
          //console.log(response.data);
          setSuoritus(response.data);
      });
    }, [ID]); 
    // Heti sivun ladtauduttua haetaan sijaintikuva /Kai
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kuva.php/'+ID,).then(function(response) {
          //console.log(response.data);
          setKuva(response.data);
      });
    }, [ID]); 
    // Heti sivun ladtauduttua haetaan kuva suorituksesta /Kai
    useEffect(() => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/kuva2.php/'+ID,).then(function(response) {
          //console.log(response.data);
          setKuva2(response.data);
      });
    }, [ID]); 
    // Funktio jolla opettaja voi hylätä suorituksen /Kai
    function hylkaaSuoritus(){
        axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harjoitus.php/'+ID).then(function(response){
          //console.log(response.data);
          window.location.reload();
      });
    }
     // Funktio jolla opettaja voi hyväksyä suorituksen /Kai
    function acceptHarjoitus(){
        axios.put('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php//harkka.php/'+ID).then(function(response){
          //console.log(response.data);
          window.location.reload();
      });
    }
     // Funktio jolla oppilas voi muuttaa harjoitukseen muuttaa aikaa /Kai
    function muutaAika(){
        const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/harkka.php/'+ID;
        let fData = new FormData();
        fData.append('aika', aika);
        alert("Tietokanta on päivitetty");
        axios.post(url, fData).then((response)=> {
          console.log(response.data);
          window.location.reload();
      });
    }
     // Funktio jolla opettaja voi lisätä sanallisen arvion harjoituksesta /Pauli
    function Arviointi(){
        const url = 'http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/arviointi.php/'+ID;
        let fData2 = new FormData();
        fData2.append('arviointi', arviointi);
        alert("Tietokanta on päivitetty");
        axios.post(url, fData2).then((response)=> {
          console.log(response.data);
          window.location.reload();
      });
    }

    // Funktio joka vertaa tietokannassa harjoitus-taulussa olevaa oppilasID:tä kirjautumisessa saatuun OppilasId:hen. Suoritetaan vain jos rooli on muu kuin opettaja /Pauli
    function compareID(opp){
    
      console.log(opp.OppilasID);
      console.log(id);
      const userRole = localStorage.getItem("role");
      if (userRole!=="opettaja") {
      if(opp.OppilasID==id){
      
          return opp.OppilasID;
      }
      else{
        alert ('Sinulla ei ole valtuuksia tarkastella tätä sivua. Ohjataan sinut takaisin pääsivulle.');
        navigate(`/Oppilas/${id}`);
      }
      
      }
      return opp.OppilasID;
    }


    const posti= localStorage.getItem('posti'); // Määritellään muuttuja posti johon asetetaan kirjautumisen yhteydessä saatu sähköpostiosoite /Kai Ronkainen
    return(
   
        
        <>
        {/*Tulostetaan sivun otsikko ja uloskirjautuminen */}
        <div className="container-fluid px-5">

           <div className="row py-3">
           <div className="col-lg-4"><h3 className="logo text-start" href="#">OSAO</h3></div>
            <div className="col-lg-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
            <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{posti}
                <button className="valinta5 btn btn-primary py-1 mb-1 fw-bold ms-5" type="submit" onClick={LogoutSubmit}>
                  Kirjaudu ulos
                </button></h3>
            </div>

          <div className="p-1 bg-dark w-100 rounded "></div>
          </div>
          </div>
          {/*Takaisin - painike jolla pääsee takaisin oppilas -sivulle */}
          <div className="container-fluid px-5 mt-5 ">
              <div className="row">
                <div className="col-sm-12">
                  <div className="d-flex justify-content-md-end mb-3">
                  <button onClick={() => navigate(-1)} className="lisaa btn btn-primary py-1">Takaisin</button>    
                  </div> 
                  {/*Tulostetaan ensimmäinen rivi tietoja tietokannasta /Kaikki*/}
                  <table className="table text-center mt-5">
                            <thead className="bg-light">
                               <tr>
                                <th>ID</th>
                                <th>Harjoitus</th>
                                <th>Päivämäärä</th>
                                <th>Käytetty aika</th>
                                <th>Kuljettu matka (km)</th>
                                
                                <th>Keskinopeus (km/h)</th>
                                <th>Kulutus (kcal)</th>
                                <th>OppilasID</th> 
                                </tr> 
                            </thead>
                            <tbody >
                                {suoritus.map((opp, key) =>
                                    <tr key={key} >
                                    <td >{opp.ID}</td>
                                    <td >{opp.harjoitus}</td>
                                    <td >{opp.Pvm}</td>
                                    <td >{opp.Aika}</td>
                                    <td >{opp.Matka}</td>
                                    <td >{opp.Nopeus}</td>
                                    <td >{opp.Kulutus}</td>
                                    {compareID(opp)}
                                </tr>
                                )}
                            </tbody>
                        </table>  
                         {/*Tulostetaan kuvat tietokannasta /Kaikki*/}
                        <table className="table text-center mt-5">
                            <thead className="bg-light">
                               <tr>
                                <th className="text-start">Kuva sijainnista</th>
                                <th className="text-start">Kuva suorituksesta</th>
                                </tr> 
                            </thead>
                            <tbody>
                                    <tr>
                                    <td className="text-start" ><img className="kuva" src={`data:image/jpeg;charset=utf-8;base64,${kuva}`} alt="Sijainti kuva"/></td>
                                    <td className="text-start"><img className="kuva" src={`data:image/jpeg;charset=utf-8;base64,${kuva2}`} alt="Oma kuva"/></td>  
                                </tr>
                            </tbody>
                        </table> 
                           {/*Tulostetaan viimeinen rivi tietoja tietokannasta /Kaikki*/}
                        <table className="table mt-5">
                            <thead className="bg-light">
                               <tr>
                                <th className="text-start">Kunnon osa-alue vastaus:</th>
                                <th className="text-start">Työkyky ja hyvinvointi vastaus:</th>
                                <th className="text-start">Linkki aktiviteettiin:</th>
                                <th className="text-center">Hyväksytty/hylätty:</th>
                                <th className="text-center">Arviointi:</th>
                                </tr> 
                            </thead>
                      
                            <tbody>
        {suoritus.map((opp, key) =>{
        let vari = opp.Tila === 'Hyväksytty' ? 'green' : (opp.Tila === 'Hylätty' ? 'red' : 'black');
            return (
                <tr key={key}>
                    <td className="text-start">{opp.Vastaus1}</td>
                    <td className="text-start">{opp.Vastaus2}</td>
                    <td className="text-start">
                        <a rel="noreferrer" href={opp.Linkki} target="_blank">{opp.Linkki}</a>
                    </td>
                    <td style={{ color: vari }} className="text-center">{opp.Tila}</td>
                    <td className="text-center">{opp.Arviointi ? opp.Arviointi : "Ei arvioitu"}</td>
                </tr>
            );
        })}
    </tbody>
                        </table> 
                  </div>  
              </div> 
              
              
               {/*Jos rooli ei ole oppilas voi hyväksyä tai hylätä suorituksen /Kai ja Veeti*/}          
              {role !== "oppilas" && (     
    <div className="d-flex justify-content-md-end mb-3">
        <button className="valinta3 btn btn-success fw-bold py-1 me-3 mt-2" onClick={acceptHarjoitus}>Hyväksy suoritus</button>
        <button className="valinta2 btn btn-danger fw-bold py-1 mt-2" onClick={hylkaaSuoritus}>Hylkää suoritus</button> 
    </div>
        )}

          {/*Jos rooli ei ole oppilas voit kirjoittaa arvioinnin harjoituksessa /Pauli ja Veeti*/}  
        {role !== "oppilas" && (
    <form className="mb-5">
    
    <div class="form-group">
    
                <label>Arviointi:</label>
                <br></br>
                <textarea name="arviointi" onChange={(e) => setArviointi(e.target.value)} class="form-control"></textarea>
              </div>
          
              <div className="col-auto">
                <input type="button" className="lisaa btn btn-primary" name="submit" id="submit" value="Tallenna" onClick={Arviointi} />
            </div>
            
                </form>
            )}
          {/*Jos rooli ei ole opettaja  voit muuttaa harjoitukseen käytettyä aikaa /Kai*/}  
          {role !== "opettaja" && (  
    <form className="mb-5">
        <label className="mb-3">Voit tarvittaessa muuttaa harjoitukseen käytettyä aikaa, syöttämällä uuden ajan muodossa 01:30:00 (tunnit:minuutit:sekunnit):</label> 
            <div className="row">
                <div className="col-auto">
                <label className="form-label me-1" htmlFor="ID">ID:</label>
                <input type="text" readOnly={true} className="form-control  focus-ring text-center" name="ID" id="ID" placeholder="ID-numero" value={ID}/>  
            </div>
            <div className="col-auto">
                <label className="form-label me-1" htmlFor="aika">Uusi aika:</label>
                <input type="text" className="form-control focus-ring text-center" name="aika" id="aika" placeholder="00:00:00" value={aika} onChange={(e) => setAika(e.target.value)} />     
            </div>
            <div className="col-auto">
                <input type="button" className="lisaa btn btn-primary" name="submit" id="submit" value="Tallenna" onClick={muutaAika} />
            </div>
            </div>
    </form>  
     )} 
   
    </div>
    </>

    )}
    export default Harjoitus;