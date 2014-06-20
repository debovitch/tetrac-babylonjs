angular.module('app', []);

angular.module('app').controller('MainController', ['$scope', function($scope) {

    $scope.bricks = [];
    for (var i=0; i<25; i++) {
        $scope.bricks.push(i);
    }

    for (var i=0; i<10; i++) {
        $scope['active'+i] = true;
    }

}]);