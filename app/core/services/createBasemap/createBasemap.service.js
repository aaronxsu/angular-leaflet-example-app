angular
  .module('core.createBasemap')
  .factory('CreateBasemap', function(){
    return function(mapId, centerLatlngArray, zoomLevel){
      return L.map(mapId, {
        center: centerLatlngArray,
        zoom: zoomLevel
      });
    }
  });
