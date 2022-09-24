import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space, Tooltip} from "antd";
import React, {useState} from 'react';
import {EditOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import reportService from "../../Service/ReportService";
import ReportDataComp from "./ReportDataComp";
import LoadingComp from "../../components/loadingComp/LoadingComp";
import {DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../util/Constants";
import reservationService from "../../Service/ReservationService";
import moment from "moment";
import {Chart} from "react-google-charts";
import Modal from "antd/es/modal/Modal";

const {Option} = Select;

function ReportsComp(props) {
    const [reportType, setReportType] = useState("")
    const [{isShowCustomerReport, customerReportData}, setCustomerReportData] = useState(
        {isShowCustomerReport: false, customerReportData: []})
    const [{isShowReservationReport, reservationReportData}, setReservationReportData] = useState(
        {isShowReservationReport: false, reservationReportData: []})
    const [{isShowRevenueReport, revenueReportData}, setRevenueReportData] = useState(
        {isShowRevenueReport: false, revenueReportData: []})
    const [isLoading, setLoading] = useState(false);
    const [{isChartModalVisible, chartModalData},setChartModalVisible] =
        useState({isChartModalVisible: false, chartModalData: {}})
    const handleReportTypeChange = (val) => {
        setReservationReportData({isShowReservationReport: false, reservationReportData: []})
        setCustomerReportData({isShowCustomerReport: false, customerReportData: []})
        setReportType(val)
    }
    const generateReport = (values) => {
        setLoading(true)
        if (reportType === "CUSTOMER") {

            const reportFilter = {
                from: values.regDateFrom,
                to: values.regDateTo,
                reportType: reportType
            }
            reportService.generateReport(reportFilter).then((res) => {
                console.log('customerData--', res);
                setCustomerReportData({isShowCustomerReport: true, customerReportData: res.data.data})
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                message.error(error.response.data.message)
            })
        } else if (reportType === "RESERVATION") {
            values.page = 1
            values.size = 1000
            values.sortField = ""
            values.sortOrder = "ASC"
            reservationService.fetchReservations(values, values.status).then((res) => {
                setReservationReportData({isShowReservationReport: true, reservationReportData: res.data.data})
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                message.error(error.response.data.message)

            })
        } else {
            const reportFilter = {
                from: values.fromDate,
                to: values.fromDate,
                reportType: reportType
            }
            reportService.generateReport(reportFilter).then((res) => {
                console.log('revenue--', res);
                setRevenueReportData({isShowRevenueReport: true, revenueReportData: res.data.data})
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                message.error(error.response.data.message)
            })
        }
    }
    const customerReportColumns = [
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNumber',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
        },
        {
            title: 'Registered Date',
            dataIndex: 'registeredDate',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'Nic/Passport',
            dataIndex: 'nicPass',
        },
    ]
    const reservationReportColumns = [
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
                            "Completed" : text === "CHECKED_IN" ?
                                "Checked In" :
                                text === "CHECKED_OUT" ?
                                    "Checked Out" :
                                    text === "OPEN" ?
                                        "Open" :
                                        text === "PENDING" ?
                                            "PENDING" :
                                            "Canceled"


                    }


                </Space>
            )
        }
    ]
    const revenueReportColumns = [
        {
            title: 'Reservation Id',
            dataIndex: 'reservationId',
        },
        {
            title: 'Laundry',
            dataIndex: 'laundryCharges',
        },
        {
            title: 'Bar',
            dataIndex: 'barCharges',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephoneCharges',
        },
        {
            title: 'Club',
            dataIndex: 'clubFacility',
        },
        {
            title: 'KET',
            dataIndex: 'ketCharges',
        },
        {
            title: 'Payment Date Time',
            dataIndex: 'paymentDateTime',
            render: (text) => (
                <>
                    {text != null ? moment(text).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) : "N/A"}
                </>
            )
        },
        {
            title: 'View Chart',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (text, rec) => (
                <Space size="middle">
                    <Tooltip title="View Chart" style={{backgroundColor: '#000000fa'}}>
                        <Button className={"table-icon-color"} onClick={() => setChartModalData(rec)}
                                style={{color: '#faad14', backgroundColor: '#070814f5'}}


                        ><EditOutlined/></Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
    const setChartModalData = (rec) => {
        setChartModalVisible({isChartModalVisible: true,chartModalData: rec})
    }
    const data = [
        ["", "KET", "Club", "Telephone", "Bar", "Laundry"],
        ["Revenue From Reservation Id - "+chartModalData.reservationId, chartModalData.ketCharges, chartModalData.clubFacility,
            chartModalData.telephoneCharges, chartModalData.barCharges, chartModalData.laundryCharges],

    ];
    const options = {
        chart: {
            title: "Revenue Per Reservation",
        },

    };
    return (
        <>
            <LoadingComp loading={isLoading}/>
            <Modal className="modal-custom-bg"
                   title="Revenue Details"
                   style={{
                       width: '100%', marginTop: 50, backgroundColor: '#08325e',
                       fontcolor: 'white',
                   }}
                   centered
                   maskClosable={false}
                   visible={isChartModalVisible}
                   onCancel={() =>
                       setChartModalVisible(
                           {isChartModalVisible: false, chartModalData: {}})}
                   destroyOnClose={true}
                   footer={null}
                   width={1000}>

                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />

            </Modal>

            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={generateReport}>
                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={"Report Type"}>
                                <Select
                                    defaultValue={"0"}
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={handleReportTypeChange}
                                >

                                    <Option key={"0"}>Select Report Type</Option>
                                    <Option key={"CUSTOMER"}>Customer Detail Report</Option>
                                    <Option key={"RESERVATION"}>Reservation Report</Option>
                                    <Option key={"REVENUE"}>Revenue Report</Option>

                                </Select>

                            </Form.Item>
                        </Col>
                        {
                            reportType === "CUSTOMER" ?
                                <>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name={"regDateFrom"} label={"Registered date from"}>
                                            <DatePicker showTime placeholder={"Registered date from"}
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name={"regDateTo"} label={"Registered date to"}>
                                            <DatePicker showTime placeholder={"Registered date to"}
                                                        style={{
                                                            background: 'rgba(0,0,0,0)',
                                                            color: 'white',
                                                            width: '100%'
                                                        }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </> :

                                reportType === "RESERVATION" ?
                                    <>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
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
                                            <Form.Item name={"promisedCheckedInTimeTo"}
                                                       label={"Checked In Date Time To"}>
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
                                            <Form.Item name={"promisedCheckedOutTimeTo"}
                                                       label={"Checked Out Date Time To"}>
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
                                            <Form.Item name={"actualCheckedInTimeFrom"}
                                                       label={"Actual Checked In Date Time From"}>
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
                                            <Form.Item name={"actualCheckedInTimeTO"}
                                                       label={"Actual Checked In Date Time To"}>
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
                                            <Form.Item name={"actualCheckedOutTimeFrom"}
                                                       label={"Actual Checked Out Date Time From"}>
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
                                            <Form.Item name={"actualCheckedOutTimeTO"}
                                                       label={"Actual Checked Out Date Time To"}>
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

                                    </>
                                    :
                                    reportType === "REVENUE" ?
                                        <>
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name={"fromDate"} label={"Date from"}>
                                                    <DatePicker showTime placeholder={"Date from"}
                                                                style={{
                                                                    background: 'rgba(0,0,0,0)',
                                                                    color: 'white',
                                                                    width: '100%'
                                                                }}
                                                    />

                                                </Form.Item>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name={"toDate"} label={"Date to"}>
                                                    <DatePicker showTime placeholder={"Date to"}
                                                                style={{
                                                                    background: 'rgba(0,0,0,0)',
                                                                    color: 'white',
                                                                    width: '100%'
                                                                }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </> :
                                        <></>
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
                                    }} htmlType={"reset"}
                                            onClick={() => generateReport({})}><ReloadOutlined/>Reset</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType={"submit"}><SearchOutlined/>Generate</Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>
                {
                    isShowCustomerReport ?
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <ReportDataComp reportName={"Customer_Report"}
                                                reportColumns={customerReportColumns}
                                                reportData={customerReportData}/>
                            </Col>
                        </Row> : isShowReservationReport ?
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <ReportDataComp reportName={"Reservation_Report"}
                                                    reportColumns={reservationReportColumns}
                                                    reportData={reservationReportData}/>
                                </Col>
                            </Row> : isShowRevenueReport ?

                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <ReportDataComp reportName={"Revenue_Report"}
                                                        reportColumns={revenueReportColumns}
                                                        reportData={revenueReportData}/>
                                    </Col>
                                </Row> : ''
                }

            </Card>


        </>
    );
}

export default ReportsComp;
