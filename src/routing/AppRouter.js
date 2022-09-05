import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Tables from "../pages/Tables";
import Billing from "../pages/Billing";
import Rtl from "../pages/Rtl";
import Profile from "../pages/Profile";
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

function AppRouter() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute exact path="/tables" component={Tables} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <PrivateRoute exact path="/createReservation" component={CheckRoomAvailabilityComp} />
          <PrivateRoute exact path="/manageReservation" component={ManageReservationComp} />
          <PrivateRoute exact path="/viewReports" component={ReportsComp} />
          <PrivateRoute exact path="/rtl" component={Rtl} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/makePayment" component={MakePaymentComp} />
        </Main>
      </Switch>
    </div>
  );
}

export default AppRouter;
