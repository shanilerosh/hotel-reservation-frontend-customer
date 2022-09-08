import {Button, Card, Col, DatePicker, Divider, Empty, Form, Input, message, Row, Space, Table, Tooltip} from "antd";
import React, {useState} from 'react';
import {DeleteOutlined, SearchOutlined, StarOutlined} from "@ant-design/icons";
import FilteredAvailableRoomsComp from "./Filtered-Available-Rooms-Comp";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";
import reservationService from "../../../Service/ReservationService";
import LoadingComp from "../../../components/loadingComp/LoadingComp";


function CheckRoomAvailabilityComp(props) {

    const [{isLoadAvailableRooms, filteredRoomData}, setLoadAvailableRooms] = useState({
        isLoadAvailableRooms: false,
        filteredRoomData: {}
    });
    const [isClickedBooking, onClickBooking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRows, setSelectedRowData] = useState([])
    const [filterations, setFilterations] = useState({})

    const checkRoomsAvailability = (values) => {
        setIsLoading(true)
        setFilterations(values)
        values.page = 1
        values.size = 100
        values.sortField = ""
        values.sortOrder = "ASC"
        // values.arrivalTime=moment(values.arrivalTime).format("YYYY-MM-DD")
        // values.departureDateTime=moment(values.departureDateTime).format("YYYY-MM-DD")
        reservationService.filterAvailableRooms(values).then((res) => {
            console.log(res)
            setLoadAvailableRooms({isLoadAvailableRooms: true, filteredRoomData: res.data.data})
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
            message.error("System error occurred")
        })

    }
    const loadBookingDetails = (values) => {
        onClickBooking(true)
    }

    const selectedRoomsColumns = [
        {
            title: 'Room ID',
            dataIndex: 'roomId',
            width: 60
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            width: 60
        },
        {
            title: 'Non Smoking',
            dataIndex: 'isNoneSmoking',
            width: 60,
            render: (val) => {
                return val ? "Yes" : "No"
            }
        },
        {
            title: 'Remark',
            dataIndex: 'roomRemark',
            width: 60
        },
        {
            title: 'House Keeping Status',
            dataIndex: 'houseKeepingStatus',
            width: 60
        },
        {
            title: 'Room Price',
            dataIndex: 'roomPrice',
            width: 50
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
            width: 60
        },

        {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: 60,
            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="Remove">
                        <Button className={"table-icon-color"}
                                style={{color: '#faad14', backgroundColor: '#000000d9'}}
                                onClick={() => onAddedRoomDelete(rec)}

                        ><DeleteOutlined style={{backgroundColor: '#0f1319'}}/></Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
    const onAddedRoomDelete = (record) => {
        let filteredCheck = selectedRows.filter((obj) => {
            return record.roomId !== obj.roomId
        })

        setSelectedRowData(filteredCheck)
    }
    const selectedRoomsRows = (selectedRoom) => {

        selectedRoom.forEach((room) => {
            let filteredCheck = selectedRows.find((obj) => {
                return obj.roomId === room.roomId
            })
            if (filteredCheck != undefined) {
                message.warn("A record already exists for room number " + room.roomId);
                return;
            }
            setSelectedRowData(arr => [...arr, room])
        })


    }
    return (
        <>
            <LoadingComp loading={isLoading}/>
            {
                isClickedBooking ?
                    <EnterBookingDetailComp backBtnClicked={()=>onClickBooking(false)} isFrom={"CREATE_RES"} selectedRooms={selectedRows} filterationData={filterations}/> :
                    <Card
                        style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                        <Form layout="vertical" onFinish={checkRoomsAvailability}>
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
                                        <DatePicker  placeholder={"Arrival"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white',width:'100%'}}

                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"departureDateTime"}
                                        // rules={[{required: true, message: 'This field is required.'}]}
                                    >
                                        <DatePicker  placeholder={"Departure"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white',width:'100%'}}
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
                            isLoadAvailableRooms && filteredRoomData.length ?
                                <>
                                    <FilteredAvailableRoomsComp filteredRoomData={filteredRoomData}
                                                                alreadyAddedRows={selectedRows}
                                                                rowSelection={selectedRoomsRows}/>
                                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                                    <Card style={{
                                        width: '100%',
                                        marginTop: 15,
                                        background: 'rgba(45,44,44,0.23)',
                                        borderRadius: 0,
                                        color: 'white'
                                    }}>
                                        <Row>
                                            <Col span={24}>
                                                <Table columns={selectedRoomsColumns}
                                                       size={"small"}
                                                       dataSource={selectedRows}
                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Space size={16} style={{float: 'right', marginTop: 10}}>
                                        <Button type="primary" onClick={loadBookingDetails}>
                                            <StarOutlined />Book Now
                                        </Button>
                                    </Space>
                                </>
                                : <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" style={{color:"#56644f"}}/>
                        }


                    </Card>
            }


        </>
    );
}

export default CheckRoomAvailabilityComp;
