import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const res = await axios.get('http://localhost:50000/api/auth/protected', {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
        setData(res.data.msg);
      } catch (err) {
        setData('Access Denied');
      }
    };

    fetchProtected();
  }, []);

  return <h2>{data}</h2>;
};

export default Protected;
