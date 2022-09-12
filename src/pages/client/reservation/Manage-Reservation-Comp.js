import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Tooltip
} from "antd";
import React, {useState} from 'react';
import {EditOutlined, MessageOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";
import reservationService from "../../../Service/ReservationService";
import LoadingComp from "../../../components/loadingComp/LoadingComp";

const {Option} = Select;

function ManageReservationComp(props) {
    const [isReDetailModalVisible, setReDetailModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [reservationData, setReservationData] = useState(false);
    const columns = [
        {
            title: 'Reservation ID',
            dataIndex: 'reservationId',
        },
        {
            title: 'Check In Date Time',
            dataIndex: 'promisedCheckedInTime',
        },
        {
            title: 'Check Out Date Time',
            dataIndex: 'promisedCheckedOutTime',
        },
        {
            title: 'Actual Checked In Date Time',
            dataIndex: 'actualCheckedInTime',
        },
        {
            title: 'Actual Checked Out Date Time',
            dataIndex: 'actualCheckedOutTime',
        },
        {
            title: 'Created Date Time',
            dataIndex: 'createdDateTime',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
        },
        {
            title: 'Reservation Status',
            dataIndex: 'status',
            render: (text, rec) => (
                <Space size="middle">
                    {
                        text === "COMPLETED" ?
                            <Tag color='#224B0C'>
                                Completed
                            </Tag> :
                            text === "CHECKED_IN" ?
                                <Tag color='#0a345a'>
                                    Checked In
                                </Tag> :
                                text === "CHECKED_OUT" ?
                                    <Tag color='#095840'>
                                        Checked Out
                                    </Tag> :
                                    text === "OPEN" ?
                                        <Tag color='#092e58'>
                                            Open
                                        </Tag> :
                                    <>
                                        <Tag color='#5c2c05'>
                                            Canceled
                                        </Tag>
                                        <Tooltip title="Canceled Reason">
                                            <Button className={"table-icon-color"} size={"small"}
                                                    style={{color: '#e7482d', backgroundColor: '#070814f5'}}
                                            >
                                                <MessageOutlined style={{backgroundColor: '#11121d'}}/>
                                            </Button>

                                        </Tooltip>
                                    </>

                    }


                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',

            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="View" style={{backgroundColor: '#000000fa'}}>
                        <Button className={"table-icon-color"} onClick={() => setModalVisible(true)}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}


                        ><EditOutlined/></Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
    const setModalVisible = (val) => {
        setReDetailModalVisible(true)
    }

    const searchReservations = (values) => {
        setLoading(true)
        values.page = 1
        values.size = 100
        values.sortField = ""
        values.sortOrder = "ASC"
        reservationService.fetchReservations(values, values.status).then((res) => {
            setReservationData(res.data.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            if (error.response.data.status === 500) {
                message.error("System Error Occurred")
            } else {
                message.error(error.response.data.message)
            }

        })
    }
    return (
        <>
            <LoadingComp loading={isLoading}/>
            {
                isReDetailModalVisible ?
                    <Modal className="modal-custom-bg"
                           title="Reservation Details"
                           style={{
                               width: '100%', marginTop: 50, backgroundColor: '#08325e',
                               fontcolor: 'white',
                               // overflow: 'scroll'
                           }}
                           centered
                           maskClosable={false}
                           visible={isReDetailModalVisible}
                           onCancel={() => setReDetailModalVisible(false)}
                           destroyOnClose={true}
                           footer={null}
                           width={1000}>

                        <EnterBookingDetailComp/>

                    </Modal>

                    :
                    ''
            }

            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={searchReservations}>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedInTimeFrom"}>
                                <DatePicker showTime placeholder={"Checked In Date Time From"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedInTimeTo"}>
                                <DatePicker showTime placeholder={"Checked In Date Time To"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedOutTimeFrom"}>
                                <DatePicker showTime placeholder={"Checked Out Date Time From"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedOutTimeTo"}>
                                <DatePicker showTime placeholder={"Checked Out Date Time To"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedInTimeFrom"}>
                                <DatePicker showTime placeholder={"Actual Checked In Date Time From"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedInTimeTO"}>
                                <DatePicker showTime placeholder={"Actual Checked In Date Time To"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedOutTimeFrom"}>
                                <DatePicker showTime placeholder={"Actual Checked Out Date Time From"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedOutTimeTO"}>
                                <DatePicker showTime placeholder={"Actual Checked Out Date Time To"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"nicPass"}>
                                <Input placeholder={"NIC/Passport"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerName"}>
                                <Input placeholder={"Customer Name"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerCountry"}>
                                <Input placeholder={"Country"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"status"}>
                                <Select
                                    defaultValue={""}
                                    style={{
                                        width: "100%",
                                    }}
                                >

                                    <Option key={""}>Select Status</Option>
                                    <Option key={"OPEN"}>Open</Option>
                                    <Option key={"CHECKED_IN"}>Checked In</Option>
                                    <Option key={"CHECKED_OUT"}>Checked Out</Option>
                                    <Option key={"COMPLETED"}>Completed</Option>
                                    <Option key={"CANCELED"}>Canceled</Option>

                                </Select>

                            </Form.Item>
                        </Col>
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
                                    <Button type="primary" htmlType={"submit"}><SearchOutlined/>Search</Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>

                <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

                <Row style={{marginTop: 15}}>
                    <Col span={24}>
                        <Table columns={columns}
                               size={"small"}
                               dataSource={reservationData}
                               scroll={{x: 'max-content'}}
                               pagination={{
                                   total: reservationData.length,
                                   pageSizeOptions: ['10', '50', '100', '500'],
                                   defaultPageSize: 10,
                                   showSizeChanger: true,
                                   showTotal: (total) => total === 1 ? `Total ${total} item` : `Total ${total} items`
                               }}
                        />
                    </Col>
                </Row>
            </Card>


        </>
    );
}

export default ManageReservationComp;
