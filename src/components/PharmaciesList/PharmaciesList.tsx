import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClosestPharmacyButton from './ClosestPharmacyButton';

interface Pharmacy {
    name: string,
    pharmacyId: string
}

const PharmaciesList = () => {
    const [pharmacies, setPharmacies] = useState([]);

    const currentLatitude = 37.48771670017411;
    const currentLongitude = -122.22652739630438
    
    useEffect(() => {
      const fetchPharmacies = async () => {
        try {
          const response = await fetch('https://assets.nimblerx.com/interviews/pharmacies');
          const data = await response.json();
          setPharmacies(data.pharmacies);
        } catch (error) {
          console.error('Error fetching pharmacies:', error);
        }
      };
  
      fetchPharmacies();
    }, []);
    
    return (
        <div className="pharmacies-landing">
            <div className="active-pharmacies">
                <h1>Active Pharmacies</h1>
                {pharmacies.map((pharmacy: Pharmacy) => (
                    <Link key={pharmacy.pharmacyId} to={`/pharmacies/${pharmacy.pharmacyId}`}>
                        {pharmacy.name}
                    </Link>
                ))}
            </div>
            <div className="closet-pharmacy">
                <ClosestPharmacyButton latitude={currentLatitude} longitude={currentLongitude} />
            </div>

        </div>
    );
};

export default PharmaciesList;
