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

    $scope.fullscreen = false;

    $scope.fullscreenImage = function() {
        return $scope.fullscreen ? "fullscreen_exit_grey.png" : "fullscreen_grey.png";
    };

    $scope.toggleFullScreen = function toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement
            && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
                $scope.fullscreen = true;
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
                $scope.fullscreen = true;
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
                $scope.fullscreen = true;
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                $scope.fullscreen = true;
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $scope.fullscreen = false;
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
                $scope.fullscreen = false;
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                $scope.fullscreen = false;
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                $scope.fullscreen = false;
            }
        }
    };

    $scope.reset();

}]);