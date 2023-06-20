import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MedicationOrder.scss'; 
import { Medication } from '../../types/Pharmarcy'

const MedicationSelection: React.FC = () => {
  const location = useLocation();

  //medications
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const medicationsPerPage = 25; //only list these many medications per page 

  const indexOfLastMedication = currentPage * medicationsPerPage; //get index of the last medication on current page 
  const indexOfFirstMedication = indexOfLastMedication - medicationsPerPage; //get index of first medication on current page 

  const currentMedications = medications.slice(indexOfFirstMedication, indexOfLastMedication); //extract subset of medications to display
  const totalPages = Math.ceil(medications.length / medicationsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('https://assets.nimblerx.com/interviews/medications');
        const data = await response.json();
        setMedications(
          data.pharmacies.map((medicationName: string, index: number) => ({
            id: index.toString(),
            name: medicationName,
          }))
        );
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  /**
   * when the medication is selected or deselected, 
   * it gets added or removed from the array for selectedMedications
   * @param medicationName 
   */
  const handleMedicationSelection = (medicationName: string) => {
    setSelectedMedications((prevSelectedMedications) => {
      if (prevSelectedMedications.includes(medicationName)) {
        //remove the medication
        return prevSelectedMedications.filter((name) => name !== medicationName);
      } else {
        //add the medication 
        return [...prevSelectedMedications, medicationName];
      }
    });
  };

  /**
   * confirm the order and set local storage with selected medications
   */
  const handleOrderConfirmation = () => {
    const confirmationMessage =
      'Are you sure you want to confirm with the following medications?\n\n' +
      selectedMedications
        .map((medicationName) => {
          const medication = medications.find((med) => med.name === medicationName);
          return medication ? `- ${medication.name}` : '';
        })
        .join('\n');

    if (window.confirm(confirmationMessage)) {
      //update local storage with confirmed medications and pharmarcyId
      localStorage.setItem('confirmedMedications', JSON.stringify(selectedMedications));
      localStorage.setItem('orderedPharmacyId', location.state.orderedPharmacyId);

      //reset selected medications
      setSelectedMedications([]);

      //return back to pharmacy screen
      window.location.href = '/pharmacies';
    }
  };

  return (
    <div className='medication-order'>
      <h2>Medication Selection</h2>
      <div className='medication-container'>
        <div className='medication-selections'>
            {currentMedications.map((medication) => (
                <div key={medication.id}>
                <input
                    type="checkbox"
                    checked={selectedMedications.includes(medication.name)}
                    onChange={() => handleMedicationSelection(medication.name)}
                />
                <label>{medication.name}</label>
                </div>
            ))}
        </div>
        <div className='selected-medications'>
            <h3>Selected Medications:</h3>
            <ul>
            {selectedMedications.map((medicationName) => {
                const medication = medications.find((med) => med.name === medicationName);
                return <li key={medicationName}>{medication?.name}</li>;
            })}
            </ul>
        </div>
      </div>
      <div className='medication-buttons'>
        <div className="pagination">
            {currentPage !== 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
            )}
            <span className="current-page">{currentPage}</span>
            {currentPage !== totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
        </div>

        <button onClick={handleOrderConfirmation} disabled={selectedMedications.length === 0}>
            Confirm Order
        </button>
      </div>
    </div>
  );
};

export default MedicationSelection;
