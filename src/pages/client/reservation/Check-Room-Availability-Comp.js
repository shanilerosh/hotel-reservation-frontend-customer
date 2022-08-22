import {Button, Card, Checkbox, Col, Divider, Form, Input, Row, Space} from "antd";
import React from 'react';
import {RightOutlined, SearchOutlined} from "@ant-design/icons";
import FilteredAvailableRoomsComp from "./Filtered-Available-Rooms-Comp";


function CheckRoomAvailabilityComp(props) {


    return (
        <>

            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical">
                    <Row gutter={16}>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Arrival"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}} disabled={props.isViewOnly}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"datetime-local"} placeholder={"Departure"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}} disabled={props.isViewOnly}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input placeholder={"Rooms"} style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input placeholder={"Adults"} style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input placeholder={"Children"} style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly} type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space size={16} style={{float: 'right', marginTop: 10}}>
                                <Form.Item>
                                    <Button type="primary" htmlType={"submit"}><SearchOutlined/>Check
                                        Availability</Button>

                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                    <FilteredAvailableRoomsComp/>
                </Form>

            </Card>

        </>
    );
}

export default CheckRoomAvailabilityComp;
