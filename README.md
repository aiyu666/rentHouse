# Rent House
透過自動偵查讓 591 租屋網，
讓你租房不再慢人一步
自動推 LineNotify 讓你馬上知道第一手租屋消息

## Install
```
npm install
```

## Config
Create a `.env` file.
Set below information
```
LINE_NOTIFY_TOKEN = <LINE_NOTIFY_TOKEN>  // Line notify token you need to apply in your account
X_CSRF_TOKEN = <X_CSRF_TOKEN> // 591 csrf token you need to get from the 591 webside
COOKIE = <COOKIE> // 591 cookie you need to get from the 591 webside
TARGET_URL = <TARGET_URL> // the target url you want to get the first hand in 591
REQUEST_FREQUENCY = <REQUEST_FREQUENCY> // the frequency you want to check
```
## Run
```
npm run start
```

Then ...
Enjoy it !