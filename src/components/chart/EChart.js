import ReactApexChart from "react-apexcharts";
import {Typography} from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;



  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Active Members</Title>
        <Paragraph className="lastweek">
         Current Year <span className="bnb2">+30%</span>
        </Paragraph>

      </div>
    </>
  );
}

export default EChart;
