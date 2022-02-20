const { getRequest } = require('./request');

module.exports = async () => {
  const regExp = new RegExp('<meta name="csrf-token" content="([A-Za-z0-9]*)">', 'gi');
  const response = await getRequest({
    url: 'https://rent.591.com.tw',
    json: true,
  });
  const csrfToken = regExp.exec(response.body)[1];
  const cookie = response.headers['set-cookie'].filter((data) => data.includes('591_new_session'))[0];
  return [csrfToken, cookie];
};
