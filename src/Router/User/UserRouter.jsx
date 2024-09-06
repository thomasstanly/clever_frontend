import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserAuth from '../../Utils/Auth';
import Loader from '../../Component/Loader/Loader';


function UserRouter({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await UserAuth();
      setIsAuthenticated(authInfo.isAuthenticated);
      setTimeout(() => {

        setLoading(false)

      }, 2000);
    };

    fetchData();
  }, []);

  if (isLoading) {

    return <Loader/>
  }

  if (!isAuthenticated) {

    return <Navigate to="/login" />;
  }

  return children;
}

export default UserRouter;