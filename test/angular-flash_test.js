describe('Unit testing Angular Flash', function() {
    var $compile,
        $rootScope,
        $timeout,
        node,
        Flash;

    // Load the myApp module, which contains the directive
    beforeEach(module('ngFlash'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _Flash_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        Flash = _Flash_;
    }));

    beforeEach(function() {
        node = $compile('<div><flash-message duration=1000></flash-message></div>')($rootScope);
    });

    it('replaces the element with the appropriate content', function() {
        var contents = node.contents();
        expect(contents[0].nodeType).toEqual(Node.ELEMENT_NODE);
    });

    it('has the class specified', function() {
        var testClassName = 'test-class';
        Flash.create('success', 'Good job', 10000, {class: testClassName});
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert')[0].classList).toContain(testClassName);
    });

    it('has the id specified', function() {
        var testIdName = 'test-id';
        Flash.create('success', 'Good job', 10000, {id: testIdName});
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert')[0].id).toContain(testIdName);
    });

    it('shows the flash when created and removes when deleted', function() {
        Flash.create('success', 'All good');
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(1);
        Flash.dismiss(0);
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });

    it('clears all when clear is called', function() {
        for (var i = 0; i < 10; ++i) {
            Flash.create('success', 'All good');
        }
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(10);
        Flash.clear();
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });

    it('is dismissed after timeout', function() {
        Flash.create('success', 'All good', 10000);
        $rootScope.$digest();
        var contents = node.contents()[0];
        expect(contents.querySelectorAll('.alert').length).toEqual(1);

        $timeout.flush();
        $rootScope.$digest();
        expect(contents.querySelectorAll('.alert').length).toEqual(0);
    });

    describe('close button', function () {
        it('is shown by default', function() {
            Flash.create('success', 'All good');
            $rootScope.$digest();
            var contents = node.contents()[0];
            expect(contents.querySelectorAll('.close')[0].classList.contains('ng-hide')).toEqual(false);
        });

        it('can be hidden with directive parameter', function() {
            node = $compile('<div><flash-message show-close="false"></flash-message></div>')($rootScope);
            Flash.create('success', 'All good');
            $rootScope.$digest();
            var contents = node.contents()[0];
            expect(contents.querySelectorAll('.close')[0].classList.contains('ng-hide')).toEqual(true);
        });

        it('can be hidden with create function parameter', function() {
            Flash.create('success', 'All good', 0, '', false);
            $rootScope.$digest();
            var contents = node.contents()[0];
            expect(contents.querySelectorAll('.close')[0].classList.contains('ng-hide')).toEqual(true);
        });

        it('can be overriden with create function parameter', function() {
            node = $compile('<div><flash-message show-close="false"></flash-message></div>')($rootScope);
            Flash.create('success', 'All good', 0, '', true);
            $rootScope.$digest();
            var contents = node.contents()[0];
            expect(contents.querySelectorAll('.close')[0].classList.contains('ng-hide')).toEqual(false);
        });
    });

    describe('dismiss callback', function() {
        it('is called when dismissed', function() {
            $rootScope.myCallback = function(flash) {
            };
            spyOn($rootScope, "myCallback");
            node = $compile('<div><flash-message on-dismiss="myCallback(flash)"></flash-message></div>')($rootScope);
            const id = Flash.create('success', 'All good');
            Flash.dismiss(id);
            $rootScope.$digest();
            expect($rootScope.myCallback).toHaveBeenCalled();
        });
    })
});
