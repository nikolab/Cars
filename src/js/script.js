$( document ).ready(function() {

//vars
 var url = 'data.json';
var carsContainer = document.getElementById("cars-list");



    var xml = new XMLHttpRequest();
    xml.open('GET', url);
    xml.onload = function(){

        if(xml.status >= 200 && xml.status < 400) {

        var jsonData = JSON.parse(xml.responseText);
        var carsData = jsonData.cars;
            console.log(carsData);
            console.log(jsonData.distance);
            renderCars(carsData);

        } else {
            alert("We connected to the server, but it returned an error.");
        }

    };

    xml.onerror = function () {
        alert("Connection error");
    };

    xml.send();

    function renderCars(data) {
        var carItem = '';

        for(var i = 0; i < data.length; i++) {

            var carName = data[i].name,
                carPic = data[i].image,
                carSpeed = data[i].speed;


            carItem += "<li class='tb-4'><div class='car-box'><img src=" + carPic + " alt='car'><span>" + carName + "</span></div></li>";

        }

        carsContainer.insertAdjacentHTML('beforeend', carItem);

    }

});

