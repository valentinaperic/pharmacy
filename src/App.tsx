import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PharmaciesList from './components/PharmaciesList/PharmaciesList';
import PharmacyDetails from './components/PharmaciesList/PharmacyItem';
import MedicationOrder from './components/Medications/MedicationOrder';

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="pharmacies" element={<PharmaciesList />} />
            <Route path="pharmacies/:id" element={<PharmacyDetails />} />
            <Route path="pharmacy/order/:id" element={<MedicationOrder />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
