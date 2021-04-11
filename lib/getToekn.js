const { getRequest } = require('./request');

module.exports = async () => {
        let rent_home_url = "https://rent.591.com.tw/";
        let reg_exp = new RegExp("<meta name=\"csrf-token\" content=\"([A-Za-z0-9]*)\">", "gi");
        const response = await getRequest({
            url: rent_home_url,
            json: true,
          });
        let csrf_token = reg_exp.exec(response.body)[1];
        const cookie = response.headers["set-cookie"][4];   
        return [csrf_token, cookie]
}