import {Button, Card, Col, Form, Input, Row, Space} from "antd";
import React from 'react';
import {LeftOutlined, SaveOutlined} from "@ant-design/icons";
import ClientBasicDetailComp from "./Client-Basic-Detail-Comp";
import moment from "moment";
import Checkbox from "antd/es/checkbox/Checkbox";


function PaymentDetailComp(props) {
    const onFinishPaymentDetails = () => {
        props.goToAllocateTrainerDetails()
    }
    const goToPackageDetails = () => {
        props.goToPackageDetails()
    }

    return (
        <>
            <Row gutter={[24, 0]}>
                <ClientBasicDetailComp isViewOnly={true}/>

            </Row>
            <Row gutter={[24, 0]}>
                <Card style={{width: '100%'}}>
                    <Form layout="vertical" onFinish={onFinishPaymentDetails}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h3>Yearly Membership</h3>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={"Total Payable"}>
                                    <Input disabled placeholder={"50,000"} type={"text"}/>

                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={"Next Payment Due Date"}>
                                    <Input disabled value={moment('08/05/2022').format("YYYY-MM-DD")} type={"date"}/>

                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={""}>
                                    <Checkbox >Submit without the payment?</Checkbox>

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Space size={16} style={{float: 'right', marginTop: 10}}>

                                    <Form.Item>
                                        <Button onClick={goToPackageDetails}><LeftOutlined/>Previous</Button>

                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType={"submit"}><SaveOutlined />Submit</Button>

                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>
                    </Form>

                </Card>
            </Row>
        </>
    );
}

export default PaymentDetailComp;
