var xhr = new XMLHttpRequest();
var area = document.querySelector('.area');
var Wx = document.querySelector('.Wx');
var MaxT = document.querySelector('.MaxT');
var MinT = document.querySelector('.MinT');
var PoP = document.querySelector('.PoP');


//綁定監聽事件
area.addEventListener('change', showWeatherDescription, false);

function getWeatherDescription() {
    xhr.open('get', 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1EF84EFB-3A18-45EE-AF0A-5BB8D44C13F1&locationName=%E8%87%BA%E5%8C%97%E5%B8%82,%E6%96%B0%E5%8C%97%E5%B8%82');
    xhr.send(null);
    xhr.onload = function() {
            var dataObject = JSON.parse(xhr.responseText);
            var len = dataObject.records.location.length;
            for (var i = 0; i < len; i++) {
                var city = dataObject.records.location[i].locationName;
                var option = document.createElement('option');
                option.textContent = city;
                area.appendChild(option);
            } //end of for loop
            showWeatherDescription();
        } //end of xhr.onload
} //end of getWeatherDescription
getWeatherDescription();

function showWeatherDescription(e) {
    var select;
    if (e) {
        select = '臺北市'
    } else {
        select = e.target.value;
    } // end of else if
    var dataObject = JSON.parse(xhr.responseText);
    var len = dataObject.records.location.length;
    for (var i = 0; i < len; i++) {
        var wxList = dataObject.records.location[i].weatherElement[0].time[0].parameter.parameterName;
        var max_tList = dataObject.records.location[i].weatherElement[4].time[0].parameter.parameterName;
        var min_tList = dataObject.records.location[i].weatherElement[2].time[0].parameter.parameterName;
        var pop_List = dataObject.records.location[i].weatherElement[1].time[0].parameter.parameterName;
        if (select == dataObject.records.location[i].locationName) {
            Wx.textContent = wxList;
            MaxT.textContent = max_tList + '度';
            MinT.textContent = min_tList + '度';
            PoP.textContent = pop_List + "%";
        } //end of id
    } //end of for loop
} //end of showWeatherDescription