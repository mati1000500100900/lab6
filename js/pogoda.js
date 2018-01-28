'use strict';

var city = document.getElementById('city'),
    cityName = document.createElement('h1'),
    icon = document.getElementById('icon'),
    info = document.getElementById('info'),
    apiKey = '5cedcd4eb2d49d32393711e8b54d9611',
    iconUrl = 'https://openweathermap.org/img/w/',
    options = {
        enableHighAccurancy: false,
        timeout: 5000,
        maximumAge: 0
    };

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, eroor, options);
    } else {
        return;
    }
}

function getTown(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+apiKey+'&units=metric'; 

    if(city) {
        fetchUrl(url, iconUrl);
    }
}

function successFunction(position) {
    var lat,
        lon,
        url;
        
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    if(lat && lon) {
        url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+apiKey+'&units=metric';
        fetchUrl(url, iconUrl);
    }
}

function fetchUrl(url, iconUrl) {
    fetch(url)
    .then( function (response) {
        if(response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: '+ response.status);
            return;
        }
        response.json().then(function (data) {
            overlay.style.display = 'none';
            cityName.textContent = data.name+', '+data['sys'].country;
            city.appendChild(cityName);
            icon.setAttribute('src', iconUrl+data.weather['0'].icon+'.png');
            info.innerHTML = 
            '<p>Dziś : '+showDate()+'</p>'+
            '<p>Temperatura: '+data.main['temp']+' &#8451</p>'+
            '<p>Ciśnienie: '+data.main['pressure']+' hPa</p>'+
            '<p>Wilgotność: '+data.main['humidity']+'%</p>'+
            '<p>Wschód słońca: '+convertSec(data['sys'].sunrise)+'</p>'+
            '<p>Zachód słońca: '+convertSec(data['sys'].sunset)+'</p>';
        });
    });
}

function error(err) {
    console.warn(`Error(${err.code}): ${err.message}`);
}

function convertSec(sec) {
    var date = new Date(sec * 1000);
    var timestr = date.toLocaleTimeString();
    return timestr;
}

function showDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return day+'.'+month+'.'+year;
}

getLocation();

var optionsButton = document.getElementById('options'),
    closeButton = document.getElementById('closebtn'),
    overlayMenu = document.getElementById('overlay_menu');

optionsButton.addEventListener('click', function() {
    overlayMenu.classList.add('visible');
    optionsButton.style.visibility = 'hidden';
});

closeButton.addEventListener('click', function() {
    if(overlaySelect.value === 'miasto') {
        getTown(overlayInput.value);
    } else {
        getLocation();
    }
    overlayMenu.classList.remove('visible');
    optionsButton.style.visibility = 'visible';
});

document.addEventListener('keyup', function(event) {
    event.preventDefault();
    if(event.keyCode == 27) {
        overlayMenu.classList.remove('visible');
        optionsButton.style.visibility = 'visible';
    }
});

var overlaySelect = document.getElementById('overlay__content-select'),
    overlayInput = document.getElementById('cityName');

overlaySelect.addEventListener('change', function() {
    if(overlaySelect.value === 'miasto') {
        overlayInput.style.display = 'block';
    } else {
        overlayInput.style.display = 'none';
    }
});