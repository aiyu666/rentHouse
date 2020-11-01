require('dotenv').config();

const { getRequest } = require('./lib/request');
const sendLineNotify = require('./lib/sendLineNotify');

let nowTimestamp = Math.floor(Date.now() / 1000);

(() => {
  setInterval(async () => {
    console.log(`${new Date()}: '我還活著'`);
    try {
      const resp = await getRequest({
        url: process.env.TARGET_URL,
        headers: {
          'X-CSRF-TOKEN': process.env.X_CSRF_TOKEN,
          Cookie: process.env.COOKIE,
        },
        json: true,
      });
      const { data } = resp.body.data;
      const targetData = data.filter((post) => post.updatetime > nowTimestamp);
      if (targetData.length === 0) return;
      nowTimestamp = targetData[0].updatetime;
      for (let i = 0; i < targetData.length; i += 1) {
        sendLineNotify(`\nhttps://rent.591.com.tw/rent-detail-${targetData[i].id}.html`, process.env.LINE_NOTIFY_TOKEN);
      }
    } catch (error) {
      console.error(`Fetch the 591 rent fail: ${error}`);
      sendLineNotify('\n好像出事了! 檢查一下吧。');
    }
  }, process.env.REQUEST_FREQUENCY);
})();
