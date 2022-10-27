const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const getTime = () => {
  const d = dayjs().tz("America/Guayaquil");
  return `${d.format("HH:mm")}`;
};

console.log(getTime());

module.exports = getTime;
