angular
  .module('core.mapCreateDrawControl')
  .factory('MapCreateDrawControl', function(){
    return function(drawnItems){
      return new L.Control.Draw({
        draw:{
          polyline: false,
          polygon: true,
          rectangle: false,
          circle: false,
          marker: false,
        },
         edit: {
             featureGroup: drawnItems
         }
     })
    }
  })
