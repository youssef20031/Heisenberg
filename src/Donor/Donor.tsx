import React from 'react';
import SignUpForm from '@/Donor/SignUpFormDonor.tsx';
import HeaderBar from "@/Donor/HeaderBar.tsx";
import Footer from "@/Donor/footer.tsx";

const Donor = () => {
  return (
      <>
        <HeaderBar/>
        <SignUpForm />
        <Footer/>
    </>
  );
}

export default Donor;
