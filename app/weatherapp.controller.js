(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['weatherAppFactory', 'toastr'];

    /* @ngInject */
    function mainCtrl(weatherAppFactory, toastr) {
        var vm = this;
        vm.title = 'mainCtrl';

        // activate();

        vm.history = [];
        var status;

        function cityExists(city) {

        	status = false;
        	
        	for(var i =0; i < vm.history.length; i++) {
        		if(vm.history[i].name === vm.cityName) {
        			status = true;
        		}
        	}
        	return status;
        }

        function updateHistory(data) {
        		vm.weather = data;
        			vm.cityName = vm.weather.name;
        			vm.temp = vm.weather.main.temp + 'F';
        			vm.pressure = vm.weather.main.pressure;
        			vm.humidity = vm.weather.main.humidity + '%';
        			vm.temp_min = vm.weather.main.temp_min + 'F';
        			vm.temp_max = vm.weather.main.temp_max + 'F';
        			vm.wind_speed = vm.weather.wind.speed + 'mph';
        			vm.time = new Date();
        			vm.city = '';
        			vm.icon = vm.weather.weather[0].icon;
        			toastr.success('Weather Found!');

        			cityExists();
        			if(status == false) {
        			vm.history.push({name: vm.cityName, time: vm.time});
        			}// if
        }
        
		        
         vm.getWeather = function(city) {
        	weatherAppFactory.getWeather(city).then(
        		function(response) {
        			
        			if(response.data) {
        				updateHistory(response.data);
        				}
        			},//close response function
        			function(error) {
        				if (error.data) {
        					toastr.error('Sorry, but there was a problem: ' + error.data);
        				} else {
        					toastr.info('Data not found');
        				}// close else
        			}//close error function
        			
						
   			)
        }//close getWeather
    }//close mainCtrl
})();


