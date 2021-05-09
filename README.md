# Rent House
透過自動偵查讓 591 租屋網，
讓你租房不再慢人一步
自動推 LineNotify 讓你馬上知道第一手租屋消息

![](https://i.imgur.com/wvnFcYh.png)


## Install
```
npm install
```

## Configuration
1. 打開`開發人員工具`
2. 找到 `network` 找到 `XHR` 
3. 去 591 租屋網設定你想要關注的設定
  ![](https://i.imgur.com/3p0TgZY.png)
4. 抓到我們要的資料
  ![](https://i.imgur.com/M3BKEq8.png)
5. 找出 Header 中的 `URL`
     * URL
    ![](https://i.imgur.com/cwep44R.png)
6. 申請 Line Notify Token [連結](https://notify-bot.line.me/my/)
  ![](https://i.imgur.com/TXy9qGB.png)

7. 設定 `.env`
    ```
    LINE_NOTIFY_TOKEN = <LINE_NOTIFY_TOKEN>  
    X_CSRF_TOKEN = <X_CSRF_TOKEN> 
    COOKIE = <COOKIE> 
    TARGET_URL = <TARGET_URL> 
    REQUEST_FREQUENCY = <REQUEST_FREQUENCY>
    ```
    > REQUEST_FREQUENCY 單位為毫秒，所以一秒就是 `1000`，建議不要調太低。

## Run
```
npm run start
or
node app.js
```

Then ...
Enjoy it !

![](https://i.imgur.com/wvnFcYh.png)


# Note
heroku 分支可以部署到 heroku 就不用自己在 local run

有問題的話請聯絡我:
email: zrobin8741@gmail.com