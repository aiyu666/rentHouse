const { getRequest } = require('./request');

module.exports = async (target_url) => {
        let reg_exp = new RegExp("<meta name=\"csrf-token\" content=\"([A-Za-z0-9]*)\">", "gi");
        const response = await getRequest({
            url: target_url,
            json: true,
          });
        let csrf_token = reg_exp.exec(response.body)[1];
        const cookie = response.headers["set-cookie"].filter((data)=> data.includes('591_new_session'))[0];
        return [csrf_token, cookie]
}