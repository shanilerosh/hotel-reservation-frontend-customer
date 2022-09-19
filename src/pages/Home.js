import {Card, Col, message, Row, Table,} from "antd";
import Title from "antd/es/typography/Title";
import {
    DingtalkOutlined,
    DollarCircleOutlined,
    ExperimentOutlined,
    HomeOutlined,
    LoginOutlined,
    UsergroupDeleteOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import dashboardService from "../Service/DashboardService";
import moment from "moment";
import {DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../util/Constants";
import LoadingComp from "../components/loadingComp/LoadingComp";

function Home() {
    const [cardData, setCardData] = useState([])
    const [expectedArrivalList, setExpectedArrivalList] = useState([])
    const [expectedDepartureList, setExpectedDepartureList] = useState([])
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = () => {
        setLoading(true)
        dashboardService.fetchDashboardData().then((res) => {
            const cardData = [
                {
                    today: "Total Revenue Today",
                    title: "Rs: " + res.data.totalRevenueToday,
                    icon: <DollarCircleOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "bnb2",
                    backgroundColor: '#42032C'
                },
                {
                    today: "Total Checked Ins Today",
                    title: res.data.totalCheckinsToday,
                    icon: <LoginOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "bnb2",
                    backgroundColor: '#224B0C'
                },
                {
                    today: "New Reservations ",
                    title: res.data.newReservationsToday,
                    icon: <DingtalkOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "redtext",
                    backgroundColor: '#A10035'
                },
                {
                    today: "Due Checked Ins Today ",
                    title: res.data.dueCheckinsToday,
                    icon: <ExperimentOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "redtext",
                    backgroundColor: '#2E0249'
                },
                {
                    today: "Available Rooms",
                    title: res.data.availableRooms,
                    icon: <HomeOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "redtext",
                    backgroundColor: '#570A57'
                },
                {
                    today: "Guests",
                    title: res.data.totalActiveGuests,
                    icon: <UsergroupDeleteOutlined style={{color: "white", fontSize: 24}}/>,
                    bnb: "redtext",
                    backgroundColor: '#A91079'
                },
            ];
            setCardData(cardData);
            setExpectedArrivalList(res.data.expectedCheckInListToday);
            setExpectedDepartureList(res.data.expectedCheckOutListToday)
            setLoading(false)
        }).catch((error) => {
            if (error.response.data.status === 500) {
                message.error("System Error Occurred")
                setLoading(false)
            } else {
                message.error(error.response.data.message)
                setLoading(false)
            }
        })
    }


    const todayExpectedArrivalCols = [
        {
            title: 'Reservation ID',
            dataIndex: 'reservationId',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
        },
        {
            title: 'Expected Arrival Time',
            dataIndex: 'promisedCheckInOutDateTime',
            render: (text, rec) => {
                return text == null ? "N/A" : moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM)
            }
        }
    ]

    const todayExpectedADepaturesCols = [
        {
            title: 'Reservation ID',
            dataIndex: 'reservationId',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
        },
        {
            title: 'Expected Departure Time',
            dataIndex: 'promisedCheckInOutDateTime',
            render: (text, rec) => {
                return text == null ? "N/A" : moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM)
            }
        }
    ]

    return (
        <>
            <LoadingComp loading={isLoading}/>
            <Card style={{
                width: '100%',
                height: '100%',
                marginTop: 5,
                background: 'rgba(45,44,44,0.23)',
                color: 'white'
            }}>
                <div className="layout-content">
                    <Row gutter={[8, 8]}>
                        {cardData.map((c, index) => (
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
                                                <div>{c.icon}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Row gutter={[6, 0]} style={{marginTop: 12}}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                            <Card style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                background: 'rgba(45,44,44,0.23)',
                                borderRadius: 0,
                                color: 'white'
                            }}>
                                <Table columns={todayExpectedArrivalCols}
                                       size={"small"}
                                       className={"dashboardThead"}
                                       dataSource={expectedArrivalList}
                                       scroll={{x: 'max-content'}}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                            <Card style={{
                                width: '100%',
                                height: '100%',
                                marginTop: 5,
                                background: 'rgba(45,44,44,0.23)',
                                borderRadius: 0,
                                color: 'white'
                            }}>
                                <Table columns={todayExpectedADepaturesCols}
                                       className={"dashboardThead"}
                                       size={"small"}
                                       dataSource={expectedDepartureList}
                                       scroll={{x: 'max-content'}}
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
