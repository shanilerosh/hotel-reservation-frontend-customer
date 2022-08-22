import {Button, Card, Col, Divider, Form, Input, Row, Select, Space, Table} from "antd";
import React from 'react';
import {AppstoreAddOutlined, FolderViewOutlined, PrinterOutlined} from "@ant-design/icons";

const {Option} = Select;

function ClientSchedule() {
    const dataSource = [
        {
            key: '1',
            workout: 'Incline Barbell Chest Press',
            sets: 3,
            reps: 12,

        },
        {
            key: '2',
            workout: 'Decline Barbell Chest Press',
            sets: 3,
            reps: 12,

        },
        {
            key: '3',
            workout: 'Dumbbell Shoulder Press',
            sets: 3,
            reps: 12,

        },
        {
            key: '4',
            workout: 'Cable overhead triceps extensions',
            sets: 3,
            reps: 12,

        },
    ];

    const columns = [
        {
            title: 'Workout Name',
            dataIndex: 'workout',
            key: 'workout',
        },
        {
            title: 'Sets',
            dataIndex: 'sets',
            key: 'sets',
        },
        {
            title: 'Reps',
            dataIndex: 'reps',
            key: 'reps',
        },
        {
            title:"Action",
            key:"action",
            render: (text, rec) => (
                <Space size="middle">
                        <a style={{color:'red'}}>Delete</a>
                </Space>
            )
        }

    ];

    return (
        <>
            <Card title="Schedule Details">
                <>
                    <Form className="border"
                          layout="vertical"
                    >

                        <Row gutter={16}>
                            <Col xs={6}>
                                <Form.Item
                                    name="clientId"
                                    label="Select Client"
                                >
                                    <Select
                                        getPopupContainer={trigger => trigger.parentNode}
                                        placeholder="Select client"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children">
                                        <Option>CL-OF-001</Option>
                                        <Option>CL-OF-002</Option>
                                        <Option>CL-OF-003</Option>
                                        <Option>CL-OF-004</Option>
                                        <Option>CL-OF-005</Option>

                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item
                                    name="purpose"
                                    label="Purpose"
                                >
                                    <Select
                                        getPopupContainer={trigger => trigger.parentNode}
                                        placeholder="Select purpose"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children">
                                        <Option>Weight Gain</Option>
                                        <Option>Weight Lost</Option>
                                        <Option>Bulking</Option>
                                        <Option>Cutting</Option>

                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item
                                    name="targetWeight"
                                    label="Target Weight"
                                >
                                    <Input placeholder="kg" type={"text"}/>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item
                                    name="decision"
                                    label="Trainer Decision"
                                >
                                    <Select
                                        getPopupContainer={trigger => trigger.parentNode}
                                        placeholder="Select Decision"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children">
                                        <Option>Renew</Option>
                                        <Option>Continue</Option>
                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={8}>
                                <Form.Item
                                    name="startDate"
                                    label="Start Date"
                                >
                                    <Input type={"date"}/>
                                </Form.Item>
                            </Col>
                            <Col xs={8}>
                                <Form.Item
                                    name="endDate"
                                    label="End Date"
                                >
                                    <Input type={"date"}/>
                                </Form.Item>
                            </Col>
                            <Col xs={8}>
                                <Space size={16} style={{marginTop: 35}}>

                                    <Form.Item>
                                        <a ><FolderViewOutlined/>  View Last Schedule</a>

                                    </Form.Item>

                                </Space>

                            </Col>
                        </Row>
                        <Divider/>
                        <Row gutter={16}>
                            <Col xs={6}>
                                <Form.Item
                                    name="workout"
                                    label="Workout"
                                >
                                    <Select
                                        getPopupContainer={trigger => trigger.parentNode}
                                        placeholder="Select Workout"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children">
                                        <Option>Incline Barbell Curl</Option>
                                        <Option>Decline Barbell Curl</Option>
                                        <Option>Incline Dumbbell Curl</Option>
                                        <Option>Decline Dumbbell Curl</Option>
                                        <Option>Incline Chest Barbell Press</Option>
                                        <Option>Decline Chest Barbell Press</Option>
                                        <Option>Incline Chest Dumbbell Press</Option>
                                        <Option>Decline Chest Dumbbell Press</Option>
                                        <Option>Shoulder lateral raise</Option>
                                        <Option>Cable overhead triceps extensions</Option>


                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item
                                    name="sets"
                                    label="Sets"
                                >
                                    <Input type={"number"}/>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item
                                    name="reps"
                                    label="Reps"
                                >
                                    <Input type={"number"}/>
                                </Form.Item>
                            </Col>
                            <Col xs={6}>
                                <Form.Item

                                >
                                    <Space size={16} style={{marginTop: 30}}>

                                        <Form.Item>
                                            <a style={{border: 'none',height:30}}><AppstoreAddOutlined style={{fontSize:20,color:'green'}}/></a>

                                        </Form.Item>

                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24}>
                                <Table dataSource={dataSource} columns={columns} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24}>
                                <Space size={16} style={{marginTop: 30,float:'right'}}>

                                    <Form.Item>
                                        <Button type="primary" htmlType={"submit"}><PrinterOutlined />Generate</Button>

                                    </Form.Item>

                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </>


            </Card>
        </>
    );
}

export default ClientSchedule;
