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

      // var drawnItems = new L.FeatureGroup();
      //
      // map.addLayer(drawnItems);

      // var drawControl = new L.Control.Draw({
      //   draw: {
      //     polyline: false,
      //     rectangle: false,
      //     circle: false,
      //     marker: false,
      //     polygon: true,
      //   },
      //   edit: {
      //     featureGroup: drawnItems
      //   }
      // });
      // map.addControl(drawControl);

      MapPassAround.addMap(map);
    }
  ])
