angular
  .module("exampleApp")
  .controller("MapController", ['$scope', 'CreateBasemap', 'AddMapTileLayer', 'PullData', 'SelectYear',
    function($scope, CreateBasemap, AddMapTileLayer, PullData, SelectYear){

      var map = CreateBasemap("map", [41.2033, -77.1945], 7);
      var mapboxTileLayer = AddMapTileLayer(map);
      console.log(map, mapboxTileLayer)

      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        console.log(data)
        $scope.crashByState = data;
      })



      $scope.year = SelectYear.getYear();
      console.log($scope.year)
    }
  ])
