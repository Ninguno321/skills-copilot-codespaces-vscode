function skillsMember() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'skills.html',
    scope: {
      skills: '='
    },
    controller: function($scope) {
      $scope.getSkillLevel = function(skill) {
        var level = skill.level;
        var levelString = '';
        for (var i = 0; i < level; i++) {
          levelString += '★';
        }
        return levelString;
      };
    },
    link: function(scope, element, attrs) {
      console.log('skillsMember');
    }
  };
}