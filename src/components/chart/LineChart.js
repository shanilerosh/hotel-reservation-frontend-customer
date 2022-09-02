
import ReactApexChart from "react-apexcharts";
import {Typography} from "antd";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Monthly Revenue</Title>
          <Paragraph className="lastweek">
            Current Year <span className="bnb2">+30%</span>
          </Paragraph>
        </div>

      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
