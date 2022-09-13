import {Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, message, Row, Space, Table} from "antd";
import React, {useEffect, useState} from 'react';
import {BackwardOutlined, FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import reservationService from "../../../Service/ReservationService";
import moment from "moment";
import {UtilitiService} from "../../../util/UtilitiService";
import LoadingComp from "../../../components/loadingComp/LoadingComp";
import {DATE_FORMAT_YYYY_MM_DD, DATE_FORMAT_YYYY_MM_DD_HH_MM, ROLE_CUSTOMER} from "../../../util/Constants";
import customerService from "../../../Service/CustomerService";

function ReservationDataComp(props) {

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [roomData, setRoomData] = useState([]);
    const [totalRoomPrice, setTotalRoomPrice] = useState(0);
    const [reservationStatus, setReservationStatus] = useState("");
    const [resForm] = Form.useForm();

    useEffect(() => {
        fetchCustomerDetailByNic(props.reservationId)
    }, [])
    const onFinish = (values) => {


    }


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
            resForm.setFieldsValue({
                actualCheckedInTime: getActualCheckedInDateTime(res.data.actualCheckedInTime),
                actualCheckedOutTime: getActualCheckedOutDateTime(res.data.actualCheckedOutTime),
                promisedCheckedOutTime: moment(res.data.promisedCheckedOutTime).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
                promisedCheckedInTime: moment(res.data.promisedCheckedInTime).format(DATE_FORMAT_YYYY_MM_DD_HH_MM),
                reservationId: res.data.reservationId,
                creditCardNumber: res.data.creditCardNumber,
                expirationDate: moment(res.data.expirationDate).format(DATE_FORMAT_YYYY_MM_DD),
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
    return (
        <>
            <LoadingComp loading={isLoading}/>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical"
                      form={resForm}>

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
                                        <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime placeholder={"Please Select"}
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
                                        <DatePicker format={DATE_FORMAT_YYYY_MM_DD_HH_MM} showTime placeholder={"Please Select"}
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
                            <Form.Item name={"isCreditCardApplicable"}>
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
                                        <Input disabled={reservationStatus !== "PENDING"} type={"text"}
                                               placeholder={"Expiration Date"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />

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
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                {reservationStatus === "OPEN" ?
                                    "Mark As Checked In" :
                                    reservationStatus === "CHECKED_IN" ?
                                        "Mark As Checked Out" :
                                        reservationStatus === "CHECKED_OUT" ?
                                            "Make The Payment" :
                                            reservationStatus === "PENDING" ?
                                                "Update Card Details" :""
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
