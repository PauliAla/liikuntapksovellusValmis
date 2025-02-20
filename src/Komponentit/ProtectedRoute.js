// Veeti

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from './auth'; // Käytetään auth.js:n funktioita

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole(); // Hakee käyttäjän roolin localStoragesta

  // Jos käyttäjän rooli ei ole sallittujen joukossa, ohjataan toiseen reittiin
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Näytä lapset, jos käyttäjän rooli on sallittu
  return children;
};

export default ProtectedRoute;
