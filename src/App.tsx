import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Donor from './Donor/Donor';
import Organization from './Organization/Organization';
import Admin from './Admin/Admin';
import NavigationButtons from './Admin/Navigation';

import SignUpFormDonor from './Donor/SignUpFormDonor.tsx';
import Home1 from './Donor/Home1.tsx';
import LocationComponent from './location';
import Dashboard1 from './Admin/Dashboard1.tsx';
import SignUpFormOrg from './Organization/SignUpOrg.tsx';
import OrganizationList from './Admin/OrganizationList';
import DonorList from './Admin/Donorlist';
import './App.css'; // Import the CSS file
import PasswordModification from './Admin/passwordmodif.tsx';
import Sign_in1 from './Donor/Signin1.tsx';
import SigninOrg from './Organization/SigninOrg.tsx';
import Home2 from './Organization/Home2.tsx';
import NotRegisteredOrg from "@/Admin/NotRegistered.tsx";

export const App = () => {
  const location = useLocation();

  // Check if the current route is the initial page ("/")
  const isInitialPage = location.pathname === '/';

  return (
      <>
        {isInitialPage && (
            <header>
              <h1>Choose an Option:</h1>
              <nav>
                <NavigationButtons />
              </nav>
            </header>
        )}
        <main>
          <Routes>
            <Route path="/donor" element={<Donor />} />
            <Route path="/Sign_in1" element={<Sign_in1 />} />
            <Route path="/SignUpForm1" element={<SignUpFormDonor />} />
            <Route path="/Home1" element={<Home1 />} />
            <Route path="/SignUpForm2" element={<SignUpFormOrg />} />
            <Route path="/SigninOrg" element={<SigninOrg />} />
            <Route path="/Home2" element={<Home2 />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/location1/:email" element={<LocationComponent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard1" element={<Dashboard1 />} />
            <Route path="/organizationlist" element={<OrganizationList />} />
            <Route path="/donorlist" element={<DonorList />} />
            <Route path="/changepassword" element={<PasswordModification />} />
            <Route path="/notregisteredorganizations" element={<NotRegisteredOrg />} />
          </Routes>
        </main>
      </>
  );
};