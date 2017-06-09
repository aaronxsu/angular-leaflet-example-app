angular
  .module("exampleApp")
  .controller('SidebarController', [
    '$rootScope',
    '$scope',
    'MapPassAround',
    'PullData',
    'MapAddGeojson',
    'MapChangeFillColor',
    'MapCreateDrawControl',
    function($rootScope, $scope, MapPassAround, PullData, MapAddGeojson, MapChangeFillColor, MapCreateDrawControl){

      var scope = $scope;
      var layerCounty;

      $rootScope.selectedCrashYear = '2004 - 2013';
      scope.yearSelected = false;

      //the map passed from the MapController
      scope.$watch(
        function() {
          return MapPassAround.getMap();
        },
        function(newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.map = newValue;
          }
       });

      //use the pulldata service to get crash count by county data
      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        layerCounty = MapAddGeojson(scope.map, data);
      });

      //the select by year button on the sidebar
      scope.selectYear = function(yearNum){
        //update the year on top navbar
        $rootScope.selectedCrashYear = yearNum;
        scope.yearSelected = true;

        //upodate the fill color style based on the year selected
        layerCounty.setStyle(function(feature){
          return {
            fill: true,
            fillColor: MapChangeFillColor(feature, 'y_' + yearNum)
          }
        })
      }

      var drawnItems = new L.FeatureGroup();
      var drawControl = MapCreateDrawControl(drawnItems);

      //the select area button group on the sidebae
      scope.selectArea = function(crashCntkLevel){
        scope.map.addControl(drawControl);
        console.log(crashCntkLevel);
        scope.map.on(L.Draw.Event.CREATED, function (e) {
          var type = e.layerType;
          var layer = e.layer;
          if (type === 'polygon') {
            drawnItems.addLayer(layer);
          }
          scope.map.addLayer(layer);
        });
      }

    }//end of controller function
])
