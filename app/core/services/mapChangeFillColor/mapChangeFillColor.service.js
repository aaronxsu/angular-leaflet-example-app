angular
  .module('core.mapChangeFillColor')
  .factory('MapChangeFillColor', function(){
    return function(feature, yearKey){
      feature.properties[yearKey]//this is the count of crime
    }
  })
