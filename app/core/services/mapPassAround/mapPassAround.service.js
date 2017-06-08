angular
  .module('core.mapPassAround')
  .factory('MapPassAround', function(){
    var map = [];

    var addMap = function(newMap){
      map.push(newMap);
    }

    var getMap = function(){
      return map;
    }

    return {
      addMap : addMap,
      getMap: getMap
    }

  })
