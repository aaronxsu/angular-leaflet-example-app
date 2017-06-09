angular
  .module("exampleApp")
  .controller('SidebarController', [
    '$rootScope',
    '$scope',
    'MapPassAround',
    'PullData',
    'MapAddGeojson',
    // 'SelectYear',
    'MapChangeFillColor',
    function($rootScope, $scope, MapPassAround, PullData, MapAddGeojson, MapChangeFillColor){

      var scope = $scope;

      var layerCounty;

      var map = MapPassAround.getMap();
      console.log(map);

      $rootScope.selectedCrashYear = '2004 - 2013'

      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        console.log(data)
        layerCounty = MapAddGeojson(map[0], data);
      });

      scope.selectYear = function(yearNum){
        // SelectYear.addYear(year);
        console.log(yearNum)
        $rootScope.selectedCrashYear = yearNum;
        var yearKey = 'y_' + yearNum;

        layerCounty.setStyle(function(feature){
          return {
            fill: true,
            fillColor: MapChangeFillColor(feature, yearKey)
          }
        })

      }
    }
])
