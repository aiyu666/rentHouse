require('dotenv').config();

const { getRequest } = require('./lib/request');
const sendLineNotify = require('./lib/sendLineNotify');
const getFirstPostId = require('./lib/getFirstPostId');
const getToken = require('./lib/getToken');

let stopIntervalId;
let countFail = 0;
(async () => {
  let originPostId = await getFirstPostId();
  stopIntervalId = setInterval(async () => {
    console.log(`${new Date()}: '我還活著'`);
    const headerInfo = await getToken();
    const houseListURL = `https://rent.591.com.tw/home/search/rsList?${process.env.TARGET_URL.split('?')[1]}`;
    const csrfToken = headerInfo[0];
    const cookie = headerInfo[1];
    try {
      const resp = await getRequest({
        url: houseListURL,
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          Cookie: cookie,
        },
        json: true,
      });
      if (resp.statusCode !== 200) {
        const error = new Error(`Token 可能過期了，目前 StatusCode: ${resp.statusCode}`);
        throw error;
      }
      const { data } = resp.body.data;
      const targetData = (data[0].post_id !== originPostId) ? data[0].post_id : originPostId;
      if (targetData === originPostId) return;
      await sendLineNotify(`\nhttps://rent.591.com.tw/rent-detail-${targetData}.html`, process.env.LINE_NOTIFY_TOKEN);
      originPostId = targetData;
    } catch (error) {
      if (countFail > 10) {
        await sendLineNotify(`\n好像出事了! 但是我嘗試重新拿 Token 第 ${countFail} 次了所以暫時先把程式關閉，有空可以檢查一下。\n `, process.env.LINE_NOTIFY_TOKEN);
        clearInterval(stopIntervalId);
      }
      console.error(`Fetch the 591 rent fail: ${error}`);
      countFail += 1;
    }
  }, process.env.REQUEST_FREQUENCY);
})();
