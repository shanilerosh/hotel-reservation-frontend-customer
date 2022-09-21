import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Drawer, Form, Input, Layout, message, Row, Typography,} from "antd";
import Hotel from "../assets/images/hotel-img.jpeg";
import "../assets/styles/main.css";
import axios from "axios";
import {BASE_URL, ROLE_CUSTOMER} from "../util/Constants";

const {Title} = Typography;
const {Header, Footer, Content} = Layout;

function SignIn(props) {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    };
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
            window.location.href = '/dashboard'
        }
    }, [])
    const onFinish = (val) => {
        const params = new URLSearchParams();
        params.append('username', val.userName);
        params.append('password', val.password);
        axios.post(BASE_URL + `/login`, params)
            .then(res => {
                sessionStorage.setItem("token", res.data.access_token)
                sessionStorage.setItem("nic", res.data.nic)
                const decodedJwt = parseJwt(res.data.access_token);
                sessionStorage.setItem("roles", decodedJwt.roles)
                console.log(decodedJwt);
                sessionStorage.setItem("exp", decodedJwt.exp)
                sessionStorage.setItem("userName", val.userName)
                if(decodedJwt.roles==ROLE_CUSTOMER){
                    window.location.href = '/myReservations'
                }else{
                    window.location.href = '/dashboard'

                }

            }).catch(error => {
            message.error(error.response.data.message);
        })

    };
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };
    const onFinishFailed = () => {

    };
    const registrationSubmit = (customerRegVals) => {
        axios.post(BASE_URL+`/api/customer/`, customerRegVals).then((res) => {
            message.success("New Customer Added Successfully")
        }).catch((error) => {

            message.error(error.response.data.message);
        })
    };

    return (
        <>

            <img alt="" src={Hotel} className="sign-in-background"/>
            <div className="sign-in">
                <div className={"sign-in-content"}>
                    <Row gutter={[24, 16]} justify="space-around">
                        <Col

                        >
                            <Title className="mb-15" style={{fontFamily: 'monospace', color: 'white'}}>Sign In</Title>
                            <Title className="font-regular text-muted"
                                   style={{fontFamily: 'monospace', color: 'white'}} level={5}>
                                Enter your username and password to sign in
                            </Title>
                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                className="row-col"
                            >
                                <Form.Item
                                    className="sign-in-ant-input"
                                    name="userName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                           placeholder="Username"/>
                                </Form.Item>

                                <Form.Item
                                    className="sign-in-ant-input"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input type={"password"} style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                           placeholder="Password"/>
                                </Form.Item>

                                <Form.Item>
                                    <Button

                                        type="primary"
                                        htmlType="submit">
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        onClick={showDrawer}
                                        type="primary"
                                        style={{
                                            border: 'none'
                                        }}
                                    >
                                        No Account? Register Here
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Col>
                        <>
                            <Drawer title="Register Form" placement="right" onClose={onClose} visible={visible}>

                                <Form layout="vertical" onFinish={registrationSubmit}>
                                    <Row gutter={16}>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"nicPass"}>
                                                <Input placeholder="NIC/Passport"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"customerName"}>
                                                <Input placeholder="Name"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"country"}>
                                                <Input placeholder="Country"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"city"}>
                                                <Input placeholder="City"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"address"}>
                                                <Input placeholder="Address"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"contactNumber"}>
                                                <Input placeholder="Contact Number"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"email"}>
                                                <Input placeholder="Email"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Divider/>
                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"username"}>
                                                <Input placeholder="User Name"/>
                                            </Form.Item>

                                            <Form.Item rules={[{required: true, message: 'This field is required.'}]}
                                                       name={"password"}>
                                                <Input type={"password"} placeholder="Password"/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType={"submit"}>Submit</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Drawer>
                        </>

                    </Row>
                </div>

            </div>
        </>
    )
        ;

}

export default SignIn;