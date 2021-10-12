# Rent House
透過自動偵查讓 591 租屋網，
讓你租房不再慢人一步
自動推 LineNotify 讓你馬上知道第一手租屋消息

![](https://i.imgur.com/wvnFcYh.png)


## 安裝相關模組 Install
```
npm install
```

## Configuration
1. 去 591 租屋網設定你想要關注的設定
  ![](https://i.imgur.com/3p0TgZY.png)
2. 複製URL
  ![](https://i.imgur.com/hbotzcL.jpg)
3. 申請 Line Notify Token [連結](https://notify-bot.line.me/my/)
  ![](https://i.imgur.com/TXy9qGB.png)
4. 打開 `rentHouse/.envExample` 將檔名改為`.env`，並且設定相關資訊
    ```
    LINE_NOTIFY_TOKEN = <LINE_NOTIFY_TOKEN>   // 你申請的 LineNotify Token
    TARGET_URL = <TARGET_URL> // 你設定好的網址
    REQUEST_FREQUENCY = <REQUEST_FREQUENCY> // 多久爬一次 591 網站
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