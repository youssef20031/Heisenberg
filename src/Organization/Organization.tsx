import SignUpFormOrg from '@/Organization/SignUpOrg.tsx'
import React from 'react'
import HeaderBar from "@/Donor/HeaderBar.tsx";
import Footer from "@/Donor/footer.tsx";
import Row from 'react-bootstrap/Row';

const Organization = () => {
  return (
      <>

            <HeaderBar />

            <SignUpFormOrg/>

            <Footer/>
      </>
  )
}

export default Organization