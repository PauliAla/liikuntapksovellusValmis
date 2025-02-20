import React, {  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Etusivu (){

    const navigate = useNavigate(); // Lisätään navigointi 

    // Funktio uloskirjautumiseen /Kai
    function LogoutSubmit(){
    localStorage.setItem("kirjaudu", "");
    localStorage.setItem("loginStatus", "Olet kirjautunut ulos!")
    navigate("/Ulos");
    }

    const [oppilas, setOppilas] = useState([]); //Muuttuja jota käytetään oppilaslistan hakemiseen /Kai
    const[filterRecords, setFilterRecords]= useState([]); //Muuttuja jota käytetään oppilaslistan hakemiseen /Kai

    // Haetaan lista oppilaista heti sivun latauduttua /Kai
    useEffect((OppilasID) => {
        axios.get('http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/etusivu.php/'+OppilasID).then(function(response) {
            //console.log(response.data);
            setOppilas(response.data);
            setFilterRecords(response.data);
        });
    }, []);

    // Funktio jolla suodatetaan sukunimen perusteella /Kai
    const filterFunction=(event)=>{
        setFilterRecords(oppilas.filter(d=>d.Sukunimi.toLowerCase().includes(event.target.value)));
    }

    // Funktio oppilaan poistamiseen id:n perusteella /Kai
    const poistaOppilas = (OppilasID) => { 
        if (window.confirm("Haluatko varmasti poistaa käyttäjän ID: "+OppilasID+"?")) {
            axios.delete(`http://localhost/harjoituksia/liikuntapksovellus/liikuntapksovellus/php/etusivu.php/`+OppilasID).then(function(response){
            //console.log(response.data);
            alert(response.data.success);
            window.location.reload();
        }); 
        }else{
            window.location.reload();
        }
    }
    const posti= localStorage.getItem('posti'); // Määritellään muuttuja posti johon asetetaan kirjautumisen yhteydessä saatu sähköpostiosoite /Kai 

    return(
      <>
         {/*Tulostetaan sivun otsikko ja uloskirjautuminen */}
        <div className="container-fluid px-5">
        <div className="row py-3">
        <div className="col-lg-4"><h3 className="logo text-start" href="#">OSAO</h3></div>
        <div className="col-lg-4"><h3 className="navbar-text text-center p-4 align-middle ">Liikuntapäiväkirja</h3></div>
        <div className="col-lg-4 text-end"><h3 className="navbar-user py-4 align-middle ">{posti}
        <button className="valinta5 btn btn-primary py-1 mb-1 fw-bold ms-5" type="submit" onClick={LogoutSubmit}>Kirjaudu ulos</button></h3>
        </div>
        <div className="p-1 bg-dark w-100 rounded "></div>
        </div>
        </div>
         {/*Tulostetaan käyttäjäluettelo ja käyttäjän hakeminen sukunimen perusteella /Kai*/}
        <div className="container-fluid px-5 mt-4 ">
            <div className="row">
            <div className="col-sm-12">
            <h4 className="mt-2 fw-bold">Liikuntapäiväkirja käyttäjäluettelo</h4>
            </div>
            <form>
            <div className="col-sm-12 d-flex mt-4">
                <label className="haku1 form-label me-2">Hae käyttäjää sukunimen mukaan (haku vain pienillä kirjaimilla):</label>
                <input type="text" className="haku form-control focus-ring" placeholder="Hae käyttäjää..." onChange={filterFunction}/>  
            </div>
            </form>
            {/*Tulostetaan uuden käyttäjän lisääminen /Kai*/}
            <div className="d-flex justify-content-md-end mb-3">
                <Link to="/LisaaOpp" className="lisaa btn btn-primary py-1">+ Lisää Käyttäjä</Link>    
            </div>     
             {/*Tulostetaan suodattimen perusteella käyttäjien lista /Kai*/}
            <table className="table text-center">
                <thead className="bg-light">
                <tr>
                    <th className="ps-3">ID</th>
                    <th className="text-start ps-5">Etunimi</th>
                    <th className="text-start ps-5">Sukunimi</th>
                    <th className="text-start ps-5">Sähköposti</th>
                    <th>Kurssi aloitettu</th>
                    <th>Suoritukset (h)</th>
                    <th>Näytä tiedot</th>
                    <th>Poista käyttäjä</th>
                </tr> 
                </thead>
                    <tbody >
                    {filterRecords.map((opp, key) =>{
                    let vari = opp.Suoritukset >= 36 ? 'green':'black';
                    return <tr key={key} >
                        <td className="ps-3">{opp.OppilasID}</td>
                        <td className="text-start ps-5">{opp.Etunimi}</td>
                        <td className="text-start ps-5">{opp.Sukunimi}</td>
                        <td className="text-start ps-5">{opp.S_posti}</td>
                        <td> {opp.Pvm}</td>
                        <td style={{color: vari}}>{opp.Suoritukset}</td>
                        {/*Tulostetaan linkki oppilaan tietoihin /Kai*/}
                        <td ><Link to={"/Oppilas/"+opp.OppilasID+" " +opp.Etunimi+" " +opp.Sukunimi} className="valinta4 btn btn-primary py-1 mb-1 fw-bold ms-5">Näytä tiedot</Link></td>
                         {/*Tulostetaan button jolla voidaan poistaa oppilas /Kai*/}
                        <td><button className="valinta2 btn btn-danger fw-bold py-1" name="delete" id="delete" onClick={() => poistaOppilas(opp.OppilasID)}>Poista käyttäjä</button></td>
                        </tr>
                    })}
                    </tbody>
            </table>         
            </div>
            </div>
        </>
    )
}
export default Etusivu;
