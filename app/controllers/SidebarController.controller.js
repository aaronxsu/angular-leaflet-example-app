angular
  .module("exampleApp")
  .controller('SidebarController', [
    '$rootScope',
    '$scope',
    'MapPassAround',
    'PullData',
    'MapAddGeojson',
    'MapChangeFillColor',
    'MapDrawPolygon',
    function($rootScope, $scope, MapPassAround, PullData, MapAddGeojson, MapChangeFillColor, MapDrawPolygon){

      var scope = $scope;
      var layerCounty;
      var dataCounties = [];
      var drawnItems = new L.FeatureGroup();
      var drawControl = MapDrawPolygon.createDrawControl(drawnItems);
      var addedDrawControl = {};
      var layerMappedPolygons = [];
      var geojsonDrawnPolygons = { low: [], medium: [], high: [], };
      var crashLevel = '';


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
        dataCounties = data;
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

      //the select area button group on the sidebar
      scope.selectArea = function(crashCntkLevel){
        crashLevel = crashCntkLevel;
        //add the draw control to the map
        if(_.isEmpty(addedDrawControl)){
          addedDrawControl = scope.map.addControl(drawControl);
        }
        //whatever polygon is mapped on the basemap, clean them
        // if(layerMappedPolygons.length){
        //   _.forEach(layerMappedPolygons, function(eachPolygon){
        //     scope.map.removeLayer(eachPolygon);
        //   });
        //   layerMappedPolygons = [];
        // }
        //if there are drawn polygons of a selected level of crash count, plot them
        // if(geojsonDrawnPolygons[crashCntkLevel.toLowerCase()].length){
        //   layerMappedPolygons = _.map(geojsonDrawnPolygons[crashCntkLevel.toLowerCase()], function(eachPolygon){
        //     return MapDrawPolygon.plotDrawnGeojsonPolygon(eachPolygon, crashCntkLevel.toLowerCase(), scope.map)
        //   })
        // }
        //when a drawn polygon is crerated
        //store the id, year ,and crash level, and the intersecting counties' info (name, fips, crash count)
        //add this polygon to 'geojsonDrawnPolygons', which store all drawn shapes in geojson
        //add this polygon to the drawnItems feature group to be managed by the library
        scope.map.on(L.Draw.Event.CREATED, function(e){
          if(crashLevel !== ''){
            var layer = e.layer;
            var id = L.stamp(layer);
            //the drawn polygon info and intersecting county info
            var geojsonLayerPolygon = MapDrawPolygon.getDrawnPolygonInfo(layer.toGeoJSON(), $rootScope.selectedCrashYear, crashLevel, id, dataCounties);
            //push the drawn polygon to all drawn polygons under each crash level, and make sure the IDs are unique
            geojsonDrawnPolygons[crashLevel.toLowerCase()].push(geojsonLayerPolygon);
            geojsonDrawnPolygons[crashLevel.toLowerCase()] = _.uniqBy(geojsonDrawnPolygons[crashLevel.toLowerCase()], 'properties.id');
            //push the mapped polygons to all currently mapped polygon array, make sure they are unique and have no undefined values
            // layerMappedPolygons.push(MapDrawPolygon.plotDrawnGeojsonPolygon(geojsonLayerPolygon, crashLevel.toLowerCase(), scope.map));
            // layerMappedPolygons = _.compact(layerMappedPolygons);
            drawnItems.addLayer(layer)
                      .eachLayer(function(layer){
                        var level = MapDrawPolygon.findCrashLevelById(geojsonDrawnPolygons, layer._leaflet_id)
                        layer.setStyle({
                          color: MapDrawPolygon.fillDrawnColor(level.toLowerCase()),
                          fillColor: MapDrawPolygon.fillDrawnColor(level.toLowerCase()),
                        });
                      });
            layerMappedPolygons = drawnItems.addTo(scope.map);
            console.log(geojsonDrawnPolygons);

          }
        });//end of map on draw created event

        //when a polygon is deleted from the map
        //delete this polygon from the 'geojsonDrawnPolygons', which stores all drawn polygons in geojson along with year, level, and county info
        //this polygon will be deleted from the drawnItems and the map layer by the library
        scope.map.on('draw:deleted', function (e) {
          var layers = e.layers;
          var polygonId = _.first(_.keys(layers._layers));//the id of the polygon deleted

          geojsonDrawnPolygons = MapDrawPolygon.deletePolygonById(geojsonDrawnPolygons, polygonId);

          console.log(geojsonDrawnPolygons);


        });//end of map on draw deleted event

        scope.map.on('draw:edited', function (e) {
          var layers = e.layers;//the layer that is edited
          var polygonId = _.first(_.keys(layers._layers));

          console.log(layers)
          // console.log(id)
        });//end of map on draw edited event

      }//end of selectArea click event

    }//end of controller function
])
