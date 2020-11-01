const { postRequest } = require('./request');

module.exports = async (messageContent, lineNotifiyToken) => {
  console.log('送提醒喔');
  const options = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'content-type': 'multipart/form-data',
      authorization: `Bearer ${lineNotifiyToken}`,
    },
    formData: { message: messageContent },
  };
  const resp = await postRequest(options);
  return resp;
};
