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
      var map = MapPassAround.getMap();
      // console.log(map)

      //use the pulldata service to get crash count by county data
      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        layerCounty = MapAddGeojson(map[0], data);
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
        map[0].addControl(drawControl);
        console.log(crashCntkLevel);
        map[0].on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType;
        var layer = e.layer;
        if (type === 'polygon') {
          drawnItems.addLayer(layer);
        }
        map[0].addLayer(layer);
        });
      }

    }
])
