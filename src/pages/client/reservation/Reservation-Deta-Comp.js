import {Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, message, Modal, Row, Space, Table} from "antd";
import React, {useEffect, useState} from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MacCommandOutlined,
    MoneyCollectOutlined
} from "@ant-design/icons";
import reservationService from "../../../Service/ReservationService";
import moment from "moment";
import LoadingComp from "../../../components/loadingComp/LoadingComp";
import {DATE_FORMAT_YYYY_MM_DD, DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../../util/Constants";


function ReservationDataComp(props) {

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);
    const [defaultCreditCardApplicableTypeFromDb, setDefaultCreditCardApplicableTypeFromDb] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [roomData, setRoomData] = useState([]);
    const [totalRoomPrice, setTotalRoomPrice] = useState(0);
    const [reservationStatus, setReservationStatus] = useState("");
    const [resForm] = Form.useForm();

    useEffect(() => {
        fetchCustomerDetailByNic(props.reservationId)
    }, [])

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
            title: 'Category',
            dataIndex: 'roomCat',
            width: 60
        },
        {
            title: 'Room Type',
            dataIndex: 'roomDetail',
            width: 60
        },
        {
            title: 'Room Price',
            dataIndex: 'roomPrice',
            align: 'right',
            width: 60
        },
    ]


    const fetchCustomerDetailByNic = (reservationId) => {
        setLoading(true)
        reservationService.fetchReservationByReservationId(reservationId).then((res) => {
            console.log('response--', res.data);
            setRoomData(res.data.roomList)
            setReservationStatus(res.data.reservationStatus)
            setTotalRoomPrice(res.data.totalAmount)
            setProceedWithCreditCard(res.data.isCreditCardApplicable)
            setDefaultCreditCardApplicableTypeFromDb(res.data.isCreditCardApplicable)
            resForm.setFieldsValue({
                actualCheckedInTime: getActualCheckedInDateTime(res.data.actualCheckedInTime),
                actualCheckedOutTime: getActualCheckedOutDateTime(res.data.actualCheckedOutTime),
                promisedCheckedOutTime: moment(res.data.promisedCheckedOutTime).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
                promisedCheckedInTime: moment(res.data.promisedCheckedInTime).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
                reservationId: res.data.reservationId,
                creditCardNumber: res.data.creditCardNumber,
                expirationDate: res.data.expirationDate,
                cardCsv: res.data.cardCsv,
                email: res.data.customerDto.email,
                custId: res.data.customerDto.custId,
                nicPass: res.data.customerDto.nicPass,
                customerName: res.data.customerDto.customerName,
                country: res.data.customerDto.country,
                city: res.data.customerDto.city,
                address: res.data.customerDto.address,
                contactNumber: res.data.customerDto.contactNumber,
            })
            setLoading(false)
        }).catch((error) => {
            console.log('error', error);
            setLoading(false)
            message.error(error.response.data.message)

        })

    }
    const getActualCheckedOutDateTime = (val) => {
        return val != null ? moment(val).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) :
            reservationStatus === "CHECKED_IN" ? moment() : ""
    }
    const getActualCheckedInDateTime = (val) => {
        return val != null ? moment(val).format(DATE_FORMAT_YYYY_MM_DD_HH_MM) :
            reservationStatus === "OPEN" ? moment() : ""
    }
    const reloadReservationDetails = () => {
        props.reloadResTable()
    }
    const updateReservationStatus = (values) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: fetchConfirmationContent(reservationStatus),
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                if (reservationStatus === "OPEN") {
                    markAsCheckedIn(values)
                } else if (reservationStatus === "CHECKED_IN") {
                    markAsCheckedOut(values);
                } else if (reservationStatus === "PENDING") {
                    updateCardDetails(values);
                }
            }
        });

    }
    const fetchConfirmationContent = (reservationStatus) => {
        return "Are you sure you want to ".concat(
            reservationStatus === "OPEN" ? "mark as Checked In?" :
                reservationStatus === "CHECKED_IN" ? "mark as Checked Out & Update the payment details?" :
                    "Update card details?"
        );
    }

    const markAsCheckedOut = (values) => {
        const modifiedDto = {
            applDateTime: values.actualCheckedOutTime,
            resevationId: values.reservationId
        }
        reservationService.markCheckOut(modifiedDto).then((res) => {
            message.success("Successfully Marked as Checked Out")
            reloadReservationDetails();
        }).catch((error) => {
            message.error(error.response?.data.message)
        })
    }
    const markAsCheckedIn = (values) => {
        const modifiedDto = {
            applDateTime: values.actualCheckedInTime,
            resevationId: values.reservationId
        }
        reservationService.markCheckIn(modifiedDto).then((res) => {
            message.success("Successfully Marked as Checked In");
            reloadReservationDetails();
        }).catch((error) => {
            message.error(error.response.data.message)
        })
    }
    const updateCardDetails = (values) => {

        const cardDto = {
            cardCsv: values.cardCsv,
            expirationDate: values.expirationDate,
            creditCardNumber: values.creditCardNumber,
        }
        reservationService.updateCardDetails(values.reservationId, cardDto).then((res) => {
            message.success("Card details successfully updated")
            reloadReservationDetails();
        }).catch((error) => {
            message.error(error.response.data.message)
        })
    }
    const cancelReservation = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: "Are you sure you want to cancel the reservation?",
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                const canceleationDto = {
                    resevationId: resForm.getFieldValue("reservationId"),
                    cancellationReason: 'testtttt'
                }
                reservationService.markCancel(canceleationDto).then((res) => {
                    message.success("Successfully Marked as Cancelled")
                    reloadReservationDetails()
                }).catch((error) => {
                    message.error(error.response.data.message)
                })
            }

        });

    }
    return (
        <>
            <LoadingComp loading={isLoading}/>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical"
                      form={resForm}
                      onFinish={updateReservationStatus}
                >

                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"reservationId"} label={"Reservation ID"}>
                                <Input type={"text"}
                                       disabled style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>

                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedInTime"} label={"Check In Date time"}>
                                <Input disabled type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"promisedCheckedOutTime"} label={"Check Out Date Time"}>
                                <Input disabled type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedInTime"} label={"Actual Checked In Date Time"}
                                       rules={[{
                                           required: reservationStatus === "OPEN" ? true : false,
                                           message: 'This field is required.'
                                       }]}
                            >
                                {
                                    reservationStatus === "OPEN" ?
                                        <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime
                                                    placeholder={"Please Select"}
                                                    disabledDate={d => d.isBefore(resForm.getFieldValue("promisedCheckedInTime"))}
                                                    style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                        /> :
                                        <Input disabled type={"text"} placeholder={"N/A"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />
                                }


                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"actualCheckedOutTime"} label={"Actual Checked Out Date Time"}
                                       rules={[{
                                           required: reservationStatus === "CHECKED_IN" ? true : false,
                                           message: 'This field is required.'
                                       }]}
                            >
                                {
                                    reservationStatus === "CHECKED_IN" ?
                                        <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime
                                                    placeholder={"Please Select"}
                                                    disabledDate={d => d.isBefore(moment()) || d.isBefore(resForm.getFieldValue("actualCheckedInTime"))}
                                                    style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                        /> :
                                        <Input disabled type={"text"} placeholder={"N/A"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />
                                }

                            </Form.Item>
                        </Col>


                    </Row>

                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"nicPass"} label={"NIC/Passport"}>
                                <Input disabled type={"text"} placeholder={"NIC/Passport"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>

                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerName"} label={"Customer Name"}>
                                <Input disabled type={"text"} placeholder={"Customer Name"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"country"} label={"Country"}>
                                <Input disabled type={"text"} placeholder={"Country"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"city"} label={"City"}>
                                <Input disabled type={"text"} placeholder={"City"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"address"} label={"Address"}>
                                <Input disabled type={"text"} placeholder={"Address"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"contactNumber"} label={"Contact Number"}>
                                <Input disabled type={"text"} placeholder={"Contact Number"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"email"} label={"Email"}>
                                <Input disabled type={"text"} placeholder={"Email"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={"Special Requirement"}>
                                <Input disabled type={"text"} placeholder={"Special Requirement"}
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
                                       dataSource={roomData}
                                       pagination={false}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col span={12}>
                                <p align={'right'}>Total Room Cost</p>
                            </Col>
                            <Col span={12}>
                                <p align={'right'}>Rs : {totalRoomPrice}</p>
                            </Col>
                        </Row>
                    </Card>

                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"isCreditCardApplicable"} onChange={(val) => setProceedWithCreditCard(val.target.checked)}>
                                <Checkbox checked={isProceedWithCreditCard} disabled={reservationStatus !== "PENDING"}
                                          style={{color: 'white'}}>Proceed
                                    with credit card details</Checkbox>
                            </Form.Item>


                        </Col>
                    </Row>

                    {
                        isProceedWithCreditCard ?
                            <Row gutter={16} style={{marginTop: 25}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"creditCardNumber"} label={"Credit card number"}>
                                        <Input disabled={reservationStatus !== "PENDING"} type={"text"}
                                               placeholder={"Credit card number"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"expirationDate"} label={"Expiration Date"}>
                                        {
                                            defaultCreditCardApplicableTypeFromDb?
                                                <Input disabled type={"text"}
                                                       placeholder={"Expiration Date"}
                                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                                />:

                                                <DatePicker  type={"text"}
                                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                                />
                                        }


                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"cardCsv"} label={"CSV"}>
                                        <Input disabled={reservationStatus !== "PENDING"} placeholder={"CSV"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                               type="text"/>

                                    </Form.Item>
                                </Col>
                            </Row> : ''
                    }
                    <Space size={16} style={{float: 'right'}}>
                        {reservationStatus === "OPEN" || reservationStatus === "PENDING" ?
                            <Form.Item>
                                <Button style={{
                                    color: '#ffffff',
                                    backgroundColor: 'transparent',
                                    borderColor: '#ffffff',
                                    width: '100%'
                                }} onClick={() => cancelReservation()}><CloseCircleOutlined/>Cancel Reservation</Button>
                            </Form.Item> : ''
                        }

                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                {reservationStatus === "OPEN" ?
                                    <><CheckCircleOutlined/>Mark As Checked In </> :
                                    reservationStatus === "CHECKED_IN" ?
                                        <><MacCommandOutlined/>Mark As Checked Out</> :
                                        reservationStatus === "CHECKED_OUT" ?
                                            <><MoneyCollectOutlined/>Make The Payment</> :
                                            reservationStatus === "PENDING" ?
                                                <><ExclamationCircleOutlined/>Update Card Details</> : ""
                                }
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

        </>
    )
        ;
}

export default ReservationDataComp;
