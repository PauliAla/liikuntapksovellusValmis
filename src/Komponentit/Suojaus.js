import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 // Kai Ronakaisen koodia
export default function Protected(props) {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        let login = localStorage.getItem("kirjaudu");
        if(!login){
            localStorage.setItem("loginStatus", "Työpöydälle vaaditaan kirjautuminen!");
            navigate("/", {replace: true});
        }
    }, [navigate]);
 
    return(
        <Component />
    );
}