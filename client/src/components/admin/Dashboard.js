import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import filter from "../../utils/filterData";

const osChart = data => (
  <FunnelChart width={730} height={250}>
    <Tooltip />
    <Funnel dataKey="num" data={data} isAnimationActive>
      <LabelList position="right" fill="#000" stroke="none" dataKey="type" />
    </Funnel>
  </FunnelChart>
);

const BrowserChart = data => (
  <BarChart width={730} height={250} data={data} barSize={6}>
    <XAxis dataKey="type"></XAxis>
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="chrome" fill="#82ca9d" />
    <Bar dataKey="fireFox" fill="#8884d8" />
    <Bar dataKey="Explorer" fill="blue" />
  </BarChart>
);

const Dashboard = ({ logData, type }) => {
  if (type === "browser") {
    const browserData = filter.browserData(logData);
    return BrowserChart(browserData);
  }

  if (type === "os") {
    const osData = filter.osData(logData);
    return osChart(osData);
  }
};

export default Dashboard;
