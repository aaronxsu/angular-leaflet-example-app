angular
  .module("exampleApp")
  .controller('SidebarController', ['$scope', 'PullData', 'SelectYear',
    function($scope, PullData, SelectYear){
      $scope.selectYear = function(year){
        console.log(year)
        SelectYear.addYear(year);
      }
    }
])
