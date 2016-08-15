/**
 * Created by jduggan on 11/08/2016.
 */
var services = angular.module('app.services', []);

services.factory('matchService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        list: function(){
            return $http.get(CONFIG.baseUrl + '/'+ CONFIG.version + '/matches?access_token=' + CONFIG.access_token);
        },
        find:  function(matchId){
            return $http.get(CONFIG.baseUrl + '/'+ CONFIG.version + '/matches/' + matchId);
        },
        create:  function(match){
            return $http.post(CONFIG.baseUrl + '/'+ CONFIG.version + '/matches', match);
        },
        update:  function(match){
            return $http.put(CONFIG.baseUrl + '/'+ CONFIG.version + '/matches/' + match.id, match);
        }
    };
}]);

services.factory('predictionService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        list: function(){
            return $http.get(CONFIG.baseUrl + '/'+ CONFIG.version + '/predictions?user__id='+CONFIG.user_id);
        },
        find:  function(predictionId){
            return $http.get(CONFIG.baseUrl + '/'+ CONFIG.version + '/predictions/' + predictionId);
        },
        create:  function(matchId, result){
            var prediction = {
                user_id: CONFIG.user_id,
                match_id: matchId,
                result: result
            };

            return $http.post(CONFIG.baseUrl + '/'+ CONFIG.version + '/predictions?access_token=' + CONFIG.access_token, prediction);
        },
        update:  function(prediction){
            return $http.put(CONFIG.baseUrl + '/'+ CONFIG.version + '/predictions/' + prediction.id, prediction);
        }
    };
}]);

services.factory('loginService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        login: function(username, password){
            var loginData = {
                grant_type: "password",
                username: username,
                password: password
            };
            
            return $http.post(CONFIG.baseUrl + '/'+ CONFIG.version + '/access_tokens', loginData).then(function (response) {
                CONFIG.access_token = response.data.data[0].access_token;
            });
        }
    };
}]);