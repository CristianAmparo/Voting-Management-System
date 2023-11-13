import React from 'react'

const Logout = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(JSON.parse(localStorage.getItem('myData')));

    useEffect(() => {
        if (!data || !data.name) {
        navigate("/login");
        }
    }, [data, navigate]);

    const handleLogout = () => {
        // Remove the item from local storage
        localStorage.removeItem('myData');
        // Update the state
        setData(null);
        navigate("/login");
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
    }

export default Logout