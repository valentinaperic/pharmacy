import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pharmacyData } from '../../types/Pharmarcy';
import './PharmacyDetails.scss';

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
      const medications = localStorage.getItem('confirmedMedications');
      if (medications) {
        setMedications(JSON.parse(medications));
        console.log(medications);
      }
    }
  }, []);

  /**
   * format pharmarcy hours string
   * @param hours 
   * @returns an array that maps over each hour and puts it into a <p> tag
   */
  const formatPharmacyHours = (hours: string) => {

    //take each hour and put it into an array
    const hoursArray = hours.split('\\n');

    return (
      <div>
        {hoursArray.map((hour, index) => (
          <p key={index}>{hour}</p>
        ))}
      </div>
    );
  };

  /**
   * format phone number
   * @param phoneNumber 
   * @returns phone number string in readable format
   */
  const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = phoneNumber.slice(0, 2); 
    const areaCode = phoneNumber.slice(2, 5); 
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8);

    return `${countryCode} ${areaCode}-${firstPart}-${secondPart}`;
  };

  if (!pharmacyData) {
    return <div>Loading pharmacy details...</div>;
  }

  return (
    <div className='pharmacy-details'>
        <h1>{pharmacyData.name}</h1>
        <p><strong>Address:</strong> {pharmacyData.address.streetAddress1}</p>
        <p><strong>Phone number:</strong> <a className="phone-number" href={`tel:${formatPhoneNumber(pharmacyData.primaryPhoneNumber)}`}>{formatPhoneNumber(pharmacyData.primaryPhoneNumber)}</a></p>
        {pharmacyData.pharmacyHours && (
          <div>
            <strong>Hours:</strong>
            {formatPharmacyHours(pharmacyData.pharmacyHours)}
          </div>
        )}
        <strong>Medications Ordered:</strong>
        {medications && medications.length > 0 ? (
          <div>
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
