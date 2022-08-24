import React, {Component, useState} from "react";
import {Button, Col, Drawer, Form, Input, Layout, Row, Typography,} from "antd";
import Hotel from "../assets/images/hotel-img.jpeg";
import "../assets/styles/main.css";
import CheckRoomAvailabilityComp from "./client/reservation/Check-Room-Availability-Comp";

const {Title} = Typography;
const {Header, Footer, Content} = Layout;

function SignIn() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    };
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                                    // style={{fontFamily:'monospace',color:'white'}}
                                    className="sign-in-ant-input"
                                    // label="Username"
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
                                    // style={{fontFamily:'monospace',color:'white'}}
                                    className="sign-in-ant-input"
                                    // label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                           placeholder="Password"/>
                                </Form.Item>

                                <Form.Item>
                                    <Button

                                        type="primary"
                                        htmlType="submit"
                                        // style={{
                                        //     color: '#fed430',
                                        //     backgroundColor: 'transparent',
                                        //     borderColor: '#fed430', width: '100%'
                                        // }}
                                    >
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
                                <Form layout="vertical">
                                    <Form.Item>
                                        <Input placeholder="nic"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="name"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="state"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="address"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="mobile number"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary">Submit</Button>
                                    </Form.Item>
                                </Form>
                            </Drawer>
                        </>

                    </Row>
                </div>

            </div>
        </>
    );

}

export default SignIn;