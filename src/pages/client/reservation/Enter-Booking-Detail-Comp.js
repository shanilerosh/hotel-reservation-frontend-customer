import {Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, message, Modal, Row, Space, Table} from "antd";
import React, {useEffect, useState} from 'react';
import {BackwardOutlined, ExclamationCircleOutlined, FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import reservationService from "../../../Service/ReservationService";
import moment from "moment";
import {UtilitiService} from "../../../util/UtilitiService";
import LoadingComp from "../../../components/loadingComp/LoadingComp";
import {DATE_FORMAT_YYYY_MM_DD, ROLE_CUSTOMER} from "../../../util/Constants";
import customerService from "../../../Service/CustomerService";

function EnterBookingDetailComp(props) {

    const [isProceedWithCreditCard, setProceedWithCreditCard] = useState(false);
    const [totalRoomPrice, setTotalRoomPrice] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [resForm] = Form.useForm();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
        if (props.isFrom === "CREATE_RES") {
            calculateTotalRoomCost()

        }
    })
    const onFinish = (values) => {
        setLoading(true)
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: isProceedWithCreditCard ? "Are you sure you want to submit?" : "Are you sure you want to submit without card details?",
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                let customerDto = {
                    custId: values.custId,
                    nicPass: values.nicPass,
                    customerName: values.customerName,
                    country: values.country,
                    city: values.city,
                    address: values.address,
                    contactNumber: values.contactNumber,
                    username: "",
                    password: "",
                    email: values.email,
                }
                let reservationSubmitData = {
                    roomList: props.selectedRooms,
                    totalAmount: totalRoomPrice,
                    reservationStatus: "OPEN",
                    isCreditCardApplicable: isProceedWithCreditCard,
                    creditCardNumber: values.creditCardNumber,
                    expirationDate: isProceedWithCreditCard ? moment(values.expirationDate).format(DATE_FORMAT_YYYY_MM_DD) : "",
                    cardCsv: values.cardCsv,
                    customerDto: customerDto,
                    username: UtilitiService.getUserName(),
                    promisedCheckedInTime: values.arrivalTime,
                    promisedCheckedOutTime: values.departureDateTime
                }
                if (UtilitiService.getRole() === ROLE_CUSTOMER) {
                    makeReservationAsCustomer(reservationSubmitData)
                } else {
                    makeReservationAsClark(reservationSubmitData)
                }

            }
        });


    }

    const makeReservationAsClark = (reservationData) => {
        reservationService.makeReservationClark(reservationData).then((res) => {
            message.success("Reservation created successfully")
            setLoading(false)
            Location.reload()
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            if (error.response.data.status === 500) {
                message.error("System Error Occurred")
            } else {
                message.error(error.response.data.message)
            }

        })
    }
    const makeReservationAsCustomer = (reservationData) => {
        reservationService.makeReservationCustomer(reservationData).then((res) => {
            message.success("Reservation created successfully")
            Location.reload()

            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            if (error.response.data.status === 500) {
                message.error("System Error Occurred")
            } else {
                message.error(error.response.data.message)
            }

        })
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
            title: 'Room Price',
            dataIndex: 'roomPrice',
            align: 'right',
            width: 60
        },
    ]

    const calculateTotalRoomCost = () => {
        let totalRoomCost = 0
        props.selectedRooms.forEach((room) => {
            totalRoomCost += room.roomPrice
        })
        setTotalRoomPrice(totalRoomCost)
    }
    const getInitialValues = () => {
        if (props.isFrom === "CREATE_RES")
            return {
                numberOfOccupants: props.filterationData.numberOfOccupants,
                roomCategory: props.filterationData.roomCategory,
                departureDateTime: props.filterationData.departureDateTime,
                arrivalTime: props.filterationData.arrivalTime,
                hotelType: props.filterationData.hotelType
            }

    }
    const fetchCustomerDetailByNic = () => {
        customerService.getCustDetailByNic(resForm.getFieldValue("nicPass")).then((res) => {
            resForm.setFieldsValue({
                customerName: res.data.customerName,
                country: res.data.country,
                city: res.data.city,
                address: res.data.address,
                contactNumber: res.data.contactNumber,
                email: res.data.email,
                custId: res.data.custId
            })

        }).catch((error) => {

            message.error(error.response.data.message)

        })

    }
    const disableFields = () => {
        if (props.isFrom === "CREATE_RES") {
            return true;
        }
        return false;
    }
    return (
        <>
            <LoadingComp loading={isLoading}/>
            <Card
                style={{width: '100%', marginTop: 50, background: 'rgba(0,0,0,0.42)', fontcolor: 'white'}}>
                <Form layout="vertical" onFinish={onFinish}
                      initialValues={getInitialValues()}
                      form={resForm}
                >

                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"hotelType"} label={"Hotel Location"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields()} type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>


                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"arrivalTime"} label={"Check In Date Time"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <DatePicker disabled={disableFields()} showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}

                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"departureDateTime"} label={"Check Out Date Time"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <DatePicker disabled={disableFields()} showTime
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"roomCategory"} label={"Room Type"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields()}

                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"numberOfOccupants"} label={"No of Occupants"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields()}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                            <Form.Item name={"nicPass"} label={"NIC/Passport"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>

                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                            <Form.Item name={"custId"}>
                                <FileSearchOutlined onClick={fetchCustomerDetailByNic}
                                                    style={{color: '#f1a102', marginTop: 40, fontSize: 20}}/>
                            </Form.Item>

                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerName"} label={"Customer Name"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"country"} label={"Country"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"city"} label={"City"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"address"} label={"Address"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"contactNumber"} label={"Contact Number"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"email"} label={"Email"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item label={"Special Request"}>
                                <Input type={"text"}
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
                                       dataSource={props.selectedRooms}
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
                            <Checkbox onChange={(val) => setProceedWithCreditCard(val.target.checked)}
                                      style={{color: 'white'}}>Proceed
                                with credit card details</Checkbox>
                        </Col>
                    </Row>

                    {
                        isProceedWithCreditCard ?
                            <Row gutter={16} style={{marginTop: 25}}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"creditCardNumber"} label={"Credit card number"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <Input type={"text"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"expirationDate"} label={"Expire Date"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <DatePicker
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"cardCsv"} label={"CSV"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <Input
                                            style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                            type="text"/>

                                    </Form.Item>
                                </Col>
                            </Row> : ''
                    }
                    <Space size={16} style={{float: 'right'}}>
                        <Form.Item>
                            <Button style={{
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                                borderColor: '#ffffff',
                                width: '100%'
                            }} onClick={() => props.backBtnClicked()}><BackwardOutlined/>Back</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType={"submit"}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

        </>
    );
}

export default EnterBookingDetailComp;
