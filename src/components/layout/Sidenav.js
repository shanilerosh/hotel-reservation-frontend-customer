import {Menu} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";

function Sidenav({color}) {
    const {pathname} = useLocation();
    const page = pathname.replace("/", "");


    return (
        <>
            <div className="header-col header-brand">
                <h5 style={{
                    color: '#0e891d',
                    fontSize: 17,
                    fontFamily: 'cursive'
                }}>
                    {/* <img style={{width:25,height:30}} src={Dumbell} alt="" /> Gravity Gear Gymnasium */}
                </h5>
            </div>
            <hr/>
            <Menu theme="light" mode="inline">
                <Menu.Item key="1">
                    <NavLink to="/dashboard">
                        {/*<span*/}
                        {/*    className="icon"*/}
                        {/*    style={{*/}
                        {/*        background: page === "dashboard" ? color : "",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*  {dashboard}*/}
                        {/*</span>*/}
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
                <Menu.Item key="4">
                    <NavLink to="/viewReports">

                        <span className="label">Reports</span>
                    </NavLink>
                </Menu.Item>

            </Menu>

        </>
    );
}

export default Sidenav;
