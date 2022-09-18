import React from 'react';
import ManageReservationComp from "../client/reservation/Manage-Reservation-Comp";


function MakePaymentComp(props) {

    return (
        <>
            <ManageReservationComp isFromMakePayment={true}/>
        </>
    );
}

export default MakePaymentComp;
