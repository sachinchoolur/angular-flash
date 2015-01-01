// Demo controller
var app = angular.module('demoApp', ['flash','ngAnimate']);
app.controller('FlashDemoCtrl', ['$rootScope', '$scope', 'Flash', function($rootScope, $scope, Flash) {
    $scope.success = function() {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message);
    };
    $scope.info = function() {
        var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
        Flash.create('info', message);
    };
    $scope.warning = function() {
        var message = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
        Flash.create('warning', message);
    };
    $scope.danger = function() {
        var message = '<strong>Oh snap!</strong> Change a few things up and try submitting again.';
        Flash.create('danger', message);
    };
    $scope.pause = function() {
        Flash.pause();
    };
}]);