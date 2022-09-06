import {Carousel, Col, Row, Menu, Form, Input, DatePicker, Button, Space} from "antd";
import React from "react";
import Logo from "../../../assets/images/hotelLogo5.png";
import {SearchOutlined} from "@ant-design/icons";

function clientWebPage() {

    return (
        <div>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                    <Menu mode="horizontal">
                        <Menu.Item key="1">
                            Home
                        </Menu.Item>
                        <Menu.Item key="2">
                            About Us
                        </Menu.Item>
                        <Menu.Item key="3">
                            Sign In
                        </Menu.Item>
                    </Menu>

                    <img style={{
                        width: 142,
                        height: 113,
                        marginLeft: "86%",
                        marginTop: -44, zIndex: 1, position: "fixed", border: "2px solid white"
                    }} src={Logo} alt=""/>
                </Col>
            </Row>


            {/*<div className={"circle"}></div>*/}
            <div style={{
                backgroundColor: "#000000e6",
                width: "65%",
                height: "23%",
                position: "absolute",
                zIndex: 1,
                marginLeft: "19%",
                marginTop: "5%"
            }}>
                <Row gutter={16}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"hotelType"}
                            // rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <Input type={"text"} placeholder={"Hotel ID"}
                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"arrivalTime"}
                            // rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker placeholder={"Arrival"}
                                        style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}

                            />

                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item name={"departureDateTime"}
                            // rules={[{required: true, message: 'This field is required.'}]}
                        >
                            <DatePicker placeholder={"Departure"}
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
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Form.Item
                        >
                            <Space size={16} style={{float: 'left', width: "100%"}}>
                                <Button type={"primary"}><SearchOutlined/>Search</Button>
                            </Space>
                        </Form.Item>
                    </Col>

                </Row>
            </div>
            <Carousel autoplay>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/x_0,y_417,w_1626,h_633,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/10009137-1626x1080-FIT_AND_TRIM-e1647e32701b4d1e3da2150d2f5beea7_ahjjhz"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_1053,w_4999,h_1948,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/Emerald_Conference_Hall_at_VITS_Hotel_Bhubaneswar_pzl1ze"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/x_0,y_275,w_1529,h_595,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-shalimar-hotel-ankleshwar/Business_hotel_in_Ankleshwar,_rooms_in_Ankleshwar,__Restaurants_in_Ankleshwar,_Seminar_halls_in_Gujarat,_Wedding_venues_in_Ankleshwar,_GujaratDouble_Classic-3"}
                         className={"web-page-slide-show"}/>
                </div>
                <div>
                    <img alt=""
                         src={"https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3179/x_0,y_1134,w_5000,h_1944,r_0,c_crop,q_80,fl_progressive/w_1500,c_fit,f_auto/vits-hotels/VITS_Hotel_Pune_2_14_basd7r"}
                         className={"web-page-slide-show"}/>
                </div>
            </Carousel>

        </div>
    )
}

export default clientWebPage