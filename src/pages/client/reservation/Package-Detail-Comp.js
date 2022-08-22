import {Button, Card, Checkbox, Col, Form, Row, Space} from "antd";
import React from 'react';
import Title from "antd/es/typography/Title";
import {DollarCircleOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import ClientBasicDetailComp from "./Client-Basic-Detail-Comp";


function PackageDetailComp(props) {
    const onFinishPackageDetails = () => {
        props.goToPaymentDetails()
    }
    const goToMembershipDetails = () => {
        props.goToMembershipDetails()
    }

    return (
        <>
            <Row  gutter={[24, 0]}>
                <ClientBasicDetailComp isViewOnly={true}/>

            </Row>
            <Card style={{width: '100%'}}>

                <Form layout="vertical" onFinish={onFinishPackageDetails}>

                    <Row  gutter={[24, 0]}>
                            <Col
                                xs={8}
                                sm={8}
                                md={8}
                                lg={8}
                                xl={8}
                                className="mb-24"
                            >
                                <Card bordered={false} className="criclebox ">
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span> Yearly Membership</span>
                                                <Title level={3}>
                                                  Rs 12000
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div><DollarCircleOutlined style={{color:'orange',fontSize:35}}/></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>

                        <Col
                            xs={8}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                            className="mb-24"
                        >
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span> Quarterly Membership</span>
                                            <Title level={3}>
                                                Rs 4000
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div><DollarCircleOutlined style={{color:'green',fontSize:35}}/></div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>

                        <Col
                            xs={8}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={8}
                            className="mb-24"
                        >
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span> Monthly Membership</span>
                                            <Title level={3}>
                                                Rs 1000
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div><DollarCircleOutlined style={{color:'blue',fontSize:35}}/></div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} >
                            <h3>Yearly Membership</h3>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                // onChange={onChange}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="A">Cardio Training</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="B">Strength Training</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="C">Karate</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="D">Boxing</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="D">Weight Training</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="D">Cycling</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space size={16} style={{float: 'right', marginTop: 10}}>

                                <Form.Item>
                                    <Button  onClick={goToMembershipDetails}><LeftOutlined />Previous</Button>

                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType={"submit"}><RightOutlined />Next</Button>

                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>

            </Card>
        </>
    );
}

export default PackageDetailComp;
