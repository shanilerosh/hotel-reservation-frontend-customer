import {
    Carousel,
    Col,
    Row,
    Menu,
    Form,
    Input,
    DatePicker,
    Button,
    Space,
    Select,
    message,
    Divider,
    Card,
    Table, Empty, Tooltip
} from "antd";
import React, {useEffect, useState} from "react";
import Logo from "../../../assets/images/hotelLogo5.png";
import {DeleteOutlined, SearchOutlined, StarOutlined} from "@ant-design/icons";
import axios from "axios";
import CheckRoomsAvailabilityFilteration from "../reservation/Check-Room-Availability-Filterations";
import reservationService from "../../../Service/ReservationService";
import FilteredAvailableRoomsComp from "../reservation/Filtered-Available-Rooms-Comp";

const {Option} = Select;

function ClientWebPage() {
    const [{isLoadAvailableRooms, filteredRoomData}, setLoadAvailableRooms] = useState({
        isLoadAvailableRooms: false,
        filteredRoomData: {}
    });
    const [isClickedBooking, onClickBooking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRows, setSelectedRowData] = useState([])
    const [filterations, setFilterations] = useState({})

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
            // setIsLoading(false)
            message.error("System error occurred")
        })

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
    const onAddedRoomDelete = (record) => {
        let filteredCheck = selectedRows.filter((obj) => {
            return record.roomId !== obj.roomId
        })

        setSelectedRowData(filteredCheck)
    }
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                    <Menu mode="horizontal">
                        <Menu.Item key="1">
                            Home
                        </Menu.Item>
                        <Menu.Item key="2">
                            About Us
                        </Menu.Item>
                        <Menu.Item key="3">
                            Sign In
                        </Menu.Item>
                    </Menu>

                    <img style={{
                        width: 142,
                        height: 113,
                        marginLeft: "86%",
                        marginTop: -44, zIndex: 1, position: "fixed", border: "2px solid white"
                    }} src={Logo} alt=""/>
                </Col>
            </Row>


            {/*<div className={"circle"}></div>*/}
            <div style={{
                backgroundColor: "#000000e6",
                width: "68%",
                height: "32%",
                position: "absolute",
                zIndex: 1,
                marginLeft: "16%",
                marginTop: "5%"
            }}>
                <Row gutter={16} style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 21,
                    rowGap: 9
                }}>
                    <CheckRoomsAvailabilityFilteration
                        checkRoomsAvailability={(values) => checkRoomsAvailability(values)}/>


                </Row>
            </div>
            <Carousel autoplay>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/x_0,y_417,w_1626,h_633,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/10009137-1626x1080-FIT_AND_TRIM-e1647e32701b4d1e3da2150d2f5beea7_ahjjhz"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_1053,w_4999,h_1948,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/Emerald_Conference_Hall_at_VITS_Hotel_Bhubaneswar_pzl1ze"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/x_0,y_275,w_1529,h_595,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-shalimar-hotel-ankleshwar/Business_hotel_in_Ankleshwar,_rooms_in_Ankleshwar,__Restaurants_in_Ankleshwar,_Seminar_halls_in_Gujarat,_Wedding_venues_in_Ankleshwar,_GujaratDouble_Classic-3"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3179/x_0,y_1134,w_5000,h_1944,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/VITS_Hotel_Pune_2_14_basd7r"}
                         className={"web-page-slide-show"}/>
                </div>
            </Carousel>
            <div>
                {
                    isLoadAvailableRooms && filteredRoomData.length ?
                        <>
                            <FilteredAvailableRoomsComp filteredRoomData={filteredRoomData}
                                                        fromCustomer={true}
                            />

                        </>
                        : ''
                }
            </div>
        </>
    )
}

export default ClientWebPage