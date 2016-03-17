/*! angular-flash - v2.2.5 - 2016-03-17
 * https://github.com/sachinchoolur/angular-flash
 * Copyright (c) 2016 Sachin; Licensed MIT */

'use strict';

var app = angular.module('ngFlash', []);

app.run(['$rootScope', function ($rootScope) {
    return $rootScope.flashes = [];
}]);

app.directive('dynamic', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, ele, attrs) {
            return scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                return $compile(ele.contents())(scope);
            });
        }
    };
}]);

app.directive('closeFlash', ['$compile', '$rootScope', 'Flash', function ($compile, $rootScope, Flash) {
    return {
        link: function link(scope, ele, attrs) {
            return ele.on('click', function () {
                var id = parseInt(attrs.closeFlash, 10);
                Flash.dismiss(id);
                $rootScope.$apply();
            });
        }
    };
}]);

app.directive('flashMessage', ['Flash', function (Flash) {
    return {
        restrict: 'E',
        scope: {
            duration: '=',
            showClose: '=',
            onDismiss: '&'
        },
        template: '<div role="alert" ng-repeat="flash in $root.flashes track by $index" id="{{flash.config.id}}" class="alert {{flash.config.class}} alert-{{flash.type}} alert-dismissible alertIn alertOut"><div type="button" class="close" ng-show="flash.showClose" close-flash="{{flash.id}}"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></div> <span dynamic="flash.text"></span> </div>',
        link: function link(scope, ele, attrs) {
            Flash.setDefaultTimeout(scope.duration);
            Flash.setShowClose(scope.showClose);
            function onDismiss(flash) {
                if (typeof scope.onDismiss !== 'function') return;
                scope.onDismiss({ flash: flash });
            }

            Flash.setOnDismiss(onDismiss);
        }
    };
}]);

app.factory('Flash', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var dataFactory = {};
    var counter = 0;
    dataFactory.setDefaultTimeout = function (timeout) {
        if (typeof timeout !== 'number') return;
        dataFactory.defaultTimeout = timeout;
    };

    dataFactory.defaultShowClose = true;
    dataFactory.setShowClose = function (value) {
        if (typeof value !== 'boolean') return;
        dataFactory.defaultShowClose = value;
    };
    dataFactory.setOnDismiss = function (callback) {
        if (typeof callback !== 'function') return;
        dataFactory.onDismiss = callback;
    };
    dataFactory.create = function (type, text, timeout, config, showClose) {
        var $this = undefined,
            flash = undefined;
        $this = this;
        flash = {
            type: type,
            text: text,
            config: config,
            id: counter++
        };
        flash.showClose = typeof showClose !== 'undefined' ? showClose : dataFactory.defaultShowClose;
        if (dataFactory.defaultTimeout && typeof timeout === 'undefined') {
            flash.timeout = dataFactory.defaultTimeout;
        } else if (timeout) {
            flash.timeout = timeout;
        }
        $rootScope.flashes.push(flash);
        if (flash.timeout) {
            flash.timeoutObj = $timeout(function () {
                $this.dismiss(flash.id);
            }, flash.timeout);
        }
        return flash.id;
    };
    dataFactory.pause = function (index) {
        if ($rootScope.flashes[index].timeoutObj) {
            $timeout.cancel($rootScope.flashes[index].timeoutObj);
        }
    };
    dataFactory.dismiss = function (id) {
        var index = findIndexById(id);
        if (index !== -1) {
            var flash = $rootScope.flashes[index];
            dataFactory.pause(index);
            $rootScope.flashes.splice(index, 1);
            $rootScope.$digest();
            if (typeof dataFactory.onDismiss === 'function') {
                dataFactory.onDismiss(flash);
            }
        }
    };
    dataFactory.clear = function () {
        while ($rootScope.flashes.length > 0) {
            dataFactory.dismiss($rootScope.flashes[0].id);
        }
    };
    dataFactory.reset = dataFactory.clear;
    function findIndexById(id) {
        return $rootScope.flashes.map(function(flash) {
            return flash.id;
        }).indexOf(id);
    }

    return dataFactory;
}]);
//# sourceMappingURL=angular-flash.js.map
