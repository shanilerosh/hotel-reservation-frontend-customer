import {Carousel, Col, Row, Menu, Form, Input, DatePicker, Button, Space, Select, message, InputNumber} from "antd";
import React, {useEffect, useState} from "react";
import Logo from "../../../assets/images/hotelLogo5.png";
import {SearchOutlined} from "@ant-design/icons";
import axios from "axios";
import reservationService from "../../../Service/ReservationService";
import {BASE_URL, DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../../util/Constants";
import moment from "moment";

const {Option} = Select;

function CheckRoomsAvailabilityFilteration(props) {
    const [hotelNames, setHotelNames] = useState([])
    const [checkInDateTime, setCheckInDateTime] = useState("")


    const setCheckInDateTimeValue=(val)=>{
        setCheckInDateTime(val)
    }
    useEffect(() => {
        axios.get(BASE_URL+`/api/rooms/hotel-type`)
            .then(res => {
                setHotelNames(res.data)
            }).catch(error => {
            message.error(error.response.data.message);
        })
    }, [])

    const checkRoomsAvailability = (values) => {
        props.checkRoomsAvailability(values)
    }
    return (
        <>
            <Form layout="vertical" onFinish={checkRoomsAvailability}>
                <Row gutter={16}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"hotelType"} label={"Hotel Location"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <Select
                                defaultValue={""}
                                style={{
                                    width: "100%",
                                }}

                            >

                                <Option key={""}>Select Hotel Location</Option>
                                {
                                    hotelNames.map((hotel) => {
                                        return <Option key={hotel.hotelName}>{hotel.hotelName}</Option>
                                    })
                                }

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"arrivalTime"} label={"Check In Date Time"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker showTime format={DATE_FORMAT_YYYY_MM_DD_HH_MM}
                                        disabledDate={d => d.isBefore(moment())}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                        onChange={setCheckInDateTimeValue}
                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"departureDateTime"} label={"Check Out Date Time"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime
                                        disabledDate={d => d.isBefore(moment()) || d.isSameOrBefore(checkInDateTime)}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"roomCategory"} label={"Room Type"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <Select
                                defaultValue={""}
                                style={{
                                    width: "100%",
                                }}

                            >

                                <Option key={""}>Select Room Type</Option>
                                <Option key={"BUDGET"}>Budget</Option>
                                <Option key={"VIP"}>VIP</Option>
                                <Option key={"LUXURY"}>Luxury</Option>


                            </Select>

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"numberOfOccupants"} label={"No of Occupants"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <InputNumber
                                   style={{background: 'rgba(0,0,0,0)', color: 'white',width:'100%'}}
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
        </>

    )
}

export default CheckRoomsAvailabilityFilteration