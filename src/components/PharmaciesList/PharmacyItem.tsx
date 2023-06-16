import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pharmacyData } from '../../types/Pharmarcy';

const PharmacyDetails: React.FC = () => {
  const [pharmacyData, setPharmacyData] = useState<pharmacyData>();

  const params = useParams();

  useEffect(() => {
    const fetchPharmacyData = async () => {
      try {
        const response = await fetch(`https://assets.nimblerx.com/interviews/pharmacy/${params.id}`);
        const data = await response.json();
        console.log(data);
        setPharmacyData(data);
      } catch (error) {
        console.error('Error fetching pharmacy data:', error);
      }
    };

    fetchPharmacyData();
  }, []);


  if (!pharmacyData) {
    return <div>Loading pharmacy details...</div>;
  }

  return (
    <div>
        <h1>pharmacy name: {pharmacyData.name}</h1>
        <p>address: {pharmacyData.address.streetAddress1}</p>
        <p>phone number: {pharmacyData.primaryPhoneNumber}</p>
        <p>hours: {pharmacyData.pharmacyHours}</p>
    </div>
  );
};

export default PharmacyDetails;
