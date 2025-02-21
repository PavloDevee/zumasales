import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "@/providers/DataProvider";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const navigate = useNavigate();
  const { userRole } = useContext(DataProvider);
  const [cookies] = useCookies(['idToken', 'userRole']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idToken = cookies.idToken;
    if (!idToken) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(userRole)) {
      navigate('/404');
    } else {
      setIsLoading(false);
    }
  }, [cookies, navigate, userRole, allowedRoles]);

  if (isLoading) {
    return null;
  }

  return element; 
};

export default ProtectedRoute;
