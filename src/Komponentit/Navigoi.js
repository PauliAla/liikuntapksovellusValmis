// Kai Ronkainen

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Navigoi() {
    const navigate = useNavigate();

    useEffect(() => {
        // Haetaan käyttäjän ID localStoragesta
        const id = localStorage.getItem("id");

        if (id) {
            // Navigointi 2.5 sekunnin viiveellä
            setTimeout(() => {
                navigate(`/Lisaaharjoitus/${id}`);
            });
        } else {
            console.error("Käyttäjän ID puuttuu. Ohjataan kirjautumissivulle.");
            navigate("/");
        }
    }, [navigate]);

}

export default Navigoi;