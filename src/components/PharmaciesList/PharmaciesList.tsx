import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClosestPharmacyButton from './ClosestPharmacyButton';
import './PharmaciesList.scss';
import { Pharmacy } from '../../types/Pharmarcy';

const PharmaciesList = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  const currentLatitude = 37.48771670017411;
  const currentLongitude = -122.22652739630438;

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('https://assets.nimblerx.com/interviews/pharmacies');
        const data = await response.json();
        const updatedPharmacies = data.pharmacies.map((pharmacy: Pharmacy) => ({
          ...pharmacy,
          //grab the orderedPharmacyId from local storage and set ordered to true if it matches 
          ordered: pharmacy.pharmacyId === localStorage.getItem('orderedPharmacyId'),
        }));

        setPharmacies(updatedPharmacies);
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
        <div className='pharmacy-list'>
          {pharmacies.map((pharmacy: Pharmacy) => {
            return (
              <Link key={pharmacy.pharmacyId} to={`/pharmacies/${pharmacy.pharmacyId}`} state={{ orderedPharmacyId: pharmacy.pharmacyId }}>
                {pharmacy.name}
                 {/* Display a checkmark if the pharmacy is ordered from */}
                {pharmacy.ordered && <span>&#10003;</span>} 
              </Link>
            );
          })}
        </div>
      </div>
      <div className="closet-pharmacy">
        <ClosestPharmacyButton latitude={currentLatitude} longitude={currentLongitude} pharmacies={pharmacies} />
      </div>
    </div>
  );
};

export default PharmaciesList;
