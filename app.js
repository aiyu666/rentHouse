require('dotenv').config();
const http = require('http');

const { getRequest } = require('./lib/request');
const sendLineNotify = require('./lib/sendLineNotify');
const getToken = require('./lib/getToken');

let nowTimestamp = Math.floor(Date.now() / 1000);
let stopIntervalId;
let countFail = 0;
let serviceStatus = true;

(() => {
  stopIntervalId = setInterval(async () => {
    const headerInfo = await getToken();
    const csrf_token = headerInfo[0];
    const cookie = headerInfo[1];
    const servicePing = await getRequest(`http://localhost:${process.env.PORT || 5000}/ping`);
    if(servicePing.statusCode !== 200){
      console.error('Ping fail plz check it.')
      serviceStatus = false;
      clearInterval(stopIntervalId);
    }
    try {
      const resp = await getRequest({
        url: process.env.TARGET_URL,
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

const server = http.createServer(function (req, res) {
  if(!serviceStatus){
    console.error(`Service stopping.`)
    res.writeHead(500,{'Content-Type':'text/html'});
    return res.end('Service have some problem QQ plz check the log.');  
  }
  if(req.url=='/ping'){
    console.log('我還活著!')
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('pong');
    return res.end();
  }
  res.writeHead(400,{'Content-Type':'text/html'});
  return res.end('Invalid Request!');
});

server.listen(process.env.PORT || 5000);
 
console.log(`Node.js web server at port ${process.env.PORT || 5000} is running..`)
