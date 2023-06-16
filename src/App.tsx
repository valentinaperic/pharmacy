import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import PharmaciesList from './components/PharmaciesList/PharmaciesList';
import PharmacyDetails from './components/PharmaciesList/PharmacyItem';

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="pharmacies" element={<PharmaciesList />} />
            <Route path="pharmacies/:id" element={<PharmacyDetails />} />
        </Routes>
    </BrowserRouter>



  );
};

export default App;
