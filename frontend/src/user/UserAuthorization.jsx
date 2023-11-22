import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAuthorization = () => {
    const navigate = useNavigate();

    const checkAuthorization = () => {
        const myDataString = localStorage.getItem('myData');
        if (!myDataString) {
        navigate('/');
        return;
        } 
    };

    useEffect(() => {
        checkAuthorization();
        const intervalId = setInterval(checkAuthorization, 5000); 
        return () => clearInterval(intervalId);
    }, []);

    return null; 
    };
export default UserAuthorization;