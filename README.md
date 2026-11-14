# Weather API Practice｜氣象資料 API 串接練習

本 Repository 保存早期的台灣氣象開放資料 API 練習，包含即時測站觀測資料、鄉鎮天氣預報資料，以及 Python Notebook 的 JSON 結構探索。

## 內容

- `watherStationApi.js`：讀取測站觀測資料，依選擇地點顯示溫度、風速、濕度、日照及 24 小時雨量。
- `weatherDescriptionApi.js`：讀取天氣預報資料，嘗試顯示天氣現象、最高溫、最低溫及降雨機率。
- `findjsondata.ipynb`：使用 Python Requests、JSON 與 Pandas 探索氣象 API 回應結構。
- HTML：提供地點選單及天氣欄位的簡易展示頁。

## 技術

- JavaScript、XMLHttpRequest、DOM API
- Python、Requests、JSON、Pandas
- Taiwan weather open data API
- HTML

## 重要限制

- 部分 JavaScript 使用固定的 weatherElement 陣列索引，未完整處理欄位缺漏或回應格式變動。
- 預報程式的事件參數判斷存在反向邏輯問題，預設載入時可能因讀取 undefined event 而失敗。
- API 請求沒有完整的 HTTP status、timeout 及錯誤提示處理。
- 原始氣象 API 金鑰已在目前主分支程式及 Notebook 中替換為 `APIKey` 佔位值；Git 歷史未重寫，舊 commit 仍可能保留原始金鑰。
- 本次未重新呼叫 API 或執行 Notebook。

完整技術回顧請參閱 [PROJECT_RETROSPECTIVE.md](PROJECT_RETROSPECTIVE.md)。
