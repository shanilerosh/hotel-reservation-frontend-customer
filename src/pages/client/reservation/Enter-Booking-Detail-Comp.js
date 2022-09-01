import {Button, Card, Checkbox, Col, Divider, Form, Input, message, Row, Space} from "antd";
import React, {useState} from 'react';
import {BackwardOutlined, ReloadOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import FilteredAvailableRoomsComp from "./Filtered-Available-Rooms-Comp";
import reservationService from "../../../Service/ReservationService";


function EnterBookingDetailComp(props) {

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);

    const onFinish = (values) => {
        let reservationSubmitData = {
            roomList: props.selectedRooms,
            totalAmount: 50000,
            reservationStatus: "OPEN"
        }
        reservationService.makeReservation(reservationSubmitData).then((res) => {
            message.success("Reservation created")
        }).catch((error) => {

        })
    }
    return (
        <>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={onFinish}
                      initialValues={{
                          numberOfOccupants: props.filterationData.numberOfOccupants,
                          roomCategory: props.filterationData.roomCategory,
                          departureDateTime: props.filterationData.departureDateTime,
                          arrivalTime: props.filterationData.arrivalTime,
                          hotelType: props.filterationData.hotelType
                      }}
                >
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"hotelType"}
                                // rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input type={"text"} placeholder={"Hotel ID"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"arrivalTime"}
                                // rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input type={"date"} placeholder={"Arrival"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}

                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"departureDateTime"}
                                // rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input type={"date"} placeholder={"Departure"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"roomCategory"}
                                // rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input placeholder={"Room Type"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"numberOfOccupants"}
                                // rules={[{required: true, message: 'This field is required.'}]}
                            >
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
                                <Input type={"text"} placeholder={"NIC/Passport"}
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
                                <Input type={"text"} placeholder={"Country"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"City"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Address"}
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
                            <Checkbox onChange={(val) => setProceedWithCreditCard(val.target.checked)}
                                      style={{color: 'white'}}>Proceed
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
                        <Form.Item>
                            <Button style={{
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                                borderColor: '#ffffff',
                                width: '100%'
                            }}><BackwardOutlined/>Back</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

        </>
    );
}

export default EnterBookingDetailComp;
