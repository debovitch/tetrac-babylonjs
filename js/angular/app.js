angular.module('app', ['mgcrea.ngStrap']);

angular.module('app').controller('MainController', ['$scope', function($scope) {

    $scope.toto = "Toto";

    $scope.aside = {
        "title": "Title",
        "content": "Hello Aside<br />This is a multiline message!"
    };

}]);