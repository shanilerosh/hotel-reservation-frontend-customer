import {Button, Card, Checkbox, Col, Divider, Form, Input, Row, Space, Table, Tooltip} from "antd";
import React, {useState} from 'react';
import {DeleteOutlined, EditOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import FilteredAvailableRoomsComp from "./Filtered-Available-Rooms-Comp";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";


function CheckRoomAvailabilityComp(props) {

    const [isLoadAvailableRooms, setLoadAvailableRooms] = useState(false);
    const [isClickedBooking, onClickBooking] = useState(false);

    const checkRoomsAvailability = (values) => {
        setLoadAvailableRooms(true)
    }
    const loadBookingDetails = (values) => {
        onClickBooking(true)
    }
    const selectedRoomsColumns = [
        {
            title: 'Room ID',
            dataIndex: 'roomId',
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="Remove">
                        <Button className={"table-icon-color"}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}
                                icon={<DeleteOutlined style={{backgroundColor: '#070814f5'}}/>}

                        />
                    </Tooltip>
                </Space>
            )
        }
    ]
    const selectedRoomData = [
        {
            roomId: 'RM0001',
            floor: '2nd'
        },
        {
            roomId: 'RM0002',
            floor: '2nd'
        }
    ]
    return (
        <>
            {
                isClickedBooking ?
                    <EnterBookingDetailComp/> :
                    <Card
                        style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                        <Form layout="vertical" onFinish={checkRoomsAvailability}>
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
                        </Form>
                        {
                            isLoadAvailableRooms ?
                                <>
                                    <FilteredAvailableRoomsComp/>
                                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                                    <Card style={{
                                        width: '100%',
                                        marginTop: 15,
                                        background: 'rgba(45,44,44,0.23)',
                                        borderRadius: 0,
                                        color: 'white'
                                    }}>
                                        <Row >
                                            <Col span={24}>
                                                <Table columns={selectedRoomsColumns}
                                                       size={"small"}
                                                       dataSource={selectedRoomData}

                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Space size={16} style={{float: 'right',marginTop:10}}>
                                        <Button type="primary" onClick={loadBookingDetails}>
                                            Book Now
                                        </Button>
                                    </Space>
                                </>
                                : ''
                        }


                    </Card>
            }


        </>
    );
}

export default CheckRoomAvailabilityComp;
