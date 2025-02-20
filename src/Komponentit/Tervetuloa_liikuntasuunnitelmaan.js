import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Tervetuloa_oppilas() {
    const navigate = useNavigate();

    useEffect(() => {
        // Haetaan käyttäjän ID localStoragesta
        const id = localStorage.getItem("id");

        if (id) {
            // Navigointi 2.5 sekunnin viiveellä
            setTimeout(() => {
                navigate(`/Luo_liikuntasuunnitelma/${id}`);
            }, 2500);
        } else {
            console.error("Käyttäjän ID puuttuu. Ohjataan kirjautumissivulle.");
            navigate("/");
        }
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
                                    <h5 className="messageLabel2 text-center mt-4 mb-5">
                                        Kirjaudutaan sisään liikuntasuunnitelmaan...
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tervetuloa_oppilas;