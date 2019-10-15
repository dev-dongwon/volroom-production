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
      { type: "chrome", chrome: chrome.length },
      { type: "fireFox", fireFox: firefox.length },
      { type: "explorer", exlorer: explorer.length }
    ];

    return browserData;
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

    return osData;
  }
};

export default filter;
