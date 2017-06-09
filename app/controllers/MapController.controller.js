angular
  .module('exampleApp')
  .controller('MapController', [
    '$scope',
    'CreateBasemap',
    'AddMapTileLayer',
    'MapPassAround',
    function($scope, CreateBasemap, AddMapTileLayer, MapPassAround){
      var vm = this;
      //pass the map to the service
      $scope.$watch('vm.map', function(newVal, oldVal){
        MapPassAround.addMap(vm.map);
      })
      // MapPassAround.addMap(vm.map);
      //create a basemap in PA
      vm.map = CreateBasemap('map', [41.2033, -77.1945], 7);
      //add mapbox tile layer
      AddMapTileLayer(vm.map);
    }
  ])
