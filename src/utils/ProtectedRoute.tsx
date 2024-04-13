// ProtectedRoute.tsx
import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {

  Component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({Component}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        const authToken = () => sessionStorage.getItem("token");
if(!authToken){
    navigate("/")
}
        
    })
  return (
    <Component></Component>
  );
};

export default ProtectedRoute;
