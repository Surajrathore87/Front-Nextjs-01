import dynamic from 'next/dynamic';
import React from 'react';
const TaxiBookingConfirm = dynamic(import('../components/TaxiService/ConfirmBooking/TaxiBookingConfirm'))
const Layout = dynamic(import('../components/Layouts/Layout'))


function DefaultPage() {
  return <>
    {/* <Layout> */}
    <TaxiBookingConfirm />
    {/* </Layout> */}
  </>;
}

export default DefaultPage;
