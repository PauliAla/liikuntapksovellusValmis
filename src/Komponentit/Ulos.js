import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Uloskirjautuminen() {
    const navigate = useNavigate();
    useEffect (() => {
    setTimeout(function(){
        navigate("/");//ohjataan kirjautumissivulle
        }, 2500);
    }, [navigate]); 
  return (
    <div className="vh-100 gradient-custom">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h3 className="otsikko text-center mb-2">OSAO</h3>
                <h3 className="kirjaudu text-center mb-4">Liikuntapäiväkirja</h3>             
                <h5 className="errorLabel2 text-center mt-4 mb-5">Kirjaudutaan ulos liikuntapäiväkirjasta...</h5> 
            </div>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Uloskirjautuminen;