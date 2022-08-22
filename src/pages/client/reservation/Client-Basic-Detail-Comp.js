
import {Row, Col, Form, Input, Card, Divider, Checkbox, Radio, Button, Space} from "antd";
import React from 'react';
import {RightOutlined} from "@ant-design/icons";


function ClientBasicDetailComp(props) {
    const onFinishBasicDetails = () => {
        props.goToPackageDetails()
    }

    return (
        <>
            <Card style={{width: '100%'}} >
                <Form layout="vertical" onFinish={onFinishBasicDetails}
                initialValues={props.isViewOnly?{
                    bmi:'',
                    initHeight:'5.6',
                    initWeight:'69',
                    address:'96/A ,Kalutara, Payagala',
                    mobileNo:'0774585695',
                    nic:'962447458V',
                    dob:'1996-10-03',
                    fullName:'Tharindu Gunasekara',
                    regNo:'CL-OF-001',
                    type:'physical',
                }:{}}
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="type" label="Client Type">
                                <Radio.Group disabled={props.isViewOnly} defaultValue="physical" buttonStyle="solid">
                                    <Radio.Button value="online">Online</Radio.Button>
                                    <Radio.Button value="physical">Physical</Radio.Button>

                                </Radio.Group>

                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="regNo" label="Registration No">
                                <Input disabled placeholder={"CL-OF-001"} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="fullName" label="Full Name">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="dob" label="Date of Birth">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="nic" label="NIC No">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="mobileNo" label="Contact No">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="address" label="Address">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Divider/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="initWeight" label="Initial Weight">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="initHeight" label="Initial Height">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name="bmi" label="BMI">
                                <Input disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>


                    </Row>
                    <Row>
                        <Card style={{width: '100%'}}>
                            <Col xs={24}>
                                <h4>Medical History</h4>
                                <Checkbox.Group disabled={props.isViewOnly}
                                    style={{
                                        width: '100%',
                                    }}
                                    // onChange={onChange}
                                >
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox checked={true} value="A">ever had a heart attack</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox checked value="B">ever had a cardiac surgery</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="C">high blood pressure (over 140/90)</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="D">fainting spells</Checkbox>
                                        </Col>

                                    </Row>
                                </Checkbox.Group>
                            </Col>
                        </Card>
                    </Row>
                    {
                        !props.isViewOnly?
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Space size={16} style={{float: 'right', marginTop: 10}}>
                                        <Form.Item>
                                            <Button type="primary" htmlType={"submit"}><RightOutlined />Next</Button>

                                        </Form.Item>
                                    </Space>
                                </Col>
                            </Row>:''
                    }

                </Form>

            </Card>
        </>
    );
}

export default ClientBasicDetailComp;
