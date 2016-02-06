/*! angular-flash - v2.1.0 - 2016-02-05
 * https://github.com/sachinchoolur/angular-flash
 * Copyright (c) 2016 Sachin; Licensed MIT */

const app = angular.module('ngFlash', []);

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
                duration: '=duration',
                showClose: '=showClose'
            },
            template: '<div ng-show="$root.flashes.length > 0"><div role="alert" ng-repeat="flash in $root.flashes track by $index" id="{{flash.config.id}}" class="alert {{flash.config.class}} alert-{{flash.type}} alert-dismissible alertIn alertOut"><button type="button" class="close" ng-show="flash.showClose" close-flash="{{flash.id}}"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <span dynamic="flash.text"></span> </div></div>',
            link: function(scope, ele, attrs) {
                Flash.setDefaultTimeout(scope.duration);
                Flash.setShowClose(scope.showClose);
            }
        };
    }
]);

app.factory('Flash', [
    '$rootScope', '$timeout', function($rootScope, $timeout) {
        const dataFactory = {};
        let counter = 0;
        dataFactory.setDefaultTimeout = function(timeout) {
            if (typeof timeout !== 'number') return;
            dataFactory.defaultTimeout = timeout;
        };

        dataFactory.defaultShowClose = true;
        dataFactory.setShowClose = function(value) {
            if (typeof value !== 'boolean') return;
            dataFactory.defaultShowClose = value;
        };
        dataFactory.create = function(type, text, timeout, config, showClose) {
            let $this, flash;
            $this = this;
            flash = {
                type: type,
                text: text,
                config: config,
                id: counter++
            };
            flash.showClose =
                typeof showClose !== 'undefined' ?
                    showClose : dataFactory.defaultShowClose;
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
            return flash.id;
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
                dataFactory.dismiss($rootScope.flashes[0].id);
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
