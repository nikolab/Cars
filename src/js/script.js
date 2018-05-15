// $( document ).ready(function() {

//vars
var url = 'data.json';
var carsContainer = document.getElementById("cars-list");
var search = document.getElementById("search");
var carBox = document.getElementsByClassName("car-box");
var scaleWidth =  document.getElementById('scale').offsetWidth;
var semaphore = document.getElementById('semaphore');
var light = document.getElementsByClassName('lights');

   //json request
    var xml = new XMLHttpRequest();
    xml.open('GET', url);
    xml.onload = function(){

        var jsonData = JSON.parse(xml.responseText),
            carsData = jsonData.cars,
            distance = jsonData.distance,
            ratio = scaleWidth/distance,
            trafficLightsPos = jsonData.traffic_lights[0].position * ratio,
            trafficLightsTime = jsonData.traffic_lights[0].duration,
            speedLimit = jsonData.speed_limits;


        // add speed limit signs
        function speedLimits(data) {

            var slSign = '';

            for(var i = 0; i < data.length; i++) {

                var limitNumb = data[i].speed,
                    limitPos = data[i].position * ratio;

                slSign += "<div class='speed-sign' style='left: "+ limitPos +"px'>" + limitNumb + "</div>";

            }

            document.getElementById('scale').insertAdjacentHTML('afterend', slSign);

        }

        //traffic lights
        semaphore.style.left = trafficLightsPos;

        var colours = ["red", "green"];
        var current = colours[0];
        function changeLights() {

            if(current == colours[0]) {
                light[0].style.background = current;
                light[1].style.background = 'gray';
                current = colours[1];
            } else if (current == colours[1]) {
                light[0].style.background = 'gray';
                light[1].style.background = current;
                current = colours[0];
            }
        }


        //display data
        if(xml.status >= 200 && xml.status < 400) {

            //display cars
            renderCars(carsData);

            //display speed limit signs
            speedLimits(speedLimit);

            //traffic lights
            setInterval(changeLights, trafficLightsTime);

        } else {
            alert("We connected to the server, but it returned an error.");
        }

    };

    xml.onerror = function () {
        alert("Connection error");
    };

    xml.send();


   // get cars data and show them on the page
    function renderCars(data) {
        var carItem = '';

        for(var i = 0; i < data.length; i++) {

            var carName = data[i].name,
                carPic = data[i].image,
                carSpeed = data[i].speed,
                carDesc = data[i].description;


            carItem += "<li class='tb-4 bb'><div class='car-box' onclick='selectCar()'><div class='front'><img src=" + carPic + " alt='car'><span>" + carName + "</span></div><div class='back'><img src=" + carPic + " alt='car'><span>" + carDesc + "</span><span>Speed: " + carSpeed + "</span></div></div></li>";

        }

        carsContainer.insertAdjacentHTML('beforeend', carItem);

    }

    //filter data from input
    $('#search').keyup(function () {
        var yourtext = $(this).val();
        var li = $("#cars-list > li.tb-4");
        li.removeClass('bb');
        if (yourtext.length > 0) {
             li.filter(function () {
                var str = $(this).text();
                var re = new RegExp(yourtext, "i");
                var result = re.test(str);
                if (!result) {
                    return $(this);
                }
            }).hide();
        } else {
            li.show().addClass('bb');
        }
    });

    //select carbox
    function selectCar() {
        for (var i = 0; i < carBox.length; i++) {

            carBox[i].addEventListener("click", function () {
                event.preventDefault();
                // alert("radi");
            });
        }

    };

// });

