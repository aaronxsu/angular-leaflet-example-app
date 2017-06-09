angular
  .module('core.mapChangeFillColor')
  .factory('MapChangeFillColor', function(){
    return function(feature, yearKey){
      var crashCount = feature.properties[yearKey];

      return crashCount >= 70 ? '#2a3386' :
             crashCount >= 44 ? '#3844b3' :
             crashCount >= 26 ? '#5a65cb' :
             crashCount >= 13 ? '#878fda' :
                                '#b4b9e8' ;
    }
  })
