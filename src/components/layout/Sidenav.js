import {Menu} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";
import Logo from "../../assets/images/hotelLogo5.png";
import {UtilitiService} from "../../util/UtilitiService";
import {ROLE_ADMIN, ROLE_CLARK, ROLE_CUSTOMER} from "../../util/Constants";

function Sidenav({color}) {
    const {pathname} = useLocation();
    const page = pathname.replace("/", "");


    return (
        <>
            <div className="header-col header-brand">

                <img style={{width: 175, height: 122, marginLeft: 15, marginTop: -33}} src={Logo} alt=""/>

            </div>
            <hr/>
            <Menu theme="light" mode="inline">

                {
                    UtilitiService.getRole() === ROLE_ADMIN ?
                        <>
                            <Menu.Item key="1">
                                <NavLink to="/dashboard">
                                    <span className="label">Dashboard</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to="/viewReports">

                                    <span className="label">Reports</span>
                                </NavLink>
                            </Menu.Item>
                        </> :
                        UtilitiService.getRole() === ROLE_CLARK ?
                            <>
                                <Menu.Item key="1">
                                    <NavLink to="/dashboard">
                                        <span className="label">Dashboard</span>
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink to="/createReservation">

                                        <span className="label">Create Reservation</span>
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <NavLink to="/manageReservation">

                                        <span className="label">Manage Reservation</span>
                                    </NavLink>
                                </Menu.Item>
                                <Menu.SubMenu title="Payment">
                                    <NavLink to="/makePayment">

                                        <span className="label">Make Payment</span>
                                    </NavLink>

                                </Menu.SubMenu>
                            </> :
                            UtilitiService.getRole() === ROLE_CUSTOMER ?
                                <>
                                    <Menu.Item key="2">
                                        <NavLink to="/createReservation">

                                            <span className="label">Create Reservation</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="5">
                                        <NavLink to="/myReservations">
                                            <span className="label">My Reservation</span>
                                        </NavLink>
                                    </Menu.Item>
                                </> : ""
                }
            </Menu>

        </>
    );
}

export default Sidenav;
