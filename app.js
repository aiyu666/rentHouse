require('dotenv').config();

const { getRequest } = require('./lib/request');
const sendLineNotify = require('./lib/sendLineNotify');
const getToken = require('./lib/getToken');

let nowTimestamp = Math.floor(Date.now() / 1000);
let stopIntervalId;
let countFail = 0;

(() => {
  stopIntervalId = setInterval(async () => {
    console.log(`${new Date()}: '我還活著'`);
    const headerInfo = await getToken(process.env.TARGET_URL);
    const houseListURL = `https://rent.591.com.tw/home/search/rsList?${process.env.TARGET_URL.split('?')[1]}`;
    const csrf_token = headerInfo[0];
    const cookie = headerInfo[1];
    try {
      const resp = await getRequest({
        url: houseListURL,
        headers: {
          'X-CSRF-TOKEN': csrf_token,
          'Cookie': cookie,
        },
        json: true,
      });
      if(resp.statusCode !== 200) throw `Token 可能過期了，目前 StatusCode: ${resp.statusCode}`;
      const { data } = resp.body.data;
      const targetData = data.filter((post) => post.updatetime > nowTimestamp);
      if (targetData.length === 0) return;
      nowTimestamp = targetData[0].updatetime;
      for (let i = 0; i < targetData.length; i += 1) {
        await sendLineNotify(`\nhttps://rent.591.com.tw/rent-detail-${targetData[i].id}.html`, process.env.LINE_NOTIFY_TOKEN);
      }
    } catch (error) {
      if(countFail > 10) {
        await sendLineNotify(`\n好像出事了! 但是我嘗試重新拿 Token 第 ${countFail} 次了所以暫時先把程式關閉，有空可以檢查一下。\n `, process.env.LINE_NOTIFY_TOKEN);
        clearInterval(stopIntervalId);
      }  
      console.error(`Fetch the 591 rent fail: ${error}`);
      countFail += 1;
    }
  }, process.env.REQUEST_FREQUENCY);
})();
