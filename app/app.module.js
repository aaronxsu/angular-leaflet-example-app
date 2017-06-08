angular
  .module("exampleApp", [
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'core.pullData',
  'core.selectYear'
])
  .controller('SidebarController', ['$scope', 'PullData', 'SelectYear',
    function($scope, PullData, SelectYear){



      $scope.selectYear = function(year){
        console.log(year)
        SelectYear.addYear(year);
      }

    }
])
  .controller("MapController", ['$scope', 'PullData', 'SelectYear',
    function($scope, PullData, SelectYear){

      PullData.get({dataName: 'PA_counties_w_crash_count_by_year'}, function(data){
        console.log(data)
        $scope.crashByState = data;
      })

      $scope.year = SelectYear.getYear();
      console.log($scope.year)
    }
])
