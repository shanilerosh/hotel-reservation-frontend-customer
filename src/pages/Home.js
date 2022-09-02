import {Button, Card, Col, Row, Table,} from "antd";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import Title from "antd/es/typography/Title";
import HttpService from "../util/HttpService";
import {
    DingtalkOutlined,
    DollarCircleOutlined,
    ExperimentOutlined,
    HomeOutlined,
    LoginOutlined, UsergroupDeleteOutlined
} from "@ant-design/icons";
import React from "react";

function Home() {


    const count = [
        {
            today: "Total Revenue Today",
            title: "Rs 153,000",
            icon: <DollarCircleOutlined  style={{color:"white",fontSize:24}}/>,
            bnb: "bnb2",
            backgroundColor: '#42032C'
        },
        {
            today: "Total Checked Ins Today",
            title: "18",
            icon: <LoginOutlined style={{color:"white",fontSize:24}}/>,
            bnb: "bnb2",
            backgroundColor: '#224B0C'
        },
        {
            today: "New Reservations ",
            title: "10",
            icon: <DingtalkOutlined style={{color:"white",fontSize:24}}/>,
            bnb: "redtext",
            backgroundColor: '#A10035'
        },
        {
            today: "Due Checked Ins Today ",
            title: "7",
            icon: <ExperimentOutlined style={{color:"white",fontSize:24}}/>,
            bnb: "redtext",
            backgroundColor: '#2E0249'
        },
        {
            today: "Available Rooms",
            title: "45",
            icon: <HomeOutlined style={{color:"white",fontSize:24}}/>,
            bnb: "redtext",
            backgroundColor: '#570A57'
        },
        {
            today: "Guests",
            title: "145",
            icon: <UsergroupDeleteOutlined style={{color:"white",fontSize:24}}/>,
            bnb: "redtext",
            backgroundColor: '#A91079'
        },
    ];


   const todayExpectedArrivalCols=[
       {
           title: 'Reservation ID',
           dataIndex: 'resId',
       },
       {
           title: 'Customer Name',
           dataIndex: 'custName',
       },
       {
           title: 'Contact No',
           dataIndex: 'contactNo',
       },
       {
           title: 'Expected Arrival Time',
           dataIndex: 'expectedArrival',
       }
   ]
    const todayExpectedArrivalData=[
        {
            expectedArrival:"2022-09-01 10:00 AM",
            contactNo:"0774585965",
            custName:"Mr Silva",
            resId:"RES0012",
        },
        {
            expectedArrival:"2022-09-01 12:00 PM",
            contactNo:"0774512565",
            custName:"Mr Alvis",
            resId:"RES00165",
        },
        {
            expectedArrival:"2022-09-01 02:00 PM",
            contactNo:"0771252653",
            custName:"Ms Cooray",
            resId:"RES0018",
        }
    ]
    const todayExpectedADepaturesCols=[
        {
            title: 'Reservation ID',
            dataIndex: 'resId',
        },
        {
            title: 'Customer Name',
            dataIndex: 'custName',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
        },
        {
            title: 'Expected Departure Time',
            dataIndex: 'expectedDepartureTime',
        }
    ]
    const todayExpectedADepaturesData=[
        {
            expectedDepartureTime:"2022-09-01 10:00 AM",
            contactNo:"0774585235",
            custName:"Mr Nalin",
            resId:"RES0010",
        },
        {
            expectedDepartureTime:"2022-09-01 12:00 PM",
            contactNo:"0774595565",
            custName:"Mr Ruwan",
            resId:"RES00113",
        },
        {
            expectedDepartureTime:"2022-09-01 02:00 PM",
            contactNo:"0771252655",
            custName:"Ms Kaml",
            resId:"RES0016",
        }
    ]
    return (
        <>
            <Card style={{
                width: '100%',
                height: '100%',
                marginTop: 5,
                background: 'rgba(45,44,44,0.23)',
                color: 'white'
            }}>
                <div className="layout-content">
                    <Row gutter={[8, 8]}>
                        {count.map((c, index) => (
                            <Col
                                key={index}
                                xs={24}
                                sm={24}
                                md={12}
                                lg={8}
                                xl={8}

                            >
                                <Card style={{backgroundColor: c.backgroundColor, borderRadius: 0}}>
                                    <div className="number">
                                        <Row align="middle" gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span style={{color: 'white'}}>{c.today}</span>
                                                <Title style={{color: 'white'}} level={3}>
                                                    {c.title}
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div >{c.icon}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Row gutter={[6, 0]} style={{marginTop:12}}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                            <Card style={{ width: '100%',
                                height: '100%',
                                marginTop: 5,
                                background: 'rgba(45,44,44,0.23)',
                                borderRadius:0,
                                color: 'white'}}>
                                <Table columns={todayExpectedArrivalCols}
                                       size={"small"}
                                       className={"dashboardThead"}
                                       dataSource={todayExpectedArrivalData}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                            <Card style={{ width: '100%',
                                height: '100%',
                                marginTop: 5,
                                background: 'rgba(45,44,44,0.23)',
                                borderRadius:0,
                                color: 'white'}}>
                                <Table columns={todayExpectedADepaturesCols}
                                       className={"dashboardThead"}
                                       size={"small"}
                                       dataSource={todayExpectedADepaturesData}
                                />
                            </Card>
                        </Col>
                    </Row>

                </div>
            </Card>

        </>
    );
}

export default Home;
