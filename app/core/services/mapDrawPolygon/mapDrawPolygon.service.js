angular
  .module('core.mapDrawPolygon')
  .factory('MapDrawPolygon', function(){

    var lastPolyId = '';

    function createDrawControl(drawnItems){
      return new L.Control.Draw({
        draw:{
          polyline: false,
          polygon: true,
          rectangle: false,
          circle: false,
          marker: false,
        },
         edit: {
             featureGroup: drawnItems,
         },
         delete: false,
     });
    };

    function findCrashLevelById(dataPolygon, id){
      return _.chain(dataPolygon)
                   .values()
                   .flatten()
                   .compact()
                   .filter(function(eachPoly){
                     console.log(eachPoly)
                     return _.last(eachPoly.properties.id.split('-')).toString() === id.toString();
                   })
                   .first()
                   .value()
                   .properties
                   .crash_level;
    }

    function fillDrawnColor(crashLevel){
      return crashLevel == 'low'    ? '#47a447' :
             crashLevel == 'medium' ? '#428bca' :
                                      '#f0ad4e' ;
    };

    function plotDrawnGeojsonPolygon(geojsonData, crashLevel, map){
      if(lastPolyId !== geojsonData.properties.id){
        lastPolyId = geojsonData.properties.id;
        return L.geoJSON(geojsonData, {
          color: fillDrawnColor(crashLevel),
          fillColor: fillDrawnColor(crashLevel),
        }).addTo(map);
      }
    };

    function getDrawnPolygonInfo(polygon, year, crashLevel, id, dataCounties){
      polygon.properties.id = year.toString() + "-" + crashLevel.toLowerCase() + "-" + id.toString();
      polygon.properties.year = year;
      polygon.properties.crash_level = crashLevel.toLowerCase();
      polygon.properties.intersect_county_array = [];
      _.forEach(dataCounties.features, function(poly){
        if(turf.intersect(polygon, poly)){
          polygon.properties.intersect_county_array.push({
            fips: poly.properties.FIPS,
            name: poly.properties.County,
            crash_cnt: poly.properties["y_" + year.toString()],
          })
        }
      })

      return polygon;
    }

    return {
      createDrawControl: createDrawControl,
      fillDrawnColor: fillDrawnColor,
      plotDrawnGeojsonPolygon: plotDrawnGeojsonPolygon,
      getDrawnPolygonInfo: getDrawnPolygonInfo,
      findCrashLevelById: findCrashLevelById,
    }
  })
