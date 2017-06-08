angular
  .module('core.selectYear')
  .factory('SelectYear',
    function(){
      var year = [];

      var addYear = function(newYear){
        year.push(newYear);
      }

      var getYear = function(){
        return year;
      }

      return {
        addYear: addYear,
        getYear: getYear
      }
    }
  );
