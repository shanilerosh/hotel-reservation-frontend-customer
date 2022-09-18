import {Col, DatePicker, Form, Input, Row} from "antd";
import React from "react";

export default function CardDataSection(props){
    return(
        <Row gutter={16} style={{marginTop: 25}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"creditCardNumber"} label={"Credit card number"}>
                    <Input disabled={props.reservationStatus !== "PENDING"} type={"text"}
                           placeholder={"Credit card number"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                    />

                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"expirationDate"} label={"Expiration Date"}>
                    {
                        props.defaultCreditCardApplicableTypeFromDb ?
                            <Input disabled type={"text"}
                                   placeholder={"Expiration Date"}
                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                            /> :

                            <DatePicker type={"text"}
                                        style={{
                                            background: 'rgba(0,0,0,0)',
                                            color: 'white',
                                            width: '100%'
                                        }}
                            />
                    }


                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Form.Item name={"cardCsv"} label={"CSV"}>
                    <Input disabled={props.reservationStatus !== "PENDING"} placeholder={"CSV"}
                           style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                           type="text"/>

                </Form.Item>
            </Col>
        </Row>
    )
}