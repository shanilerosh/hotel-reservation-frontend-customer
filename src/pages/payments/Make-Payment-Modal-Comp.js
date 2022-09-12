import {Radio, Collapse, Button, Card, Col, DatePicker, Divider, Form, Input, Row, Space, Table} from "antd";
import React, {useState} from 'react';
import {BackwardOutlined} from "@ant-design/icons";

const {Panel} = Collapse;

function MakePaymentModalComp(props) {

    const [paymentMethod, setPaymentMethod] = useState("");
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
            title: 'Room Price',
            dataIndex: 'roomPrice',
            align: 'right',
            width: 60
        },
    ]
    const onFinish = (values) => {

    }


    return (
        <>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={onFinish}

                >
                    <Collapse defaultActiveKey={1}
                              style={{marginTop: '10'}}>
                        <Panel header={'Reservation Details'} key={1}>
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
                                        <DatePicker showTime placeholder={"Checked In Date Time"}
                                                    style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}

                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"departureDateTime"}
                                        // rules={[{required: true, message: 'This field is required.'}]}
                                    >
                                        <DatePicker showTime placeholder={"Checked Out Date Time"}
                                                    style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
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
                            <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                            <Row gutter={16}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"NIC/Passport"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                              />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Customer Name"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Country"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"City"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Address"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Contact Number"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />
                                    </Form.Item>
                                </Col>

                            </Row>
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
                                               dataSource={props.selectedRooms}
                                               pagination={false}
                                        />
                                    </Col>
                                </Row>

                            </Card>
                        </Panel>
                    </Collapse>
                    <Row style={{marginTop: 10}}>
                        <Col span={12}>
                            <p style={{ color: 'white'}} align={'right'}>Total Payable</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ color: 'white'}} align={'right'}>Rs : 60,000</p>
                        </Col>
                    </Row>
                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Radio.Group options={[{label: 'Cash', value: 'cash'}, {label: 'Card', value: 'card'}]}
                                         buttonStyle="solid"
                                         onChange={(e) => setPaymentMethod(e.target.value)}
                                         optionType="button"/>

                        </Col>

                    </Row>

                    {
                        paymentMethod === "card" ?
                            <Row gutter={16} style={{marginTop: 25}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Credit card number"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Name on card"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input placeholder={"Expiry date"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input placeholder={"Code"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                            </Row> :
                            <Row gutter={16} style={{marginTop: 25}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Given Amount"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item>
                                        <Input type={"text"} placeholder={"Balance"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               />

                                    </Form.Item>
                                </Col>
                            </Row>
                    }
                    <Space size={16} style={{float: 'right'}}>
                        <Form.Item>
                            <Button style={{
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                                borderColor: '#ffffff',
                                width: '100%'
                            }}><BackwardOutlined/>Back</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

        </>
    );
}

export default MakePaymentModalComp;
