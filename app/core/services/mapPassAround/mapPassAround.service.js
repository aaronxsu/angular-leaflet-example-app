angular
  .module('core.mapPassAround')
  .factory('MapPassAround', function(){
    var map = {};

    var addMap = function(newMap){
      map = newMap;
    }

    var getMap = function(){
      if(!_.isEmpty(map)){
        return map;
      }
    }

    return {
      addMap : addMap,
      getMap: getMap
    }

  })
