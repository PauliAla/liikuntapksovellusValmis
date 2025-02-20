import axios from "axios"
import { useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from "react";

function Oppilas2() {
    const navigate = useNavigate();
    function LogoutSubmit(){
        localStorage.setItem("kirjaudu", "");
        localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
        navigate("/Ulos");
      }

  const {OppilasID}=   useParams();
  const [suunnitelma, setSuunnitelma] = useState([]);
  useEffect(() => {
    axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/suunnitelma.php/'+OppilasID).then(function(response) {
      //console.log(response.data);
      setSuunnitelma(response.data);
    });
  }, [OppilasID]);  

  const [harjoitus, setHarjoitus] = useState([]);

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
                    <h4 className="mt-2 fw-bold">Harjoitustiedot: {OppilasID}</h4>  
                    <div className="d-grid d-md-flex justify-content-md-end mb-3">
                    <Link to="/Etusivu" className="lisaa btn btn-primary py-1">Etusivulle</Link></div>
                    <h4 className="mt-2 fw-bold">Liikuntasuunnitelma:</h4> 
                    <div className="col-sm-6">
                    <table className="table text-center">
                        <thead className="bg-light">
                           <tr>
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
                            <th><button className="valinta3 btn btn-success fw-bold py-1" onClick={acceptKaikki}>Hyväksy kaikki</button></th>
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
                        
    </>  
      )
    }
export default Oppilas2;