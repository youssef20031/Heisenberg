import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Donor from './Donor/Donor';
import Organization from './Organization/Organization';
import Admin from './Admin/Admin';
import NavigationButtons from './Admin/Navigation';
import SignUpFormDonor from './Donor/SignUpFormDonor.tsx';
import Home1 from "@/Donor/Home1.tsx";
import LocationComponent from './location';
import Dashboard1 from './Admin/Dashboard1.tsx';
import SignUpFormOrg from './Organization/SignUpOrg.tsx';
import OrganizationList from './Admin/OrganizationList';
import DonorList from './Admin/Donorlist';
import './App.css';
import Mapsetter from "@/Admin/Mapsetter.tsx";
import PasswordModification from './Admin/passwordmodif.tsx';
import Sign_in1 from './Donor/Signin1.tsx';
import SigninOrg from './Organization/SigninOrg.tsx';
import Home2 from './Organization/Home2.tsx';
import NotRegisteredOrg from "@/Admin/NotRegistered.tsx";
import Doctor from "@/Donor/Doctor.tsx";
import Teacher from "@/Donor/Teacher.tsx";
import View_Medical from './Donor/View_Medical.tsx';
import Mapsetter2 from '@/Donor/LocationSetterForMedical.tsx';
import Mapsetter3 from '@/Donor/LocationSetterForTeaching.tsx';
import DonorXVolunteer from "@/Donor/DonorXVolunteer.tsx";
import Notverified from '@/Donor/notverified';
import NavigationButton from "@/Donor/DonorXVolunteer.tsx";
import View_Teaching from './Donor/View_Teaching.tsx';
import ChooseTransportation from '@/Donor/ChooseTransportation.tsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TeacherLogin from './Donor/teacherlogin.tsx';
import DoctorLogin from './Donor/doctorlogin.tsx';



export const App = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  const isInitialPage = location.pathname === '/';

  return (
      <>
        {isInitialPage && (
            <header>
              <nav>
                <NavigationButtons />
              </nav>
            </header>
        )}
        <main>
          <Routes>
            <Route path="/signinorg" element={<SigninOrg />} />
            <Route path="/donor" element={<Donor />} />
            <Route path="/Sign_in1" element={<Sign_in1 />} />
            <Route path="/SignUpForm1" element={<SignUpFormDonor />} />
            <Route path="/Home1/:email" element={<Home1 />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/SignUpForm2" element={<SignUpFormOrg />} />
            <Route path="/SigninOrg" element={<SigninOrg />} />
            <Route path="/Home2/:email" element={<Home2 />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/location/:email" element={<LocationComponent />} />
            <Route path="/locationMapsetter/:email" element={<Mapsetter />} />
            <Route path="/teacherlogin/:email" element={<TeacherLogin />} />
            <Route path="/doctorlogin/:email" element={<DoctorLogin />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard1" element={<Dashboard1 />} />
            <Route path="/organizationlist" element={<OrganizationList />} />
            <Route path="/donorlist" element={<DonorList />} />
            <Route path="/changepassword" element={<PasswordModification />} />
            <Route path="/notregisteredorganizations" element={<NotRegisteredOrg />} />
            <Route path="/view_medical" element={<View_Medical />} />
            <Route path="/view_teaching" element={<View_Teaching />} />
            <Route path="/locationMapsetter2/:CaseNum" element={<Mapsetter2 />} />
            <Route path="/locationMapsetter3/:CaseNum" element={<Mapsetter3 />} />
            <Route path ="/DonorXVolunteer/:email" element={<NavigationButton />} />
            <Route path ="/notverified" element={<Notverified />} />
            <Route path ="/ChooseTransportation/:email" element={<ChooseTransportation />} />
          </Routes>
        </main>
      </>
  );
};