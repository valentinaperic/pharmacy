import React, { useEffect, useState } from 'react';
import { pharmacyData, Pharmacy } from '../../types/Pharmarcy';
import { useNavigate } from 'react-router-dom';


interface ClosestPharmacyButtonProps {
  latitude: number;
  longitude: number;
  pharmacies: Pharmacy[];
}

const ClosestPharmacyButton: React.FC<ClosestPharmacyButtonProps> = ({ latitude, longitude }) => {
  const [closestPharmacy, setClosestPharmacy] = useState<pharmacyData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClosestPharmacy = async () => {
      try {
        const response = await fetch('https://assets.nimblerx.com/interviews/pharmacies');
        const data = await response.json();
        const pharmacies = data.pharmacies;
    
        let closestDistance = Infinity;
        let closestPharmacy: pharmacyData | null = null;
    
        //iterate over each pharmacy to calculate it's distance from the current distance
        for (const pharmacy of pharmacies) {
          const pharmacyDetailsResponse = await fetch(`https://assets.nimblerx.com/interviews/pharmacy/${pharmacy.pharmacyId}`);
          const pharmacyDetails = await pharmacyDetailsResponse.json();
          const distance = getDistance(latitude, longitude, pharmacyDetails.address.latitude, pharmacyDetails.address.longitude);

          //update the closest pharmacy if the calculated distance is smaller
          if (distance < closestDistance) {
            closestDistance = distance;
            closestPharmacy = pharmacyDetails;
          }
        }
    
        setClosestPharmacy(closestPharmacy);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchClosestPharmacy();
  }, [latitude, longitude]);

  const getDistance = (currentLatitude: number, currentLongitude: number, pharmacyLatitude: number , pharmacyLongitude: number) => {
    //Haversine Formulata

    //in kilometers
    const earthRadius = 6371; 

    //convert lat and long to radians which is a unit of measurement for angles 
    const currentLatitudeRadians = toRadians(currentLatitude);
    const currentLongitudeRadians = toRadians(currentLongitude);
    const pharmacyLatitudeRadians = toRadians(pharmacyLatitude);
    const pharmacyLongitudeRadians = toRadians(pharmacyLongitude);

    //calculate the difference between the pharmacy coordinates and the current location
    const latitudeDifference = pharmacyLatitudeRadians - currentLatitudeRadians;
    const longitudeDifference = pharmacyLongitudeRadians - currentLongitudeRadians;

    //Haversine Formula: calculates the distance between two points on the surface of a sphere. cool! 
    const haversineLatitude = Math.sin(latitudeDifference / 2) ** 2;
    const haversineLongitude = Math.sin(longitudeDifference / 2) ** 2;

    const x = haversineLatitude + Math.cos(currentLatitudeRadians) * Math.cos(pharmacyLatitudeRadians) * haversineLongitude;

    //calculate the central angle
    const centralAngle = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

    //calculate the distance
    const distance = earthRadius * centralAngle; 
    
    return distance;
  }
  
  //helper function to convert lat/long to radians
  const toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  const handleButtonClick = () => {
    if (closestPharmacy && closestPharmacy.id) {
      navigate(`/pharmacy/order/${closestPharmacy.id}`, { state: { orderedPharmacyId: closestPharmacy.id, orderedPharmarcyName: closestPharmacy.name } });
    }
  };

  return (
    <button onClick={handleButtonClick} disabled={!closestPharmacy}>
      Go to Closest Pharmacy
    </button>
  );
};

export default ClosestPharmacyButton;
