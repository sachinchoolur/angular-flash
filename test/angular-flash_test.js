var injector = angular.injector(['ng', 'flash']);
test('flash test', function(){
    var scope = injector.get('$rootScope').$new(),
        $compile = injector.get('$compile'),
        element;
    element = angular.element('<div role="alert" ng-show="hasFlash" class="alert {{flash.addClass}} alert-{{flash.type}} alert-dismissible ng-hide alertIn alertOut "> <span dynamic="flash.text"></span> <button type="button" class="close" close-flash><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> </div>');
    $compile(element)(scope);
    scope.$digest(); 
    ok(element.html !== '');  
});