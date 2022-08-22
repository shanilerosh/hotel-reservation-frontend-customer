import React, {Component} from "react";
import {Button, Col, Form, Input, Layout, Row, Typography,} from "antd";
import GymGuy from "../assets/images/Gym-Silhoutte-PNG-Photo.png";
import Dumbell from "../assets/images/dumbell.png";
import Hotel from "../assets/images/hotel-img.jpeg";

import Radio from "antd/es/radio/radio";
import "../assets/styles/main.css";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default class SignIn extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        {/* <Layout className="layout-default layout-signin"> */}
         
          <img alt="" src={Hotel} className="sign-in-background"/>
          <div className="sign-in">
            <div style={{marginTop:130,background:'#304c27a6'}}>
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                
              >
                <Title className="mb-15" style={{fontFamily:'monospace',color:'white'}}>Sign In</Title>
                <Title className="font-regular text-muted" style={{fontFamily:'monospace',color:'white'}} level={5}>
                  Enter your username and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                  style={{fontFamily:'monospace',color:'white'}}
                    className="username"
                    label="Username"
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                  style={{fontFamily:'monospace',color:'white'}}
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                    
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%",background:'rgb(0 128 0)',fontFamily:'monospace',color:'white' }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>

                </Form>
              </Col>
              {/* <Col
                className="sign-img"
                style={{ padding: 12 ,marginTop:40,marginLeft:40}}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={GymGuy} alt="" />
              </Col> */}
              </Row>
            </div>
             
          </div>
          {/* <Content className="signin" >
          
             
            
           
          </Content> */}
          
        {/* </Layout> */}
      </>
    );
  }
}
