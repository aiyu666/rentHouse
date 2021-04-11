require('dotenv').config();

const { getRequest } = require('./lib/request');
const sendLineNotify = require('./lib/sendLineNotify');
const getToken = require('./lib/getToken');

let nowTimestamp = Math.floor(Date.now() / 1000);
let stopIntervalId;
let csrf_token = process.env.X_CSRF_TOKEN;
let cookie = process.env.COOKIE;
(() => {
  stopIntervalId = setInterval(async () => {
    console.log(`${new Date()}: '我還活著'`);
    
    try {
      const resp = await getRequest({
        url: process.env.TARGET_URL,
        headers: {
          'X-CSRF-TOKEN': csrf_token,
          'Cookie': cookie,
        },
        json: true,
      });
      const headerInfo = await getToken();
      csrf_token = headerInfo[0];
      cookie = headerInfo[1];    
      const { data } = resp.body.data;
      const targetData = data.filter((post) => post.updatetime > nowTimestamp);
      if (targetData.length === 0) return;
      nowTimestamp = targetData[0].updatetime;
      for (let i = 0; i < targetData.length; i += 1) {
        await sendLineNotify(`\nhttps://rent.591.com.tw/rent-detail-${targetData[i].id}.html`, process.env.LINE_NOTIFY_TOKEN);
      }
    } catch (error) {
      clearInterval(stopIntervalId);
      console.error(`Fetch the 591 rent fail: ${error}`);
      await sendLineNotify('\n好像出事了! 檢查一下吧。', process.env.LINE_NOTIFY_TOKEN);
    }
  }, process.env.REQUEST_FREQUENCY);
})();
