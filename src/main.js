import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#city').val();
    let weather = 'all'; //$('#weather').val();
    let clouds = 'clouds';
    let total = 'clouds.all';
    /*$('#lat').val("");
    const lon = $('#lon').val();
    $('#lon').val(""); */

    let request = new XMLHttpRequest();
    //const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=1605561284&appid=${process.env.API_KEY}`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
      else if (this.readyState === 4 && this.status != 200) {
        alert("ahhh")
        return new Error("Bad thing");
      }
    };

    try {
      const isAnError = new Error ("Bad Thing") //request.onreadystatechange();
      console.log(isAnError)
        if (isAnError instanceof Error) { 
          throw Error("AAljafsd;lkfjas;dfr");
        } else {
          console.log("Try was successful, so no need to catch!");
          $('.showTemp').text("This number is valid. You may continue.")
        }
      } catch(error) {
        console.error(`Red alert! We have an error: ${error.message}`)
      }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      console.log(response[clouds][weather]);
      console.log(response.clouds[weather]);
      console.log(response[total]);
      console.log(response.clouds.all);
      // $('.showHumidity').text(`The hour temperature is ${response.hourly[10].temp}`);
      // $('.showHumidity').text(`The humidity is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response+weather} degrees.`);
      // $('.showFeels').text(`The temperature feels like its ${response.main.feels_lke} degrees Kelvin.`);
      // $('.showWind').text(`The wind speed is ${response.wind.speed} m/s.`);    
      // console.log(response.snow);  
      // $('.show3hSnow').text(`${response["snow"]["3h"]} inches of snow have fallen in the last 3 hours.`);
      // console.log(response);
    }
  });
});