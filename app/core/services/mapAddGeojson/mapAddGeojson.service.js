angular
  .module('core.mapAddGeojson')
  .factory('MapAddGeojson', function() {
    return function(map, data){
      return L.geoJSON(data,{
        style: function(feature){
          return {
            color: '#ffffff',
            weight: 2,
            fill: false
          }
        }
      }).addTo(map);
    }
  })
