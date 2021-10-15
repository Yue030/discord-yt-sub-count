# YT訂閱數通知Discord機器人 (開發中，README等待Release才更新)


![GitHub release (latest by date)](https://img.shields.io/github/v/release/Yue030/discord-yt-sub-count)
![GitHub last commit](https://img.shields.io/github/last-commit/yue030/discord-yt-sub-count)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yue030/discord-yt-sub-count)
![GitHub issues](https://img.shields.io/github/issues-raw/yue030/discord-yt-sub-count)
![GitHub](https://img.shields.io/github/license/Yue030/discord-yt-sub-count)

[![hackmd-github-sync-badge](https://hackmd.io/kLes1yobSLyIWwWQo2JH5A/badge)](https://hackmd.io/kLes1yobSLyIWwWQo2JH5A)

## 演示預覽
### 查看訂閱數，及設定通知頻道
![](https://i.imgur.com/8ajsTyd.gif)

### 訂閱數通知
當Call Youtube Data API v3 後訂閱數有更新時，會在通知頻道顯示以下訊息

![](https://i.imgur.com/vi4jxvt.png)

## 目錄
- [YT訂閱數通知Discord機器人](#yt訂閱數通知discord機器人)
  - [演示預覽](#演示預覽)
    - [查看訂閱數，及設定通知頻道](#查看訂閱數及設定通知頻道)
    - [訂閱數通知](#訂閱數通知)
  - [目錄](#目錄)
  - [安裝](#安裝)
    - [安裝方法](#安裝方法)
    - [配置檔案](#配置檔案)
    - [獲取機器人token](#獲取機器人token)
    - [獲取Google API Key](#獲取google-api-key)
      - [Prefix 自訂義](#prefix-自訂義)
    - [欲查詢頻道設置](#欲查詢頻道設置)
    - [邀請機器人](#邀請機器人)
  - [啟動機器人](#啟動機器人)
  - [LICENSE: GNU General Public License v3.0](#license-gnu-general-public-license-v30)

## 安裝
Node.js v16.11 UP - https://nodejs.org/en/

Git - https://git-scm.com/downloads

### 安裝方法
```
git init
git clone https://github.com/Yue030/discord-yt-sub-count.git
```
OR

點選 Code -> Download ZIP

![](https://i.imgur.com/lfk5OjE.png)

### 配置檔案
config.json
```json
{
    "token": "",
    "prefix": "",
    "yt-channel-id": ""
}
```

**token**
> Discord機器人token

**prefix**
> 指令前綴

**yt-channel-id**
> 欲查詢訂閱數的頻道

### 獲取機器人token
請開啟 [Discord Developer Portal](https://discord.com/developers/) 並點選右上角的New Application

![](https://i.imgur.com/aflg7Gq.png)

輸入Application名稱 (不影響機器人名稱)，並點選Create

![](https://i.imgur.com/vMxFdnu.png)

點選左側Bot

![](https://i.imgur.com/VCmWWvD.png)

並按下Add Bot

![](https://i.imgur.com/bosyQQW.png)

進入到此頁面，你可以在這個時候更改機器人的頭貼及名稱

![](https://i.imgur.com/90DBNcL.png)

點選 Token 區塊的 Copy

![](https://i.imgur.com/RVpcY2D.png)

將複製下來的token在config.json的token屬性的""中貼上

### 獲取Google API Key
到 [Google Cloud Platform](https://console.developers.google.com/?hl=zh-tw) 建立一個專案

![](https://i.imgur.com/XWRxleN.png)

建立過後，打開左邊的選單

找到API和服務，並點選憑證

![](https://i.imgur.com/Hop3nLX.png)

點選上方 **建立憑證** - **API金鑰**

![](https://i.imgur.com/LG2Nucy.png)

將獲取到的API金鑰複製起來

![](https://i.imgur.com/mk68VRQ.jpg)

將複製下來的金鑰在config.json的google-api-key屬性的""中貼上

#### Prefix 自訂義
更改config.json的prefix屬性

若設置為 "!"

輸入指令時必須輸入
```
!count
!set #(頻道名稱)
```
才會有效果

若設置為 "M$"

則輸入指令格式為輸入
```
M$count
M$set #(頻道名稱)
```

### 欲查詢頻道設置
請打開您這個DD仔推的Vtuber的頻道

並在網址處複製頻道ID

> 若顯示的是頻道名稱
> 
> 請點一部影片，再點頭像，才可以看到ID

![](https://i.imgur.com/0foqTwL.png)

將複製下來的頻道ID在config.json的yt-channel-id屬性的""中貼上

由於目前設定關係，不好意思

**我們只支援單推**

若您堅持DD，請另外設置機器人，並重複上述所有操作
> 貼心提醒: Google API Key 不可重複使用

### 邀請機器人
回到 [Discord Developer Portal](https://discord.com/developers/) 並點選剛剛創建的Application 點擊OAuth2

![](https://i.imgur.com/r9GoNPz.png)

到OAuth2 URL Generator區塊，並點選bot選項

![](https://i.imgur.com/AZ40dNA.png)

並在下方的BOT PERMISSIONS開啟Adminstrator權限

![](https://i.imgur.com/Vlc6Nxg.png)

複製下方連結

![](https://i.imgur.com/baEM9hQ.png)

並在瀏覽器貼上此連結，選取伺服器後，按下繼續

![](https://i.imgur.com/Vijk6fa.png)

按下授權

![](https://i.imgur.com/hmIXsMV.png)

機器人將會進到指定的群組


## 啟動機器人
開啟命令提示字元(cmd)並切換到機器人檔案的資料夾

輸入
```
npm install
npm start
```
即可執行

## LICENSE: [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0)





