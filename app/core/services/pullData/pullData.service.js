angular
  .module('core.pullData')
  .factory('PullData', ['$resource',
    function($resource){
      return $resource('https://raw.githubusercontent.com/aaronxsu/MyData/master/:dataName.geojson');
    }
  ]);
