angular
  .module("exampleApp")
  .controller('SidebarController', [
    '$scope',
    'MapPassAround',
    'PullData',
    'MapAddGeojson',
    // 'SelectYear',
    'MapChangeFillColor',
    function($scope, MapPassAround, PullData, MapAddGeojson, MapChangeFillColor){

      var scope = $scope;

      var layerCounty;

      var map = MapPassAround.getMap();
      console.log(map);

      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        console.log(data)
        layerCounty = MapAddGeojson(map[0], data);
      });



      scope.selectYear = function(yearNum){
        // SelectYear.addYear(year);
        console.log(yearNum)
        var yearKey = 'year_' + yearNum;

        layerCounty.setStyle(function(feature){
          return {
            fill: true,
            fillColor: MapChangeFillColor(feature, yearKey)
          }
        })

      }
    }
])
