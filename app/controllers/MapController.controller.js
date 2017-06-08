angular
  .module('exampleApp')
  .controller('MapController', [
    '$scope',
    'CreateBasemap',
    'AddMapTileLayer',
    'MapPassAround',
    function($scope, CreateBasemap, AddMapTileLayer, MapPassAround){

      var map = CreateBasemap('map', [41.2033, -77.1945], 7);
      var mapboxTileLayer = AddMapTileLayer(map);

      MapPassAround.addMap(map);
    }
  ])
