import {Button, Card, Checkbox, Col, Divider, Form, Input, Row, Space} from "antd";
import React, {useState} from 'react';
import {BackwardOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import FilteredAvailableRoomsComp from "./Filtered-Available-Rooms-Comp";


function EnterBookingDetailComp(props) {

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);


    return (
        <>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Hotel ID"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Arrival"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Departure"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input placeholder={"Room Type"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input placeholder={"No of Occupants"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"NIC"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Customer Name"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"State"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Contact Number"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Special Requirement"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Checkbox onChange={(val) => setProceedWithCreditCard(val.target.checked)} style={{color: 'white'}}>Proceed
                                with credit card details</Checkbox>
                        </Col>
                    </Row>

                    {
                        isProceedWithCreditCard ?
                            <Row gutter={16} style={{marginTop: 25}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Credit card number"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               disabled={props.isViewOnly}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Name on card"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               disabled={props.isViewOnly}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input placeholder={"Expiry date"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input placeholder={"Code"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                            </Row> : ''
                    }
                    <Space size={16} style={{float: 'right'}}>
                        <Button type={"dashed"}>
                            <BackwardOutlined/>Back
                        </Button>
                        <Button type="primary" >
                            Submit
                        </Button>

                    </Space>
                </Form>
            </Card>

        </>
    );
}

export default EnterBookingDetailComp;
