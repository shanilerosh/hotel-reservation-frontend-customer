import {Col, DatePicker, Form, Input, Row} from "antd";
import {DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../../util/Constants";
import moment from "moment";
import React from "react";

export default function ReservationDateDataSection(props){
    return(
        <Row gutter={16}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"reservationId"} label={"Reservation ID"}>
                    <Input type={"text"}
                           disabled style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>

            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"promisedCheckedInTime"} label={"Check In Date time"}>
                    <Input disabled type={"text"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />

                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"promisedCheckedOutTime"} label={"Check Out Date Time"}>
                    <Input disabled type={"text"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />

                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"actualCheckedInTime"} label={"Actual Checked In Date Time"}
                           rules={[{
                               required: props.reservationStatus === "OPEN" ? true : false,
                               message: 'This field is required.'
                           }]}
                >
                    {
                        props.reservationStatus === "OPEN" ?
                            <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime
                                        placeholder={"Please Select"}
                                        disabledDate={d => d.isBefore(props.resForm.getFieldValue("promisedCheckedInTime"))}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                            /> :
                            <Input disabled type={"text"} placeholder={"N/A"}
                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                            />
                    }


                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"actualCheckedOutTime"} label={"Actual Checked Out Date Time"}
                           rules={[{
                               required: props.reservationStatus === "CHECKED_IN" ? true : false,
                               message: 'This field is required.'
                           }]}
                >
                    {
                        props.reservationStatus === "CHECKED_IN" ?
                            <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime
                                        placeholder={"Please Select"}
                                        disabledDate={d => d.isBefore(props.resForm.getFieldValue("actualCheckedInTime"))}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                            /> :
                            <Input disabled type={"text"} placeholder={"N/A"}
                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                            />
                    }

                </Form.Item>
            </Col>


        </Row>
    )
}