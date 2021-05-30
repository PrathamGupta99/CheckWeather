//console.log("Welcome to CheckWeather.Com")

let searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', searchButtonHandler)

let dailyBtn = document.getElementById('daily')
dailyBtn.addEventListener('click', dailyButtonHandler)

let hourlyBtn = document.getElementById('hourly')
hourlyBtn.addEventListener('click', hourlyButtonHandler)

let moreBtn = document.getElementById('more')
moreBtn.addEventListener('click', moreButtonHandler)

let search = document.getElementById('searchTxt')
let tableBodyD = document.getElementById('tbodyD')
let tableBodyH = document.getElementById('tbodyH')

var DateO
var Name
var Country
var Icon
var Temprature
var Description
var Feel
var Visibility
var Sunrise
var Sunset
var Timezone
var Last_Update
var Pressure
var Humidity
var Longitude
var Latitude

function writeDateTime(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()
    //console.log(dateObject.toLocaleString("en-US", { weekday: "long" }))
    //console.log(dateObject.toLocaleString("en-US", { month: "long" }))
    //console.log(dateObject.toLocaleString("en-US", { day: "numeric" }))
    //console.log(dateObject.toLocaleString("en-US", { year: "numeric" }))
    //console.log(dateObject.toLocaleString("en-US", { hour: "numeric" }))
    //console.log(dateObject.toLocaleString("en-US", { minute: "numeric" }))
    //console.log(dateObject.toLocaleString("en-US", { second: "numeric" }))
    //console.log(dateObject.toLocaleString("en-US", { timeZoneName: "short" }))

    // return 
}

function writeTime(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()
    let hour = dateObject.toLocaleString("en-US", { hour: "numeric" })
    let minute = dateObject.toLocaleString("en-US", { minute: "numeric" })
    let second = dateObject.toLocaleString("en-US", { second: "numeric" })
    hour = hour.toString()
    var hourDigit
    var hourCharacter
    if (hour[1] === ' ') {
        hourDigit = hour[0]
        hourCharacter = hour.slice(2, 4)
    }
    else {
        var hourDigit = hour.slice(0, 2)
        hourCharacter = hour.slice(3, 5)
    }
    if (hourDigit < 10) {
        hourDigit = `0${hourDigit}`
    }
    if (minute < 10) {
        minute = `0${minute}`
    }
    if (second < 10) {
        second = `0${second}`
    }
    var time = `${hourDigit}:${minute}:${second} ${hourCharacter}`
    return time
}

function writeTimeZone(seconds) {

    if (seconds < 0) {
        seconds = Math.abs(seconds)
        var hours = Math.floor(seconds / 60 / 60)
        var minutes = Math.floor(seconds / 60) - (hours * 60)
        if (hours < 10) {
            hours = `0${hours}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return `- ${hours}:${minutes}`
    }
    else {
        var hours = Math.floor(seconds / 60 / 60)
        var minutes = Math.floor(seconds / 60) - (hours * 60)
        if (hours < 10) {
            hours = `0${hours}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return `+ ${hours}:${minutes}`
    }

}

function writeDate(data) {
    const unixTimestamp = data
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()
    let dayName = dateObject.toLocaleString("en-US", { weekday: "long" })
    let monthName = dateObject.toLocaleString("en-US", { month: "long" })
    let dayNumber = dateObject.toLocaleString("en-US", { day: "numeric" })
    let year = dateObject.toLocaleString("en-US", { year: "numeric" })

    return `${dayName}, ${dayNumber}, ${monthName}, ${year}`
}
let word

function searchButtonHandler() {

    word = search.value
    //console.log(word)
    url = `http://api.openweathermap.org/data/2.5/weather?q=${word}&units=metric&appid=d1953374c70bb8ca621fdb65259bb2cf`

    var hourlylyTable = document.getElementById('hourlyTable').classList.add('none')
    var hourlylyTable = document.getElementById('dailyTable').classList.add('none')

    // fetch(url).then(response => response.json())
    // .then(data => //console.log(data))

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        //console.log(data)
        DateO = (writeDate(data.dt))
        Name = (data.name)
        Longitude = data.coord.lon
        Latitude = data.coord.lat
        Country = data.sys.country
        Icon = data.weather[0].icon
        Temprature = data.main.temp
        Description = data.weather[0].description
        Feel = data.main.feels_like
        Visibility = data.visibility
        Sunrise = writeTime(data.sys.sunrise)
        Sunset = writeTime(data.sys.sunset)
        Timezone = writeTimeZone(data.timezone)
        // //console.log("Timezone :", (data.timezone))
        Last_Update = writeTime(data.dt)
        Pressure = data.main.pressure
        Humidity = data.main.humidity

        var cardImg = document.getElementById('cardImg').src = `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${Icon}.png`
        var cardTitle = document.getElementById('cardTitle').innerHTML = `${Temprature}&#8451;`
        var cardDescription = document.getElementById('cardDescription').innerText = ('cardTitle').innerText = `${Description}`
        var cardCity = document.getElementById('cardCity').innerText = `${Name}, ${Country}`
        showData()
    })
    search.value = ''
}
function showData() {

    //console.log("Date : ", DateO)
    //console.log("Name :", Name)
    //console.log("Longitude :", Longitude)
    //console.log("Latitude :", Latitude)
    //console.log("Country :", Country)
    //console.log("Icon :", Icon)
    //console.log("Temprature :", Temprature, "`C")
    //console.log("Description :", Description)
    //console.log("Feels Like :", Feel, "`C")
    //console.log("Visibility :", Visibility)
    //console.log("Sunrise :", Sunrise)
    //console.log("Sunset :", Sunset)
    //console.log("Timezone :", Timezone)
    //console.log("Last Updated :", Last_Update)
    //console.log("Pressure :", Pressure)
    //console.log("Humidity :", Humidity)
}
function populateTable() {
    moreTable.innerHTML = `
                <tr>
                    <th>Name of City</th>
                    <td>${Name}</td>
                </tr>
                <tr>
                    <th>Temprature</th>
                    <td>${Temprature}&#8451;</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td class="transform">${Description}</td>
                </tr>
                <tr>
                    <th>Country</th>
                    <td>${Country}</td>
                </tr>
                <tr>
                    <th>Longitude</th>
                    <td>${Longitude}&deg;</td>
                </tr>
                <tr>
                    <th>Latitude</th>
                    <td>${Latitude}&deg;</td>
                </tr>
                <tr>
                    <th>Sunrise</th>
                    <td>${Sunrise}</td>
                </tr>
                <tr>
                    <th>Sunset</th>
                    <td>${Sunset}</td>
                </tr>
                <tr>
                    <th>Feels Like</th>
                    <td>${Feel}&#8451;</td>
                </tr>
                <tr>
                    <th>Last Update on</th>
                    <td>${Last_Update}</td>
                </tr>
                <tr>
                    <th>Humidity</th>
                    <td>${Humidity}</td>
                </tr>
                <tr>
                    <th>Pressure</th>
                    <td>${Pressure} </td>
                </tr>
    `
    str = ``
}

function moreButtonHandler() {
    if (Name != 'undefined') {
        //console.log("More Button")
        var moreTable = document.getElementById('moreTable')
        moreTable.classList.remove('none')
        var dailyTable = document.getElementById('dailyTable').classList.add('none')
        var hourlylyTable = document.getElementById('hourlyTable').classList.add('none')
        populateTable()
    }

}
function dailyButtonHandler() {

    //console.log(Longitude)
    //console.log(Latitude)

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Latitude}&units=metric&lon=${Longitude}&appid=d1953374c70bb8ca621fdb65259bb2cf`

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        // //console.log(data)
        //console.log(data.daily)
        var str = ''
        for (var i = 0; i < data.daily.length; i++) {
            str += `<tr class="center">
                        <th scope="row">${i + 1}</th>
                        <td>${(writeDate(data.daily[i].dt))}</td>
                        <td class="transform">${(data.daily[i].weather[0].description)}</td>
                        <td>${(data.daily[i].temp.min)}&#8451;</td>
                        <td>${(data.daily[i].temp.max)}&#8451;</td>
                        <td>${(writeTime(data.daily[i].sunrise))}</td>
                        <td>${(writeTime(data.daily[i].sunset))}</td>
                        <td>${(writeTime(data.daily[i].moonrise))}</td>
                        <td>${(writeTime(data.daily[i].moonset))}</td>
                    </tr>`
        }
        var dailyTable = document.getElementById('dailyTable').classList.remove('none')
        var hourlylyTable = document.getElementById('hourlyTable').classList.add('none')
        var morelyTable = document.getElementById('moreTable').classList.add('none')
        tableBodyD.innerHTML = str;
        str = ''
    })
}

function hourlyButtonHandler() {
    //console.log(Longitude)
    //console.log(Latitude)

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Latitude}&units=metric&lon=${Longitude}&appid=d1953374c70bb8ca621fdb65259bb2cf`

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        //console.log(data.hourly)
        var str = ''
        for (var i = 0; i < data.hourly.length; i++) {
            str += `<tr class="center">
                        <th scope="row">${i + 1}</th>
                        <td>${(writeDate(data.hourly[i].dt))}</td>
                        <td>${(writeTime(data.hourly[i].dt))}</td>
                        <td class="transform">${(data.hourly[i].weather[0].description)}</td>
                        <td>${(data.hourly[i].temp)}&#8451;</td>
                    </tr>`
        }
        // //console.log(tableBodyH)
        var dailyTable = document.getElementById('dailyTable').classList.add('none')
        var moreTable = document.getElementById('moreTable').classList.add('none')
        var hourlyTable = document.getElementById('hourlyTable').classList.remove('none')
        tableBodyH.innerHTML = str;
        str = ''
    })
}


