import {Button, Card, Carousel, Col, Divider, message, Row, Space, Table} from "antd";
import React, {useEffect, useState} from 'react';
import {CheckCircleOutlined, FundViewOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import reservationService from "../../../Service/ReservationService";

const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    marginLeft: '125px'
};
const filteredRoomsOptionTitleStyles = {
    color: '#f1a102',
    fontFamily: 'inherit',
    fontWeight: 500
};

function FilteredAvailableRoomsComp(props) {
    const [{isVisibleRoomsModal, roomsData}, setVisibleRoomsModal] = useState({
        isVisibleRoomsModal: false,
        roomsData: {}
    });
    const [selectedRows, setSelectedRowData] = useState([])

    const showAvailableRoomsForRoomType = (roomTypeId,roomPrice) => {

        reservationService.getRoomsByRoomType(roomTypeId).then((res) => {
            res.data.roomDtos.map((data: any, index: number) => {
                data["key"] = index;
                data["roomPrice"] = roomPrice;
            })
            setVisibleRoomsModal({isVisibleRoomsModal: true, roomsData: res.data})
        }).catch((error) => {
            //
        })

    }
    const roomsColumns = [
        {
            title: 'Room ID',
            dataIndex: 'roomId',
            width: 40
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            width: 40
        },
        {
            title: 'Non Smoking',
            dataIndex: 'isNoneSmoking',
            width: 40,
            render: (val: boolean) => {
                return val ? "Yes" : "No"
            }
        },
        {
            title: 'Remark',
            dataIndex: 'roomRemark',
            width: 50
        },
        {
            title: 'House Keeping Status',
            dataIndex: 'houseKeepingStatus',
            width: 50
        },
        {
            title: 'Room Price',
            dataIndex: 'roomPrice',
            width: 50
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
            width: 40
        },
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowData(selectedRows)
        }

    };

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    }
    const submitSelectedRooms = () => {
        props.rowSelection(selectedRows)
    };
    return (
        <>
            <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

            <Row gutter={16} style={{height: '600px', overflow: 'auto'}}>
                {
                    props.filteredRoomData.map((roomData) => {
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
                                        <img src={roomData.mainImg} alt={roomData.mainImg} style={{width: '100%'}}/>

                                    </Col>
                                </Row>

                                <Row gutter={16} style={{marginTop: 10, marginLeft: 5}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        {/*{*/}
                                        {/*    roomData.roomDetail.map((roomFacilities) => {*/}
                                        {/*        return <p><CheckCircleOutlined*/}
                                        {/*            style={{color: '#f1a102'}}/> {roomFacilities}</p>*/}
                                        {/*    })*/}
                                        {/*}*/}
                                        <p><CheckCircleOutlined
                                            style={{color: '#f1a102'}}/>
                                            <span
                                                style={filteredRoomsOptionTitleStyles}> Room Type : </span> {roomData.cat}
                                        </p>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p><CheckCircleOutlined
                                            style={{color: '#f1a102'}}/><span
                                            style={filteredRoomsOptionTitleStyles}> Room Category : </span> {roomData.roomDetail}
                                        </p>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p><CheckCircleOutlined
                                            style={{color: '#f1a102'}}/><span
                                            style={filteredRoomsOptionTitleStyles}> Capacity : </span> {roomData.numberOfOccupants}
                                        </p>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p><CheckCircleOutlined
                                            style={{color: '#f1a102'}}/><span
                                            style={filteredRoomsOptionTitleStyles}> Price : </span> {roomData.roomPrice}
                                        </p>
                                    </Col>
                                </Row>
                                <Space size={16} style={{float: 'right'}}>

                                    <Button type="primary"
                                            onClick={() => showAvailableRoomsForRoomType(roomData.roomTypeId,roomData.roomPrice)}>
                                        <FundViewOutlined />View Availability
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
                                <Carousel afterChange={onChange}>
                                    {
                                        roomsData.subImages.map((subRoomImg, index) => {
                                            return <div>
                                                <img style={contentStyle}
                                                     src={subRoomImg}
                                                     alt={"Sub_Room_" + index}/>

                                            </div>
                                        })
                                    }


                                </Carousel>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col span={24}>
                                <Table className={"modalTable"} columns={roomsColumns}
                                       scroll={{x: 1000, y: 500}}
                                       size={"small"}
                                       dataSource={roomsData.roomDtos}
                                       rowSelection={rowSelection}
                                />
                            </Col>
                        </Row>
                        <Space size={16} style={{float: 'right', marginTop: 10}}>
                            <Button type="primary" onClick={submitSelectedRooms}>
                                Submit
                            </Button>
                        </Space>
                    </Modal> : ''
            }


        </>
    );
}

export default FilteredAvailableRoomsComp;
