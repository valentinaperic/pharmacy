import React, { useEffect, useState } from 'react';
import { pharmacyData } from './../../types/Pharmarcy';


interface ClosestPharmacyButtonProps {
  latitude: number;
  longitude: number;
}

const ClosestPharmacyButton: React.FC<ClosestPharmacyButtonProps> = ({ latitude, longitude }) => {
  const [closestPharmacy, setClosestPharmacy] = useState<pharmacyData | null>(null);

  useEffect(() => {
    const fetchClosestPharmacy = async () => {
      try {
        const response = await fetch('https://assets.nimblerx.com/interviews/pharmacies');
        const data = await response.json();
        const pharmacies = data.pharmacies;
    
        let closestDistance = Infinity;
        let closestPharmacy: PharmacyDetails | null = null;
    
        for (const pharmacy of pharmacies) {
          const pharmacyDetailsResponse = await fetch(`https://assets.nimblerx.com/interviews/pharmacy/${pharmacy.pharmacyId}`);
          const pharmacyDetails = await pharmacyDetailsResponse.json();
    
          const distance = getDistance(latitude, longitude, pharmacy.latitude, pharmacy.longitude);
    
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

  const handleButtonClick = () => {
    if (closestPharmacy) {
      //direct to ordering screen with the id of the closest pharmacy
    }
  };

  return (
    <button onClick={handleButtonClick} disabled={!closestPharmacy}>
      Go to Closest Pharmacy
    </button>
  );
};

export default ClosestPharmacyButton;
