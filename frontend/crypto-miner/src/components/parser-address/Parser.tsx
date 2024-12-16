import React, { useState, useEffect } from 'react';
import "../../static/styles/Parser.scss";
type Props = { coin: string };

interface ApiResponse {
  data: string[];
}

export default function Parser({ coin }: Props) {
  const [addresses, setAddresses] = useState<string[]>([]); 
  const [currentAddresses, setCurrentAddresses] = useState<string[]>([]); 
  const [currentIndex, setCurrentIndex] = useState<number>(0); 

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/get-${coin}-addresses/`)
      .then(response => response.json())
      .then((data: ApiResponse) => {
        setAddresses(data.data); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [coin]);

  useEffect(() => {
    if (addresses.length > 0) {
      setCurrentAddresses(addresses.slice(0, 7));
    }
  }, [addresses]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentAddresses.length > 0) {
      interval = setInterval(() => {
        setCurrentAddresses(prevAddresses => {
          const updatedAddresses = [...prevAddresses];
          const nextIndex = (currentIndex + 7) % addresses.length;
          updatedAddresses[currentIndex % 7] = addresses[nextIndex]; 
          return updatedAddresses;
        });
        setCurrentIndex(prevIndex => (prevIndex + 1) % addresses.length); 
      }, 10);
    }

    return () => clearInterval(interval); 
  }, [currentAddresses, addresses, currentIndex]);

  return (
    <div>
      <div className='con mt-3'>
        <h3>Found {coin} 0.05 ≈ $5143.77</h3>
        {currentAddresses.map((address, index) => (
          <p key={index}>{address}</p>
        ))}
      </div>
    </div>
  );
}
