import {useEffect, useState} from "react";

import {Avatar, Badge, Breadcrumb, Button, Col, Drawer, Dropdown, List, Row, Switch, Typography,} from "antd";

import {FacebookFilled, LogoutOutlined, StarOutlined, TwitterOutlined,} from "@ant-design/icons";

import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import avtar from "../../assets/images/team-2.jpg";
import {UtilitiService} from "../../util/UtilitiService";
import {ROLE_CLARK, ROLE_CUSTOMER} from "../../util/Constants";


const profile = [
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={0}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
            fill="#111827"
        ></path>
    </svg>,
];


function Header({name}) {


    useEffect(() => window.scrollTo(0, 0));


    const onSignOut = () => {
        sessionStorage.clear();
        window.location.href = '/sign-in'
    }
    const getRole = () => {
        const role = UtilitiService.getRole();
        return role === ROLE_CUSTOMER ?
            "Client" : role === ROLE_CLARK ? "Clerk" : "Manager"
    }
    return (
        <>

            <Row gutter={[24, 0]}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <NavLink to="/">Pages</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{textTransform: "capitalize"}}>
                            {name.replace("/", "")}
                        </Breadcrumb.Item>
                    </Breadcrumb>

                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} className="header-control">

                    <p style={{marginBottom: 2, marginLeft: 7, color: 'white',
                        fontFamily:"Open Sans",fontStyle:"italic",fontWeight:500}}>
                        Welcome {UtilitiService.getUserName() + " (" + getRole() + ")"}</p>

                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} className="header-control">

                    <p style={{marginBottom: 2, marginLeft: 7, color: 'white'}}>Log Out
                    </p><LogoutOutlined style={{color: 'white'}} onClick={() => onSignOut()}/>

                </Col>
            </Row>
        </>
    );
}

export default Header;
