$( document ).ready(function() {

//vars
var url = 'data.json';
var carsContainer = document.getElementById("cars-list");
var search = document.getElementById("search");

   //json request
    var xml = new XMLHttpRequest();
    xml.open('GET', url);
    xml.onload = function(){

        var jsonData = JSON.parse(xml.responseText);
        var carsData = jsonData.cars;

        if(xml.status >= 200 && xml.status < 400) {

            renderCars(carsData);

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
                carSpeed = data[i].speed;


            carItem += "<li class='tb-4 bb'><div class='car-box'><img src=" + carPic + " alt='car'><span>" + carName + "</span></div></li>";

        }

        carsContainer.insertAdjacentHTML('beforeend', carItem);

    }

    //filter data through input
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

});

