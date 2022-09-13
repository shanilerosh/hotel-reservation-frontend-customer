import {Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, message, Row, Space, Table} from "antd";
import React, {useEffect, useState} from 'react';
import {BackwardOutlined, FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
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

    const makeReservationAsClark = (reservationData) => {
        reservationService.makeReservationClark(reservationData).then((res) => {
            message.success("Reservation created successfully")
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
    const makeReservationAsCustomer = (reservationData) => {
        reservationService.makeReservationCustomer(reservationData).then((res) => {
            message.success("Reservation created successfully")
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
    const disableFields=()=>{
        if(props.isFrom==="CREATE_RES"){
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
                            <Form.Item name={"hotelType"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields()} type={"text"} placeholder={"Hotel ID"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />

                            </Form.Item>


                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"arrivalTime"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <DatePicker disabled={disableFields} showTime placeholder={"Check In Date Time"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}

                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"departureDateTime"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <DatePicker disabled={disableFields} showTime placeholder={"Check Out Date Time"}
                                            style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                />

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"roomCategory"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields} placeholder={"Room Type"}

                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"numberOfOccupants"}
                                       rules={[{required: true, message: 'This field is required.'}]}
                            >
                                <Input disabled={disableFields} placeholder={"No of Occupants"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                       type="text"/>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Divider style={{backgroundColor: 'rgba(75,73,73,0.23)'}}/>
                    <Row gutter={16}>
                        <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                            <Form.Item name={"nicPass"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"NIC/Passport"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>

                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                            <Form.Item name={"custId"}>
                                <FileSearchOutlined onClick={fetchCustomerDetailByNic}
                                                    style={{color: '#f1a102', marginTop: 13, fontSize: 20}}/>
                            </Form.Item>

                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"customerName"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"Customer Name"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"country"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"Country"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"city"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"City"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"address"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"Address"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"contactNumber"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"Contact Number"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item name={"email"}
                                       rules={[{required: true, message: 'This field is required.'}]}>
                                <Input type={"text"} placeholder={"Email"}
                                       style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item>
                                <Input type={"text"} placeholder={"Special Requirement"}
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
                                    <Form.Item name={"creditCardNumber"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <Input type={"text"} placeholder={"Credit card number"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"cardHolderName"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <Input type={"text"} placeholder={"Name on card"}
                                               style={{background: 'rgba(0,0,0,0)', color: 'white'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"expirationDate"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <DatePicker placeholder={"Expire Date"}
                                                    style={{background: 'rgba(0,0,0,0)', color: 'white', width: '100%'}}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item name={"cardCsv"}
                                               rules={[{required: true, message: 'This field is required.'}]}>
                                        <Input placeholder={"CSV"}
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
