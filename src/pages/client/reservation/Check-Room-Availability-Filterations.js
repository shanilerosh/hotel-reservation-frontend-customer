import {Carousel, Col, Row, Menu, Form, Input, DatePicker, Button, Space, Select, message} from "antd";
import React, {useEffect, useState} from "react";
import Logo from "../../../assets/images/hotelLogo5.png";
import {SearchOutlined} from "@ant-design/icons";
import axios from "axios";
import reservationService from "../../../Service/ReservationService";
import {BASE_URL} from "../../../util/Constants";

const {Option} = Select;

function CheckRoomsAvailabilityFilteration(props) {
    const [hotelNames, setHotelNames] = useState([])

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
                        <Form.Item name={"hotelType"}
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
                        <Form.Item name={"arrivalTime"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker showTime format={"YYYY-MM-DD HH:mm"} placeholder={"Check In Date Time"}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}

                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"departureDateTime"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker format={"YYYY-MM-DD HH:mm"} showTime placeholder={"Check Out Date Time"}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"roomCategory"}
                            rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <Input placeholder={"Room Type"}
                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                   type="text"/>

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"numberOfOccupants"}
                            rules={[{required: true, message: 'This field is required.'}]}
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
        </>

    )
}

export default CheckRoomsAvailabilityFilteration