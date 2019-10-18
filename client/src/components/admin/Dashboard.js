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
  LabelList,
  Line,
  LineChart,
  CartesianGrid
} from "recharts";
import filter from "../../utils/filterData";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  timeTitleArea: {
    marginLeft: "40%",
    marginBottom: "5%"
  },
  titleArea: {
    marginLeft: "42%",
    marginBottom: "5%"
  },
  staticsArea: {
    marginLeft: "24%"
  },
  typoArea: {
    marginTop: "5%",
    marginLeft: "15%"
  },
  mainTypo: {
    fontWeight: "700",
    fontSize: "30px",
    margin: theme.spacing(1)
  },
  subTypo: {
    fontWeight: "100",
    fontSize: "20px",
    margin: theme.spacing(1)
  }
}));

const osChart = ({ osData, maxOs, classes }) => (
  <div>
    <div className={classes.titleArea}>
      <span className={classes.subTypo}>OS 별 접속 현황</span>
    </div>
    <div className={classes.staticsArea}>
      <FunnelChart width={730} height={250}>
        <Tooltip />
        <Funnel dataKey="num" data={osData} isAnimationActive>
          <LabelList
            position="right"
            fill="#000"
            stroke="none"
            dataKey="type"
          />
        </Funnel>
      </FunnelChart>
      <div className={classes.typoArea}>
        <span className={classes.subTypo}>가장 많이 접속한 OS는</span>
        <span className={classes.mainTypo}>{maxOs[0].type}</span>
        <span className={classes.subTypo}>입니다</span>
      </div>
    </div>
  </div>
);

const BrowserChart = ({ browserData, maxBrowser, classes }) => (
  <div>
    <div className={classes.titleArea}>
      <span className={classes.subTypo}>브라우저별 접속 현황</span>
    </div>
    <div className={classes.staticsArea}>
      <BarChart width={730} height={250} data={browserData} barSize={6}>
        <XAxis dataKey="type"></XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="chrome" fill="#82ca9d" />
        <Bar dataKey="fireFox" fill="#8884d8" />
        <Bar dataKey="Explorer" fill="blue" />
      </BarChart>
      <div className={classes.typoArea}>
        <span className={classes.subTypo}>가장 많이 접속한 브라우저는</span>
        <span className={classes.mainTypo}>{maxBrowser[0].type}</span>
        <span className={classes.subTypo}>입니다</span>
      </div>
    </div>
  </div>
);

const UserByTimeChart = ({ timeData, maxTime, classes }) => {
  return (
    <div>
      <div className={classes.timeTitleArea}>
        <span className={classes.subTypo}>유저 시간대별 접속 현황</span>
      </div>
      <div className={classes.staticsArea}>
        <LineChart
          width={730}
          height={250}
          data={timeData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="num" stroke="#8884d8" />
        </LineChart>
        <div className={classes.typoArea}>
          <span className={classes.subTypo}>가장 많이 접속한 시간대는</span>
          <span className={classes.mainTypo}>{maxTime[0].type}</span>
          <span className={classes.subTypo}>입니다</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ logData, type }) => {
  const classes = useStyles();

  if (type === "browser") {
    const filterData = filter.browserData(logData);
    const { browserData, maxBrowser } = filterData;
    return BrowserChart({ browserData, maxBrowser, classes });
  }

  if (type === "os") {
    const filterData = filter.osData(logData);
    const { osData, maxOs } = filterData;
    return osChart({ osData, maxOs, classes });
  }

  if (type === "time") {
    const filterData = filter.userByTimeData(logData);
    const { timeData, maxTime } = filterData;
    return UserByTimeChart({ timeData, maxTime, classes });
  }
};

export default Dashboard;
