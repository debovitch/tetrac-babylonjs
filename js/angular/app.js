angular.module('app', []);

angular.module('app').controller('MainController', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.toggle = function() {

        $scope.$apply(
            function() {
                if ($scope.previousMessage == "your turn") {
                    $scope.previousMessage = $scope.message = "let me think";
                    $scope.previousColor = $scope.color = "yellow";
                } else {
                    $scope.previousMessage = $scope.message = "your turn";
                    $scope.previousColor = $scope.color = "red";
                }
            }
        );

    };

    $scope.reset = function() {

        $scope.previousMessage = $scope.message = "connection in progress";
        $scope.previousColor = $scope.color = "white";
        $scope.restart = false;

    };

    $scope.flash = function(message) {

        $scope.$apply(
            function() {
                $scope.message = message;
                $scope.color = 'green';
            }
        );
        $timeout(
            function() {
                $scope.message = $scope.previousMessage;
                $scope.color = $scope.previousColor;
            },
            3000
        );

    };

    $scope.reset();

}]);