import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "@/providers/DataProvider";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const navigate = useNavigate();
  const { userRole } = useContext(DataProvider);
  const [cookies] = useCookies(['idToken', 'userRole']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idToken = cookies.idToken;
    if (!idToken) {
      navigate('/login');
    } else if (requiredRole && userRole !== requiredRole) {
      navigate('/inspections');
    } else {
      setIsLoading(false);
    }
  }, [cookies, navigate, userRole, requiredRole]);

  if (isLoading) {
    return null;
  }

  return element; 
};

export default ProtectedRoute;
