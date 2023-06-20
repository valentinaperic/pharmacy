import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pharmacyData } from '../../types/Pharmarcy';

const PharmacyDetails: React.FC = () => {
  const [pharmacyData, setPharmacyData] = useState<pharmacyData>();
  const [medications, setMedications] = useState<[]>([]);

  const params = useParams();

  useEffect(() => {
    const fetchPharmacyData = async () => {
      try {
        const response = await fetch(`https://assets.nimblerx.com/interviews/pharmacy/${params.id}`);
        const data = await response.json();
        setPharmacyData(data);
      } catch (error) {
        console.error('Error fetching pharmacy data:', error);
      }
    };

    fetchPharmacyData();

    //check if there are ordered medications with the pharmarcy
    if (params.id === localStorage.getItem('orderedPharmacyId')) {
      const medications = localStorage.getItem('medications');
      if (medications) {
        setMedications(JSON.parse(medications));
      }
    }
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

        {medications && medications.length > 0 ? (
          <div>
            <h3>Confirmed Medications:</h3>
            <ul>
              {medications.map((medication) => (
                <li key={medication}>{medication}</li>
              ))}
            </ul>
          </div>
          ) : (
            <div>
              <p>No confirmed medications.</p>
            </div>
          )}
      </div>
  );
};

export default PharmacyDetails;
