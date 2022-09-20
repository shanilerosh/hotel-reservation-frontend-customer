import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Modal, Radio,
    Row,
    Space,
    Table, Tag
} from "antd";
import React, {useEffect, useRef, useState} from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined, DownloadOutlined,
    ExclamationCircleOutlined,
    MacCommandOutlined,
    MoneyCollectOutlined, RightCircleFilled
} from "@ant-design/icons";
import reservationService from "../../../Service/ReservationService";
import moment from "moment";
import LoadingComp from "../../../components/loadingComp/LoadingComp";
import {DATE_FORMAT_YYYY_MM_DD, DATE_FORMAT_YYYY_MM_DD_HH_MM} from "../../../util/Constants";
import paymentService from "../../../Service/PaymentService";
import CustomerDataSection from "./CustomerDataSection";
import ReservationDateDataSection from "./ReservationDateDataSection";
import AdditionalChargesSection from "./AdditionalChargesSection";
import CardDataSection from "./CardDataSection";
import {useHistory} from "react-router-dom";
import paidlogo from "../../../assets/images/paid-log.png";


function ReservationDataComp(props) {
    const history = useHistory();

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);
    const [defaultCreditCardApplicableTypeFromDb, setDefaultCreditCardApplicableTypeFromDb] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [roomData, setRoomData] = useState([]);
    const [totalPayable, setTotalPayableAmount] = useState(0);
    const [{roomWiseChargesData, totalRoomBasicCharge}, setRoomWiseCharges] = useState({
        roomWiseChargesData: [], totalRoomBasicCharge: 0
    });
    const [totalRoomPrice, setTotalRoomPrice] = useState(0);
    const [reservationStatus, setReservationStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [resForm] = Form.useForm();
    const [templateUrl, setTemplateUrl] = useState("");
    const btnDownloadCredit = useRef(null)
    useEffect(() => {
        fetchCustomerDetailByNic(props.reservationId)
        if (props.isFromMakePayment) {
            fetchCostDetails(props.reservationId)
        }
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

    const roomWiseCharges = [

        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            width: 60
        },
        {
            title: 'No of Occupants',
            dataIndex: 'numberOfOccupants',
            width: 60
        },
        {
            title: 'Days',
            dataIndex: 'days',
            width: 60
        },
        {
            title: 'Amount',
            dataIndex: 'rowWiseAmount',
            align: 'right',
            width: 60
        },

        {
            title: 'Description',
            dataIndex: 'description',
            width: 60
        },
    ]

    const fetchCostDetails = (reservationId) => {
        paymentService.fetchCostDetails(reservationId).then((res) => {
            setRoomWiseCharges({
                roomWiseChargesData: res.data.roomWisePrices,
                totalRoomBasicCharge: res.data.totalPayable
            })
        }).catch((error) => {
            message.error(error.response.data.message)
        })
    }
    const fetchCustomerDetailByNic = (reservationId) => {
        setLoading(true)
        reservationService.fetchReservationByReservationId(reservationId).then((res) => {
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
                paymentDate: moment(res.data.paymentDate).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
                paymentAmount: "Rs " + res.data.paymentAmount,
                paymentType: res.data.paymentType === "CREDIT_CARD" ? "Card Payment" : "Cash Payment",
                contactNumber: res.data.customerDto.contactNumber,
            })
            setLoading(false)
        }).catch((error) => {
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
                } else if (reservationStatus === "CHECKED_OUT" && !props.isFromMakePayment) {
                    history.push('/makePayment')
                } else if (reservationStatus === "CHECKED_OUT" && props.isFromMakePayment) {
                    if (paymentMethod === "card") {
                        makePaymentByCard(values)
                    } else {
                        makePaymentByCash()
                    }
                }else if(reservationStatus === "COMPLETED"){
                    downloadInvoice();
                }
            }
        });

    }
    const fetchConfirmationContent = (reservationStatus) => {
        return "Are you sure you want to ".concat(
            reservationStatus === "OPEN" ? "mark as Checked In?" :
                reservationStatus === "CHECKED_IN" ? "mark as Checked Out?" :
                    reservationStatus === "CHECKED_OUT" && !props.isFromMakePayment ? "proceed to payment?" :
                        reservationStatus === "CHECKED_OUT" && props.isFromMakePayment ? "make the payment?" :
                            reservationStatus === "COMPLETED" ? "download the receipt?" :
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
    const makePaymentByCard = () => {

        const paypalDto = {
            reservationId: resForm.getFieldValue("reservationId"),
            currency: "USD",
            method: "paypal",
            total: totalPayable,
            intent: "sale",
            description: resForm.getFieldValue("customerName") + " payment as at " + moment(new Date()).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
            laundryCharges:resForm.getFieldValue("laundryCharges"),
            barCharges:resForm.getFieldValue("barCharges"),
            telephoneCharges:resForm.getFieldValue("telephoneCharges"),
            clubFacility:resForm.getFieldValue("clubFacility"),
            ketCharges:resForm.getFieldValue("ketCharges"),
        }
        paymentService.makeCardPayment(paypalDto).then((res) => {

            window.location.replace(res.data)

        }).catch((error) => {
            message.error(error.response.data.message)
        })
    }
    const makePaymentByCash = () => {

        const paymentDto = {
            reservationId: resForm.getFieldValue("reservationId"),
            paymentAmount: totalPayable,
            laundryCharges:resForm.getFieldValue("laundryCharges"),
            barCharges:resForm.getFieldValue("barCharges"),
            telephoneCharges:resForm.getFieldValue("telephoneCharges"),
            clubFacility:resForm.getFieldValue("clubFacility"),
            ketCharges:resForm.getFieldValue("ketCharges")
        }
        paymentService.makeCashPayment(paymentDto).then((res) => {
            message.success("Cash Payment Done Successfully")
            reloadReservationDetails();

        }).catch((error) => {
            message.error(error.response.data.message)
        })
    }
    const downloadInvoice=()=>{
        paymentService.downlaodInvoice(resForm.getFieldValue("reservationId")).then(res => {
                setTemplateUrl("data:application/pdf;base64,".concat(res.data))

            setTimeout(function () {
                btnDownloadCredit.current.click()
            }, 300)

        }, (error) => {

        });
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
    const confirmPayment = () => {
        alert(resForm.getFieldValue("laundryCharges"))
        const totalPayable =
            totalRoomBasicCharge +
            parseInt(checkValueIsEmptyOrUndefined(resForm.getFieldValue("ketCharges"))) +
            parseInt(checkValueIsEmptyOrUndefined(resForm.getFieldValue("laundryCharges"))) +
            parseInt(checkValueIsEmptyOrUndefined(resForm.getFieldValue("barCharges"))) +
            parseInt(checkValueIsEmptyOrUndefined(resForm.getFieldValue("telephoneCharges"))) +
            parseInt(checkValueIsEmptyOrUndefined(resForm.getFieldValue("clubFacility")))


        setTotalPayableAmount(totalPayable)
    }
    const checkValueIsEmptyOrUndefined = (value) => {
        return value == null || value === undefined || value === "" ? 0 : value
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

                    <ReservationDateDataSection reservationStatus={reservationStatus} resForm={resForm}/>

                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

                    <CustomerDataSection/>

                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Card style={{
                        width: '100%', marginTop: 15, background: 'rgba(45,44,44,0.23)',
                        borderRadius: 0, color: 'white'
                    }}>

                        {
                            props.isFromMakePayment ?
                                <>
                                    <Row>
                                        <Col span={24}>
                                            <Table columns={roomWiseCharges}
                                                   size={"small"}
                                                   dataSource={roomWiseChargesData}
                                                   pagination={false}
                                            />
                                        </Col>
                                    </Row>

                                    <AdditionalChargesSection/>

                                    <Space size={16} style={{float: 'right'}}>

                                        <Button style={{
                                            color: '#ffffff',
                                            backgroundColor: 'transparent',
                                            borderColor: '#ffffff',
                                            width: '100%'
                                        }} onClick={() => confirmPayment()}>Confirm</Button>


                                    </Space>


                                </> :
                                <>
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
                                </>
                        }
                    </Card>


                    {
                        props.isFromMakePayment ?
                            <Row style={{marginTop: 10}}>
                                <Col span={12}>
                                    <p style={{fontSize: 20, color: 'white'}} align={'right'}>Total Payable Amount</p>
                                </Col>
                                <Col style={{
                                    fontSize: 20,
                                    color: 'white'
                                }} span={12}>
                                    <p align={'right'}>
                                        <InputNumber disabled value={totalPayable}
                                                     formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                     style={{
                                                         background: 'rgba(0,0,0,0)',
                                                         color: 'white',
                                                         width: '30%',
                                                         alignItems: "right"
                                                     }}
                                        />
                                    </p>
                                </Col>
                            </Row> : ''
                    }

                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>

                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"isCreditCardApplicable"}
                                       onChange={(val) => setProceedWithCreditCard(val.target.checked)}>
                                <Checkbox checked={isProceedWithCreditCard}
                                          disabled={reservationStatus !== "PENDING"}
                                          style={{color: 'white'}}>
                                    {defaultCreditCardApplicableTypeFromDb ?
                                        "Card details added" : "Proceed with card details"}</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    {
                        props.isFromMakePayment ?
                            <>
                                <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                                <Row gutter={16}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Radio.Group
                                            options={[{label: 'Cash', value: 'cash'}, {label: 'Card', value: 'card'}]}
                                            buttonStyle="solid"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            optionType="button"/>

                                    </Col>

                                </Row>

                                {
                                    paymentMethod === "card" ?
                                        <CardDataSection reservationStatus={reservationStatus}
                                                         defaultCreditCardApplicableTypeFromDb={defaultCreditCardApplicableTypeFromDb}/>
                                        :
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
                            </> :

                            <>
                                {
                                    isProceedWithCreditCard ?
                                        <CardDataSection reservationStatus={reservationStatus}
                                                         defaultCreditCardApplicableTypeFromDb={defaultCreditCardApplicableTypeFromDb}/> : ''
                                }
                            </>
                    }
                    {
                        reservationStatus === "COMPLETED" ?
                            <Card style={{
                                width: '100%', marginTop: 15, background: 'rgba(45,44,44,0.23)',
                                borderRadius: 0, color: 'white', marginBottom: 20
                            }}>
                                <u><h3 style={{color: "white"}}>Payment Details</h3></u>
                                <Row gutter={16}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name={"paymentType"} label={"Payment Method"}>
                                            <Tag color='#092e58'>

                                                {resForm.getFieldValue("paymentType")}
                                            </Tag>


                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name={"paymentAmount"} label={"Full Paid Amount"}>
                                            <Input disabled type={"text"}
                                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name={"paymentDate"} label={"Payment Date"}>
                                            <Input disabled type={"text"}
                                                   style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <img src={paidlogo} style={{width: '76%', height: '87%', marginLeft: 216}}
                                             alt="logo 1"/>
                                    </Col>
                                </Row> </Card> : ''

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
                        <a ref={btnDownloadCredit} href={templateUrl}
                           download={"Payment-Invoice-"+resForm.getFieldValue("reservationId")+"-"+moment(new Date()).format(DATE_FORMAT_YYYY_MM_DD_HH_MM)}></a>
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                {reservationStatus === "OPEN" ?
                                    <><CheckCircleOutlined/>Mark As Checked In </> :
                                    reservationStatus === "CHECKED_IN" ?
                                        <><MacCommandOutlined/>Mark As Checked Out</> :
                                        reservationStatus === "CHECKED_OUT" && !props.isFromMakePayment ?
                                            <><MoneyCollectOutlined/>Proceed to Payment</> :
                                            reservationStatus === "CHECKED_OUT" && props.isFromMakePayment ?
                                                <><MoneyCollectOutlined/>Make The Payment</> :
                                                reservationStatus === "COMPLETED" ?
                                                    <><DownloadOutlined/>Download Receipt</> :
                                                    reservationStatus === "PENDING" ?
                                                        <><ExclamationCircleOutlined/>Update Card Details</> : ""
                                }
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

        </>
    );
}

export default ReservationDataComp;
