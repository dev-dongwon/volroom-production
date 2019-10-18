const filter = {
  browserData: data => {
    const chrome = data.filter(val => {
      return val.browser === "Chrome";
    });

    const firefox = data.filter(val => {
      return val.browser === "Firefox";
    });

    const explorer = data.filter(val => {
      return val.browser === "Explorer";
    });

    const browserData = [
      { type: "chrome", chrome: chrome.length, num: chrome.length },
      { type: "fireFox", fireFox: firefox.length, num: firefox.length },
      { type: "explorer", exlorer: explorer.length, num: explorer.length }
    ];

    const maxBrowserNum = Math.max.apply(
      null,
      browserData.map(val => {
        return val.num;
      })
    );
    const maxBrowser = browserData.filter(val => val.num === maxBrowserNum);

    return { browserData, maxBrowser };
  },
  osData: data => {
    const linux = data.filter(val => {
      return val.os === "Linux";
    });

    const windows = data.filter(val => {
      return val.os === "Windows";
    });

    const other = data.filter(val => {
      return val.os !== "Windows" && val.os !== "Linux";
    });

    const osData = [
      { type: "linux", num: linux.length, fill: "#8884d8" },
      { type: "windows", num: windows.length, fill: "#8dd1e1" },
      { type: "other", num: other.length, fill: "#a4de6c" }
    ];

    const maxOsNum = Math.max.apply(
      null,
      osData.map(val => {
        return val.num;
      })
    );
    const maxOs = osData.filter(val => val.num === maxOsNum);

    return { osData, maxOs };
  },
  userByTimeData: data => {
    const dawn = data.filter(val => {
      return new Date(val.date).getHours() > 0 && new Date(val.date).getHours() <= 6;
    });

    const morning = data.filter(val => {
      return new Date(val.date).getHours() > 6 && new Date(val.date).getHours() <= 9;
    });

    const day = data.filter(val => {
      return new Date(val.date).getHours() > 9 && new Date(val.date).getHours() <= 12;
    });

    const afternoon = data.filter(val => {
      return new Date(val.date).getHours() > 12 && new Date(val.date).getHours() <= 18;
    });

    const evening = data.filter(val => {
      return new Date(val.date).getHours() > 18 && new Date(val.date).getHours() <= 24;
    });

    const timeData = [
      { type: '새벽', num: dawn.length },
      { type: '아침', num: morning.length },
      { type: '낮', num: day.length },
      { type: '오후', num: afternoon.length },
      { type: '저녁', num: evening.length }
    ];

    const maxTimeNum = Math.max.apply(
      null,
      timeData.map(val => {
        return val.num;
      })
    );
    const maxTime = timeData.filter(val => val.num === maxTimeNum);

    return { timeData, maxTime };
  }
};

export default filter;
