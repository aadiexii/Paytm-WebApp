import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        navigate("/dashboard", { replace: true });
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/signin", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>Loading...</div>;
}

export default Main;
