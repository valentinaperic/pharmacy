import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Pharmacy {
    name: string,
    pharmacyId: string
}

const PharmaciesList = () => {
    const [pharmacies, setPharmacies] = useState([]);
    
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
                <button></button>
            </div>

        </div>
    );
};

export default PharmaciesList;
