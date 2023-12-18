
const GetHeaders = () => {
  const storedData = JSON.parse(localStorage.getItem('myData'));
  const token = storedData?.token;

  if (!token) {
    console.error('Token is missing');
    // You might want to handle this case more gracefully, depending on your application requirements.
    return {};
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export default GetHeaders