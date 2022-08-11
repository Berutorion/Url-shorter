# Url-shorter|短網址產生器

## 介紹
讓使用者可以將長長的網址變短的小工具

## 主要功能
- 將網址縮短為短網址
- 將縮短後的短網址一鍵複製
- 可以利用短網址進行跳轉

##提升使用者體驗
1.禁止使用者輸入空白字串
2.輸入錯誤的短網址會跳出錯誤提示

## 開始使用
1.請先確認本地是否有安裝npm及Node.js 
2.將本專案下載到本地 
3.在專案跟目錄建立 .env 檔案，並在.env中輸入以下
```bash
MONGODB_URL = <your mongoDB url>
```
4.啟動專案
```bash
npm run start
```
5.如果server有正常啟動會出現
```bash
Server is working on http://localhost:3000
```
6.如果正常連到MongoDB回出現
```bash
Connect to mongoDB.
```
7.當上面兩項都有出現便可開啟瀏覽器輸入
```bash
http://localhost:3000
```
## 使用技術
- "dotenv": "^16.0.1"
- "express": "^4.18.1"
- "express-handlebars": "^6.0.6"
- "method-override": "^3.0.0"
- "mongoose": "^6.5.1"
