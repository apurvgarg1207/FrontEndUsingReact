import React from 'react';
import { Routes, Route,Navigate  } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

import KYCForm3 from './KycForm/KycInsertUpdate';

import PaginatedTable from './Tables/PaginatedTable';



function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<KYCForm3 />} />
      <Route path="/Kycform3" element={<KYCForm3 />} /> 
      <Route path="/Kycform3/:email" element={<KYCForm3 />} />
      <Route path="/Kycform3/:image" element={<KYCForm3 />} />
      <Route path="/ListTable" element={<PaginatedTable />} /> 
      <Route path="/ListTable/:page/:size" element={<PaginatedTable />} />
    </Routes>
    {/* </AppContext.Provider> */}
    </div>
  );
}
export default App;