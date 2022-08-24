import {Button, Card, Col, Divider, Row, Space, Table} from "antd";
import React, {useState} from 'react';
import {CheckCircleOutlined, CheckOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";

function FilteredAvailableRoomsComp(props) {
    const [isVisibleRoomsModal, setVisibleRoomsModal] = useState(false);
    const data = [
        {
            imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            imageName: "hotelRoom1",
            roomDetail: [
                "With AC", "With TV", "No Of Person : 4 "
            ]
        },
        {
            imageUrl: "https://media.istockphoto.com/photos/hotel-room-suite-with-view-picture-id627892060?k=20&m=627892060&s=612x612&w=0&h=k6QY-qWNlFbvYhas82e_MoSXceozjrhhgp-krujsoDw=",
            imageName: "hotelRoom2",
            roomDetail: [
                "With AC", "With TV", "No Of Person : 4 "
            ]
        },
        {
            imageUrl: "https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg",
            imageName: "hotelRoom3",
            roomDetail: [
                "With AC", "With TV", "No Of Person : 4 "
            ]
        },
    ]
    const showAvailableRoomsForRoomType = () => {
        setVisibleRoomsModal(true)
    }
    const roomsColumns = [
        {
            title: 'Room ID',
            dataIndex: 'roomId',
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
        },
    ]
    const roomData = [
        {
            roomId: 'RM0001',
            floor: '2nd',
            key: '1',
        },
        {
            roomId: 'RM0002',
            floor: '2nd',
            key: '2',
        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            // props.rowSelection(selectedRows, selectedRowKeys)
        }

    };
    return (
        <>
            <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

            <Row gutter={16}>
                {
                    data.map((roomData) => {
                        return <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Card
                                style={{
                                    width: '100%',
                                    marginTop: 5,
                                    background: 'rgba(45,44,44,0.23)',
                                    borderRadius: 0,
                                    color: 'white'
                                }}>
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={roomData.imageUrl} alt={roomData.imageName} style={{width: '100%'}}/>

                                    </Col>
                                </Row>

                                <Row gutter={16} style={{marginTop: 10, marginLeft: 5}}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {
                                            roomData.roomDetail.map((roomFacilities) => {
                                                return <p><CheckCircleOutlined
                                                    style={{color: '#f1a102'}}/> {roomFacilities}</p>
                                            })
                                        }

                                    </Col>

                                </Row>
                                <Space size={16} style={{float: 'right'}}>

                                    <Button type="primary" onClick={() => showAvailableRoomsForRoomType()}>
                                        View Availability
                                    </Button>
                                </Space>
                            </Card>
                        </Col>

                    })
                }


            </Row>
            {
                isVisibleRoomsModal ?
                    <Modal className="custome1"
                           title="Available Rooms"
                           style={{
                               width: '100%', marginTop: 50, backgroundColor: '#051626',
                               fontcolor: 'white',
                           }}
                           centered
                           maskClosable={false}
                           visible={isVisibleRoomsModal}
                           onCancel={() => setVisibleRoomsModal(false)}
                           destroyOnClose={true}
                           footer={null}
                           width={600}>

                        <Row>
                            <Col span={24}>
                                <Table columns={roomsColumns}
                                       size={"small"}
                                       dataSource={roomData}
                                       rowSelection={rowSelection}
                                />
                            </Col>
                        </Row>
                        <Space size={16} style={{float: 'right',marginTop:10}}>
                            <Button type="primary" >
                                Submit
                            </Button>
                        </Space>
                    </Modal> : ''
            }


        </>
    );
}

export default FilteredAvailableRoomsComp;
