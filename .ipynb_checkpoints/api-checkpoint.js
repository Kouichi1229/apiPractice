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
    xhr.open('get', 'https://data.coa.gov.tw/api/v1/AutoWeatherStationType/', true);
    xhr.send(null);
    xhr.onload = function() {
        var dataObject = JSON.parse(xhr.responseText);
        var len = dataObject.Data.length;
        for (var i = 0; i < len; i++) {
            var city = dataObject.Data[i].Station_name;
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
    var len = dataObject.Data.length;
    for (var i = 0; i < len; i++) {
        var temList = dataObject.Data[i].TEMP;
        var windsList = dataObject.Data[i].WDSD;
        var humidityList = dataObject.Data[i].HUMD;
        var datelist = dataObject.Data[i].TIME;
        var sunList = dataObject.Data[i].SUN;
        var rainList = dataObject.Data[i].H_24R;

        if (select == dataObject.Data[i].Station_name) {
            tem.textContent = temList + '度';
            winds.textContent = windsList + '(M/s)';
            humidity.textContent = humidityList * 100 + '(%)';
            date.textContent = datelist;
            suntimes.textContent = sunList;
            rain_24hr.textContent = rainList;
        }
    }
}