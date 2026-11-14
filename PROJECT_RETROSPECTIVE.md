# Weather API Practice：技術經歷回顧

> 本文件依據 JavaScript、HTML 與 Python Notebook 整理，未重新呼叫歷史 API 或重新執行 Notebook。

## 1. 專案定位

這個 Repository 是早期氣象資料 API 串接練習，主要探索如何取得測站即時觀測資料及鄉鎮天氣預報，解析 JSON 並呈現在簡易網頁中。

## 2. 即時測站資料

主要檔案：`watherStationApi.js`

可由程式碼確認的流程：

1. 使用 XMLHttpRequest 發送 GET 請求至氣象開放資料測站觀測 API。
2. 解析 JSON 中的 `records.location` 清單。
3. 將各測站地點名稱加入 HTML select。
4. 使用者切換地點時，依 locationName 找出對應測站。
5. 從 weatherElement 讀取溫度、風速、濕度、日照及 24 小時累積雨量。
6. 將結果更新到 DOM 欄位。

程式使用固定索引讀取 weatherElement，代表當時已開始處理外部 JSON 的巢狀結構與欄位對應，但尚未抽象成依 elementName 查找的彈性解析方式。

## 3. 天氣預報資料

主要檔案：`weatherDescriptionApi.js`

- 使用 XMLHttpRequest 取得預報 API 回應。
- 解析多個地點及其 weatherElement。
- 嘗試呈現天氣現象、最高溫、最低溫及降雨機率。
- 透過地點選單切換預報資訊。

**已知程式問題：** `showWeatherDescription(e)` 的條件判斷為 `if (e)` 時直接指定預設地點，`else` 才讀取 `e.target.value`。但初始化時呼叫 `showWeatherDescription()` 沒有傳入事件，會進入讀取 `e.target` 的分支，可能產生錯誤。這段程式應定位為介接練習，不能宣稱預報選單已完整驗證。

## 4. Python JSON 探索 Notebook

檔案：`findjsondata.ipynb`

Notebook 使用：

- Requests 發送 HTTP GET 請求。
- 檢查回應 status code。
- 使用 `res.json()` 解析 JSON。
- 逐層存取 records、location、weatherElement 等欄位。
- 透過 Pandas 輔助資料檢視。

保存的執行輸出包含測站地點、座標、觀測時間及風速、溫度、濕度、雨量等欄位資料，能佐證當時有進行 API 回應結構探索。

## 5. 技術能力摘要

| 技術 | 程式證據 | 合理定位 |
|---|---|---|
| JavaScript | XMLHttpRequest、事件監聽、DOM 更新 | 有原生 JavaScript 網頁互動經驗 |
| REST API | 呼叫氣象觀測及預報端點 | 有第三方 API 串接經驗 |
| JSON | 解析 records、location、weatherElement | 有巢狀 JSON 資料處理經驗 |
| Python Requests | Notebook HTTP 請求 | 有 Python API 請求經驗 |
| Pandas | Notebook 資料檢視 | 有使用 Pandas 探索資料經驗 |
| HTML | 地點選單與天氣欄位 | 有基礎資料展示頁實作經驗 |

## 6. 履歷描述建議

使用 JavaScript XMLHttpRequest 串接氣象開放資料 API，解析測站觀測與天氣預報 JSON，依地點更新溫度、風速、濕度、日照及降雨資訊；另使用 Python Requests 與 Pandas 探索 API 回應結構及欄位內容。

## 7. 憑證處理紀錄

目前主分支已將 `watherStationApi.js`、`weatherDescriptionApi.js`、Notebook 及 checkpoint 中可見的氣象 API 金鑰替換為 `APIKey` 佔位值。Git commit history 未重寫，舊 commit 仍可能保留原始金鑰；若金鑰仍有效，應至原服務管理端撤銷或重新產生。

## 8. 驗證界線

- 未重新呼叫氣象 API。
- 未重新執行 Notebook。
- 未測試目前瀏覽器對歷史 API 的 CORS、憑證及回應相容性。
- 本文件描述程式碼中可辨識的實作與限制，不宣稱歷史頁面目前仍可正常運作。
