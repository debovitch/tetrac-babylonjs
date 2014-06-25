angular.module('app', []);

angular.module('app').controller('MainController', ['$scope', function($scope) {

    $scope.toggle = function() {

        $scope.$apply(
            function() {
                if ($scope.message == "your turn") {
                    $scope.message = "let me think";
                    $scope.color = "yellow";
                } else {
                    $scope.message = "your turn";
                    $scope.color = "red";
                }
            }
        );

    };

    $scope.reset = function() {

        $scope.message = "connection in progress";
        $scope.color = "white";
        $scope.restart = false;

    };

    $scope.reset();

}]);