import {Col, Form, Input, Row} from "antd";
import React from "react";

export default function CustomerDataSection(){

    return(
        <Row gutter={16}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"nicPass"} label={"NIC/Passport"}>
                    <Input disabled type={"text"} placeholder={"NIC/Passport"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>

            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"customerName"} label={"Customer Name"}>
                    <Input disabled type={"text"} placeholder={"Customer Name"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"country"} label={"Country"}>
                    <Input disabled type={"text"} placeholder={"Country"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"city"} label={"City"}>
                    <Input disabled type={"text"} placeholder={"City"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"address"} label={"Address"}>
                    <Input disabled type={"text"} placeholder={"Address"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"contactNumber"} label={"Contact Number"}>
                    <Input disabled type={"text"} placeholder={"Contact Number"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"email"} label={"Email"}>
                    <Input disabled type={"text"} placeholder={"Email"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={"Special Requirement"}>
                    <Input disabled type={"text"} placeholder={"Special Requirement"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}