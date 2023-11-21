import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const key = import.meta.env.VITE_adminKey;
  const navigate = useNavigate();

  const checkAuthorization = () => {
    const myDataString = localStorage.getItem('myData');
    if (myDataString) {
      const myData = JSON.parse(myDataString);
      if (myData.username !== key) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    checkAuthorization();
    const intervalId = setInterval(checkAuthorization, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  return null; 
};

export default Authorization;
