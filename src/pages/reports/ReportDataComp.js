import {Button, Col, Row, Space, Table} from "antd";
import React from 'react';
import {Excel} from "antd-table-saveas-excel";
import {DownloadOutlined} from "@ant-design/icons";

function ReportDataComp(props) {
    const handleDownloadClick = () => {
        const excel = new Excel();
        excel
            .addSheet("ReportData")
            .addColumns(props.reportColumns)
            .addDataSource(props.reportData, {
                str2Percent: true
            })
            .setTBodyStyle(
                {
                    v: 'bottom',
                    wrapText: true,
                    fontSize: 4,
                }
            )
            .setTHeadStyle({
                background: 'FF88c849',
                color: 'FF333333',
                fontSize: 4,
                bold: true,
                border: true,
                v: 'center',
                wrapText: true,
            })

            .saveAs(props.reportName + ".xlsx");
    };
    return (
        <>

            <Row style={{marginTop: 15}}>
                <Col span={24}>
                    <Table columns={props.reportColumns}
                           size={"small"}
                           dataSource={props.reportData}
                           scroll={{x: 'max-content'}}
                           pagination={{
                               total: props.reportData?.length,
                               pageSizeOptions: ['10', '50', '100', '500'],
                               defaultPageSize: 10,
                               showSizeChanger: true,
                               showTotal: (total) => total === 1 ? `Total ${total} item` : `Total ${total} items`
                           }}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space size={16} style={{float: 'right', marginTop: 10}}>
                        <Button type="primary" onClick={() => handleDownloadClick()}><DownloadOutlined/>Generate
                            Excel</Button>
                    </Space>
                </Col>
            </Row>

        </>
    );
}

export default ReportDataComp;
