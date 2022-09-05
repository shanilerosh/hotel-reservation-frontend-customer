import {Button, Card, Col, DatePicker, Divider, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import React, {useState} from 'react';
import {EditOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import MakePaymentModalComp from "./Make-Payment-Modal-Comp";


function MakePaymentComp(props) {
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
                    <Tag color='#224B0C'>
                        Pending Payment
                    </Tag>

                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',

            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="View" style={{backgroundColor: '#000000fa'}}>
                        <Button className={"table-icon-color"} onClick={() => setModalVisible(true)}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}


                        ><EditOutlined/></Button>
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
            status: 'P',
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
            status: 'P',
            noOfOccupants: '3',
        }
    ]
    return (
        <>
            {
                isReDetailModalVisible ?
                    <Modal className="modal-custom-bg"
                           title="Make Payment Details"
                           style={{
                               width: '100%', marginTop: 50, backgroundColor: '#08325e',
                               fontcolor: 'white',
                               // overflow: 'scroll'
                           }}
                           centered
                           maskClosable={false}
                           visible={isReDetailModalVisible}
                           onCancel={() => setReDetailModalVisible(false)}
                           destroyOnClose={true}
                           footer={null}
                           width={1000}>

                        <MakePaymentModalComp/>

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
                                <Input placeholder={"Reservation ID"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item>
                                <Input placeholder={"Nic/Passport"}
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

export default MakePaymentComp;
