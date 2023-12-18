import React from 'react'

const getAuthHeaders = () => {
  
   const storedData = JSON.parse(localStorage.getItem('myData'));
      const token = storedData?.token;
      if (!token) {
      console.error('Token is missing');
      return;
    }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      return headers
}

export default getAuthHeaders;