import {Button, Card, Col, Divider, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import React, {useState} from 'react';
import {EditOutlined, MessageOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";


function ManageReservationComp(props) {
    const [isReDetailModalVisible, setReDetailModalVisible] = useState(false);
    const columns = [
        {
            title: 'Reservation ID',
            dataIndex: 'resId',
        },
        {
            title: 'Hotel ID',
            dataIndex: 'hotelId',
        },
        {
            title: 'Room ID',
            dataIndex: 'roomId',
        },
        {
            title: 'Room Type',
            dataIndex: 'roomType',
        },
        {
            title: 'Customer NIC',
            dataIndex: 'nic',
        },
        {
            title: 'Arrival',
            dataIndex: 'arrivalDate',
        },
        {
            title: 'Departure',
            dataIndex: 'departure',
        },
        {
            title: 'No Of Occupants',
            dataIndex: 'noOfOccupants',
            align: 'right'
        },
        {
            title: 'Reservation Status',
            dataIndex: 'status',
            render: (text, rec) => (
                <Space size="middle">
                    {
                        text === "C" ?
                            <Tag color='#224B0C'>
                                Completed
                            </Tag> :
                            text === "I" ?
                                <Tag color='#0a345a'>
                                    Checked In
                                </Tag> :
                                text === "P" ?
                                    <Tag color='#095840'>
                                        Pending
                                    </Tag> :
                                    <>
                                        <Tag color='#5c2c05'>
                                            Canceled
                                        </Tag>
                                        <Tooltip title="Canceled Reason">
                                            <Button className={"table-icon-color"} size={"small"} style={{color: '#e7482d', backgroundColor: '#070814f5'}}
                                            >
                                                <MessageOutlined style={{backgroundColor: '#11121d'}}/>
                                            </Button>

                                        </Tooltip>
                                    </>

                    }


                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',

            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="View" style={{ backgroundColor: '#000000fa'}}>
                        <Button className={"table-icon-color"} onClick={() => setModalVisible(true)}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}


                        ><EditOutlined /></Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
    const setModalVisible = (val) => {
        setReDetailModalVisible(true)
    }
    const reservationData = [
        {
            resId: 'RES-001',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'C',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-002',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'C',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'C',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'C',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'I',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'I',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'P',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'P',
            noOfOccupants: '3',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'D',
            noOfOccupants: '4',
        },
        {
            resId: 'RES-003',
            hotelId: 'HOTEL-BR1-001',
            roomId: 'HOTEL-BR1-001-RM0012',
            roomType: 'Luctury',
            nic: '9568858541V',
            arrivalDate: '2022-05-21 10:30',
            departure: '2022-05-22 10:30',
            status: 'D',
            noOfOccupants: '3',
        }
    ]
    return (
        <>
            {
                isReDetailModalVisible ?
                    <Modal className="modal-custom-bg"
                           title="Reservation Details"
                           style={{width: '100%', marginTop: 50, backgroundColor: '#08325e',
                               fontcolor: 'white',
                               // overflow: 'scroll'
                           }}
                           centered
                           maskClosable={false}
                           visible={isReDetailModalVisible}
                           onCancel={()=>setReDetailModalVisible(false)}
                           destroyOnClose={true}
                           footer={null}
                           width={1000}>

                        <EnterBookingDetailComp/>

                    </Modal>

                :
                    ''
            }

            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Hotel ID"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       />

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Arrival Date From"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       />

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Arrival Date To"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       />

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Departure Date From"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       />

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input type={"date"} placeholder={"Departure Date To"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       disabled={props.isViewOnly}
                                       />

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input placeholder={"Room Type"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input placeholder={"Nic"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space size={16} style={{float: 'right', marginTop: 10}}>
                                <Form.Item>
                                    <Button style={{
                                        color: '#ffffff',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,0.37)',
                                        width: '100%'
                                    }}><ReloadOutlined/>Reset</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType={"submit"}><SearchOutlined/>Search</Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>

                <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

                <Row style={{marginTop: 15}}>
                    <Col span={24}>
                        <Table columns={columns}
                               size={"small"}
                               dataSource={reservationData}
                               scroll={{x: 'max-content'}}
                               pagination={{
                                   total: reservationData.length,
                                   pageSizeOptions: ['10', '50', '100', '500'],
                                   defaultPageSize: 10,
                                   showSizeChanger: true,
                                   showTotal: (total) => total === 1 ? `Total ${total} item` : `Total ${total} items`
                               }}
                        />
                    </Col>
                </Row>
            </Card>


        </>
    );
}

export default ManageReservationComp;
