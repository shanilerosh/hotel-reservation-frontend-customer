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
import React, {useEffect, useState} from 'react';
import {EditOutlined, MessageOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import EnterBookingDetailComp from "./Enter-Booking-Detail-Comp";
import reservationService from "../../../Service/ReservationService";
import LoadingComp from "../../../components/loadingComp/LoadingComp";
import Text from "antd/es/typography/Text";
import moment from "moment";
import ReservationDataComp from "./Reservation-Deta-Comp";
import {DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../../util/Constants";

const {Option} = Select;

function ManageReservationComp(props) {
    const [{isModalVisible, selectedRecReservationId}, setReDetailModalVisible] = useState(
        {isModalVisible: false, selectedRecReservationId: ""});
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
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'Check Out Date Time',
            dataIndex: 'promisedCheckedOutTime',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'Actual Checked In Date Time',
            dataIndex: 'actualCheckedInTime',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'Actual Checked Out Date Time',
            dataIndex: 'actualCheckedOutTime',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'Created Date Time',
            dataIndex: 'createdDateTime',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
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
                                <Tag color='#06645a'>
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
                                        text === "PENDING" ?
                                            <Tag color='#d04dff'>
                                                PENDING
                                            </Tag> :
                                            <>
                                                <Tag color='#5c2c05'>
                                                    Canceled
                                                </Tag>
                                                <Tooltip title={rec.cancalationReason}>
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
            fixed: 'right',
            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="View" style={{backgroundColor: '#000000fa'}}>
                        <Button className={"table-icon-color"} onClick={() => setModalVisible(rec.reservationId)}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}


                        ><EditOutlined/></Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
    const setModalVisible = (resId) => {
        setReDetailModalVisible({isModalVisible: true, selectedRecReservationId: resId})
    }

    useEffect(() => {
        searchReservations({})
    }, [])
    const searchReservations = (values) => {
        setLoading(true)
        values.page = 1
        values.size = 1000
        values.sortField = ""
        values.sortOrder = "ASC"
        values.status=props.isFromMakePayment?"CHECKED_OUT":values.status
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
    const reloadResTable = () => {
        setReDetailModalVisible({isModalVisible: false, selectedRecReservationId: ""})
        searchReservations({
            page: 1,
            size: 1000,
            sortField: "",
            sortOrder: "ASC",
        });
    }
    return (
        <>
            <LoadingComp loading={isLoading}/>
            {
                isModalVisible ?
                    <Modal className="modal-custom-bg"
                           title="Reservation Details"
                           style={{
                               width: '100%', marginTop: 50, backgroundColor: '#08325e',
                               fontcolor: 'white',
                               // overflow: 'scroll'
                           }}
                           centered
                           maskClosable={false}
                           visible={isModalVisible}
                           onCancel={() =>
                               setReDetailModalVisible(
                                   {isModalVisible: false, selectedRecReservationId: ""})}
                           destroyOnClose={true}
                           footer={null}
                           width={1000}>

                        <ReservationDataComp reservationId={selectedRecReservationId}
                                             isFromMakePayment={props.isFromMakePayment}
                                             reloadResTable={() => reloadResTable({})}/>

                    </Modal>

                    :
                    ''
            }

            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={searchReservations}>
                    <Row gutter={16}>
                        {
                            !props.isFromMakePayment ?
                                <>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item name={"promisedCheckedInTimeFrom"}
                                                   label={"Checked In Date Time From"}>
                                            <DatePicker showTime
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item name={"promisedCheckedInTimeTo"} label={"Checked In Date Time To"}>
                                            <DatePicker showTime
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item name={"promisedCheckedOutTimeFrom"}
                                                   label={"Checked Out Date Time From"}>
                                            <DatePicker showTime
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item name={"promisedCheckedOutTimeTo"} label={"Checked Out Date Time To"}>
                                            <DatePicker showTime
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />

                                        </Form.Item>
                                    </Col>
                                </> : ''
                        }


                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedInTimeFrom"} label={"Actual Checked In Date Time From"}>
                                <DatePicker showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedInTimeTO"} label={"Actual Checked In Date Time To"}>
                                <DatePicker showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedOutTimeFrom"} label={"Actual Checked Out Date Time From"}>
                                <DatePicker showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedOutTimeTO"} label={"Actual Checked Out Date Time To"}>
                                <DatePicker showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"nicPass"} label={"NIC/Passport"}>
                                <Input
                                    style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                    type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerName"} label={"Customer Name"}>
                                <Input
                                    style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                    type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerCountry"} label={"Country"}>
                                <Input
                                    style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                    type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"status"} label={"Reservation Status"}>
                                <Select disabled={props.isFromMakePayment}
                                        defaultValue={props.isFromMakePayment ? "CHECKED_OUT" : ""}
                                        style={{
                                            width: "100%",
                                        }}
                                >

                                    <Option key={""}>All</Option>
                                    <Option key={"PENDING"}>Pending</Option>
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
                                    }} htmlType={"reset"} onClick={() => searchReservations({})}><ReloadOutlined/>Reset</Button>
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
