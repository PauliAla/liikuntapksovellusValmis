// Veeti
// Määritellään sovelluksessa käytettävät roolit
export const getUserRole = () => {
    return localStorage.getItem('role');
  };
  
  export const isTeacher = () => {
    return getUserRole() === 'opettaja';
  };
  
  export const isStudent = () => {
    return getUserRole() === 'oppilas';
  };
  