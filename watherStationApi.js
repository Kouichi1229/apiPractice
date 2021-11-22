//指定DOM
var xhr = new XMLHttpRequest();
var area = document.querySelector('.area');
var date = document.querySelector('.date');
var tem = document.querySelector('.tem');
var winds = document.querySelector('.winds');
var humidity = document.querySelector('.humidity');
var suntimes = document.querySelector('.sun');
var rain_24hr = document.querySelector('.h_24r');

//綁定監聽事件
area.addEventListener('change', showWeather, false);



//串接台灣天氣api，將城市名稱代入html的選單中
function getWeather() {
    xhr.open('get', 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-1EF84EFB-3A18-45EE-AF0A-5BB8D44C13F1', true);
    xhr.send(null);
    xhr.onload = function() {
        var dataObject = JSON.parse(xhr.responseText);
        var len = dataObject.records.location.length;
        for (var i = 0; i < len; i++) {
            var city = dataObject.records.location[i].locationName;
            var option = document.createElement('option');
            option.textContent = city;
            area.appendChild(option);
        }
        showWeather();
    }
}
getWeather();


//選擇城市後，顯示相對應天氣狀況
function showWeather(e) {
    /*顯示預設值可以在 xhr.onload() 裡面執行 showWeather()，然後在 showWeather()，裡面增加判斷式若沒有 e 則設定 select 的預設值，反之則是設定 e.target.value*/
    var select;
    if (!e) {
        select = 'Taipei';
    } else {
        select = e.target.value;
    }
    var dataObject = JSON.parse(xhr.responseText);
    var len = dataObject.records.location.length;
    for (var i = 0; i < len; i++) {
        var temList = dataObject.records.location[i].weatherElement[3].elementValue;
        var windsList = dataObject.records.location[i].weatherElement[2].elementValue;
        var humidityList = dataObject.records.location[i].weatherElement[4].elementValue;
        var datelist = dataObject.records.location[i].time.obsTime;
        var sunList = dataObject.records.location[i].weatherElement[10].elementValue;
        var rainList = dataObject.records.location[i].weatherElement[6].elementValue;

        if (select == dataObject.records.location[i].locationName) {
            tem.textContent = temList + '度';
            winds.textContent = windsList + '(M/s)';
            humidity.textContent = humidityList * 100 + '(%)';
            date.textContent = datelist;
            suntimes.textContent = sunList;
            rain_24hr.textContent = rainList;
        }
    }
}