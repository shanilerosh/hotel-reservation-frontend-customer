import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Main from "../components/layout/Main";
import "antd/dist/antd.css";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import PrivateRoute from "../routing/PrivateRout";
import CheckRoomAvailabilityComp from "../pages/client/reservation/Check-Room-Availability-Comp";
import ManageReservationComp from "../pages/client/reservation/Manage-Reservation-Comp";
import ReportsComp from "../pages/reports/Reports-Comp";
import MakePaymentComp from "../pages/payments/Make-Payment-Comp";
import ClientWebPage from "../pages/client/web-page/ClientWebPage";
import PaymentSuccess from "../pages/client/web-page/PaymentSuccess";
import PaymentError from "../pages/client/web-page/PaymentError";
import {UtilitiService} from "../util/UtilitiService";
import {ROLE_ADMIN, ROLE_CLARK, ROLE_CUSTOMER} from "../util/Constants";

function AppRouter() {
    return (
        <div className="App">
            <Switch>
                <Route path="/sign-up" exact component={SignUp}/>
                <Route path="/sign-in" exact component={SignIn}/>
                <Route path="/" exact component={ClientWebPage}/>
                <Main>

                    {
                        UtilitiService.getRole() === ROLE_ADMIN ?
                            <>
                                <PrivateRoute exact path="/dashboard" component={Home}/>
                                <PrivateRoute exact path="/viewReports" component={ReportsComp}/>
                            </> :
                            UtilitiService.getRole() === ROLE_CLARK ?
                                <>
                                    <PrivateRoute exact path="/dashboard" component={Home}/>
                                    <PrivateRoute exact path="/createReservation"
                                                  component={CheckRoomAvailabilityComp}/>
                                    <PrivateRoute exact path="/manageReservation" component={ManageReservationComp}/>

                                    <PrivateRoute exact path="/makePayment" component={MakePaymentComp}/>
                                    <PrivateRoute exact path="/payment-sucess" component={PaymentSuccess}/>
                                    <PrivateRoute exact path="/payment-failure" component={PaymentError}/>
                                </> :

                                UtilitiService.getRole() === ROLE_CUSTOMER ?
                                    <>
                                        <PrivateRoute exact path="/createReservation"
                                                      component={CheckRoomAvailabilityComp}/>
                                        <PrivateRoute exact path="/myReservations" component={ManageReservationComp}/>
                                    </> : ''


                    }


                </Main>
            </Switch>
        </div>
    );
}

export default AppRouter;
