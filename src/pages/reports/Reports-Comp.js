import {Select, Button, Card, Col, Divider, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import React, {useState} from 'react';
import {EditOutlined, MessageOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";

const {Option} = Select;

function ReportsComp(props) {
    const [reportType, setReportType] = useState("")
    const handleReportTypeChange = (val) => {
        setReportType(val)
    }
    return (
        <>


            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item>
                                <Select
                                    defaultValue={"0"}
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={handleReportTypeChange}
                                >

                                    <Option key={"0"}>Select Report Type</Option>
                                    <Option key={"1"}>Hotel Occupancy Report</Option>
                                    <Option key={"2"}>Financial Report</Option>

                                </Select>

                            </Form.Item>
                        </Col>
                        {
                            reportType === "1" ?
                                <>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item>
                                            <Input placeholder={"Booking date from"} type={"date"}/>

                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item>
                                            <Input placeholder={"Booking date to"} type={"date"}/>

                                        </Form.Item>
                                    </Col>
                                </> : reportType === "2" ?
                                    <>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item>
                                                <Select
                                                    defaultValue={"1"}
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                >

                                                    <Option key={"1"}>Daily</Option>
                                                    <Option key={"2"}>Monthly</Option>
                                                    <Option key={"3"}>Yearly</Option>

                                                </Select>

                                            </Form.Item>
                                        </Col>
                                    </> : <></>
                        }


                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space size={16} style={{float: 'right', marginTop: 10}}>
                                <Form.Item>
                                    <Button style={{
                                        color: '#ffffff',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,0.37)',
                                        width: '100%'
                                    }}><ReloadOutlined/>Reset</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType={"submit"}><SearchOutlined/>Generate</Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>


            </Card>


        </>
    );
}

export default ReportsComp;
