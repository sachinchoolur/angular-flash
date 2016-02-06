$.fn.putCursorAtEnd = function () {

    return this.each(function () {

        $(this).focus();

        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)

            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;

            this.setSelectionRange(len, len);

        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)

            $(this).val($(this).val());

        }

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Google Chrome)
        this.scrollTop = 999999;

    });

};


// Demo controller
var app = angular.module('demoApp', ['ngFlash', 'ngAnimate']);
app.controller('FlashDemoCtrl', ['$rootScope', '$scope', 'Flash', '$timeout', function ($rootScope, $scope, Flash, $timeout) {
    $scope.success = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message);
    };
    $scope.info = function () {
        var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
        Flash.create('info', message);
    };
    $scope.warning = function () {
        var message = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
        Flash.create('warning', message);
    };
    $scope.danger = function () {
        var message = '<strong>Oh snap!</strong> Change a few things up and try submitting again.';
        Flash.create('danger', message);
    };
    $scope.myCallback = function(flash) {
        console.log('Received flash: ' + JSON.stringify(flash));
    };
    function addMinutes(minutes) {
        var d1 = new Date(),
            d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() - minutes);
        return d2;
    }

    $scope.editing = {};

    $scope.lists = [{
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            createdOn: addMinutes(30)
        }, {
            content: 'Ut rhoncus tortor eu mollis viverra.',
            createdOn: addMinutes(20)
        }, {
            content: 'Nulla commodo arcu id turpis fermentum fringilla.',
            createdOn: addMinutes(10)
        }

    ];

    $scope.lastAdded = [];


    $scope.add = function () {
        $scope.lastAdded = {
            content: $scope.newList,
            createdOn: new Date()
        };
        $scope.lists.push($scope.lastAdded);
        $scope.newList = '';
        var message = "<strong>List Created!</strong> The list <em>" + $scope.lastAdded.content + "</em> has been created. <a ng-click='undoAdd();' href=''>Undo</a>";
        Flash.create('danger', message, 0, 'customAlert');
    };

    $scope.delete = function (item) {
        $scope.deletedItem = item;
        $scope.lists.splice($scope.lists.indexOf(item), 1);
        var message = "<strong>List Deleted!</strong> The list <em>" + $scope.deletedItem.content + "</em> has been deleted. <a ng-click='undoDelete();' href=''>Undo</a>";
        Flash.create('danger', message, 0, 'customAlert');
    };

    $scope.undoAdd = function () {
        $scope.deletedItem = $scope.lastAdded;
        $scope.lists.splice($scope.lists.indexOf($scope.lastAdded), 1);
        var message = "<strong>List Deleted!</strong> The list <em>" + $scope.deletedItem.content + "</em> has been deleted.";
        Flash.create('danger', message, 0, 'customAlert');
    };

    $scope.undoDelete = function () {
        Flash.create('danger', '<span id="spinner"></span>', 'customAlert');
        Flash.pause();
        setTimeout(function(){
            var opts = {
              lines: 13, // The number of lines to draw
              length: 6, // The length of each line
              width: 2, // The line thickness
              radius: 6, // The radius of the inner circle
              corners: 1, // Corner roundness (0..1)
              rotate: 0, // The rotation offset
              direction: 1, // 1: clockwise, -1: counterclockwise
              color: '#000', // #rgb or #rrggbb or array of colors
              speed: 1, // Rounds per second
              trail: 60, // Afterglow percentage
              shadow: false, // Whether to render a shadow
              hwaccel: false, // Whether to use hardware acceleration
              className: 'spinner', // The CSS class to assign to the spinner
              zIndex: 2e9, // The z-index (defaults to 2000000000)
              top: '50%', // Top position relative to parent
              left: '50%' // Left position relative to parent
            };
            var target = document.getElementById('spinner');
            var spinner = new Spinner(opts).spin(target);
        },100);

        setTimeout(function(){
            $scope.lists.push($scope.deletedItem);
            var message = "<strong>List Restored!</strong> The list <em>'" + $scope.deletedItem.content + "'</em> has been restored.";
            Flash.create('danger', message, 'customAlert');
        },800);
    };

    $('#newList').on('keypress', function (e) {
        if ($(this).val() !== '') {
            if (e.which == 13) {
                $timeout(function () {
                    $scope.add();
                    return false;
                }, 100);
            }
        }
    });

}]);
