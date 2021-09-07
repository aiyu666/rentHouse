const { getRequest } = require('./request');
const getToken = require('./getToken');
require('dotenv').config();

module.exports = async () => {
    const headerInfo = await getToken(process.env.TARGET_URL);
    const houseListURL = `https://rent.591.com.tw/home/search/rsList?${process.env.TARGET_URL.split('?')[1]}`;
    const csrf_token = headerInfo[0];
    const cookie = headerInfo[1];
    const resp = await getRequest({
    url: houseListURL,
    headers: {
        'X-CSRF-TOKEN': csrf_token,
        'Cookie': cookie,
    },
    json: true,
    });
    if(resp.statusCode !== 200) throw `Token 可能過期了，目前 StatusCode: ${resp.statusCode}`;
    return resp.body.data.data[0].post_id;
};
