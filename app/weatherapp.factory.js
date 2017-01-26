(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherAppFactory', weatherAppFactory);

    weatherAppFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function weatherAppFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };
        return service;

        ////////////////

        function getWeather(city) {


           var defer = $q.defer();

           $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather?',
                params: {
                	appid: '6159397005a4134d61e74dd45178963d',
                	q: '"' + city + '"',
                	units: 'imperial'
                }
            }).then(function(response) {

            	if(typeof response.data == 'object') {
               		defer.resolve(response);
           		} else {
           			defer.reject('No Data Found');
           		}
           }, function(error) {
           		defer.reject(error);
           });

           return defer.promise;

        }
    }
})();