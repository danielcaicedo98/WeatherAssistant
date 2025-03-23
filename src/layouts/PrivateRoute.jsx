import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
  const navigate = useNavigate();
  useEffect(() => {
  const isLogged = localStorage.getItem("is_logged") === "true";
  if (!isLogged) {
    // Si no está logueado, redirigir al login
    navigate("/auth/sign-in");
    
  }
}
, []);


  return children;
};

export default PrivateRoute;
