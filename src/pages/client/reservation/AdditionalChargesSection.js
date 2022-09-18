import {Col, Form, InputNumber, Row} from "antd";
import React from "react";

export default function AdditionalChargesSection(){
    return(
        <Row style={{marginTop: 10}} float={"right"}>
            <Col span={24}>
                <Form.Item label={"Laundry Charges"} name={"laundryCharges"}>
                    <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                 style={{background: 'rgba(0,0,0,0)', color: 'white',width: '100%'}}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label={"Bar Charges"} name={"barCharges"}>
                    <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                 style={{background: 'rgba(0,0,0,0)', color: 'white',width: '100%'}}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label={"Telephone Charges"} name={"telephoneCharges"}>
                    <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                 style={{background: 'rgba(0,0,0,0)', color: 'white',width: '100%'}}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label={"Club Facility Charges"} name={"clubFacility"}>
                    <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                 style={{background: 'rgba(0,0,0,0)', color: 'white',width: '100%'}}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label={"KET Charges"} name={"ketCharges"}>
                    <InputNumber formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                 style={{background: 'rgba(0,0,0,0)', color: 'white',width: '100%'}}
                    />
                </Form.Item>
            </Col>

        </Row>
    )
}