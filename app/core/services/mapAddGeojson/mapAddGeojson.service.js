angular
  .module('core.mapAddGeojson')
  .factory('MapAddGeojson', function() {
    return function(map, data){
      return L.geoJSON(data,{
        style: function(feature){
          return {
            color: '#ffffff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8,
            fill: false
          }
        }
      }).addTo(map);
    }
  })
