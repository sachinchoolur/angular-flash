/*! angular-flash - v2.0.0 - 2016-01-17
 * https://github.com/sachinchoolur/angular-flash
 * Copyright (c) 2016 Sachin; Licensed MIT */

const app = angular.module('flash', []);

app.run([
    '$rootScope', function($rootScope) {
        return $rootScope.flashes = [];
    }
]);

app.directive('dynamic', [
    '$compile', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {
                return scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    return $compile(ele.contents())(scope);
                });
            }
        };
    }
]);

app.directive('closeFlash', [
    '$compile', '$rootScope', 'Flash', function($compile, $rootScope, Flash) {
        return {
            link: function(scope, ele, attrs) {
                return ele.on('click', function() {
                    let id = parseInt(attrs.closeFlash, 10);
                    Flash.dismiss(id);
                    $rootScope.$apply();
                });
            }
        };
    }
]);

app.directive('flashMessage', [
    'Flash', function(Flash) {
        return {
            restrict: 'E',
            scope: {
                duration: '=duration'
            },
            template: '<div ng-show="$root.flashes.length > 0"><div role="alert" ng-repeat="flash in $root.flashes track by $index" class="alert {{flash.addClass}} alert-{{flash.type}} alert-dismissible alertIn alertOut "> <span dynamic="flash.text"></span> <button type="button" class="close" close-flash="{{flash.id}}"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> </div></div>',
            link: function(scope, ele, attrs) {
                Flash.setDefaultTimeout(scope.duration);
            }
        };
    }
]);

app.factory('Flash', [
    '$rootScope', '$timeout', function($rootScope, $timeout) {
        let dataFactory = {};
        let counter = 0;
        dataFactory.setDefaultTimeout = function(timeout) {
            dataFactory.defaultTimeout = timeout;
        };
        dataFactory.getDefaultTimeout = function() {
            return dataFactory.defaultTimeout;
        };
        dataFactory.create = function(type, text, timeout, addClass) {
            let $this, flash;
            $this = this;
            flash = {
                type: type,
                text: text,
                addClass: addClass,
                id: counter++
            };
            if (dataFactory.defaultTimeout && typeof timeout === 'undefined') {
                flash.timeout = dataFactory.defaultTimeout;
            }
            else if (timeout) {
                flash.timeout = timeout;
            }
            $rootScope.flashes.push(flash);
            if (flash.timeout) {
                flash.timeoutObj = $timeout(function(id) {
                    $this.dismiss(id);
                }, flash.timeout, true, flash.id);
            }
        };
        dataFactory.pause = function(index) {
            if ($rootScope.flashes[index].timeoutObj) {
                $timeout.cancel($rootScope.flashes[index].timeoutObj);
            }
        };
        dataFactory.dismiss = function(id) {
            const index = findIndexById(id);
            if (index !== -1) {
                dataFactory.pause(index);
                $rootScope.flashes.splice(index, 1);
                $rootScope.$digest();
            }
        };
        dataFactory.clear = function() {
            while ($rootScope.flashes.length > 0) {
                dataFactory.dismiss(0);
            }
        };
        dataFactory.reset = dataFactory.clear;
        function findIndexById(id) {
            return $rootScope.flashes.findIndex((flash) => {
                return flash.id === id;
            });
        }
        return dataFactory;
    }
]);
