angular
  .module('core.addMapTileLayer')
  .factory('AddMapTileLayer', function(){
    var tileUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png';
    var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';

    return function(map){
      return L.tileLayer(tileUrl, {
        attribution: attribution,
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      }).addTo(map)
    }
  })
